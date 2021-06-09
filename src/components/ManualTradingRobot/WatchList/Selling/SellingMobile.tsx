import * as React from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import Button from "Elements/Button";
import Price from "Elements/Price";
import ToggleField from "Elements/ToggleField";
import Modal from "Elements/Modal";
import Loader from "Elements/Loader";
import Pagination from "Elements/Pagination";
import ExitStrategy from "Components/ExitStrategy";
import Dropdown from "Elements/Dropdown";
import { getLodashSort, updateSort } from "Utils/string";
import { WatchCoin } from "Models/WatchCoin";
import { Status } from "Models/Status";
import NoCoins from "../NoCoins";
import {
  fetchWatchList,
  clearWatchList,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  mobileShowMore,
  mobileShowLess,
  mobileGoToPage,
  doSort,
  startConfig,
} from "./actions";
import "Styles/mobile-table.less";

const styles = require('./selling.css');

interface CoinsTableProps {
  coins: Array<WatchCoin>;
  sort: string;
}

class SellingMobile extends React.Component<any, any> {

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
      const { updateFieldValue, coins } = this.props;
      updateFieldValue(coin, field, e.target.checked, coins);
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
            label: 'By Price Bought ascending',
            value: 'price_bought_btc',
          }, {
            label: 'By Price Bought descending',
            value: '-price_bought_btc',
          }, {
            label: 'By Highest Bid ascending',
            value: 'price_per_unit',
          }, {
            label: 'By Highest Bid descending',
            value: '-price_per_unit',
          }, {
            label: 'By Profit Target ascending',
            value: 'profit_target',
          }, {
            label: 'By Profit Target descending',
            value: '-profit_target',
          }]}
        />
      </div>
    ) : null;
  }

  render() {
    const {
      status,
      coins,
      sort,
      removeStatus,
      removeCoin,
      cancelRemove,
      confirmRemove,
      mobileShowMore,
      mobileShowLess,
      coinToRemove,
      exchangeId,
      mobilePage,
      mobileGoToPage,
      startConfig,
      exitStrategyFormValues,
    } = this.props;

    const lodashSort = getLodashSort(sort);
    const sortedCoins = _.orderBy(coins, lodashSort[0], lodashSort[1]);
    const hasCoins = sortedCoins.length > 0;
    const pagedCoins = sortedCoins.slice(
      mobilePage.offset,
      Math.min(sortedCoins.length, mobilePage.offset + mobilePage.limit));

    const $coinList = hasCoins ?
      pagedCoins.map((s, index) => {
        return (
          <div key={index} className="record">
            <div className="field">
              <div className="field-name">Coin</div>
              <div className="field-value">{s.coin}</div>
            </div>
            <div className="field">
              <div className="field-name">Serial number</div>
              <div className={"field-value " + styles.value}>{s.id}</div>
            </div>
            <div className="field">
              <div className="field-name">Price bought</div>
              <div className={"field-value " + styles.value}>
                <div><Price>{s.price_bought_btc} Ƀ</Price></div>
                <div><Price nDigitsAfterDot={2}>{s.price_bought_usd || 0} USD</Price></div>
              </div>
            </div>
            {s.showMore && (
              <div>
                <div className="field">
                  <div className="field-name">Highest bid</div>
                  <div className={"field-value " + styles.value}>
                    <div><Price>{s.price_per_unit} Ƀ</Price></div>
                    <div><Price nDigitsAfterDot={2}>{s.price_per_unit_usd} USD</Price></div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Profit target</div>
                  <div className={"field-value " + styles.value}>
                    <div>
                      <Price prefix={`${s.profit_target_btc || 0} % / `}>
                        {s.profit_target || 0} $
                      </Price>
                    </div>
                    <div className="blue">Current: <Price>{s.current_profit_target || 0} %</Price></div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">Email</div>
                  <div className="field-value">
                    <ToggleField
                      loading={s.emailLoading}
                      onChange={this.update(s, 'email').bind(this)}
                      checked={exitStrategyFormValues.id === s.id ?
                        !!exitStrategyFormValues.exit_notified_by_email : !!s.email}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="field-name">SMS</div>
                  <div className="field-value">
                    <ToggleField
                      loading={s.smsLoading}
                      onChange={this.update(s, 'sms').bind(this)}
                      checked={exitStrategyFormValues.id === s.id ?
                        !!exitStrategyFormValues.exit_notified_by_sms : !!s.sms}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="field">
              <div className="field-name">Exit settings</div>
              <div className={"field-value " + styles.exitSettings}>
                <div className={styles.removeBtn}>
                  <Button
                    style={{ width: 89 }}
                    className="small red"
                    onClick={() => removeCoin(s)}
                  >Remove</Button>
                </div>
                <div className={styles.configurations} onClick={() => startConfig(s, coins)}>
                  <i
                    className={`fa ${s.loadingConfigs ? 'fa-circle-o-notch fa-spin' : 'fa-cog'}`}
                    aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {s.showMore ? (
              <span className="less" onClick={() => mobileShowLess(coins, s)}>
                <i className="fa fa-caret-up" aria-hidden="true"></i> Close
              </span>
            ) : (
              <span className="more" onClick={() => mobileShowMore(coins, s)}>
                <i className="fa fa-caret-down" aria-hidden="true"></i> Show more
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
          onConfirm={() => {confirmRemove(coinToRemove.id, exchangeId, mobilePage)}}
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
  removeStatus: _.get(state, 'watchListSelling.remove.status', new Status()),
  coinToRemove: _.get(state, 'watchListSelling.remove.coin', new WatchCoin()),
  exchangeId: _.get(state, 'exchangeAccountsDropdown.activeExchangeAccount.data.exchange_id', ''),
  status: state.watchListSelling.status,
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  mobilePage: _.get(state, 'watchListSelling.mobilePage'),
  mode: state.manualTradingRobot.mode,
  exitStrategyFormValues: _.get(state, 'form.exitStrategyForm.values', {}),
});

const mapDispatchToProps = {
  fetchWatchList,
  clearWatchList,
  removeCoin,
  cancelRemove,
  confirmRemove,
  updateFieldValue,
  mobileShowMore,
  mobileShowLess,
  mobileGoToPage,
  doSort,
  startConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(SellingMobile);
