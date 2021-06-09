import * as React from 'react';
import { connect } from 'react-redux';
import SortingIcons from 'Elements/SortingIcons';
import { Table, TableRow, TableCell } from 'Elements/Table';
import Loader from 'Elements/Loader';
import Responsive from 'Partials/Responsive';
import BuyingMobile from './BuyingMobile';
import Buying from './Buying';
import { updateSort } from 'Utils/string';
import { fetchWatchList, doSort } from './actions';

const styles = require('./buying.css');

const fields = [{
  name: 'Coin',
  label: 'Coin',
  sortable: false,
}, {
  name: 'name',
  label: 'Name',
  sortable: false,
}, {
  name: 'market_cap',
  label: 'Market Cap',
  sortable: true,
}, {
  name: 'btc_liquidity_bought',
  label: 'Liquidity',
  sortable: true,
}, {
  name: 'gap',
  label: 'GAP',
  sortable: true,
}, {
  name: 'cpp',
  label: 'CPP',
  sortable: true,
}, {
  name: 'prr',
  label: 'PRR',
  sortable: true,
}];

class watchListBuying extends React.Component<any, any> {

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
    const { mode, activeExchangeAccount, fetchWatchList, meta } = props;
    fetchWatchList(activeExchangeAccount.exchange_id, mode, meta);
  }

  sort(field: string, decreasing: boolean = false) {
    return () => {
      const { meta: { sort } } = this.props;
      this.props.meta.sort = updateSort(sort, field, decreasing);
      this.refresh();
    };
  }

  render() {
    const { sort, coins = [], status } = this.props;
    const primarySort = sort.split(',')[0].trim().replace(/-/g, '');
    const noScrollbar = coins.length <= 10;

    const onIncreasing = ((field: string) => {
      return this.sort(field);
    }).bind(this);
    const onDecreasing = ((field: string) => {
      return this.sort(field, true);
    }).bind(this);

    const $fields = fields.map(field => {
      return (
        <TableCell header key={field.name}>
          <div className="flex full-width">
            <div>{field.label}</div>
            <div className="vertical-center">
              {field.sortable && (
                <SortingIcons
                  primary={primarySort === field.name}
                  increasing={sort.indexOf('-') > 0}
                  decreasing={sort.indexOf('-') === 0}
                  onIncreasing={onIncreasing(field.name)}
                  onDecreasing={onDecreasing(field.name)}
                />
              )}
            </div>
          </div>
        </TableCell>
      );
    });

    return (
      <div className={styles.wrapper}>
        <Table className={(noScrollbar ? styles.noScrollbar : styles.table)}>
          {coins.length > 0 ? (
            <TableRow className="tr">
              {$fields}
              <TableCell header className={styles.actions}>Actions</TableCell>
            </TableRow>
          ) : <div className="border-top"></div>}
          <div className="relative">
            <Buying/>
            <Loader isOpen={status.loading}/>
          </div>
        </Table>
        <Responsive name="phone">
          <BuyingMobile></BuyingMobile>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.watchListBuying.meta,
  status: state.watchListBuying.status,
  sort: state.watchListBuying.meta.sort,
  coins: state.watchListBuying.data,
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  mode: state.manualTradingRobot.mode,
});

const mapDispatchToProps = {
  doSort,
  fetchWatchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(watchListBuying);
