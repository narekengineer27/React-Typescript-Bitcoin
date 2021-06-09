import * as React from 'react';
import { connect } from 'react-redux';
import ReactIScroll from 'react-iscroll';
import * as classNames from 'classnames/bind';
import * as iScroll from 'iscroll';
import * as _ from 'lodash';
import Button from 'Elements/Button';
import Price from 'Elements/Price';
import ToggleField from 'Elements/ToggleField';
import Modal from 'Elements/Modal';
import NoCoins from '../NoCoins';
import { TableRow, TableCell } from 'Elements/Table';
import { getLodashSort } from 'Utils/string';
import { WatchCoin } from 'Models/WatchCoin';
import { Status } from 'Models/Status';
import WatchCoinForm from '../WatchCoin';
import { updateCoin } from '../actions';
import {
  clearWatchList,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  fetchHistory,
} from './actions';

const styles = require('./buying.css');
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
      const { updateFieldValue, updateCoin, coins } = this.props;
      updateFieldValue(coin, field, e.target.checked, coins);
      if (field === 'execute') {
        updateCoin(coin);
      }
    };
  }

  renderFieldValue(coin, field: string, symbol: string = '', prefix: string = '', showArrows: boolean = true) {
    const upField = field === 'btc_liquidity_bought' ? 'liquidity_ups' : `${field}_ups`;
    const downField = field === 'btc_liquidity_bought' ? 'liquidity_downs' : `${field}_downs`;
    return (
      <div>
        <div>
          <Price prefix={prefix}>{coin[field]} {symbol}</Price>
        </div>
        {showArrows ? (
          <div>
            <Price arrowPosition="left" arrowDirection="up">
              {coin[upField]}
            </Price>&nbsp;&nbsp;
            <Price arrowPosition="left" arrowDirection="down">
              {coin[downField]}
            </Price>
          </div>
        ) : null}
      </div>
    );
  }

  render() {
    const {
      coins,
      sort,
      updateCoin,
      updateStatus,
      removeStatus,
      removeCoin,
      cancelRemove,
      confirmRemove,
      coinToRemove,
      fetchHistory,
    } = this.props;

    const lodashSort = getLodashSort(sort);
    const sortedCoins = _.orderBy(coins, lodashSort[0], lodashSort[1]);
    const hasCoins = sortedCoins.length > 0;

    const $coinList = hasCoins ?
      sortedCoins.map((s, index) => {
        const history = s.history || [];
        const expandedClass = (s.expanded && history.length > 0) ? styles.expanded : styles.closed;
        const cellAlignClass = (s.expanded && history.length > 0) ? styles.cellTop : styles.cellCenter;
        return (
          <TableRow key={index} className={styles.row}>
            <TableCell className={cellAlignClass}>{s.coin}</TableCell>
            <TableCell className={cellAlignClass}>{s.coin_name}</TableCell>
            <TableCell className={cellAlignClass}>
              <div>
                <div className={expandedClass}>
                  {this.renderFieldValue(s, 'market_cap', '$', `${s.market_cap_score || 0} % / `)}
                </div>
                {s.expanded && history.map((h, i) => (
                  <div key={i}>
                    {this.renderFieldValue(
                      h,
                      'market_cap',
                      '$',
                      `${s.market_cap_score || 0} % / `,
                      history.length - 1 > i)}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className={cellAlignClass}>
              <div>
                <div className={expandedClass}>
                  {this.renderFieldValue(s, 'btc_liquidity_bought', 'Ƀ')}
                </div>
                {s.expanded && history.map((h, i) => (
                  <div key={i}>
                    {this.renderFieldValue(h, 'btc_liquidity_bought', 'Ƀ', '', history.length - 1 > i)}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className={cellAlignClass}>
              <div>
                <div className={expandedClass}>
                  {this.renderFieldValue(s, 'gap', 'Ƀ')}
                </div>
                {s.expanded && history.map((h, i) => (
                  <div key={i}>
                    {this.renderFieldValue(h, 'gap', 'Ƀ', '', history.length - 1 > i)}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className={cellAlignClass}>
              <div>
                <div className={expandedClass}>
                  {this.renderFieldValue(s, 'cpp', 'Ƀ')}
                </div>
                {s.expanded && history.map((h, i) => (
                  <div key={i}>
                    {this.renderFieldValue(h, 'cpp', 'Ƀ', '', history.length - 1 > i)}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className={cellAlignClass}>
              <div>
                <div className={expandedClass}>
                  {this.renderFieldValue(s, 'prr', '%')}
                </div>
                {s.expanded && history.map((h, i) => (
                  <div key={i}>
                    {this.renderFieldValue(h, 'prr', '%', '', history.length - 1 > i)}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className={styles.actions + ' ' + cellAlignClass + ' ' + expandedClass}>
              <div className={styles.toggle}>
                <ToggleField
                  loading={s.emailLoading}
                  topLabel
                  label="Email"
                  onChange={this.update(s, 'email').bind(this)}
                  checked={!!s.email}
                />
              </div>
              <div className={styles.toggle}>
                <ToggleField
                  loading={s.smsLoading}
                  topLabel
                  label="SMS"
                  onChange={this.update(s, 'sms').bind(this)}
                  checked={!!s.sms}
                />
              </div>
              <div className={styles.toggle}>
                <ToggleField
                  loading={s.executeLoading}
                  topLabel
                  label="Trade"
                  onChange={this.update(s, 'execute').bind(this)}
                  checked={!!s.execute}
                />
              </div>
              <div className={styles.buttons}>
                <div className={styles.removeBtn}>
                  <Button
                    style={{ width: '100%' }}
                    className={'small red'}
                    onClick={() => removeCoin(s)}
                  >
                    Remove
                  </Button>
                </div>
                <div className={styles.configurations} onClick={() => updateCoin(s)}>
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
                <Button
                  disabled={!s.has_history}
                  loading={s.loading}
                  style={{ width: 80 }}
                  className="small gray"
                  onClick={() => fetchHistory(coins, s, !s.expanded)}>
                  {s.expanded ? 'Close' : 'Expand'} &nbsp;
                  <i className={`fa fa-angle-${s.expanded ? 'up' : 'down'} fa-lg ${styles.arrow}`}
                     aria-hidden="true"></i>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      }) : (
        <NoCoins/>
      );

    const hasScrollbar = sortedCoins.length > 8;

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

    let bodyClasses = cx({
      'tbody': hasCoins,
      'noDataBody': !hasCoins,
      'noScrollbarBody': !hasScrollbar,
    });

    return (
      <div>
        <div className={bodyClasses}>
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
        {updateStatus.progressing && <WatchCoinForm></WatchCoinForm>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sort: _.get(state, 'watchListBuying.sort', ''),
  coins: _.get(state, 'watchListBuying.data', {}),
  updateStatus: state.watchList.update.status,
  coinToUpdate: state.watchList.update.coin,
  coinToRemove: _.get(state, 'watchListBuying.remove.coin', new WatchCoin()),
  removeStatus: _.get(state, 'watchListBuying.remove.status', new Status()),
});

const mapDispatchToProps = {
  clearWatchList,
  updateCoin,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  fetchHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);
