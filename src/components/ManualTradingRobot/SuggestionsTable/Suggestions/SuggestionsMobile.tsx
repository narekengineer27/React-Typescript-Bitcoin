import * as React from 'react';
import { connect } from 'react-redux';
import WebSocket from 'Elements/WebSocket';
import * as _ from 'lodash';
import Button from 'Elements/Button';
import Price from 'Elements/Price';
import Pagination from 'Elements/Pagination';
import Dropdown from 'Elements/Dropdown';
import { ExchangeAccount } from 'Models/ExchangeAccount';
import { rate2ConvertBtc2Local } from 'Utils/math';
import { getUserCurrency } from 'Utils/auth';
import { openBuy } from '../../BuySell/actions';
import { addCoin2WatchList } from '../../WatchList/actions';
import { getLodashSort, updateSort } from 'Utils/string';
import {
  updateSuggestions,
  clearSuggestions,
  updateLastSyncTime,
  mobileShowLess,
  mobileShowMore,
  mobileGoToPage,
  mobileToggleSort,
  doFilter,
  doSort,
} from '../actions';

const styles = require('./suggestions.css');
const env = require('Root/env.json');

interface SuggestionsTableProps {
  activeExchangeAccount: ExchangeAccount;
  suggestions: object;
  sort: string;
  filter: string;

  openBuy?(): void;
}

class SuggestionsMobile extends React.Component<any, any> {

  public static defaultProps: SuggestionsTableProps = {
    activeExchangeAccount: {},
    suggestions: {},
    sort: '',
    filter: '',
    openBuy: () => {
    },
  };

  componentDidUpdate(prevProps: SuggestionsTableProps) {
    const previousAccount = prevProps.activeExchangeAccount;
    const currentAccount = this.props.activeExchangeAccount;

    // Clear suggestions only if the exchange_id has changed
    if (!previousAccount && currentAccount || previousAccount && !currentAccount ||
      previousAccount.exchange_id !== currentAccount.exchange_id) {
      this.props.clearSuggestions();
    }
  }

  handleData(data: string) {
    const { suggestions, updateLastSyncTime, updateSuggestions } = this.props;
    try {
      window.setTimeout(() => {
        const timeAndDate = JSON.parse(data);
        updateLastSyncTime(timeAndDate.time);
        updateSuggestions(timeAndDate.data, suggestions);
      });
    } catch (e) {
    }
  }

  onChangeCoinFilter(e) {
    this.props.doFilter(e.target.value);
  }

  sort(field: string, decreasing: boolean = false) {
    this.props.doSort(updateSort(this.props.sort, field, decreasing));
  }

  renderMobileSort() {
    const { mobileSortVisible } = this.props;
    const onSort = (menu) => {
      this.sort(menu.value.replace('-', ''), menu.value.indexOf('-') === 0);
    };

    return mobileSortVisible ? (
      <div className={styles.mobileSort}>
        <Dropdown
          onChange={onSort}
          className="medium"
          menus={[{
            label: 'Sort by',
            value: '',
          }, {
            label: 'By Coin ascending',
            value: 'coin',
          }, {
            label: 'By Coin descending',
            value: '-coin',
          }, {
            label: 'By Exchange Trend ascending',
            value: 'target',
          }, {
            label: 'By Exchange Trend descending',
            value: '-target',
          }, {
            label: 'By Market Cap ascending',
            value: 'market_cap',
          }, {
            label: 'By Market Cap descending',
            value: '-market_cap',
          }, {
            label: 'By Liquidity ascending',
            value: 'liquidity',
          }, {
            label: 'By Liquidity descending',
            value: '-liquidity',
          }, {
            label: 'By 1hr Impact ascending',
            value: '1hr_impact',
          }, {
            label: 'By 1hr Impact descending',
            value: '-1hr_impact',
          }, {
            label: 'By Overall Score ascending',
            value: 'overall_score',
          }, {
            label: 'By Overall Score descending',
            value: '-overall_score',
          }, {
            label: 'By GAP ascending',
            value: 'gap',
          }, {
            label: 'By GAP descending',
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

  render() {
    const {
      suggestions,
      openBuy,
      addCoin2WatchList,
      activeExchangeAccount,
      filter,
      sort,
      btc2usd,
      currencyRates,
      mobileShowLess,
      mobileShowMore,
      mobilePage,
      mobileGoToPage,
      mobileSortVisible,
      mobileToggleSort,
    } = this.props;

    const localCurrency = getUserCurrency();
    const rate2Local = rate2ConvertBtc2Local(btc2usd, currencyRates);
    const filteredSuggestions = _.values(suggestions).filter(s => (s.coin || '').toLowerCase().indexOf(filter) >= 0);

    const lodashSort = getLodashSort(sort);
    const sortedSuggestions = _.orderBy(filteredSuggestions, lodashSort[0], lodashSort[1]);
    const hasSuggestions = sortedSuggestions.length > 0;
    const pagedSuggestions = sortedSuggestions.slice(
      mobilePage.offset,
      Math.min(sortedSuggestions.length, mobilePage.offset + mobilePage.limit));

    const $suggestionList = hasSuggestions ?
      pagedSuggestions.map((s, index) => {
        return (
          <div key={index} className="record">
            <div className="field">
              <div className="field-name">Coin</div>
              <div className="field-value">{s.coin}</div>
            </div>
            {s.showMore && (
              <div>
                <div className={styles.ratio}>
                  FRUGALITY RATIO PARAMETER
                </div>
                <div className="field">
                  <div className="field-name">Exchange Trend (%)</div>
                  <div className="field-value">
                    <div><Price diff={s.target_diff || 0}>{s.target} %</Price></div>
                    <div>Score: <span className="blue"><Price>{s.exchange_trend_score} %</Price></span></div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Market Cap ($)</div>
                  <div className="field-value">
                    <div><Price diff={s.market_cap_diff}>{s.market_cap} $</Price></div>
                    <div>Score: <span className="blue"><Price>{s.market_cap_score} %</Price></span></div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Liquidity (/hr)</div>
                  <div className="field-value">
                    <div><Price diff={s.btc_liquidity_bought_diff}>B: {s.btc_liquidity_bought} Ƀ</Price></div>
                    <div>
                      <Price diff={s['1hr_btc_bought_up_count']} arrowPosition="left" arrowDirection="up">
                        {s['1hr_btc_bought_up_count']}
                      </Price>&nbsp;&nbsp;
                      <Price diff={0 - s['1hr_btc_bought_down_count']} arrowPosition="left" arrowDirection="down">
                        {s['1hr_btc_bought_down_count']}
                      </Price>
                    </div>
                    <div><Price diff={s.btc_liquidity_sold_diff}>S: {s.btc_liquidity_sold} Ƀ</Price></div>
                    <div>
                      <Price diff={s['1hr_btc_sold_up_count']} arrowPosition="left" arrowDirection="up">
                        {s['1hr_btc_sold_up_count']}
                      </Price>&nbsp;&nbsp;
                      <Price diff={0 - s['1hr_btc_sold_down_count']} arrowPosition="left" arrowDirection="down">
                        {s['1hr_btc_sold_down_count']}
                      </Price>
                    </div>
                    <div>
                      Score: <span className="blue">{s.btc_liquidity_score} %</span>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">1hr Impact (%)</div>
                  <div className="field-value">
                    <Price diff={s['1hr_impact_diff']}
                           prefix={`${s['1hr_impact_change_score'] || 0}% / `}>
                      {s['1hr_impact']}
                    </Price>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Overall Score</div>
                  <div className="field-value">
                    <Price diff={s.overall_score_diff}>
                      {s.overall_score} %
                    </Price>
                  </div>
                </div>
                <div className={styles.ratio}>
                  PRICE RELATIVITY RATIO
                </div>
                <div className="field">
                  <div className="field-name">GAP</div>
                  <div className="field-value">
                    <div><Price diff={s.gap_diff}>{s.gap} Ƀ</Price></div>
                    <div><Price nDigitsAfterDot={2}>{rate2Local * s.gap} {localCurrency}</Price></div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">CPP</div>
                  <div className="field-value">
                    <div><Price arrowPosition="top">{s.cpp} Ƀ</Price></div>
                    <div><Price nDigitsAfterDot={2}>{rate2Local * s.cpp} {localCurrency}</Price></div>
                    <div>
                      <Price diff={s['1hr_cpp_up_count']} arrowPosition="left" arrowDirection="up">
                        {s['1hr_cpp_up_count']}
                      </Price>&nbsp;&nbsp;
                      <Price diff={0 - s['1hr_cpp_down_count']} arrowPosition="left" arrowDirection="down">
                        {s['1hr_cpp_down_count']}
                      </Price>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">PRR (%)</div>
                  <div className="field-value"><Price diff={s.prr_diff}>{s.prr} %</Price></div>
                </div>
              </div>
            )}
            <div className="field">
              <div className="field-name">Action</div>
              <div className="field-value">
                <Button
                  className="small blue"
                  style={{ width: 100 }}
                  onClick={() => openBuy(activeExchangeAccount.exchange_id, s.coin)}>
                  Start buy
                </Button>
                <div className={styles.btn}>
                  <Button
                    className="small white"
                    style={{ width: 100 }}
                    onClick={() => addCoin2WatchList(s)}
                  >
                    Watch
                  </Button>
                </div>
              </div>
            </div>
            {s.showMore ? (
              <span className="less" onClick={() => mobileShowLess(suggestions, s)}>
                <i className="fa fa-caret-up" aria-hidden="true"></i> Close
              </span>
            ) : (
              <span className="more" onClick={() => mobileShowMore(suggestions, s)}>
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

    let websocketUrl: string;
    if (activeExchangeAccount && activeExchangeAccount.exchange_id) {
      websocketUrl = env.wsSuggestions + '/' + activeExchangeAccount.exchange_id.toLowerCase();
    }

    return (
      <div className={hasSuggestions ? styles.tbody : styles.noDataBody}>
        {websocketUrl && <WebSocket url={websocketUrl} onMessage={this.handleData.bind(this)}/>}
        <div className={styles.mobileFilters}>
          <div className={styles.mobileFilterHolder}>
            <input
              className="full-width"
              type="text"
              placeholder="Search Coins"
              value={filter}
              onChange={this.onChangeCoinFilter.bind(this)}
            />
          </div>
          <Button
            onClick={mobileToggleSort}
            className={'medium white gray-text ' + (mobileSortVisible ? 'dark' : '')}
            style={{ width: '40%' }}>
            <i className="fa fa-sort" aria-hidden="true"></i> Sort
          </Button>
        </div>
        {this.renderMobileSort()}
        <div className={styles.table + ' mobile-table'}>
          {$suggestionList}
        </div>
        {mobilePage.total_pages > 0 && (
          <div className={styles.pagination}>
            <Pagination
              onChange={(pageNo) => mobileGoToPage(suggestions, pageNo)}
              activePage={Number(mobilePage.offset / mobilePage.limit) + 1}
              totalPages={mobilePage.total_pages}/>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: _.get(state, 'suggestionsTable.filter', ''),
  sort: _.get(state, 'suggestionsTable.sort', ''),
  mobileSortVisible: _.get(state, 'suggestionsTable.mobileSortVisible', false),
  suggestions: _.get(state, 'suggestionsTable.suggestions', {}),
  activeExchangeAccount: _.get(state, 'exchangeAccountsDropdown.activeExchangeAccount.data', {}),
  btc2usd: _.get(state, 'manualTradingRobot.currencyConversion.btc2usd'),
  currencyRates: _.get(state, 'manualTradingRobot.currencyConversion.currencyRates'),
  mobilePage: _.get(state, 'suggestionsTable.mobilePage'),
});

const mapDispatchToProps = {
  updateSuggestions,
  clearSuggestions,
  openBuy,
  updateLastSyncTime,
  addCoin2WatchList,
  mobileShowLess,
  mobileShowMore,
  mobileGoToPage,
  mobileToggleSort,
  doFilter,
  doSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsMobile);
