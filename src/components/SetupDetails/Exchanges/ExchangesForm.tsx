import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ButtonGroup from 'Elements/ButtonGroup';
import Button from 'Elements/Button';
import SelectField from 'Elements/SelectField';
import TextField from 'Elements/TextField';
import { history } from 'Components/Routes';
import { Status } from 'Models/Status';
import { setupDetails, getExchangesOffers, getExchangesSetupDetails, updateSetupData } from 'Components/SetupDetails/actions';
import SmallToggleField from 'Elements/SmallToggle/SmallToggleField';
import ToggleField from 'Elements/ToggleField';
const styles = require('../setup-details.css');
// const styles = require('./exit.css');


class ExchangesForm extends  React.Component<any, any> {

  constructor(props){
    super(props);
    this.state = {
      activeExitIndex: 'FrugalityRatio',
      offerFormArray: [],
      initValues: true
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { setup_details } = this.props;
    if(setup_details && setup_details.status.success) {
      this.initValues();
    }
  }

  componentWillMount() {
    const { getExchangesSetupDetails } = this.props;
    getExchangesSetupDetails();
  }
  
  initValues() {
    this.setState({
      initValues: false
    });
    const { setup_details } = this.props;
    // var exchanges = setup_details.setupDetails.data.exchangeDetails;
    var offers = setup_details.setupDetails.data.offerDetails;
    var others = setup_details.setupDetails.data.setupDetails;
    var values = {};
    var exchangesArray = [];
    var offersArray = [];
    // exchanges.map((m, index) => {
    //   if(index == 0) {
    //     values['exchange_id'] = m.id;
    //     values['exchange'] = m.exchange;
    //     values['api'] = m.api;
    //     values['secret'] = m.secret_key;
    //     values['toggle1'] = m.coin_balance_flag;
    //     values['toggle2'] = m.api_flag;
    //   } else {
    //     var uniqueId = this.uniqueId();
    //     exchangesArray.push(uniqueId);
    //     values['exchange_id' + uniqueId] = m.id;
    //     values['exchange' + uniqueId] = m.exchange;
    //     values['api' + uniqueId] = m.api;
    //     values['secret' + uniqueId] = m.secret_key;
    //     values['toggle1' + uniqueId] = m.coin_balance_flag;
    //     values['toggle2' + uniqueId] = m.api_flag;
    //   }
    // });

    offers.map((m, index) => {
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
    values['url'] = others[othersLength-1].api_doc_url;
    values['contract'] = others[othersLength-1].contract_address;
    values['ticker'] = others[othersLength-1].ticker_symbol;
    values['email'] = others[othersLength-1].email_contact;
    values['telegram'] = others[othersLength-1].telegram_contact;
    values['exchange'] = others[othersLength-1].exchange_name;
    values['integrationMode'] = others[othersLength-1].integration_type;
    
    this.setState({
      exchangeFormArray: exchangesArray
    });

    this.setState({
      offerFormArray: offersArray
    });

    this.props.initialize(values);
  }

  onChange(button: any) {
    this.setState({
      activeExitIndex: button.value,
    });
  }

  onSubmit(values: object) {
    const { setup_details } = this.props;
    console.log(values);
    
    var file = this.state.file;

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

    var formdata = new FormData();

    formdata.append('exchanges', '');
    formdata.append('wallet_address', values['wallet']);
    formdata.append('api_doc_url', values['url']);
    formdata.append('exchange_name', values['exchange']);
    formdata.append('telegram_contact', values['telegram']);
    formdata.append('email_contact', values['email']);
    formdata.append('integration_type', values['integrationMode']);
    formdata.append('file', file);
    formdata.append('role_id', '1');
    formdata.append('offers', JSON.stringify(offers));

    if(setup_details && setup_details.setupDetails && setup_details.setupDetails.data.setupDetails && setup_details.setupDetails.data.setupDetails[0]) {
      this.props.updateSetupData(setup_details.setupDetails.data.setupDetails[0].id, formdata, 1);
    } else {
        this.props.setupDetails(formdata);
    }
    this.props.getExchangesOffers();
    // history.push('/exchanges');
  }

  uniqueId() {
    return Math.random().toString(36).substr(2, 16);
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

  removeOfferItem(m) { 
    var offerFormArray = this.state.offerFormArray;
    var index = offerFormArray.indexOf(m);
    if (index > -1) {
        offerFormArray.splice(index, 1);
    }

    this.setState(
        {
            offerFormArray: offerFormArray
        }
    )
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
                <SelectField options={quantityoptions} name="base_coin" placeholder="Account Name"/>
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
                            <SelectField options={quantityoptions} name={'base_coin' + m} placeholder="Account Name"/>
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

  changeFile(ev) {
    var returnObj = {};
    returnObj[ev.target.name] = ev.target.files[0];

    this.setState(returnObj);
  }

  render() {
    const { setup_details, handleSubmit, exchanges, base_coin, status } = this.props;

    if(setup_details && setup_details.status.success && this.state.initValues) {
        this.initValues();
    }

    const { activeExitIndex } = this.state;
    const options = [
        {value: '1', label: 'Exchanges1'}
    ];

    const base_coin_options = [];

    if(base_coin){
      base_coin.data && base_coin.data.map((m,index) => {
        base_coin_options.push({
          value: m.coin,
          label: m.coin
        });
      });
    }

    return (
      <div>
        <div className={styles.titleSection}>
            <img src="/public/assets/images/landing1/exchangesAsset.png"/>
            <span>Exchanges</span>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className={styles.itemWrapper}>
            <div className={styles.itemTitle}>
              <span>URL for API Documentation</span>
            </div>
            <div className={styles.itemContent}>
              <TextField label="URL" name="url"/>
            </div>
          </div>
          <div className={styles.itemWrapper}>
            <div className={styles.itemTitle}>
              <span>Exchange Name</span>
            </div>
            <div className={styles.itemContent}>
              <TextField label="Exchange" name="exchange" border={true}/>
              <div className={styles.descToggle + ' ' + styles.exchangesToggle}>
                <span>Paid Integration</span>
                <div className={styles.toggle}>
                  <ToggleField name={'integrationMode'} isFormField={true}/>
                </div>
                <span>Free Integration</span>
              </div>
              <div className={styles.integrationText}>
                <span>
                  Paid Integration requires 3btc worth of XRR or the exchange 
                  token equivalents. While free tokens will require paid community 
                  voting using token credits
                </span>
              </div>
            </div>
          </div>
          <div className={styles.itemWrapper}>
            <div className={styles.itemTitle}>
              <span>Contact</span>
            </div>
            <div className={styles.itemContent + ' ' + styles.flexContent}>
              <div className={styles.inputsWrapper}>
                  <div className={styles.textFieldWrapper1}>
                      <TextField label="Telegram Contact" name="telegram"/>
                  </div>
                  <div className={styles.textFieldWrapper2}>
                      <TextField label="Email Contact" name="email"/>
                  </div>
              </div>
            </div>
          </div>
          <div className={styles.itemWrapper}>
            <div className={styles.itemTitle}>
              <span>Exchange Logo</span>
            </div>
            <div className={styles.itemContent}>
              <div className={styles.smallInput}>
                <input type="file" placeholder="Upload" name="file" value={this.state.file} onChange={this.changeFile.bind(this)}/>
              </div>
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
  getExchangesOffers,
  getExchangesSetupDetails,
  updateSetupData
};

const form = reduxForm({
  form: 'exit-setup',
  enableReinitialize:true,
  keepDirtyOnReinitialize: true
})(ExchangesForm);

const mapStateToProps = (state, ownProps) => ({
    status: state.setupDetails.status as Status,
    exchanges: state.setupDetails.exchanges,
    base_coin: state.setupDetails.base_coin,
    setup_details: state.setupDetails.exchangesSetupDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(form);
