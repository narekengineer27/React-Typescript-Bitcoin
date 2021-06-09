import * as React from 'react';
import * as _ from 'lodash';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loadCurrencies, loadAllCoins } from 'Components/PublicPages/Signup/actions';
import Loader from 'Elements/Loader';
import Button from 'Elements/Button';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import SelectField from 'Elements/SelectField';
import { Currency } from 'Models/Currency';
import { isNumber, isProvided } from 'Utils/validators';
import { fetchExchangeAccounts, saveWithdrawal } from './actions';

const myAccountStyles = require('../my-account.css');
const styles = require('./cmb-settings.css');

class WithdrawalForm extends React.Component<any> {

  onSubmit(values:any) {
    this.props.saveWithdrawal(values);
  }

  componentDidMount() {
    this.props.fetchExchangeAccounts();
    this.props.loadCurrencies();
    this.props.loadAllCoins();
  }

  renderExchangeAccountForm(account, index) {
    let { currencies, coins } = this.props;
    const coinOptions = (coins).map(it => ({ value: it.symbol, label: it.symbol }));
    const currencyOptions = (currencies as Currency[]).map(it => ({ value: it.id, label: it.code }));
    const id = account.id;
    return (
      <div className={myAccountStyles.rightPanelSub} key={account.name}>
        <div className={styles.withdrawalWrapper}>
          <div className={styles.withdrawalFlex}>
            <div>
              <div className={styles.exchangeName}>{account.name}</div>
              <div className={styles.exchangeId + ' ' + styles[account.exchange_id]}>
                {account.exchange_id.toUpperCase()}
              </div>
            </div>
            <div className={styles.autoWithdrawal}>
              <ToggleField
                icons={false} isFormField
                label="AutoWithdrawal"
                name={`${id}__withdrawal_is_auto_trading`}
                value={(!!parseInt(account.auto_withdrawal))}
                tabIndex={index * 6 + 1} leftSideError/>
            </div>
          </div>
          <div className={' row'}>
            <div className={styles.comboRow + ' col-md-6'}>
              <div className={styles.comboText}>
                <TextField
                  noMargin
                  label="Capital Balance" name={`${id}__withdrawal_capital_balance`}
                  type="number" tabIndex={index * 6 + 2} leftSideError/>
              </div>
              <div className={styles.comboSelect}>
                <SelectField
                  wrapperCustomClass={styles.select}
                  name={`${id}__withdrawal_capital_balance_currency`}
                  searchable
                  hideLabel
                  options={currencyOptions}
                  tabIndex={index * 6 + 3}
                  key={this.props.withdrawal_capital_balance_currency}/>
              </div>
            </div>
            <div className={styles.comboRow + ' col-md-6'}>
              <div className={styles.comboText}>
                <TextField
                  noMargin
                  label="Value" name={`${id}__withdrawal_value`} tabIndex={index * 6 + 4}
                  type="number"/>
              </div>
              <div className={styles.comboSelect}>
                <SelectField
                  tabIndex={index * 6 + 5}
                  wrapperCustomClass={styles.select}
                  name={`${id}__withdrawal_value_coin`}
                  searchable hideLabel options={coinOptions}
                  key={this.props.withdrawal_value_coin}/></div>
            </div>
          </div>
          <div className={styles.baseExitBox + ' row'}>
            <div className={styles.comboRow + ' col-md-12'}>
              <TextField
                noMargin
                label="Withdrawal address"
                name={`${id}__withdrawal_address`}
                tabIndex={index * 6 + 6}
                leftSideError/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { exchangeAccounts, handleSubmit, withdrawalStatus } = this.props;

    const $exchangeAccountForms = exchangeAccounts.map((account, index) => {
      return this.renderExchangeAccountForm(account, index);
    });

    return (
      <div>
        <div className={styles.withdrawalDescription + ' ' + myAccountStyles.rightPanelSub}>
          Maintaining a specific capital level ensures you benefits from the automatic withdrawal feature of the
          Application which guarantees you benefit from price volatility
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {withdrawalStatus.loading ? (
            <div className={myAccountStyles.rightPanelSub + ' ' + styles.withdrawalLoader}>
              <Loader isOpen></Loader>
            </div>
          ) : $exchangeAccountForms}
          <div className={myAccountStyles.bottomPanel}>
            <div className={myAccountStyles.rightPanelSub}>
              <Button
                submit
                disabled={withdrawalStatus.loading}
                loading={withdrawalStatus.progressing}
                className="large blue"
                style={{ width: 250 }}
              >
                SAVE SETTINGS
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors:any = {};

  Object.keys(values).forEach(field => {
    if (_.endsWith(field, '__withdrawal_capital_balance')
      || _.endsWith(field, '__withdrawal_value')) {
      if (!isProvided(values[field]) || !isNumber(values[field]) || (+values[field]) <= 0) {
        errors[field] = 'Please provide a valid number greater than 0';
      }
    }
  });

  return errors;
};

const singleValues = {
  withdrawal_is_auto_trading: false,
  withdrawal_capital_balance: 0,
  withdrawal_capital_balance_currency: 'USD',
  withdrawal_value: 0,
  withdrawal_value_coin: 'BTC',
  withdrawal_address: '',
};

const mapStateToProps = (state, ownProps) => {
  const exchangeAccounts = state.cmbSetting.withdrawal.exchangeAccounts;
  const initialValues = {};
  _.range(exchangeAccounts.length).forEach(index => {
    Object.keys(singleValues).forEach(fieldName => {
      const account = exchangeAccounts[index];
      const userValue = account[fieldName];
      initialValues[`${account.id}__${fieldName}`] = userValue === null ? singleValues[fieldName] : userValue;
    });
  });
  return ({
    exchangeAccounts,
    currencies: state.signup.currencies,
    coins: state.signup.coins,
    withdrawalStatus: state.cmbSetting.withdrawal.status,
    initialValues,
    ...ownProps,
  });
};

const mapDispatchToProps = {
  fetchExchangeAccounts,
  loadCurrencies,
  loadAllCoins,
  saveWithdrawal,
};

const form = reduxForm({
  form: 'cmbSettingsEntryForm',
  enableReinitialize: true,
  validate,
})(WithdrawalForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
