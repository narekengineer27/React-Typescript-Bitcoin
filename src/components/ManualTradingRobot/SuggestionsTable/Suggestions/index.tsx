import * as React from 'react';
import { connect } from 'react-redux';
import ReactIScroll from 'react-iscroll';
import * as iScroll from 'iscroll';
import WebSocket from 'Elements/WebSocket';
import * as _ from 'lodash';
import Button from 'Elements/Button';
import Price from 'Elements/Price';
import GlobalTooltipWrapper from 'Components/GlobalTooltipWrapper';
import { TableRow, TableCell } from 'Elements/Table';
import { ExchangeAccount } from 'Models/ExchangeAccount';
import { rate2ConvertBtc2Local } from 'Utils/math';
import { getUserCurrency } from 'Utils/auth';
import { updateSuggestions, clearSuggestions, updateLastSyncTime } from '../actions';
import { openBuy } from '../../BuySell/actions';
import { addCoin2WatchList } from '../../WatchList/actions';
import { getLodashSort } from 'Utils/string';

const styles = require('./suggestions.css');
const suggestionsStyles = require('../suggestions-table.css');
const env = require('Root/env.json');
const iScrollOptions = require('Constants/options.json').iScroll;

interface SuggestionsTableProps {
  activeExchangeAccount: ExchangeAccount;
  suggestions: object;
  sort: string;
  filter: string;

  openBuy?(): void;
}

class Suggestions extends React.Component<any, any> {

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

  renderSignalBar(per) {
    return (
      <div className={styles.signalWrapper}>
        <img className={styles.signal_bg} src="/public/assets/images/signal_bg.png"/>
        <div className={styles.signalBarWrapper} style={{width: per + '%',}}>
          <div className={styles.signalBar}>
            <img className={styles.signal} src="/public/assets/images/signal.png"/>
          </div>
        </div>
      </div>
    );
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
    } = this.props;

    const localCurrency = getUserCurrency();
    const rate2Local = rate2ConvertBtc2Local(btc2usd, currencyRates);
    const filteredSuggestions = _.values(suggestions).filter(s => (s.coin || '').toLowerCase().indexOf(filter) >= 0);

    const lodashSort = getLodashSort(sort);
    const sortedSuggestions = _.orderBy(filteredSuggestions, lodashSort[0], lodashSort[1]);
    const hasSuggestions = sortedSuggestions.length > 0;

    const $suggestionList = hasSuggestions ?
      sortedSuggestions.map((s, index) => {
        return (
          <TableRow key={index}>
            <TableCell className={styles.id}>{index + 1}</TableCell>
            <TableCell className={styles.coin}>{s.coin}</TableCell>
            <TableCell className={suggestionsStyles.target + ' ' + suggestionsStyles.cell}>
              <div>
                <div><Price diff={s.target_diff || 0}>{s.target} %</Price></div>
                <div>Score: <span className="blue"><Price>{s.exchange_trend_score} %</Price></span></div>
              </div>
            </TableCell>
            <TableCell className={suggestionsStyles['market-cap'] + ' ' + suggestionsStyles.cell}>
              <div>
                <div><Price diff={s.market_cap_diff}>{s.market_cap} $</Price></div>
                <div>Score: <span className="blue"><Price>{s.market_cap_score} %</Price></span></div>
              </div>
            </TableCell>
            <TableCell className={suggestionsStyles['btc-liquidity-bought'] + ' ' + suggestionsStyles.cell}>
              <GlobalTooltipWrapper
                className="full-width"
                text={(
                  <div>
                    <div className={styles.tooltipLine}>New: {s.new_mean_buy_time}</div>
                    <div className={styles.tooltipLine}>Mid: {s.mid_mean_buy_time}</div>
                    <div className={styles.tooltipLine}>Old: {s.old_mean_buy_time}</div>
                    <div>Rec.Entry Price: <Price>{s.recommended_entry_price}</Price></div>
                    <div>Quick Target: <Price>{Math.max(0, s.ati_percentage_difference)}</Price></div>
                  </div>
                )}>
                <div className="flex">
                  <div className={styles.liquidityValues}>
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
                  </div>
                  <div className="vertical-center">
                    <div>
                      Score:
                      <div className="blue">{s.btc_liquidity_score} %</div>
                    </div>
                  </div>
                </div>
              </GlobalTooltipWrapper>
            </TableCell>
            <TableCell className={suggestionsStyles['hr-impact'] + ' ' + suggestionsStyles.cell}>
              <Price
                diff={s['1hr_impact_diff']}
                prefix={`${s['1hr_impact_change_score'] || 0}% / `}>
                {s['1hr_impact']}
              </Price>
            </TableCell>
            <TableCell className={suggestionsStyles['overall-score'] + ' ' + suggestionsStyles.cell}>
              <Price diff={s.overall_score_diff}>
                {s.overall_score}%
              </Price>
            </TableCell>
            <TableCell className={suggestionsStyles.cell}>
              <div>
                <div><Price diff={s.gap_diff} arrowPosition="top">{s.gap} Ƀ</Price></div>
                <div><Price nDigitsAfterDot={2}>{rate2Local * s.gap} {localCurrency}</Price></div>
              </div>
            </TableCell>
            <TableCell className={suggestionsStyles.cell}>
              <div>
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
            </TableCell>
            <TableCell className={suggestionsStyles.cell}>
              <div>
                <Price diff={s.prr_diff}>{s.prr} %</Price>
                {this.renderSignalBar(60)}
              </div>
            </TableCell>
            <TableCell className={styles.actions}>
              <div className={'flex full-width'}>
                <Button
                  style={{ width: 90 }}
                  className="small blue"
                  onClick={() => openBuy(activeExchangeAccount.exchange_id, s.coin)}>
                  Start buy
                </Button>
                <Button
                  style={{ width: 72 }}
                  className="small white"
                  onClick={() => addCoin2WatchList(s)}
                >
                  Watch
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      }) : (
        <div className="no-data">
          There is currently no data here
        </div>
      );

    const hasScrollbar = sortedSuggestions.length > 5;
    const scrollableTable = hasScrollbar ? (
      <ReactIScroll
        iScroll={iScroll}
        options={iScrollOptions}
      >
        <div>
          {$suggestionList}
        </div>
      </ReactIScroll>
    ) : <div>{$suggestionList}</div>;

    let websocketUrl: string;
    // if (activeExchangeAccount && activeExchangeAccount.exchange_id) {
    //   websocketUrl = env.wsSuggestions + '/' + activeExchangeAccount.exchange_id.toLowerCase();
    // }
    websocketUrl = env.wsSuggestions + '/bittrex';

    return (
      <div
        className={(hasSuggestions ? styles.tbody : styles.noDataBody) + ' ' + (hasScrollbar ? '' : styles.noScrollbar)}>
        {websocketUrl && <WebSocket url={websocketUrl} onMessage={this.handleData.bind(this)}/>}
        {scrollableTable}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: _.get(state, 'suggestionsTable.filter', ''),
  sort: _.get(state, 'suggestionsTable.sort', ''),
  suggestions: _.get(state, 'suggestionsTable.suggestions', {}),
  activeExchangeAccount: _.get(state, 'exchangeAccountsDropdown.activeExchangeAccount.data', {}),
  btc2usd: _.get(state, 'manualTradingRobot.currencyConversion.btc2usd'),
  currencyRates: _.get(state, 'manualTradingRobot.currencyConversion.currencyRates'),
});

const mapDispatchToProps = {
  updateSuggestions,
  clearSuggestions,
  openBuy,
  updateLastSyncTime,
  addCoin2WatchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
