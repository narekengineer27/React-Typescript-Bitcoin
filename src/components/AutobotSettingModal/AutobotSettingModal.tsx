import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Select from 'react-select';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import Toggle from 'react-toggle';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import SelectField from 'Elements/SelectField';
import AutobotHistoryModal from 'Components/AutobotHistoryModal';
import AutobotTradingModal from 'Components/AutobotTradingModal';
import { getTradersSetupDetails, baseCoins } from 'Components/SetupDetails/actions';
import { history } from 'Components/Routes';
import { saveAutobotSetting, fetchExchangeBalance, getTokenBalance } from 'Components/AutobotSettingModal/actions';
import List from 'react-list-select';
import ExchangePoolModal from 'Components/ExchangePoolModal';
import AutobotBillingModal from 'Components/AutobotBillingModal';
import CustomText from 'Elements/CustomText';
import { fetchXrrPrice } from 'Components/AutobotBillingModal/actions';

const styles = require('./autobot-setting-modal.css');

const exitOptions = [
    { value: "Fixed", label: "Fixed" },
    { value: "Trailing", label: "Trailing" },
    { value: "Smart Floating", label: "Smart Floating" }
];

const stoplossOptions = [
    { value: "Fixed", label: "Fixed" },
    { value: "Trailing", label: "Trailing" },
    { value: "Weak Max", label: "Weak Max" },
    { value: "No Stop Loss", label: "No Stop Loss" }
];

const presetoptions = [
    {value: "Low Ply 1", label: "Low Ply 1"},
    {value: "Mid Ply 1", label: "Mid Ply 1"},
    {value: "Pacer 2 Ply", label: "Pacer 2 Ply"},
    {value: "High Low Ply 2", label: "High Low Ply 2"},
    {value: "Combo Full Ply", label: "Combo Full Ply"}
];

const timeoptions = [
    {value: 'Weekly', label: 'Weekly($20)'},
    {value: 'Monthly', label: 'Monthly($50)'}
];

const entryoptions = [
    {value: 'Fixed', label: 'Fixed'},
    {value: 'Position Max', label: 'Position Max'},
    {value: 'Multi Exchange Max', label: 'Multi Exchange Max'}
];

const basecoinOptions = [
    {value: 'BTC', label: 'BTC'}
]

class AutobotSettingModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false,
            presetSelectedValue: '',
            isOpenHistoryModal: false,
            isOpenSingleTradeModal: false,
            isOpenMultiTradeModal: false,
            isOpenBillingModal: false,
            initValues: true,
            selectedAccounts: []
        };

        this.openTradeModal = this.openTradeModal.bind(this);
        this.checkBilling = this.checkBilling.bind(this);
    }

    componentWillMount() {
        const { traderSetupData, getTradersSetupDetails, baseCoins, fetchExchangeBalance, getTokenBalance, token, exchangeAccounts, fetchXrrPrice } = this.props;
        // if(!exchangeAccounts || !exchangeAccounts.data) {
            fetchExchangeBalance();
        // }
        fetchXrrPrice();

        if(!token) {
            getTokenBalance();
        }

        if(!traderSetupData) {
            getTradersSetupDetails();
        }

        baseCoins();
    }

    componentDidMount() {
        const { traderSetupData, xrrPrice } = this.props;
        
        var btc_price = xrrPrice && xrrPrice.data && xrrPrice.data.btc_price ? xrrPrice.data.btc_price : 0;
        var usd_price = xrrPrice && xrrPrice.data && xrrPrice.data.usd_price && xrrPrice.data.usd_price.price ? xrrPrice.data.usd_price.price : 0;
        var unit_price = 0;

        if(btc_price != 0 && usd_price != 0) {
            unit_price = 1 / (btc_price * usd_price);
        }

        if(traderSetupData && traderSetupData.status.success && unit_price) {
            this.initValues();
        }
    }

    handleChange() {

    }

    handlePresetChange(e) {
        this.setState({
            presetSelectedValue: e.value
        });
    }

    changeSettingMode() {
        this.setState({
            mode: !this.state.mode
        });
    }

    changeYesNoMode() {
        this.setState({
            yesNo: !this.state.yesNo
        }); 
    }

    checkBilling(data1, data2, data3) {
        var check_billing = false;
        this.setState({
            is_additional: false
        });
        data2.map((m, index) => {
            if(!m.is_paid) {
                check_billing = true;
            }

            if(!m.is_entry_paid && data1.autobot_entry_type != 'Fixed') {
                check_billing = true;
            }

            
            if(!m.is_exit_paid && data1.autobot_exit_type != 'Fixed') {
                check_billing = true;
            }

            
            if(!m.is_stoploss_paid && data1.autobot_stoploss_type != 'Fixed') {
                check_billing = true;
            }
        })

        if(data3.autobot_time != data1.autobot_time) {
            check_billing = true;
            this.setState({
                is_additional: true
            });
        }

        return check_billing;
    }

    onSubmit(values) {
        const { saveAutobotSetting, exchangeAccounts, traderSetupData } = this.props;
        
        var setupdetails = traderSetupData.setupDetails.data.setupDetails[0];

        var data = {
            autobot_preset: this.state.presetSelectedValue,
            autobot_mode: this.state.mode ? 'active' : 'test',
            autobot_entry_type: values.settingEntrySelect,
            autobot_entry_value: values.settingEntryInput,
            autobot_exit_type: values.settingExitSelect,
            autobot_exit_value: values.settingExitInput,
            autobot_stoploss_type: values.settingStoplossSelect,
            autobot_stoploss_value: values.settingStoplossInput,
            autobot_amount_per_trade: values.settingMaxAmountInput,
            autobot_basecoin: values.settingBasecoinSelect,
            autobot_exchange_account_ids: this.state.selectedAccounts,
            autobot_time: values.settingTimeSelect,
            autobot_billing: this.state.settingBillingInput,
            autobot_withdrawal_secure: this.state.yesNo
        }

        if(this.state.selectedAccounts.length) {
            var exchangeAccountsTemp = [];
            if(exchangeAccounts && exchangeAccounts.data && exchangeAccounts.data.exchangeDetails) {
                this.state.selectedAccounts.map((accountId) => {
                    exchangeAccounts.data.exchangeDetails.map((m, index) => {
                        if(m.id == accountId) {
                            // this.setState({
                            //     exchangeAccount: m
                            // })
                            exchangeAccountsTemp.push(m);
                        }
                    })
                })
            }

            var check_billing = this.checkBilling(data, exchangeAccountsTemp, setupdetails);

            if(check_billing) {
                this.setState({
                    exchangeAccounts: exchangeAccountsTemp,
                    // exchangeId: this.state.selectedAccounts,
                    autobotSetting: data,
                    isOpenBillingModal: true
                });
            } else {
                this.openTradeModal();
            }
        }

        saveAutobotSetting(data);
    }

    openHistoryModal() {
        this.setState({
            isOpenHistoryModal: true
        })
    }

    onCancelHistoryModal() {
        this.setState({
            isOpenHistoryModal: false
        })
    }

    onCancelBillingModal() {
        this.setState({
            isOpenBillingModal: false
        })
    }

    openTradeModal() {
        if(this.state.selectedAccounts.length > 1) {
            this.setState({
                isOpenMultiTradeModal: true
            })
        } else {
            this.setState({
                isOpenSingleTradeModal: true
            })
        }
        
    }

    onCancelSingleTradeModal() {
        this.setState({
            isOpenSingleTradeModal: false
        })
    }

    onCancelMultiTradeModal() {
        this.setState({
            isOpenMultiTradeModal: false
        })
    }

    onCancel() {
        
    }
    
    initValues() {
        this.setState({
            initValues: false
        });
        const { traderSetupData, xrrPrice } = this.props;
        
        var btc_price = xrrPrice && xrrPrice.data && xrrPrice.data.btc_price ? xrrPrice.data.btc_price : 0;
        var usd_price = xrrPrice && xrrPrice.data && xrrPrice.data.usd_price && xrrPrice.data.usd_price.price ? xrrPrice.data.usd_price.price : 0;
        var unit_price = 0;

        if(btc_price != 0 && usd_price != 0) {
            unit_price = 1 / (btc_price * usd_price);
        }

        var setupdetails = traderSetupData.setupDetails.data.setupDetails[0];

        var values = {};

        this.setState({
            presetSelectedValue: setupdetails.preset_config_name,
            mode: setupdetails.is_test,
            yesNo: setupdetails.autobot_withdrawal_secure,
            selectedAccounts: setupdetails.autobot_exchange_account_ids
        });

        if(setupdetails.number_of_trades != 0) {
            values['settingEntrySelect'] = 'Fixed';
            values['settingEntryInput'] = Math.floor(setupdetails.number_of_trades*100)/100;
        }

        if(setupdetails.entry_position_max_percentage != 0) {
            values['settingEntrySelect'] = 'Position Max';
            values['settingEntryInput'] = Math.floor(setupdetails.entry_position_max_percentage*100)/100;
        }

        if(setupdetails.entry_multiexch_max_percentage != 0) {
            values['settingEntrySelect'] = 'Multi Exchange Max';
            values['settingEntryInput'] = Math.floor(setupdetails.entry_multiexch_max_percentage*100)/100;
        }


        if(setupdetails.exit_fixed_percentage != 0) {
            values['settingExitSelect'] = 'Fixed';
            values['settingExitInput'] = Math.floor(setupdetails.exit_fixed_percentage*100)/100;
        }

        if(setupdetails.exit_trailing_percentage != 0) {
            values['settingExitSelect'] = 'Trailing';
            values['settingExitInput'] = Math.floor(setupdetails.exit_trailing_percentage*100)/100;
        }

        if(setupdetails.exit_smart_percentage != 0) {
            values['settingExitSelect'] = 'Smart Floating';
            values['settingExitInput'] = Math.floor(setupdetails.exit_smart_percentage*100)/100;
        }

        
        if(setupdetails.stop_fixed_percentage != 0) {
            values['settingStoplossSelect'] = 'Fixed';
            values['settingStoplossInput'] = Math.floor(setupdetails.stop_fixed_percentage*100)/100;
        }

        if(setupdetails.stop_trailing_percentage != 0) {
            values['settingStoplossSelect'] = 'Trailing';
            values['settingStoplossInput'] = Math.floor(setupdetails.stop_trailing_percentage*100)/100;
        }

        if(setupdetails.stop_weakmax_percentage != 0) {
            values['settingStoplossSelect'] = 'Weak Max';
            values['settingStoplossInput'] = Math.floor(setupdetails.stop_weakmax_percentage*100)/100;
        }

        if(setupdetails.stop_nostoploss_percentage != 0) {
            values['settingStoplossSelect'] = 'No Stop Loss';
            values['settingStoplossInput'] = Math.floor(setupdetails.stop_nostoploss_percentage*100)/100;
        }
        
        values['settingMaxAmountInput'] = Math.floor(setupdetails.autobot_amount_per_trade*1000000)/1000000;
        values['settingBasecoinSelect'] = setupdetails.autobot_basecoin;
        values['settingTimeSelect'] = setupdetails.autobot_time;
        // values['settingBillingInput']= Math.floor(setupdetails.autobot_billing*100)/100;
        if(setupdetails.autobot_time == "Monthly") {
            this.setState({
                settingBillingInput: Math.round(50 * unit_price) + ' XRR'
            });
        } else {
            this.setState({
                settingBillingInput: Math.round(20 * unit_price) + ' XRR'
            });
        }

        this.props.initialize(values);
    }

    onSelectAccount(selected) {
        console.log(selected);
        this.setState({
            selectedAccounts: selected
        });
    }

    handleTimeSelect(value) {
        console.log(value);
        const { xrrPrice } = this.props;

        var btc_price = xrrPrice && xrrPrice.data && xrrPrice.data.btc_price ? xrrPrice.data.btc_price : 0;
        var usd_price = xrrPrice && xrrPrice.data && xrrPrice.data.usd_price && xrrPrice.data.usd_price.price ? xrrPrice.data.usd_price.price : 0;
        var unit_price = 0;

        if(btc_price != 0 && usd_price != 0) {
            unit_price = 1 / (btc_price * usd_price);
        }

        if(value[0] == "M") {
            this.setState({
                settingBillingInput: Math.round(50 * unit_price) + ' XRR'
            });
        } else {
            this.setState({
                settingBillingInput: Math.round(20 * unit_price) + ' XRR'
            });
        }
    }

    render() {
        const { isOpen, onCancel, width, handleSubmit, base_coin, traderSetupData, token, exchangeAccounts, xrrPrice } = this.props;

        var btc_price = xrrPrice && xrrPrice.data && xrrPrice.data.btc_price ? xrrPrice.data.btc_price : 0;
        var usd_price = xrrPrice && xrrPrice.data && xrrPrice.data.usd_price && xrrPrice.data.usd_price.price ? xrrPrice.data.usd_price.price : 0;
        var unit_price = 0;

        if(btc_price != 0 && usd_price != 0) {
            unit_price = 1 / (btc_price * usd_price);
        }

        if(traderSetupData && traderSetupData.status.success && this.state.initValues && unit_price) {
            this.initValues();
        }

        if(token && token.XRR) {
            var MPA = Math.floor(token.XRR / 10000) - 1;
        }

        var accountOptions = [];

        const base_coin_options = [];

        if(base_coin){
          base_coin.data && base_coin.data.map((m,index) => {
            base_coin_options.push({
              value: m.coin,
              label: m.coin
            });
          });
        }
    
        if(exchangeAccounts && exchangeAccounts.data && exchangeAccounts.data.exchangeDetails) {
            exchangeAccounts.data.exchangeDetails.map((m, index) => {
                // accountOptions.push({
                //     value: m.id,
                //     label: (
                //         <div className={styles.accountOptionItem}>
                //             <div>
                //                 {m.balance && m.balance.Balance && m.balance.Currency && (m.account_name + '(' + m.balance.Balance + m.balance.Currency + ')')}
                //             </div>
                //             <div className={styles.betweenJam}></div>
                //             <div className={styles.accountOptionApikey}>
                //                 {m.api}
                //             </div>
                //         </div>
                //     )
                // });

                accountOptions[m.id] = (
                    <div className={styles.accountOptionItem}>
                        <div className={styles.accountName}>
                            {m.account_name + '(' + m.balance + (typeof m.balance == 'string' ? ')' : 'BTC)')}
                        </div>
                        {/* <div className={styles.betweenJam}></div> */}
                        <div className={styles.accountOptionApikey}>
                            {m.api}
                        </div>
                    </div>
                )
                
            })
        } else {
            if(isOpen && exchangeAccounts && exchangeAccounts.status && (exchangeAccounts.status.success || exchangeAccounts.status.error)) {
                history.push('/setup-details/traders');
            }
        }

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
                <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                <div className={styles.title}>
                    <span>Autobot Setting</span>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className={styles.firstSection}>
                        <div className={styles.sectionTitle}>
                            <span>Preset Configurations</span>
                        </div>
                        <div className={styles.firstSectionContent}>
                            <div className={styles.firstSectionSelectWrapper}>
                                <Select
                                    value={this.state.presetSelectedValue}
                                    onChange={this.handlePresetChange.bind(this)}
                                    options={presetoptions}
                                    name=""
                                />
                            </div>
                            <div className={styles.firstSectionButtonWrapper}>
                                <Button className={styles.presetHistoryBtn + ' medium green'} onClick={this.openHistoryModal.bind(this)}>History</Button>
                            </div>
                        </div>
                        <div className={styles.presetDesc}>
                            <span>
                                Preset configurations are our perception of price action 
                                using buy/sell.attitude algorithms. Anyone who uses these 
                                setting uses them at his/her own risk. The historical 
                                performance captures the algorithmic selection during 
                                trade entries and should not form the basis of guaranteeing 
                                future performances.
                            </span>
                        </div>
                    </div>
                    <div className={styles.secondSection}>
                        <div className={styles.sectionTitle}>
                            <span>Setting</span>
                        </div>
                        <div className={styles.secondSectionContent}>
                            <div className={styles.secondContentItemWrapper}>
                                <div className={styles.label}>
                                    <span>Mode</span>
                                </div>
                                <div className={styles.contentItem1}>
                                    <span className={styles.blueText}>TEST</span>
                                    <ToggleField
                                        disabled={false}
                                        checked={this.state.mode}
                                        icons={false}
                                        className='react-toggle-mr'
                                        onChange={this.changeSettingMode.bind(this)}/>
                                    <span className={styles.greenText}>ACTIVE</span>
                                </div>
                            </div>
                            <div className={styles.secondContentItemWrapper}>
                                <div className={styles.label}>
                                    <span>Entry</span>
                                </div>
                                <div className={styles.contentItem}>
                                    <div className={styles.selectWrapper}>
                                        <SelectField
                                            name="settingEntrySelect"
                                            options={entryoptions}
                                            label=""
                                        />
                                    </div>
                                    <div className={styles.textWrapper}>
                                        <TextField label="Qty of Trades" name="settingEntryInput"/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.secondContentItemWrapper}>
                                <div className={styles.label}>
                                    <span>Exit</span>
                                </div>
                                <div className={styles.contentItem}>
                                    <div className={styles.selectWrapper}>
                                        <SelectField
                                            name="settingExitSelect"
                                            options={exitOptions}
                                            label=""
                                        />
                                    </div>
                                    <div className={styles.textWrapper}>
                                        <TextField label="Percentage at Exit" name="settingExitInput"/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.secondContentItemWrapper}>
                                <div className={styles.label}>
                                    <span>Stop Loss</span>
                                </div>
                                <div className={styles.contentItem}>
                                    <div className={styles.selectWrapper}>
                                        <SelectField
                                            name="settingStoplossSelect"
                                            options={stoplossOptions}
                                            label=""
                                        />
                                    </div>
                                    <div className={styles.textWrapper}>
                                        <TextField label="Percentage Exit at Loss" name="settingStoplossInput"/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.secondContentItemWrapper}>
                                <div className={styles.label}>
                                    <span>Max Amount per Trade</span>
                                </div>
                                <div className={styles.contentItem}>
                                    <div className={styles.textWrapper}>
                                        <TextField label="Max Amount per Trade" name="settingMaxAmountInput"/>
                                    </div>
                                    <div className={styles.selectWrapper}>
                                        <SelectField
                                            name="settingBasecoinSelect"
                                            options={basecoinOptions}
                                            label=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.secondContentItemWrapper}>
                                <div className={styles.label}>
                                    <span></span>
                                </div>
                                <div className={styles.contentItem1}>
                                    <span className={styles.lightBlueText}>FLAT BUY</span>
                                    <ToggleField
                                        disabled={false}
                                        checked={this.state.mode}
                                        icons={false}
                                        className='react-toggle-mr'
                                        onChange={this.changeSettingMode.bind(this)}/>
                                    <span className={styles.blueText}>DEEP BUY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.thirdSection}>
                        <div className={styles.sectionTitle}>
                            <span>Account Selection</span>
                        </div>
                        <div className={styles.thirdSectionContent}>
                            <div className={styles.thirdContentItemWrapper}>
                                <div className={styles.label}>
                                    
                                </div>
                                <div className={styles.contentItem}>
                                    <span className={styles.greenText}>{'Max Position Allowed(MPA): ' + MPA}</span>
                                </div>
                            </div>
                            <div className={styles.thirdContentItemWrapper}>
                                <div className={styles.label}>
                                    <span>Select Account</span>
                                </div>
                                <div className={styles.contentItem}>
                                    <List 
                                        items={accountOptions}
                                        onChange={this.onSelectAccount.bind(this)}
                                        selected={this.state.selectedAccounts}
                                        multiple={true}
                                    />
                                    {/* <SelectField
                                        name="settingAccountSelect"
                                        options={accountOptions}
                                        label=""
                                        isMulti={true}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.forthSection}>
                        <div className={styles.sectionTitle}>
                            <span>Time & Billing</span>
                        </div>
                        <div className={styles.forthSectionContent}>
                            <div className={styles.selectWrapper}>
                                <SelectField
                                    name="settingTimeSelect"
                                    options={timeoptions}
                                    label=""
                                    onChange={this.handleTimeSelect.bind(this)}
                                />
                            </div>
                            <div className={styles.textWrapper}>
                                <CustomText className="original" name="time" value={this.state.settingBillingInput} disabled/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.fifthSectionContent}>
                        <div>
                            <div className={styles.fif_text}>
                                <span>Yes or No to the Statement below</span>
                            </div>
                            <div className={styles.contentItem1}>
                                <span className={styles.blueText}>YES</span>
                                <ToggleField
                                    disabled={false}
                                    checked={this.state.yesNo}
                                    icons={false}
                                    className='react-toggle-mr'
                                    onChange={this.changeYesNoMode.bind(this)}/>
                                <span className={styles.greenText}>NO</span>
                            </div>
                        </div>
                        <div>
                            <span>
                                The security of your tokens is your responsibility.
                                It is important you understand that your API and 
                                Secret Key should only be enabled for trading. 
                                You are strongly adviced to disable withdrawal 
                                on your exchange accounts.I have disabled withdrawal 
                                on my exchange account.
                            </span>
                        </div>
                    </div>
                    <Button className={styles.activateBtn + ' large blue'} submit disabled={this.state.yesNo}> Activate AutoBot</Button>
                </form>
                {
                    this.state.isOpenHistoryModal ? <AutobotHistoryModal isOpen={true} onCancel={this.onCancelHistoryModal.bind(this)} width="700"/> : ''
                }
                {
                    this.state.isOpenSingleTradeModal ? <AutobotTradingModal isOpen={true} onCancel={this.onCancelSingleTradeModal.bind(this)} width="900"/> : ''
                }
                {
                    this.state.isOpenMultiTradeModal ? <ExchangePoolModal isOpen={true} onCancel={this.onCancelMultiTradeModal.bind(this)} width="900"/> : ''
                }
                
                { this.state.isOpenBillingModal ? <AutobotBillingModal isOpen={true} onCancel={this.onCancelBillingModal.bind(this)} width="700" autobotSetting={this.state.autobotSetting} exchangeAccounts={this.state.exchangeAccounts} isAdditional={this.state.is_additional}/> : ''}
            </Modal>
        );
    }
}

const form = reduxForm({
    form: 'autobot-setting-form',
    enableReinitialize:true,
    keepDirtyOnReinitialize: true
})(AutobotSettingModal);

const mapStateToProps = (state, ownProps) => ({
    xrrPrice: state.autobotBilling.xrrPrice,
    traderSetupData: state.setupDetails.tradersSetupDetails,
    base_coin: state.setupDetails.base_coin,
    token: state.autobotSetting.token,
    exchangeAccounts: state.autobotSetting.exchangeAccounts
});

const mapDispatchToProps = {
    fetchXrrPrice,
    getTradersSetupDetails,
    baseCoins,
    saveAutobotSetting,
    fetchExchangeBalance,
    getTokenBalance
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
