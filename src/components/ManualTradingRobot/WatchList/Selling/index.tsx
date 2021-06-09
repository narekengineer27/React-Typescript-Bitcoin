import * as React from 'react';
import { connect } from 'react-redux';
import SortingIcons from 'Elements/SortingIcons';
import { Table, TableRow, TableCell } from 'Elements/Table';
import Loader from 'Elements/Loader';
import Responsive from 'Partials/Responsive';
import SellingMobile from './SellingMobile';
import { updateSort } from 'Utils/string';
import SellingList from './Selling';
import {
  fetchWatchList,
  doSort,
} from './actions';

const styles = require('./selling.css');

const fields = [{
  name: 'Coin',
  label: 'Coin',
  sortable: false,
}, {
  name: 'serial_number',
  label: 'Serial number',
  sortable: false,
}, {
  name: 'price_bought_btc',
  label: 'Price bought',
  sortable: true,
}, {
  name: 'price_per_unit',
  label: 'Highest bid',
  sortable: true,
}, {
  name: 'profit_target',
  label: 'Profit target',
  sortable: true,
}];

class WatchListSelling extends React.Component<any, any> {

  componentDidMount() {
    const { activeExchangeAccount } = this.props;
    if (activeExchangeAccount.id) {
      this.refresh();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeExchangeAccount.exchange_id !== this.props.activeExchangeAccount.exchange_id
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
      this.props.doSort(updateSort(this.props.sort, field, decreasing));
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
        <TableCell header key={field.name} className={styles[field.name]}>
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
        <Responsive name="desktop">
          <Table className={(noScrollbar ? styles.noScrollbar : '')}>
            {coins.length > 0 ? (
              <TableRow className="tr">
                {$fields}
                <TableCell header className={styles.exit}>Exit settings</TableCell>
              </TableRow>
            ) : <div className="border-top"></div>}
            <div className="relative">
              <SellingList/>
              <Loader isOpen={status.loading}/>
            </div>
          </Table>
        </Responsive>
        <Responsive name="phone">
          <SellingMobile></SellingMobile>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.watchListSelling.meta,
  status: state.watchListSelling.status,
  sort: state.watchListSelling.sort,
  coins: state.watchListSelling.data,
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  mode: state.manualTradingRobot.mode,
});

const mapDispatchToProps = {
  doSort,
  fetchWatchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListSelling);
