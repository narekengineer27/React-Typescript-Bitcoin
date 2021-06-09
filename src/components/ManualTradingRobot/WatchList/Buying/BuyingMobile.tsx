import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Button from 'Elements/Button';
import Price from 'Elements/Price';
import ToggleField from 'Elements/ToggleField';
import Modal from 'Elements/Modal';
import Loader from 'Elements/Loader';
import Pagination from 'Elements/Pagination';
import Dropdown from 'Elements/Dropdown';
import { WatchCoin } from 'Models/WatchCoin';
import { Status } from 'Models/Status';
import { getLodashSort, updateSort } from 'Utils/string';
import NoCoins from '../NoCoins';
import WatchCoinForm from '../WatchCoin';
import { updateCoin } from '../actions';
import {
  fetchWatchList,
  clearWatchList,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  fetchHistory,
  mobileGoToPage,
  doSort,
} from './actions';

import 'Styles/mobile-table.less';

const styles = require('./buying.css');

interface CoinsTableProps {
  coins: Array<WatchCoin>;
  sort: string;
}

class CoinsMobile extends React.Component<any, any> {

  public static defaultProps: CoinsTableProps = {
    coins: [],
    sort: '',
  };

  componentDidMount() {
    const { activeExchangeAccount } = this.props;
    if (activeExchangeAccount.id) {
      this.refresh();
    }
  }

  componentWillUpdate(nextProps) {
    const { activeExchangeAccount } = nextProps;
    if (activeExchangeAccount.id !== this.props.activeExchangeAccount.id
      || nextProps.mode !== this.props.mode) {
      this.refresh(nextProps);
    }
  }

  refresh(props = this.props) {
    const { mode, activeExchangeAccount, fetchWatchList, mobilePage, meta } = props;
    fetchWatchList(activeExchangeAccount.exchange_id, mode, meta, mobilePage);
  }

  update(coin, field) {
    return (e) => {
      const { updateFieldValue, updateCoin, coins } = this.props;
      updateFieldValue(coin, field, e.target.checked, coins);
      if (field === 'execute') {
        updateCoin(coin);
      }
    };
  }

  sort(field: string, decreasing: boolean = false) {
    this.props.doSort(updateSort(this.props.sort, field, decreasing));
  }

  renderMobileSort() {
    const { coins } = this.props;
    const onSort = ((menu) => {
      this.sort(menu.value.replace('-', ''), menu.value.indexOf('-') === 0);
    }).bind(this);

    return coins.length > 0 ? (
      <div className={styles.mobileSort}>
        <Dropdown
          onChange={onSort}
          className="medium"
          menus={[{
            label: 'Sort by',
            value: '',
          }, {
            label: 'By Market Cap ascending',
            value: 'market_cap',
          }, {
            label: 'By Market Cap descending',
            value: '-market_cap',
          }, {
            label: 'By Liquidity ascending',
            value: 'btc_liquidity_bought',
          }, {
            label: 'By Liquidity descending',
            value: '-btc_liquidity_bought',
          }, {
            label: 'By GAP ascending',
            value: 'gap',
          }, {
            label: 'By Gap descending',
            value: '-gap',
          }, {
            label: 'By CPP ascending',
            value: 'cpp',
          }, {
            label: 'By CPP descending',
            value: '-cpp',
          }, {
            label: 'By PRR ascending',
            value: 'prr',
          }, {
            label: 'By PRR descending',
            value: '-prr',
          }]}
        />
      </div>
    ) : null;
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
      status,
      coins,
      sort,
      updateCoin,
      updateStatus,
      removeStatus,
      removeCoin,
      cancelRemove,
      confirmRemove,
      fetchHistory,
      mobilePage,
      mobileGoToPage,
      coinToRemove,
    } = this.props;

    const lodashSort = getLodashSort(sort);
    const sortedCoins = _.orderBy(coins, lodashSort[0], lodashSort[1]);
    const hasCoins = sortedCoins.length > 0;
    const pagedCoins = sortedCoins.slice(
      mobilePage.offset,
      Math.min(sortedCoins.length, mobilePage.offset + mobilePage.limit));

    const $coinList = hasCoins ?
      pagedCoins.map((s, index) => {
        const history = s.history || [];
        const expandedClass = (s.expanded && history.length > 0) ? styles.expanded : styles.closed;
        return (
          <div key={index} className={'record ' + styles.record}>
            <div className="field">
              <div className="field-name">Coin</div>
              <div className={'field-value'}>{s.coin}</div>
            </div>
            <div className="field">
              <div className="field-name">Name</div>
              <div className={'field-value'}>{s.coin_name}</div>
            </div>
            <div className="field">
              <div className="field-name">Market Cap</div>
              <div className={'field-value ' + styles.value}>
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
            </div>
            {s.expanded && (
              <div>
                <div className="field">
                  <div className="field-name">Liquidity</div>
                  <div className={'field-value ' + styles.value}>
                    <div className={expandedClass}>
                      {this.renderFieldValue(s, 'btc_liquidity_bought', 'Ƀ')}
                    </div>
                    {s.expanded && history.map((h, i) => (
                      <div key={i}>
                        {this.renderFieldValue(h, 'btc_liquidity_bought', 'Ƀ', '', history.length - 1 > i)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">GAP</div>
                  <div className={'field-value ' + styles.value}>
                    <div className={expandedClass}>
                      {this.renderFieldValue(s, 'gap', 'Ƀ')}
                    </div>
                    {s.expanded && history.map((h, i) => (
                      <div key={i}>
                        {this.renderFieldValue(h, 'gap', 'Ƀ', '', history.length - 1 > i)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">CPP</div>
                  <div className={'field-value ' + styles.value}>
                    <div className={expandedClass}>
                      {this.renderFieldValue(s, 'cpp', 'Ƀ')}
                    </div>
                    {s.expanded && history.map((h, i) => (
                      <div key={i}>
                        {this.renderFieldValue(h, 'cpp', 'Ƀ', '', history.length - 1 > i)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">PRR</div>
                  <div className={'field-value ' + styles.value}>
                    <div className={expandedClass}>
                      {this.renderFieldValue(s, 'prr', '%')}
                    </div>
                    {s.expanded && history.map((h, i) => (
                      <div key={i}>
                        {this.renderFieldValue(h, 'prr', '%', '', history.length - 1 > i)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Email</div>
                  <div className={'field-value ' + styles.value}>
                    <ToggleField
                      loading={s.emailLoading}
                      onChange={this.update(s, 'email').bind(this)}
                      checked={!!s.email}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">SMS</div>
                  <div className={'field-value ' + styles.value}>
                    <ToggleField
                      loading={s.smsLoading}
                      onChange={this.update(s, 'sms').bind(this)}
                      checked={!!s.sms}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Trade</div>
                  <div className={'field-value ' + styles.value}>
                    <ToggleField
                      loading={s.executeLoading}
                      onChange={this.update(s, 'execute').bind(this)}
                      checked={!!s.execute}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className={'field ' + styles.actions}>
              <div className="field-name">Action</div>
              <div className={'field-value ' + styles.value}>
                <Button
                  style={{ width: 89 }}
                  className="small red"
                  onClick={() => removeCoin(s)}
                >Remove</Button>
                <div className={styles.configurations} onClick={() => updateCoin(s)}>
                  <i className="fa fa-cog" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {s.expanded ? (
              <span className="less" onClick={() => fetchHistory(coins, s, false)}>
                <i className="fa fa-caret-up" aria-hidden="true"></i> Close &nbsp;
                {s.loading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}
              </span>
            ) : (
              <span className="more" onClick={() => fetchHistory(coins, s, true)}>
                <i className="fa fa-caret-down" aria-hidden="true"></i> Show more &nbsp;
                {s.loading && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}
              </span>
            )}
          </div>
        );
      }) : (
        <NoCoins/>
      );

    return (
      <div className={styles.mobile}>
        <div className={styles.sort}>
          {this.renderMobileSort()}
        </div>
        <div className={hasCoins ? styles.tbody : styles.noDataBody}>
          <div className="mobile-table">
            {$coinList}
          </div>
          {mobilePage.total_pages > 0 && (
            <div className={styles.pagination}>
              <Pagination
                onChange={(pageNo) => mobileGoToPage(coins, pageNo)}
                activePage={Number(mobilePage.offset / mobilePage.limit) + 1}
                totalPages={mobilePage.total_pages}/>
            </div>
          )}
          <Loader isOpen={status.loading}/>
        </div>
        <Modal
          title="Remove Coin"
          confirmButtonText="Remove"
          isOpen={removeStatus.progressing}
          onCancel={cancelRemove}
          onConfirm={() => {
            confirmRemove(coinToRemove.id, coins, mobilePage);
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
  coins: _.get(state, 'watchListBuying.data', []),
  updateStatus: state.watchList.update.status,
  coinToUpdate: state.watchList.update.coin,
  removeStatus: _.get(state, 'watchListBuying.remove.status', new Status()),
  coinToRemove: _.get(state, 'watchListBuying.remove.coin', new WatchCoin()),
  status: state.watchListBuying.status,
  mobilePage: _.get(state, 'watchListBuying.mobilePage'),
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  mode: state.manualTradingRobot.mode,
});

const mapDispatchToProps = {
  fetchWatchList,
  clearWatchList,
  updateCoin,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  fetchHistory,
  mobileGoToPage,
  doSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinsMobile);
