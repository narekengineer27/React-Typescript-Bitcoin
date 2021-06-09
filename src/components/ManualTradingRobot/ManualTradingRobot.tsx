import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import ButtonGroup from 'Elements/ButtonGroup';
import ToggleField from 'Elements/ToggleField';
import SuggestionsTable from './SuggestionsTable';
import TradesTable from './TradesTable';
import Price from 'Elements/Price';
import WatchList from './WatchList';
import Responsive from 'Partials/Responsive';
import ExchangeAccountsDropdown from 'Partials/ExchangeAccountsDropdown';
import { boards } from './types';
import { history } from 'Components/Routes';
import { fetchTotal, loadCurrencyRates, setMode, } from './actions';
import SetupBoard from './SetupBoard';
import { UserPackage } from 'Models/UserPackage';
import AddAccountBoard from './AddAccountBoard';
import { getCurrentUser } from 'Utils/auth';
import { loadUserPackage } from 'Components/MyAccount/PlatformFeatures/actions';
import { fetchExchanges } from 'Partials/ExchangeAccountsDropdown/actions';

const styles = require('./manual-trading-robot.css');

class ManualTradingRobot extends React.Component<any, any> {

  componentDidMount() {
    this.props.loadCurrencyRates();
  }

  componentWillMount() {
    this.props.loadUserPackage();
    this.props.fetchExchanges();
  }

  componentWillUpdate(nextProps) {
    const { mode, fetchTotal, activeExchangeAccount } = this.props;
    
    if (nextProps.activeExchangeAccount !== activeExchangeAccount || nextProps.mode !== mode) {
      const { activeExchangeAccount } = nextProps;
      if (activeExchangeAccount && activeExchangeAccount.id) {
        fetchTotal(activeExchangeAccount.id, nextProps.mode);
      }
    }
  }

  changeMode(e: any) {
    const mode = e.target.checked ? 'test' : 'active';
    this.props.setMode(mode);
  }

  goToCMBSettings() {
    history.push('/my-account/cmb-settings/entry');
  }

  trimTotalNumber(n: number = 0, currency: string = '', styleClass: string = '') {
    const { totalStatus } = this.props;
    let $price = <Price nDigitsAfterDot={2}>{n}</Price>;
    if (currency === 'BTC') {
      $price = <Price>{n}</Price>;
    }
    if (totalStatus.loading) {
      return <dd className={styleClass}>loading ...</dd>;
    } else if (typeof n === 'object') {
      // This happens if the BE service returns an error object instead of a value
      // Maybe the error could be reported?
      return <dd className={styleClass}>&mdash;</dd>;
    }
    return <dd className={styleClass}>{$price} {currency}</dd>;
  }

  render() {
    const { lastSyncTime, total, mode, match, userPackage, exchangeAccounts } = this.props;
    const board = _.get(match, 'params.board', 'monitor');
    const type = _.get(match, 'params.type', 'buying');
    let activeMenuIndex = Math.max(boards.findIndex(b => b.value === board), 0);

    let $board: JSX.Element;
    if (!userPackage.status.success || (!exchangeAccounts.status.success && exchangeAccounts.firstLoad)) {
      $board = <div className={styles.emptyBoard}/>;
    } else {
      $board = this.getOnboardingBoard();
      // $board = null;

      if (!$board) {
        // No on-boarding, then normal boards will show
        if (board === 'watchlist') {
          $board = (
            <div className={styles.mainPanel}>
              <WatchList type={type}/>
            </div>
          );
        } else {
          $board = (
            <div className={styles.mainPanel}>
              <div className={styles.tableHolder}>
                <div className={styles.totals}>
                  <div className={styles.profits}>
                    <dl className={styles.profit}>
                      <dt className={styles.type}>Total profit</dt>
                      {this.trimTotalNumber(total.total_profit, total.total_profit_currency, styles.totalProfit)}
                    </dl>
                    <dl className={styles.profit}>
                      <dt className={styles.type}>Total profit flat value</dt>
                      {this.trimTotalNumber(total.total_flat, total.total_flat_currency, styles.profitFlatValue)}
                    </dl>
                    <dl className={styles.profit}>
                      <dt className={styles.type}>Committed profit</dt>
                      {this.trimTotalNumber(
                        total.realized_profit, total.realized_profit_currency, styles.profitRealized)}
                    </dl>
                    <dl className={styles.profit}>
                      <dt className={styles.type}>Committed profit flat value</dt>
                      {this.trimTotalNumber(total.realized_flat, total.realized_flat_currency, styles.totalFlatValue)}
                    </dl>
                    <dl className={styles.profit}>
                      <dt className={styles.type}>Total capital</dt>
                      {this.trimTotalNumber(total.total_capital, total.total_capital_currency, styles.totalCapital)}
                    </dl>
                    <Responsive name="phone">
                      <dl className={styles.profit}>
                        <dt className={styles.type}>Last sync</dt>
                        <dd className={styles.lastSyncTime}>
                          {lastSyncTime}
                        </dd>
                      </dl>
                    </Responsive>
                  </div>
                  <Responsive name="desktop">
                    <div className={styles.lastSyncLabel}>Last sync</div>
                    <div className={styles.lastSyncTime}>{lastSyncTime}</div>
                  </Responsive>
                </div>
                <SuggestionsTable/>
              </div>
              <div className={styles.tradesTableWrapper}>
                <TradesTable/>
              </div>
            </div>
          );
        }
      }
    }

    return (
      <div className={`container-fluid ` + styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.exchanges}>
            <ExchangeAccountsDropdown/>
          </div>
          <div className={styles.boards}>
            <ButtonGroup
              className="medium"
              activeIndex={activeMenuIndex}
              buttons={boards}
            />
          </div>
          <div className={styles.settings}>
            <div className={styles.mode + ' vertical-center'}>
              <ToggleField
                onChange={this.changeMode.bind(this)}
                label="Test Mode"
                checked={mode === 'test'}
              />
            </div>
            <div className={styles.configurations} onClick={this.goToCMBSettings.bind(this)}>
              <i className="fa fa-cog" aria-hidden="true"/>
            </div>
          </div>
        </div>
        {$board}
      </div>
    );
  }

  getOnboardingBoard(): JSX.Element {
    let { userPackage, mode, activeExchangeAccount, exchangeAccounts } = this.props;

    if (getCurrentUser().is_dev) {
      // No onboarding for devs
      return null;
    }

    const pack = userPackage.data as UserPackage;
    if (mode === 'test') {
      if (!pack.test_enabled || pack.test_expired) {
        // No test package - setup
        return <SetupBoard/>;
      } else if (exchangeAccounts.data.length === 0) {
        // Test package, but no accounts - add account
        return <AddAccountBoard/>;
      }
    } else {
      const allActive = pack.all_live_enabled && !pack.all_expired;
      const anyActive = pack.exchanges && !!pack.exchanges.find(item => item.live_enabled && !item.live_expired);

      if (!allActive && !anyActive) {
        // No active package - setup
        return <SetupBoard/>;
      }

      if (exchangeAccounts.data.length === 0) {
          // Active packages, but no account - add account
          return <AddAccountBoard/>;
      }

      if (allActive) {
        return null;
      }

      if (!activeExchangeAccount) {
        activeExchangeAccount = exchangeAccounts.data[0];
      }

      const activeExchange = activeExchangeAccount.exchange_id;
      const exchangePack = pack.exchanges.find(item => item.exchange === activeExchange);
      if (!exchangePack || !exchangePack.live_enabled || exchangePack.live_expired) {

        // Currently selected account is not active - setup
        return <SetupBoard/>;
      }
    }
    return null;
  }

}

const mapStateToProps = state => ({
  lastSyncTime: state.suggestionsTable.lastSyncTime,
  total: state.manualTradingRobot.total.data,
  totalStatus: state.manualTradingRobot.total.status,
  board: state.manualTradingRobot.board,
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  exchangeAccounts: state.exchangeAccountsDropdown.exchangeAccounts,
  mode: state.manualTradingRobot.mode,
  userPackage: state.platformFeatures.userPackage,
});

const mapDispatchToProps = {
  setMode,
  fetchTotal,
  loadCurrencyRates,
  loadUserPackage,
  fetchExchanges
};

export default connect(mapStateToProps, mapDispatchToProps)(ManualTradingRobot);
