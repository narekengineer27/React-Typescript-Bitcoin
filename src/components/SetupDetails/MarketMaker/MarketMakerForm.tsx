import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ButtonGroup from 'Elements/ButtonGroup';
import Button from 'Elements/Button';
import SelectField from 'Elements/SelectField';
import TextField from 'Elements/TextField';
import SmallToggle from 'Elements/SmallToggle';
import ToggleField from 'Elements/ToggleField';
import { setupDetails, getMarketMakerOffers, getMarketMakerSetupDetails, updateSetupData } from '../actions';
import { history } from 'Components/Routes';
import SmallToggleField from 'Elements/SmallToggle/SmallToggleField';
import { Status } from 'Models/Status';
const styles = require('../setup-details.css');
// const styles = require('./approach.css');

class MarketMakerForm extends  React.Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            activeApproachIndex: 'Target',
            exchangeFormArray: [],
            offerFormArray: [],
            initValues: true
        };
        this.onChange = this.onChange.bind(this);
        this.initValues = this.initValues.bind(this);
    }

    componentDidMount() {
        const { setup_details, getMarketMakerSetupDetails } = this.props;
        if(setup_details && setup_details.status.success) {
            this.initValues();
        }
    }

    initValues() {
        this.setState({
            initValues: false
        });
        const { setup_details } = this.props;
        var exchanges = setup_details.setupDetails.data.exchangeDetails;
        var offers = setup_details.setupDetails.data.offerDetails;
        var others = setup_details.setupDetails.data.setupDetails;
        var values = {};
        var exchangesArray = [];
        var offersArray = [];

        Array.isArray(exchanges) && exchanges.map((m, index) => {
        if(index == 0) {
            values['exchange_id'] = m.id;
            values['exchange'] = m.exchange;
            values['account'] = m.account_name;
            values['api'] = m.api;
            values['secret'] = m.secret_key;
            values['toggle1'] = m.coin_balance_flag;
            values['toggle2'] = m.api_flag;
        } else {
            var uniqueId = this.uniqueId();
            exchangesArray.push(uniqueId);
            values['exchange_id' + uniqueId] = m.id;
            values['exchange' + uniqueId] = m.exchange;
            values['account' + uniqueId] = m.account_name;
            values['api' + uniqueId] = m.api;
            values['secret' + uniqueId] = m.secret_key;
            values['toggle1' + uniqueId] = m.coin_balance_flag;
            values['toggle2' + uniqueId] = m.api_flag;
        }
        });

        Array.isArray(offers) && offers.map((m, index) => {
        if(index == 0) {
            values['offer_id'] = m.id;
            values['base_coin'] = m.base_coin;
            values['charge'] = m.charge;
            values['chargeSelect'] = m.coin_name;
            values['quantity'] = m.quantity;
            values['quantitySelect'] = m.qty_coin_name;
            values['time'] = m.time;
            values['timeSelect'] = m.time_duration;
        } else {
            var uniqueId = this.uniqueId();
            offersArray.push(uniqueId);
            values['offer_id' + uniqueId] = m.id;
            values['base_coin' + uniqueId] = m.base_coin;
            values['charge' + uniqueId] = m.charge;
            values['chargeSelect' + uniqueId] = m.coin_name;
            values['quantity' + uniqueId] = m.quantity;
            values['quantitySelect' + uniqueId] = m.qty_coin_name;
            values['time' + uniqueId] = m.time;
            values['timeSelect' + uniqueId] = m.time_duration;
        }
        });

        var othersLength = others.length;
        values['wallet'] = others[othersLength-1].wallet_address;
        values['url'] = others[othersLength-1].api_url;
        values['contract'] = others[othersLength-1].contract_address;
        values['ticker'] = others[othersLength-1].ticker_symbol;

        this.setState({
            exchangeFormArray: exchangesArray
        });

        this.setState({
            offerFormArray: offersArray
        });

        this.props.initialize(values);
    }

    componentWillMount() {
        const { getMarketMakerSetupDetails } = this.props;
        // if(!setup_details || setup_details.status.error) {
        getMarketMakerSetupDetails();
        // }
    }

    onChange(button: any) {
        this.setState({
        activeApproachIndex: button.value,
        });
    }

    onSubmit(values: object) {
        const { setup_details, getMarketMakerOffers } = this.props;
        console.log(values);
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

        var offers = [];

        values['offer_id'] ? 
            offers.push({
                offer_id:  values['offer_id'],
                base_coin: values['base_coin'] ? values['base_coin'] : '',
                charge: values['charge'] ? values['charge'] : '',
                coin_name: values['chargeSelect'] ? values['chargeSelect'] : '',
                quantity: values['quantity'] ? values['quantity'] : 0,
                qty_coin_name: values['quantitySelect'] ? values['quantitySelect'] : '',
                time: values['time'] ? values['time'] : 0,
                time_duration: values['timeSelect'] ? values['timeSelect'] : ''
            }) :
            offers.push({
                base_coin: values['base_coin'] ? values['base_coin'] : '',
                charge: values['charge'] ? values['charge'] : '',
                coin_name: values['chargeSelect'] ? values['chargeSelect'] : '',
                quantity: values['quantity'] ? values['quantity'] : 0,
                qty_coin_name: values['quantitySelect'] ? values['quantitySelect'] : '',
                time: values['time'] ? values['time'] : 0,
                time_duration: values['timeSelect'] ? values['timeSelect'] : ''
            });

        this.state.offerFormArray && (this.state.offerFormArray.map((m, index) => {
            values['offer_id' + m] ? 
                offers.push({
                    offer_id:  values['offer_id' + m],
                    base_coin: values['base_coin' + m] ? values['base_coin' + m] : '',
                    charge: values['charge' + m] ? values['charge' + m] : 0,
                    coin_name: values['chargeSelect' + m] ? values['chargeSelect' + m] : '',
                    quantity: values['quantity' + m] ? values['quantity' + m] : 0,
                    qty_coin_name: values['quantitySelect' + m] ? values['quantitySelect' + m] : '',
                    time: values['time' + m] ? values['time' + m] : 0,
                    time_duration: values['timeSelect' + m] ? values['timeSelect' + m] : ''
                }): 
                offers.push({
                    base_coin: values['base_coin' + m] ? values['base_coin' + m] : '',
                    charge: values['charge' + m] ? values['charge' + m] : 0,
                    coin_name: values['chargeSelect' + m] ? values['chargeSelect' + m] : '',
                    quantity: values['quantity' + m] ? values['quantity' + m] : 0,
                    qty_coin_name: values['quantitySelect' + m] ? values['quantitySelect' + m] : '',
                    time: values['time' + m] ? values['time' + m] : 0,
                    time_duration: values['timeSelect' + m] ? values['timeSelect' + m] : ''
                });
            console.log(offers);
        }));

        var data = {
            exchanges: JSON.stringify(exchanges),
            wallet_address: values['wallet'],
            make_offer_viewable: 1,
            role_id: 3,
            offers: JSON.stringify(offers)
        };

        // var updatedData = {
        //     exchangeDetails: exchanges,
        //     offerDetails: offers,
        //     setupDetails: [{
        //         wallet_address: values['wallet'],
        //         contract_address: '',
        //         ticker_symbol: '',
        //         role_id: 1,
        //         api_url: 'dfsdf',
        //     }]
        // }
        if(setup_details && setup_details.setupDetails && setup_details.setupDetails.data.setupDetails && setup_details.setupDetails.data.setupDetails[0]) {
            this.props.updateSetupData(setup_details.setupDetails.data.setupDetails[0].id, data, 3);
        } else {
            this.props.setupDetails(data);
        }
       
        getMarketMakerOffers();

        // history.push('/market-maker');
    }

    uniqueId() {
        return Math.random().toString(36).substr(2, 16);
    }

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

    addOfferItem() {
        var offerFormArray = this.state.offerFormArray;
        offerFormArray.push(this.uniqueId());
        this.setState(
            {
                offerFormArray: offerFormArray
            }
        )
    }

    removeOfferItem(id) { 
        var offerFormArray = this.state.offerFormArray;
        var index = offerFormArray.indexOf(id);
        if (index > -1) {
            offerFormArray.splice(index, 1);
        }

        this.setState(
            {
                offerFormArray: offerFormArray
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
                        <span className={styles.toggleDesc}>Do you want Token Owners & Exchanges to be able to check your Base coin Balance ?</span>
                        <div className={styles.descToggle}>
                            <span>Yes</span>
                            <div className={styles.toggle}>
                                <ToggleField name="toggle1" isFormField={true}/>
                            </div>
                            <span>No</span>
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
                                    <span className={styles.toggleDesc}>Do you want Token Owners & Exchanges to be able to check your Base coin Balance ?</span>
                                    <div className={styles.descToggle}>
                                        <span>Yes</span>
                                        <div className={styles.toggle}>
                                            <ToggleField name={'toggle1' + m} isFormField={true}/>
                                        </div>
                                        <span>No</span>
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

    renderOfferFormSection(chargeoptions, quantityoptions) {
        const timeoptions = [
            {value: 'days', label: 'Days'},
            {value: 'weeks', label: 'Weeks'},
            {value: 'months', label: 'Months'}
        ];

        return (
            <div>
                <div className={styles.itemContentWrapper}>
                    <div className={styles.offerDesc}>
                        <span>Your offer is the amount you are willing to charge a token owner or exchange for an amount of your base coin ( e.g BTC or ETH) held in trade.</span>
                    </div>
                    <div className={styles.offerItemWrapper}>
                        <span className={styles.offerItemTitle}>Charge</span>
                        {/* <div className={styles.offerItemText}> */}
                            <TextField name="charge"/>
                        {/* </div> */}
                        <div className={styles.offerItemSelect}>
                            <SelectField options={chargeoptions} name="chargeSelect" placeholder="Coin Name"/>
                        </div>
                    </div>
                    <div className={styles.offerItemWrapper}>
                        <span className={styles.offerItemTitle}>Quantity</span>
                        {/* <div className={styles.offerItemText}> */}
                            <TextField name="quantity"/>
                        {/* </div> */}
                        <div className={styles.offerItemSelect}>
                            <SelectField options={quantityoptions} name="quantitySelect" placeholder="Coin Name"/>
                        </div>
                    </div>
                    <div className={styles.offerItemWrapper}>
                        <span className={styles.offerItemTitle}>Time</span>
                        {/* <div className={styles.offerItemText}> */}
                            <TextField name="time"/>
                        {/* </div> */}
                        <div className={styles.offerItemSelect}>
                            <SelectField options={timeoptions} name="timeSelect" placeholder="Day"/>
                        </div>
                    </div>
                    <div className={styles.exchangePlusBtn} onClick={this.addOfferItem.bind(this)}><span>+</span></div>
                </div>
                {
                    this.state.offerFormArray && this.state.offerFormArray.map((m, index) => {
                        return (
                            <div className={styles.itemContentWrapper1}>
                                <div className={styles.offerDesc}>
                                    <span>Your offer is the amount you are willing to charge a token owner or exchange for an amount of your base coin ( e.g BTC or ETH) held in trade.</span>
                                </div>
                                <div className={styles.offerItemWrapper}>
                                    <span className={styles.offerItemTitle}>Charge</span>
                                    <div className={styles.offerItemText}>
                                        <TextField label="Charge" name={'charge' + m} border={true}/>
                                    </div>
                                    <div className={styles.offerItemSelect}>
                                        <SelectField options={chargeoptions} name={'chargeSelect' + m} placeholder="Coin Name"/>
                                    </div>
                                </div>
                                <div className={styles.offerItemWrapper}>
                                    <span className={styles.offerItemTitle}>Quantity</span>
                                    <div className={styles.offerItemText}>
                                        <TextField label="Quantity" name={'quantity' + m} border={true}/>
                                    </div>
                                    <div className={styles.offerItemSelect}>
                                        <SelectField options={quantityoptions} name={'quantitySelect' + m} placeholder="Coin Name"/>
                                    </div>
                                </div>
                                <div className={styles.offerItemWrapper}>
                                    <span className={styles.offerItemTitle}>Time</span>
                                    <div className={styles.offerItemText}>
                                        <TextField label="Time" name={'time' + m} border={true}/>
                                    </div>
                                    <div className={styles.offerItemSelect}>
                                        <SelectField options={timeoptions} name={'timeSelect' + m} placeholder="Day"/>
                                    </div>
                                </div>
                                <div className={styles.exchangeMinusBtn} onClick={() => this.removeOfferItem(m)}><span>-</span></div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    render() {

        const { setup_details, handleSubmit, exchanges, base_coin, status } = this.props;

        if(setup_details && setup_details.status.success && this.state.initValues) {
            this.initValues();
        }

        const { activeApproachIndex } = this.state;
        const options = [
            {value: '1', label: 'Exchanges1'}
        ];
        const exchange_options = [];

        const base_coin_options = [];


        if(exchanges && exchanges.data){
            exchanges.data.map((m,index) => {
            exchange_options.push({
                value: m.name,
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
                <img src="/public/assets/images/landing1/icon1Asset.png"/>
                <span>Market Maker</span>
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
                    <span>Offer</span>
                </div>
                <div className={styles.itemContent}>
                    {this.renderOfferFormSection(base_coin_options, base_coin_options)}
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
        </div>
        );
    }
}

const mapDispatchToProps = {
  setupDetails,
  getMarketMakerOffers,
  getMarketMakerSetupDetails,
  updateSetupData
};

const form = reduxForm({
  form: 'market-maker-setup',
  enableReinitialize:true,
  keepDirtyOnReinitialize: true
})(MarketMakerForm);

const mapStateToProps = (state, ownProps) => ({
    status: state.setupDetails.status as Status,
    exchanges: state.setupDetails.exchanges,
    base_coin: state.setupDetails.base_coin,
    setup_details: state.setupDetails.marketMakerSetupDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(form);
