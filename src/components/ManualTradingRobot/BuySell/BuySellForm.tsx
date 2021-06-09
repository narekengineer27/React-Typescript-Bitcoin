import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import * as _ from 'lodash';

import { buy, sell } from './actions';
import TextField from 'Elements/TextField';
import { isProvided, isStrictlyPositiveNumber } from 'Utils/validators';
import { FormProps, returntypeof } from 'Utils/type';
import { round } from 'Utils/math';
import Button from 'Elements/Button';
import CurrencyInput from './CurrencyInput';
import { IState } from './types';
import { IState as MTState } from '../types';

const styles = require('./buy-sell.css');

const validate = (values: any) => {
  const errors: any = {};
  if (!isProvided(values.amount) || !isStrictlyPositiveNumber(values.amount)) {
    errors.amount = 'Please provide a valid amount.';
  }

  if (!isProvided(values.amountBTC) || !isStrictlyPositiveNumber(values.amountBTC)) {
    errors.amountBTC = 'Please provide a valid amount.';
  }

  if (!isProvided(values.quantity) || !isStrictlyPositiveNumber(values.quantity)) {
    errors.quantity = 'Please provide a valid quantity.';
  }

  if (!isProvided(values.offer) || !isStrictlyPositiveNumber(values.offer)) {
    errors.offer = 'Please provide a valid offer.';
  }

  if (!isProvided(values.offerBTC) || !isStrictlyPositiveNumber(values.offerBTC)) {
    errors.offerBTC = 'Please provide a valid offer.';
  }

  return errors;
};

class BuySellForm extends React.Component<Props, {}> {

  onSubmit(values: any) {
    const { exchangeAccountId, coinId, offerBTC, sellMode, sellTrade, mode } = this.props;
    if (sellMode) {
      this.props.sell(
        {
          exchange_account_id: exchangeAccountId,
          base_coin_id: 'BTC',
          target_coin_id: coinId,
          quantity: values.quantity,
          rate: offerBTC,
          trade_id: sellTrade.id,
        },
        mode);
    } else {
      this.props.buy(
        {
          exchange_account_id: exchangeAccountId,
          base_coin_id: 'BTC',
          target_coin_id: coinId,
          quantity: values.quantity,
          rate: offerBTC,
        },
        mode);
    }
  }

  render() {
    const {
      handleSubmit, invalid = true, canSubmit, canCancel, onCancel,
      currencyConversion, buyResult, sellMode, sellResult
    } = this.props;

    const buySellLoading = buyResult.status.loading || sellResult.status.loading;
    const currencyOptions = currencyConversion.currencyList.map(it => ({ label: it, value: it }));
    const btcOptions = [{ label: 'BTC', value: 'BTC' }];
    const buttonText = sellMode ? 'Sell' : 'Buy';
    const totalText = 'Total';
    const rateText = 'My price per unit';
    const quantityText = sellMode ? 'Sell quantity' : 'Buy quantity';

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <div className="row">
          <div className="col-sm-6">
            <CurrencyInput
              label={rateText}
              field="offerBTC"
              currencyField="currencyBTC"
              currencyOptions={btcOptions}
              currencyDisabled
              leftSideError
            />
          </div>
          <div className="col-sm-6">
            <CurrencyInput
              label={totalText}
              field="amountBTC"
              currencyField="currencyBTC"
              currencyOptions={btcOptions}
              currencyDisabled
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <CurrencyInput
              label={rateText}
              field="offer"
              currencyField="currency"
              currencyOptions={currencyOptions}
              leftSideError
            />
          </div>
          <div className="col-sm-6">
            <CurrencyInput
              label={totalText}
              field="amount"
              currencyField="currency"
              currencyOptions={currencyOptions}
            />
          </div>
        </div>

        <div className="row">
          <div className={'col-sm-6 ' + styles.notice}>
            The exchange commission of approx. 0.25% will be applied.
          </div>
          <div className="col-sm-6">
            <TextField label={quantityText} name="quantity" type="number"/>
          </div>
        </div>

        <div className="customModalFooter">
          {canCancel && <a className="customModalCancel" onClick={onCancel}>Cancel</a>}
          <Button className="large blue" fixedWidth submit disabled={invalid || !canSubmit} loading={buySellLoading}>
            {buttonText}
          </Button>
        </div>
      </form>
    );
  }

  componentWillUpdate(nextProps: Props) {
    const { currencyConversion, change, untouch, availablePrice, sellMode, sellTrade } = nextProps;
    const btcToCurrency = currencyConversion.btc2usd * currencyConversion.currencyToUsd[nextProps.currency];

    if (isNaN(currencyConversion.btc2usd) || isNaN(availablePrice) || isNaN(btcToCurrency)) {
      return;
    }

    const updateField = (field: string, value: any) => {
      change(field, value);
      untouch(field);
    };

    const activeChange = (field: string, validNumber = true) => {
      return this.props[field] !== nextProps[field] && this.props[field + 'Active'] &&
        (!validNumber || !isNaN(Number(nextProps[field])));
    };

    const updateAvailableQuantity = (availableQuantity) => {
      if (!isNaN(availableQuantity)) {
        updateField('quantity', availableQuantity);
        updateField('amountBTC', round(availableQuantity * availablePrice));
        updateField('amount', round(availableQuantity * availablePrice * btcToCurrency));
        updateField('offerBTC', availablePrice);
        updateField('offer', round(availablePrice * btcToCurrency));
      }
    };

    if (this.props.availableQuantity !== nextProps.availableQuantity) {
      if (sellMode) {
        if (!this.props.quantity) {
          updateAvailableQuantity(sellTrade.quantity);
        }
      } else {
        updateAvailableQuantity(Number(nextProps.availableQuantity));
      }
      return;
    }

    const quantity = Number(nextProps.quantity);
    const amountBTC = Number(nextProps.amountBTC);
    const amount = Number(nextProps.amount);
    const offerBTC = Number(nextProps.offerBTC);
    const offer = Number(nextProps.offer);

    if (activeChange('amount')) {
      updateField('amountBTC', round(amount / btcToCurrency));
      updateField('quantity', round(amount / offer));

    } else if (activeChange('currency', false)) {
      updateField('amount', round(amountBTC * btcToCurrency));
      updateField('offerCurrency', nextProps.currency);
      updateField('offer', round(offerBTC * btcToCurrency));

    } else if (activeChange('amountBTC')) {
      updateField('amount', round(amountBTC * btcToCurrency));
      updateField('quantity', round(amountBTC / offerBTC));

    } else if (activeChange('quantity')) {
      updateField('amountBTC', round(quantity * offerBTC));
      updateField('amount', round(quantity * offer));

    } else if (activeChange('offer')) {
      updateField('offerBTC', round(offer / btcToCurrency));
      updateField('amount', round(quantity * offer));
      updateField('amountBTC', round(quantity * offer / btcToCurrency));

    } else if (activeChange('offerBTC')) {
      updateField('offer', round(offerBTC * btcToCurrency));
      updateField('amount', round(quantity * offerBTC * btcToCurrency));
      updateField('amountBTC', round(quantity * offerBTC));
    }
  }
}

const selector = formValueSelector('buySell');

const mapStateToProps = (rootState, props: OwnProps) => {
  const state = rootState.buySell as IState;
  return {
    initialValues: {
      currencyBTC: 'BTC',
      currency: state.defaultCurrency,
      offerCurrency: state.defaultCurrency,
    },
    buyResult: state.buyResult,
    coinId: state.coinId,
    sellMode: state.sellMode,
    sellResult: state.sellResult,
    sellTrade: state.sellTrade,
    exchangeAccountId: _.get(rootState, 'exchangeAccountsDropdown.activeExchangeAccount.data.id', 0),
    availableQuantity: _.get(rootState, 'buySell.info.data.quantity', 0),
    availablePrice: _.get(rootState, 'buySell.info.data.rate', 0),
    amount: selector(rootState, 'amount'),
    amountBTC: selector(rootState, 'amountBTC'),
    quantity: selector(rootState, 'quantity'),
    amountActive: _.get(rootState, 'form.buySell.fields.amount.active', false),
    amountBTCActive: _.get(rootState, 'form.buySell.fields.amountBTC.active', false),
    quantityActive: _.get(rootState, 'form.buySell.fields.quantity.active', false),
    currencyConversion: (rootState.manualTradingRobot as MTState).currencyConversion,
    currency: selector(rootState, 'currency'),
    currencyActive: _.get(rootState, 'form.buySell.fields.currency.active', false),
    offer: selector(rootState, 'offer'),
    offerActive: _.get(rootState, 'form.buySell.fields.offer.active', false),
    offerBTC: selector(rootState, 'offerBTC'),
    offerBTCActive: _.get(rootState, 'form.buySell.fields.offerBTC.active', false),
    mode: rootState.manualTradingRobot.mode,
  };
};

const mapDispatchToProps = {
  buy, sell,
};

interface OwnProps {
  canCancel?: boolean;
  canSubmit?: boolean;
  onCancel?: () => void;
}

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps & OwnProps;

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'buySell', validate })(BuySellForm));
