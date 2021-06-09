import * as React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import * as _ from 'lodash';

import { openBuySell, close } from './actions';
import { IState } from './types';
import { IState as MTState } from '../types';
import BuySellForm from './BuySellForm';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import { returntypeof } from 'Utils/type';
import { MarketOrder } from 'Models/MarketOrder';

const styles = require('./buy-sell.css');

class BuySellModal extends React.Component<BuySellModalProps, {}> {
  refresh() {
    const { exchangeId, coinId, sellMode, sellTrade } = this.props;
    this.props.openBuySell(exchangeId, coinId, sellMode, sellTrade);
  }

  render() {
    const {
      info, buyResult, coinId, currency, sellMode, sellResult,
      close, visible, currencyConversion, loading
    } = this.props;

    const loadingPanel = loading ? <div className={styles.loading}>loading...</div> : null;
    const buySellLoading = buyResult.status.loading || sellResult.status.loading;

    let lowestAsk: string, lowestAsk2: string, conversionRate: string, availableQuantity: string;
    const btcToCurrency = currencyConversion.btc2usd * currencyConversion.currencyToUsd[currency];
    if (info.status.success) {
      const order: MarketOrder = info.data;
      lowestAsk = order.rate.toFixed(8);
      lowestAsk2 = (btcToCurrency * order.rate).toFixed(2) + ' ' + currency;
      conversionRate = `1 BTC = ${(btcToCurrency).toFixed(2)} ${currency}`;
      availableQuantity = order.quantity.toFixed(8) + ' ' + coinId;
    }

    const title = sellMode ? 'Sell Coin' : 'Start Buy';
    const orderTitle = sellMode ? 'Highest Bid' : 'Lowest Ask';

    return (
      <Modal title={title} isOpen={visible} noFooter isCloseable={!buySellLoading} onCancel={close}>
        <div className={styles.infoPanel + ' row'}>
          <div className={styles.left + ' col-sm-6'}>
            <div className={styles.content}>
              <p className={styles['sub-title']}>{orderTitle}</p>
              {loadingPanel || <div className={styles.leftValues}>
                <p className={styles.number}>{lowestAsk}</p>
                <p className={styles.number}>{lowestAsk2}</p>
              </div>}
              {loading || <p className={styles['exchange-rate']}>{conversionRate}</p>}
            </div>
          </div>
          <div className={styles.right + ' col-sm-6'}>
            <div className={styles.content}>
              <p className={styles['sub-title']}>Available Quantity</p>
              {loadingPanel || <p className={styles.number + ' ' + styles.quantity}>{availableQuantity}</p>}
            </div>
            <Button
              className={'white medium ' + styles.refresh}
              onClick={this.refresh.bind(this)}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </div>
        <div className={styles.buyForm}>
          <BuySellForm onCancel={close} canSubmit={info.status.success} canCancel={!buySellLoading}/>
        </div>
      </Modal>
    );
  }
}

const selector = formValueSelector('buySell');

const mapStateToProps = rootState => {
  let state = rootState.buySell as IState;
  return {
    info: state.info,
    buyResult: state.buyResult,
    currencyConversion: (rootState.manualTradingRobot as MTState).currencyConversion,
    coinId: state.coinId,
    exchangeId: state.exchangeId,
    currency: selector(rootState, 'currency'),
    visible: state.visible,
    loading: _.get(rootState, 'buySell.info.status.loading', false) ||
    _.get(rootState, 'manualTradingRobot.currencyConversion.status.loading'),
    sellMode: state.sellMode,
    sellTrade: state.sellTrade,
    sellResult: state.sellResult,
  };
};

const mapDispatchToProps = {
  close,
  openBuySell,
};

const stateProps = returntypeof(mapStateToProps);
type BuySellModalProps = typeof mapDispatchToProps & typeof stateProps;

export default connect(mapStateToProps, mapDispatchToProps)(BuySellModal);
