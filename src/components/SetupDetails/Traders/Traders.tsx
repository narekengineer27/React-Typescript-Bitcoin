import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ButtonGroup from 'Elements/ButtonGroup';
import Button from 'Elements/Button';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import SmallToggle from 'Elements/SmallToggle';
import { history } from 'Components/Routes';
import SmallToggleField from 'Elements/SmallToggle/SmallToggleField';
import { Status } from 'Models/Status';
import { setupDetails, getTradersOffers, getTradersSetupDetails, updateSetupData } from 'Components/SetupDetails/actions';
import ToggleField from 'Elements/ToggleField';
import AutobotSettingModal from 'Components/AutobotSettingModal';
const styles = require('../setup-details.css');
// const styles = require('../entry.css');

class TradersForm extends  React.Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            activeEntryIndex: 'FrugalityRatio',
            exchangeFormArray: [],
            offerFormArray: [],
            initValues: true
        };
        this.onChange = this.onChange.bind(this);
        this.renderExchangeFormSection = this.renderExchangeFormSection.bind(this);
        this.removeExchangeItem = this.removeExchangeItem.bind(this);
    }

    
    componentDidMount() {
        const { setup_details } = this.props;
        if(setup_details && setup_details.status.success) {
            this.initValues();
        }
    }

    componentWillMount() {
        const { getTradersSetupDetails } = this.props;

        getTradersSetupDetails();
    }
    
    initValues() {
        this.setState({
            initValues: false
        });
        const { setup_details } = this.props;
        var exchanges = setup_details.setupDetails.data.exchangeDetails;
        var others = setup_details.setupDetails.data.setupDetails;
        var values = {};
        var exchangesArray = [];
        exchanges.map((m, index) => {
            if(index == 0) {
                values['exchange_id'] = m.id;
                values['account'] = m.account_name;
                values['exchange'] = m.exchange;
                values['api'] = m.api;
                values['secret'] = m.secret_key;
                values['toggle1'] = m.coin_balance_flag;
                values['toggle2'] = m.api_flag;
            } else {
                var uniqueId = this.uniqueId();
                exchangesArray.push(uniqueId);
                values['exchange_id' + uniqueId] = m.id;
                values['account' + uniqueId] = m.account_name;
                values['exchange' + uniqueId] = m.exchange;
                values['api' + uniqueId] = m.api;
                values['secret' + uniqueId] = m.secret_key;
                values['toggle1' + uniqueId] = m.coin_balance_flag;
                values['toggle2' + uniqueId] = m.api_flag;
            }
        });

        var othersLength = others.length;
        values['wallet'] = others[othersLength-1].wallet_address;
       
        this.setState({
            exchangeFormArray: exchangesArray
        });

        this.props.initialize(values);
    }

    onChange(button: any) {
        this.setState({
            activeEntryIndex: button.value,
        });
    }

    onSubmit(values: object) {
        const { setup_details, getTradersOffers } = this.props;
        // console.log(values);
        var is_duplicated_exchange = false;
        var exchanges = [];
        values['exchange_id'] ? 
            exchanges.push({
                exchange_id: values['exchange_id'],
                account_name: values['account'] ? values['account'] : '',
                exchange: values['exchange'] ? values['exchange']  : '',
                api: values['api'] ? values['api'] : '',
                secret_key: values['secret'] ? values['secret'] : '',
                coin_balance_flag: values['toggle1'] ? values['toggle1'] : 0,
                api_flag: values['toggle2'] ? values['toggle2'] : 0
            }) : 
            exchanges.push({
                account_name: values['account'] ? values['account'] : '',
                exchange: values['exchange'] ? values['exchange']  : '',
                api: values['api'] ? values['api'] : '',
                secret_key: values['secret'] ? values['secret'] : '',
                coin_balance_flag: values['toggle1'] ? values['toggle1'] : 0,
                api_flag: values['toggle2'] ? values['toggle2'] : 0
            });

        this.state.exchangeFormArray && (this.state.exchangeFormArray.map((m, index) => {
            
            var data = {
                account_name: values['account' + m] ? values['account' + m] : '',
                exchange: values['exchange' + m] ? values['exchange' + m] : '',
                api: values['api' + m] ? values['api' + m] : '',
                secret_key: values['secret' + m] ? values['secret' + m] : '',
                coin_balance_flag: values['toggle1' + m] ? values['toggle1' + m] : !1,
                api_flag: values['toggle2' + m] ? values['toggle2' + m] : !1
            };

            exchanges.map((n, index2) => {
                if(n.exchange == data.exchange && n.api == data.api) {
                    is_duplicated_exchange = true;
                } else {
                    if(values['exchange_id' + m]) {
                        data['exchange_id'] = values['exchange_id' + m];
                        exchanges.push(data);
                    } else {
                        exchanges.push(data);
                    }
                }
            })
            
            console.log(exchanges);
        }));
    
        var data = {
          exchanges: JSON.stringify(exchanges),
          wallet_address: values['wallet'],
          role_id: 4,
        };
    
        if(setup_details && !setup_details.status.error && setup_details.setupDetails && setup_details.setupDetails.data.setupDetails && setup_details.setupDetails.data.setupDetails[0]) {
            this.props.updateSetupData(setup_details.setupDetails.data.setupDetails[0].id, data, 4);
        } else {
            this.props.setupDetails(data);
        }

        getTradersOffers();
        // history.push('/token-owners');
    }

    uniqueId() {
        return Math.random().toString(36).substr(2, 16);
    };

    addExchangeItem() {
        var exchangeFormArray = this.state.exchangeFormArray;
        exchangeFormArray.push(this.uniqueId());
        this.setState(
            {
                exchangeFormArray: exchangeFormArray
            }
        )
    }

    removeExchangeItem(id) {
        var exchangeFormArray = this.state.exchangeFormArray;
        var index = exchangeFormArray.indexOf(id);
        if (index > -1) {
            exchangeFormArray.splice(index, 1);
        }

        this.setState(
            {
                exchangeFormArray: exchangeFormArray
            }
        )
    }

    renderExchangeFormSection(options) {

        return (
            <div>
                <div className={styles.itemContentWrapper}>
                    <TextField label="Account" name="account"/>
                    <div className={styles.selectFieldWrapper}>
                        <SelectField options={options} name="exchange" placeholder="Exchange"/>
                    </div>
                    <div className={styles.descWrapper1}>
                        <div className={styles.toggleDesc}></div>
                        {/* <span className={styles.toggleDesc}>Do you want Token Owners & Exchanges to be able to check your Base coin Balance ?</span> */}
                        <div className={styles.descToggle}>
                            <span className={styles.descToggleSpan}>Activate Account</span>
                            <div className={styles.toggle}>
                                <ToggleField name="toggle1" isFormField={true}/>
                            </div>
                            <span className={styles.descToggleSpan}>Deactivate Account</span>
                        </div>
                    </div>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.textFieldWrapper1}>
                            <TextField label="API" name="api" border={true}/>
                        </div>
                        <div className={styles.textFieldWrapper2}>
                            <TextField label="Secret" name="secret" border={true}/>
                        </div>
                    </div>
                    <div className={styles.exchangePlusBtn} onClick={this.addExchangeItem.bind(this)}><span>+</span></div>
                </div>
                {
                    this.state.exchangeFormArray && this.state.exchangeFormArray.map((m, index) => {
                        return (
                            <div className={styles.itemContentWrapper1}>
                                <TextField label="Account" name={"account" + m}/>
                                <div className={styles.selectFieldWrapper}>
                                    <SelectField options={options} name={'exchange' + m} placeholder="Exchange"/>
                                </div>
                                <div className={styles.descWrapper1}>
                                    <div className={styles.toggleDesc}></div>
                                    {/* <span className={styles.toggleDesc}>Do you want Token Owners & Exchanges to be able to check your Base coin Balance ?</span> */}
                                    <div className={styles.descToggle}>
                                        <span className={styles.descToggleSpan}>Activate Account</span>
                                        <div className={styles.toggle}>
                                            <ToggleField name={'toggle1' + m} isFormField={true}/>
                                        </div>
                                        <span className={styles.descToggleSpan}>Deactivate Account</span>
                                    </div>
                                </div>
                                <div className={styles.inputsWrapper}>
                                    <div className={styles.textFieldWrapper1}>
                                        <TextField label="API" name={'api' + m} border={true}/>
                                    </div>
                                    <div className={styles.textFieldWrapper2}>
                                        <TextField label="Secret" name={'secret' + m} border={true}/>
                                    </div>
                                </div>
                                <div className={styles.exchangeMinusBtn} onClick={() => this.removeExchangeItem(m)}><span>-</span></div>
                            </div>
                        )
                    })
                }
            </div>

        );
    }

    onCancelPolicy() {

    }

    render() {
        const { setup_details, handleSubmit, exchanges, base_coin, status } = this.props;

        if(setup_details && setup_details.status.success && this.state.initValues) {
            this.initValues();
        }
        const { activeEntryIndex } = this.state;
        const options = [
            {value: '1', label: 'Exchanges1'}
        ];
        const exchange_options = [];

        const base_coin_options = [];


        if(exchanges && exchanges.data){
          exchanges.data.map((m,index) => {
            exchange_options.push({
              value: m.id,
              label: m.name
            });
          });
        }

        if(base_coin && base_coin.data){
          base_coin.data.map((m,index) => {
            base_coin_options.push({
              value: m.coin,
              label: m.coin
            });
          });
        }


        return (
            <div>
                <div className={styles.titleSection}>
                    <img src="/public/assets/images/landing1/traders.png"/>
                    <span>Traders</span>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>
                            <span>Exchanges</span>
                        </div>
                        <div className={styles.itemContent}>
                            {this.renderExchangeFormSection(exchange_options)}
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>
                            <span>Wallet Address</span>
                        </div>
                        <div className={styles.itemContent}>
                        <TextField label="Wallet Address" name="wallet"/>
                        <div className={styles.walletDesc}>
                            <span>The wallet address you are expected to specify here would be checked if the minimum required XRR token held is eligible to access the dashboard</span>
                        </div>
                        </div>
                    </div>
                    <Button className={styles.submitBtn + " small blue"} submit={true}>Submit</Button>
                </form>
                {/* <AutobotSettingModal isOpen={true} onCancel={this.onCancelPolicy.bind(this)} width="600"/> */}
            </div>
        );
    }
}

const mapDispatchToProps = {
    setupDetails,
    updateSetupData,
    getTradersOffers,
    getTradersSetupDetails
};

const form = reduxForm({
  form: 'token-owners-setup',
  enableReinitialize:true,
  keepDirtyOnReinitialize: true
})(TradersForm);

const mapStateToProps = (state, ownProps) => ({
    status: state.setupDetails.status as Status,
    exchanges: state.setupDetails.exchanges,
    base_coin: state.setupDetails.base_coin,
    setup_details: state.setupDetails.tradersSetupDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(form);
