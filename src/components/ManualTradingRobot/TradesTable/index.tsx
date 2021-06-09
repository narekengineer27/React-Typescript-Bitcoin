import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { returntypeof } from 'Utils/type';
import { Meta } from 'Models/Meta';
import Button from 'Elements/Button';
import Pagination from 'Elements/Pagination';
import Modal from 'Elements/Modal';
import Loader from 'Elements/Loader';
import SortingIcons from 'Elements/SortingIcons';
import Price from 'Elements/Price';
import GlobalTooltipWrapper from 'Components/GlobalTooltipWrapper';
import { Table, TableRow, TableCell } from 'Elements/Table';
import TradeStatus from 'Elements/TradeStatus';
import TradeSuggestion from 'Elements/TradeSuggestion';
import Responsive from 'Partials/Responsive';
import TradesFiltersForm from './TradesFiltersForm';
import { tableDateTime } from 'Utils/moment';
import { updateSort } from 'Utils/string';
import { rate2ConvertBtc2Local } from 'Utils/math';
import { getUserCurrency } from 'Utils/auth';
import { openSell } from '../BuySell/actions';
import {
  fetchTrades,
  openDeleteTrade,
  confirmDeleteTrade,
  cancelDelete,
  confirmCancelTrade,
  cancelOrder,
  openCancelOrder,
  mobileShowLess,
  mobileShowMore
} from './actions';

const styles = require('./trades-table.css');

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
  label: 'Price bought',
  sortable: true,
}, {
  name: 'cpp',
  label: 'CPP',
  sortable: true,
}, {
  name: 'gap',
  label: 'GAP',
  sortable: true,
}, {
  name: 'profit',
  label: 'Profit',
  sortable: true,
}, {
  name: 'suggestion',
  label: 'Suggestion',
  sortable: true,
}, {
  name: 'status',
  label: 'Status',
  sortable: true,
}, {
  name: 'target_price',
  label: 'Target price',
  sortable: true,
}, {
  name: 'option_exit',
  label: 'Option exit',
  sortable: false,
}];

class TradesTable extends React.Component<TradesTableProps, any> {

  constructor(props:TradesTableProps) {
    super(props);
    this.state = {
      timer: null,
    };
  }

  componentDidMount() {
    const { meta: { sort } } = this.props;
    this.props.meta.sort = updateSort(sort, 'profit', true);
    this.refresh();
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.timer);
  }

  componentDidUpdate(prevProps:TradesTableProps) {
    const { filters, mode, status: { progressing, loading } } = this.props;
    if (!_.isEqual(prevProps.filters, filters) || !_.isEqual(prevProps.mode, mode)) {
      this.refresh();
    }
    if (prevProps.status.progressing !== progressing && !progressing) {
      this.setState({
        timer: setTimeout(() => {
          !loading && this.refresh(this.props.meta, true);
        }, 5000),
      });
    }
  }

  goToPage(activePage:number) {
    const { meta: { page } } = this.props;
    page.offset = (activePage - 1) * page.limit;
    this.refresh(this.props.meta);
  }

  refresh(meta:Meta = this.props.meta, silent:boolean = false) {
    const { filters, mode, trades } = this.props;
    meta.filter = filters;
    meta.mode = mode;
    meta.sort = filters.mobileSort ? filters.mobileSort : meta.sort;
    this.props.fetchTrades(meta, trades, silent);
  }

  sort(field:string, decreasing:boolean = false) {
    return () => {
      const { meta: { sort } } = this.props;
      this.props.meta.sort = updateSort(sort, field, decreasing);
      this.refresh(this.props.meta);
    };
  }

  renderMobileTable() {
    const {
      trades, btc2usd, currencyRates, mobileShowMore, mobileShowLess, status,
      openSell, openDeleteTrade,
    } = this.props;

    const localCurrency = getUserCurrency();
    const rate2Local = rate2ConvertBtc2Local(btc2usd, currencyRates);

    const $trades = trades.length > 0 ? trades.map((t, index) => {
      return (
        <div className="record" key={t.id + ' ' + index}>
          <div className="field">
            <div className="field-name">Date/Time</div>
            <div className="field-value">{tableDateTime(t.placed_at)}</div>
          </div>
          <div className="field">
            <div className="field-name">Pair</div>
            <div className="field-value">
              <div>{t.target_coin_id}</div>
              <div><strong>{t.exchange_account_name}</strong></div>
              <div className="blue">{(t.exchange_id || '').toUpperCase()}</div>
            </div>
          </div>
          {t.showMore && (
            <div>
              <div className="field">
                <div className="field-name">Quantity</div>
                <div className="field-value"><Price>{t.quantity}</Price></div>
              </div>
              <div className="field">
                <div className="field-name">Price Bought</div>
                <div className="field-value">
                  <div><Price>{t.price_bought} Ƀ</Price></div>
                  <div><Price nDigitsAfterDot={2}>{rate2Local * t.price_bought} {localCurrency}</Price></div>
                </div>
              </div>
              <div className="field">
                <div className="field-name">CPP</div>
                <div className="field-value">
                  <div><Price>{t.highest_bid}</Price></div>
                  <div><Price diff={t.cpp_diff || 0}>{t.cpp} Ƀ</Price></div>
                  <div><Price nDigitsAfterDot={2}>{rate2Local * t.cpp} {localCurrency}</Price></div>
                </div>
              </div>
              <div className="field">
                <div className="field-name">GAP</div>
                <div className="field-value">
                  <div><Price diff={t.gap_diff || 0}>{t.gap} Ƀ</Price></div>
                  <div><Price nDigitsAfterDot={2}>{rate2Local * t.gap} {localCurrency}</Price></div>
                </div>
              </div>
              <div className="field">
                <div className="field-name">Profit</div>
                <div className="field-value">
                  <div>
                    <GlobalTooltipWrapper text="BTC Fiat growth from Purchase">
                      <i className={`fa fa-flag ${styles.flag}`} aria-hidden="true"></i>
                    </GlobalTooltipWrapper>&nbsp;
                    {t.btc_price_local_currency === null ? 'N/A'
                      : `${t.btc_price_local_currency} ${t.local_currency}`} -&nbsp;
                    {t.current_btc_price_local_currency === null ? 'N/A'
                      : `${t.current_btc_price_local_currency} ${t.local_currency}`}
                  </div>
                  <div className="green">
                    <GlobalTooltipWrapper text="Btc profit on trade">
                      <i className={`fa fa-flag ${styles.flag}`} aria-hidden="true"></i>
                    </GlobalTooltipWrapper>&nbsp;
                    <Price diff={t.coin_growth || 0}>
                      {t.coin_growth === null ? 'N/A' : `${t.coin_growth} % ${t.target_coin_id}`}
                    </Price>
                  </div>
                  <div className="green">
                    <Price>{t.coin_profit_btc ? `${t.coin_profit_btc} Ƀ` : 'N/A'}</Price>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="field-name">Suggestion</div>
                <div className="field-value">
                  <TradeSuggestion suggestion={t.suggestion || ''}/>
                </div>
              </div>
              <div className="field">
                <div className="field-name">Status</div>
                <div className="field-value">
                  <TradeStatus status={t.status || ''}/>
                </div>
              </div>
              <div className="field">
                <div className="field-name">Target Price</div>
                <div className="field-value">
                  <div><Price>{t.target_price}</Price></div>
                  <div><Price nDigitsAfterDot={2}>{rate2Local * t.target_price} {localCurrency}</Price></div>
                </div>
              </div>
            </div>
          )}
          <div className="field">
            <div className="field-name">Option Exit</div>
            <div className="field-value">
              <div className={styles.leftButton}>
                {(t.status === 'Bought') &&
                <Button style={{ width: 100 }} className="small green" onClick={() => openSell(t)}>Sell</Button>}
                {(t.status === 'Buy-Order' || t.status === 'Sell-Order') &&
                <Button style={{ width: 100 }} className="small orange"
                        onClick={() => openDeleteTrade(t)}>Cancel</Button>}
              </div>
              <div>
                <Button style={{ width: 100 }} className="small red" onClick={() => openDeleteTrade(t)}>Delete</Button>
              </div>
            </div>
          </div>
          {t.showMore ? (
            <span className="less" onClick={() => mobileShowLess(trades, t)}>
              <i className="fa fa-caret-up" aria-hidden="true"></i> Close
            </span>
          ) : (
            <span className="more" onClick={() => mobileShowMore(trades, t)}>
              <i className="fa fa-caret-down" aria-hidden="true"></i> Show more
            </span>
          )}
        </div>
      );
    }) : (
      <div className="no-data">
        There is currently no data here
      </div>
    );
    return (
      <div className="mobile-table">
        {$trades}
        <Loader isOpen={status.loading}/>
      </div>
    );
  }

  render() {
    const {
      trades, status, meta, meta: { page }, mode,
      openSell, confirmCancelTrade, btc2usd, currencyRates,
      openDeleteTrade, confirmDeleteTrade, cancelDelete,
      deletedTrade, deleteStatus, openCancelOrder, cancelOrder,
      cancelledOrder, cancelStatus
    } = this.props;
    const localCurrency = getUserCurrency();
    const rate2Local = rate2ConvertBtc2Local(btc2usd, currencyRates);

    const primarySort = meta.sort.split(',')[0].trim().replace(/-/g, '');

    const onIncreasing = ((field:string) => {
      return this.sort(field);
    }).bind(this);
    const onDecreasing = ((field:string) => {
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
            <TableCell>
              <div>
                <div><Price>{s.price_bought} Ƀ</Price></div>
                <div><Price nDigitsAfterDot={2}>{rate2Local * s.price_bought} {localCurrency}</Price></div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div><Price>{s.highest_bid}</Price></div>
                <div><Price diff={s.cpp_diff || 0}>{s.cpp} Ƀ</Price></div>
                <div><Price nDigitsAfterDot={2}>{rate2Local * s.cpp} {localCurrency}</Price></div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div><Price diff={s.gap_diff || 0}>{s.gap} Ƀ</Price></div>
                <div><Price nDigitsAfterDot={2}>{rate2Local * s.gap} {localCurrency}</Price></div>
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
            <TableCell className={styles.suggestion}><TradeSuggestion suggestion={s.suggestion || ''}/></TableCell>
            <TableCell className={styles.status}><TradeStatus status={s.status || ''}/></TableCell>
            <TableCell>
              <div>
                <div><Price>{s.target_price}</Price></div>
                <div><Price nDigitsAfterDot={2}>{rate2Local * s.target_price} {localCurrency}</Price></div>
              </div>
            </TableCell>
            <TableCell className={styles.option_exit}>
              <div className="flex full-width">
                <div className={styles.leftButton}>
                  {(s.status === 'Bought') &&
                  <Button style={{ width: 73 }} className="small green" onClick={() => openSell(s)}>Sell</Button>}
                  {(s.status === 'Buy-Order' || s.status === 'Sell-Order') &&
                  <Button style={{ width: 73 }} className="small orange"
                          onClick={() => openCancelOrder(s)}>Cancel</Button>}
                </div>
                <div>
                  <Button style={{ width: 73 }} className="small red"
                          onClick={() => openDeleteTrade(s)}>
                    Delete
                  </Button>
                </div>
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
        <TradesFiltersForm/>
        <div className={styles.records}>
          <Responsive name="widerDesktop">
            <Loader isOpen={status.loading} topShift={37}/>
            <Table id={styles.tradesTable}>
              <TableRow>
                {$fields}
              </TableRow>
              {$tradesList}
            </Table>
          </Responsive>
          <Responsive name="mobile">
            {this.renderMobileTable()}
          </Responsive>
          <div className={styles.pagination}>
            {page.total_pages > 1 &&
            <Pagination
              onChange={this.goToPage.bind(this)}
              activePage={Number(page.offset / page.limit) + 1}
              totalPages={page.total_pages}/>}
          </div>
          <Modal
            isOpen={deleteStatus.progressing}
            title="Delete Trade"
            confirmButtonText="Confirm"
            cancelButtonText="Cancel"
            onConfirm={() => confirmDeleteTrade(deletedTrade.id)}
            onCancel={cancelDelete}
            buttonStyle={{ width: 150 }}
            buttonClassName="medium red"
            buttonLoading={deleteStatus.loading}
          >
            <div className={styles.headerTitle}>
              Are you sure you want to delete the trade?
            </div>
          </Modal>

          <Modal
            isOpen={cancelStatus.progressing}
            title="Cancel Order"
            confirmButtonText="Confirm"
            cancelButtonText="Cancel"
            onConfirm= {() => confirmCancelTrade(cancelledOrder, mode)}
            onCancel={cancelOrder}
            buttonStyle={{ width: 150 }}
            buttonClassName="medium red"
            buttonLoading={cancelStatus.loading}
          >
            <div className={styles.headerTitle}>
              Are you sure you want to cancel the order?
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trades: state.tradesTable.data,
  meta: state.tradesTable.meta,
  status: state.tradesTable.status,
  filters: _.get(state, 'form.tradesTableFilter.values', []),
  mode: state.manualTradingRobot.mode,
  btc2usd: _.get(state, 'manualTradingRobot.currencyConversion.btc2usd'),
  currencyRates: _.get(state, 'manualTradingRobot.currencyConversion.currencyRates'),
  deletedTrade: state.tradesTable.deletedTrade,
  deleteStatus: state.tradesTable.deleteStatus,
  cancelStatus: state.tradesTable.cancelStatus,
  cancelledOrder: state.tradesTable.cancelledOrder,
});

const mapDispatchToProps = {
  fetchTrades,
  confirmCancelTrade,
  cancelOrder,
  openCancelOrder,
  openDeleteTrade,
  confirmDeleteTrade,
  cancelDelete,
  openSell,
  mobileShowMore,
  mobileShowLess,
};

const stateProps = returntypeof(mapStateToProps);
type TradesTableProps = typeof mapDispatchToProps & typeof stateProps;

export default connect(mapStateToProps, mapDispatchToProps)(TradesTable);
