import * as React from 'react';
import * as classNames from 'classnames/bind';
import { connect } from 'react-redux';
import ReactIScroll from 'react-iscroll';
import * as iScroll from 'iscroll';
import * as _ from 'lodash';
import Button from 'Elements/Button';
import Price from 'Elements/Price';
import ToggleField from 'Elements/ToggleField';
import Modal from 'Elements/Modal';
import NoCoins from '../NoCoins';
import { TableRow, TableCell } from 'Elements/Table';
import { getLodashSort } from 'Utils/string';
import { round } from 'Utils/math';
import { WatchCoin } from 'Models/WatchCoin';
import { Status } from 'Models/Status';
import ExitStrategy from 'Components/ExitStrategy';
import {
  clearWatchList,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  startConfig,
} from './actions';

const styles = require('./selling.css');
let cx = classNames.bind(styles);
const iScrollOptions = require('Constants/options.json').iScroll;

interface CoinsTableProps {
  coins: Array<WatchCoin>;
  sort: string;
}

class Coins extends React.Component<any, any> {

  public static defaultProps: CoinsTableProps = {
    coins: [],
    sort: '',
  };

  update(coin, field) {
    return (e) => {
      const { updateFieldValue, coins } = this.props;
      updateFieldValue(coin, field, e.target.checked, coins);
    };
  }

  render() {
    const {
      coins,
      sort,
      removeStatus,
      removeCoin,
      cancelRemove,
      confirmRemove,
      coinToRemove,
      startConfig,
      exitStrategyFormValues,
    } = this.props;

    const lodashSort = getLodashSort(sort);
    const sortedCoins = _.orderBy(coins, lodashSort[0], lodashSort[1]);
    const hasCoins = sortedCoins.length > 0;

    const $coinList = hasCoins ?
      sortedCoins.map((s, index) => {
        return (
          <TableRow key={index} className={styles.row}>
            <TableCell>{s.coin}</TableCell>
            <TableCell>{s.id}</TableCell>
            <TableCell>
              <div>
                <div><Price>{s.price_bought_btc} Ƀ</Price></div>
                <div><Price nDigitsAfterDot={2}>{s.price_bought_usd || 0} USD</Price></div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div><Price>{s.price_per_unit} Ƀ</Price></div>
                <div><Price nDigitsAfterDot={2}>{s.price_per_unit_usd} USD</Price></div>
              </div>
            </TableCell>
            <TableCell className={styles.profit_target}>
              <div>
                <div>
                  <Price prefix={`${round(s.profit_target_btc) || 0} % / `}>
                    {s.profit_target || 0} $
                  </Price>
                </div>
                <div className="blue">Current: <Price>{s.current_profit_target || 0} %</Price></div>
              </div>
            </TableCell>
            <TableCell className={styles.exit}>
              <div className={styles.toggle}>
                <ToggleField
                  loading={s.emailLoading}
                  topLabel
                  label="Email"
                  onChange={this.update(s, 'email').bind(this)}
                  checked={exitStrategyFormValues.id === s.id ?
                    !!exitStrategyFormValues.exit_notified_by_email : !!s.email}
                />
              </div>
              <div className={styles.toggle}>
                <ToggleField
                  loading={s.smsLoading}
                  topLabel
                  label="SMS"
                  onChange={this.update(s, 'sms').bind(this)}
                  checked={exitStrategyFormValues.id === s.id ?
                    !!exitStrategyFormValues.exit_notified_by_sms : !!s.sms}
                />
              </div>
              <div className={'flex'}>
                <Button
                  style={{ width: 80 }}
                  className={"small red " + styles.removeBtn}
                  onClick={() => removeCoin(s)}
                >
                  Remove
                </Button>
                <div className={styles.configurations} onClick={() => startConfig(s, coins)}>
                  <i
                    className={`fa ${s.loadingConfigs ? 'fa-circle-o-notch fa-spin' : 'fa-cog'}`}
                    aria-hidden="true"></i>
                </div>
              </div>
            </TableCell>
          </TableRow>
        );
      }) : (
        <NoCoins/>
      );

    const hasScrollbar = sortedCoins.length > 10;
    const $scrollableTable = hasScrollbar ? (
      <ReactIScroll
        iScroll={iScroll}
        options={iScrollOptions}
      >
        <div>
          {$coinList}
        </div>
      </ReactIScroll>
    ) : (
      <div className={styles.noScrollbar}>
        {$coinList}
      </div>
    );

    const tableBodyClass = cx({
      tbody: hasCoins,
      noDataBody: !hasCoins,
      noScrollbar: !hasScrollbar,
    });
    return (
      <div>
        <div className={tableBodyClass}>
          {$scrollableTable}
        </div>
        <Modal
          title="Remove Coin"
          confirmButtonText="Remove"
          isOpen={removeStatus.progressing}
          onCancel={cancelRemove}
          onConfirm={() => {
            confirmRemove(coinToRemove.id, coins);
          }}
          buttonClassName="medium red"
          buttonStyle={{ width: 120 }}
          buttonLoading={removeStatus.loading}
        >
          <p className={styles.description}>Are you sure you want to remove this coin from your watch list?</p>
        </Modal>
        <ExitStrategy isModal action="updateSellingRule"></ExitStrategy>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sort: _.get(state, 'watchListSelling.sort', ''),
  coins: _.get(state, 'watchListSelling.data', {}),
  coinToRemove: _.get(state, 'watchListSelling.remove.coin', new WatchCoin()),
  exchangeId: _.get(state, 'exchangeAccountsDropdown.activeExchangeAccount.data.exchange_id', ''),
  removeStatus: _.get(state, 'watchListSelling.remove.status', new Status()),
  exitStrategyFormValues: _.get(state, 'form.exitStrategyForm.values', {}),
});

const mapDispatchToProps = {
  clearWatchList,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  startConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
