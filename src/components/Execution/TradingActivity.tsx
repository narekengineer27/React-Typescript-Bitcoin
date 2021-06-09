import * as React from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import Modal from "Elements/Modal";
import { Meta } from "Models/Meta";
import Button from 'Elements/Button';
import SortingIcons from "Elements/SortingIcons";
import { Table, TableRow, TableCell } from "Elements/Table";
import GlobalTooltipWrapper from "Components/GlobalTooltipWrapper";
import TradeStatus from "Elements/TradeStatus";
import Price from "Elements/Price";
import { tableDateTime } from "Utils/moment";
import { rate2ConvertBtc2Local } from "Utils/math";
import { updateSort } from 'Utils/string';
import { getUserCurrency } from "Utils/auth";
import ShareRobotActivity from './ShareRobotActivity';
import { round } from 'Utils/math';
import { loadCurrencyRates } from "Components/ManualTradingRobot/actions";
import { cancelActivity, fetchTrades, openShare, updateLastSyncTime, } from "./actions";

const styles = require('./trading-activity.css');

const fields = [{
  name: 'created_at',
  label: 'Date/Time',
  sortable: true,
}, {
  name: 'pair',
  label: 'Pair',
  sortable: false,
}, {
  name: 'quantity',
  label: 'Quantity',
  sortable: true,
}, {
  name: 'price_bought',
  label: 'Bought/ Sold Price',
  sortable: true,
}, {
  name: 'profit',
  label: 'Profit',
  sortable: true,
}, {
  name: 'status',
  label: 'Status',
  sortable: true,
}, {
  name: 'target_price',
  label: 'Target price',
  sortable: true,
}];

class TradingActivity extends React.Component <any, any> {

  timer: any;

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    const { meta: { sort } } = this.props;
    this.props.meta.sort = updateSort(sort, 'profit', true);
    this.props.loadCurrencyRates();
    this.props.updateLastSyncTime();
    this.refresh();
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
    this.timer = null;
  }

  componentWillReceiveProps(nextProps: any) {
    const { lastSyncTime } = this.props;

    if (nextProps.activityStatus.progressing === false) {
      window.clearTimeout(this.timer);
      this.timer = null;
      return;
    }

    if (nextProps.lastSyncTime !== lastSyncTime) {
      this.timer = setTimeout(() => {
        this.refresh(this.props.meta, true);
      }, 5000);
    }
  }

  sort(field: string, decreasing: boolean = false) {
    return () => {
      // const { meta: { sort } } = this.props;
      // this.props.meta.sort = updateSort(sort, field, decreasing);
      // this.refresh(this.props.meta);
    };
  }

  refresh(meta: Meta = this.props.meta, silent: boolean = false) {
    const { trades, meta: { sort }, activeExchangeAccount } = this.props;
    meta.sort = sort;
    this.props.fetchTrades(activeExchangeAccount.id, meta, trades, silent);
  }

  renderCycles(trades) {
    const {
      meta = new Meta(), btc2usd, currencyRates,
    } = this.props;
    const localCurrency = getUserCurrency();
    const rate2Local = rate2ConvertBtc2Local(btc2usd, currencyRates);

    const primarySort = meta.sort.split(',')[0].trim().replace(/-/g, '');

    const onIncreasing = ((field: string) => {
      return this.sort(field);
    }).bind(this);
    const onDecreasing = ((field: string) => {
      return this.sort(field, true);
    }).bind(this);

    const $fields = fields.map(field => {
      return (
        <TableCell header key={field.name} className={styles[field.name]}>
          <div className="flex full-width">{field.label}
            <div className="vertical-center">
              {field.sortable && <SortingIcons
                primary={primarySort === field.name}
                onIncreasing={onIncreasing(field.name)}
                onDecreasing={onDecreasing(field.name)}
              />}
            </div>
          </div>
        </TableCell>
      );
    });

    const $tradesList = trades.length > 0 ?
      trades.map((s, index) => {
        return (
          <TableRow key={'row' + index}>
            <TableCell className={styles.created_at}>
              <div>
                {tableDateTime(s.placed_at).split(' ').map(v => (<div key={v}>{v}</div>))}
              </div>
            </TableCell>
            <TableCell className={styles.pair}>
              <div>
                <div>{s.target_coin_id}</div>
                <div><strong>{s.exchange_account_name}</strong></div>
                <div className="blue">{(s.exchange_id || '').toUpperCase()}</div>
              </div>
            </TableCell>
            <TableCell><Price>{s.quantity}</Price></TableCell>
            <TableCell className={styles.price_bought}>
              <div className="flex full-width">
                <div className={styles.bought}>
                  <div><Price>{s.price_bought} Ƀ</Price></div>
                  <div><Price nDigitsAfterDot={2}>{rate2Local * s.price_bought} {localCurrency}</Price></div>
                </div>
                <div className={styles.sold}>
                  <div><Price>{s.price_sold} Ƀ</Price></div>
                  <div><Price nDigitsAfterDot={2}>{rate2Local * s.price_sold} {localCurrency}</Price></div>
                </div>
              </div>
            </TableCell>

            <TableCell className={styles.profit}>
              <div className="full-width">
                <div className={styles.topNumbers}>
                  <GlobalTooltipWrapper text="BTC Fiat growth from Purchase">
                    <i className={`fa fa-flag ${styles.flag}`} aria-hidden="true"></i>
                  </GlobalTooltipWrapper>&nbsp;
                  {s.btc_price_local_currency === null ? 'N/A'
                    : `${s.btc_price_local_currency} ${s.local_currency}`} -&nbsp;
                  {s.current_btc_price_local_currency === null ? 'N/A'
                    : `${s.current_btc_price_local_currency} ${s.local_currency}`}
                </div>
                <div className="flex">
                  <div className={styles.profitsLeft}>
                    {/*<div className="orange">
                     <GlobalTooltipWrapper text="Fiat growth percentage due to BTC growth">
                     <i className={`fa fa-flag ${styles.flag}`} aria-hidden="true"></i>
                     </GlobalTooltipWrapper>&nbsp;
                     <Price nDigitsAfterDot={2} diff={s.btc_growth_diff || 0}>
                     {s.btc_growth === null ? 'N/A' : `${s.btc_growth} % B`}
                     </Price>
                     </div>*/}
                    <div>
                      <GlobalTooltipWrapper text="Btc profit on trade">
                        <i className={`fa fa-flag ${styles.flag}`} aria-hidden="true"></i>
                      </GlobalTooltipWrapper>&nbsp;
                      <Price diff={s.coin_growth || 0}>
                        {s.coin_growth === null ? 'N/A' : `${s.coin_growth} % ${s.target_coin_id}`}
                      </Price>
                    </div>
                  </div>
                  <div className={styles.profitsRight}>
                    {/*<div>
                     <Price nDigitsAfterDot={2}>
                     {s.cumulative_profit_local_currency === null
                     ? 'N/A' : `${s.cumulative_profit_local_currency} ${s.local_currency}`}
                     </Price>
                     </div>*/}
                    <div>
                      <Price>{s.coin_profit_btc ? `${s.coin_profit_btc} Ƀ` : 'N/A'}</Price>
                    </div>
                  </div>
                </div>
              </div>
            </TableCell>

            <TableCell className={styles.status}><TradeStatus status={s.status || ''}/></TableCell>
            <TableCell>
              <div>
                <div><Price>{s.target_price}</Price></div>
                <div><Price nDigitsAfterDot={2}>{rate2Local * s.target_price} {localCurrency}</Price></div>
              </div>
            </TableCell>
          </TableRow>
        );
      }) : (
        <div className="no-data">
          There is currently no data here
        </div>
      );

    return (
      <div>
        <div className={styles.records}>
          <Table id={styles.tradesTable}>
            <TableRow>
              {$fields}
            </TableRow>
            {$tradesList}
          </Table>
        </div>
      </div>
    );
  }

  render() {
    const {
      activityStatus,
      cancelActivity,
      trades,
      openShare,
      totalProfit,
      totalProfitInBtc,
    } = this.props;
    let localCurrency = 'USD';
    return (
      <Modal
        loading={activityStatus.loading}
        title="Robot Trading Activity"
        width={1100}
        noFooter
        onCancel={cancelActivity}
        isOpen={activityStatus.progressing}
      >
        <div className={styles.wrapper}>
          {trades.map((t, index) => {
            const nExits = t.filter(trade => trade.status === 'Sold').length;
            const nEntries = t.filter(trade => trade.status.toLowerCase() !== 'buy-order').length;
            localCurrency = t.length > 0 ? t[0].local_currency : 'USD';
            let cycleProfit = 0;
            t.filter(trade => trade.status.toLowerCase() === 'sold').forEach(trade => {
              cycleProfit += +trade.cumulative_profit_local_currency;
            });
            return (
              <div key={index}>
                <div className={styles.header}>
                  <div className={styles.cycle}>
                    <div className={styles.cycleIcon}>{index + 1}</div>
                    <div className={styles.cycleTitle}>cycle</div>
                  </div>
                  <div className={styles.boughtAndProfit}>
                    <span className={styles.amount}> {nExits} </span> Exits of
                    <span className={styles.amount}> {nEntries} </span> Entries
                    &nbsp;/&nbsp;
                    <span className={styles.amount}> {round(cycleProfit)} {localCurrency} </span>
                    of Profit earned
                  </div>
                </div>
                <div className={styles.tradesDetails}>
                  {this.renderCycles(t)}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.tradingActivityBottom}>
          <div className={styles.totalProfit}>
            <span>Total Profit for this round:</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.usd}>{round(totalProfit)} {localCurrency}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.btc}>{round(totalProfitInBtc)} BTC</span>
          </div>
          <div>
            <Button
              className={'medium blue ' + styles.shareButton}
              onClick={openShare}>
              SHARE RESULT
            </Button>
          </div>
        </div>
        <ShareRobotActivity></ShareRobotActivity>
      </Modal>

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  activityStatus: state.execution.activity.status,
  trades: state.execution.activity.trades,
  btc2usd: _.get(state, 'manualTradingRobot.currencyConversion.btc2usd'),
  currencyRates: _.get(state, 'manualTradingRobot.currencyConversion.currencyRates'),
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  totalProfit: state.execution.activity.totalProfit,
  totalProfitInBtc: state.execution.activity.totalProfitInBtc,
  meta: state.execution.activity.meta,
  lastSyncTime: state.execution.activity.lastSyncTime,
  ...ownProps,
});

const mapDispatchToProps = {
  cancelActivity,
  fetchTrades,
  loadCurrencyRates,
  openShare,
  updateLastSyncTime,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradingActivity);
