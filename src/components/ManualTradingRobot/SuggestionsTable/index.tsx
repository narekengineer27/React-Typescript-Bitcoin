import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import SortingIcons from 'Elements/SortingIcons';
import { Table, TableRow, TableCell } from 'Elements/Table';
import BuySell from '../BuySell';
import WatchCoin from '../WatchList/WatchCoin';
import Responsive from 'Partials/Responsive';
import { updateSort } from 'Utils/string';
import Suggestions from './Suggestions';
import { doSort, doFilter } from './actions';
import ExitStrategy from 'Components/ExitStrategy';
import SuggestionsMobile from './Suggestions/SuggestionsMobile';

const styles = require('./suggestions-table.css');

const fields = [{
  name: 'coin',
  label: 'Coin',
}, {
  name: 'target',
  label: 'Exchange Trend (%)',
}, {
  name: 'market_cap',
  label: 'Market Cap ($)',
}, {
  name: 'btc_liquidity_bought',
  label: 'Liquidity (/hr)',
}, {
  name: '1hr_impact',
  label: '1hr Impact (%)',
}, {
  name: 'overall_score',
  label: 'Overall Score',
}, {
  name: 'gap',
  label: 'GAP',
}, {
  name: 'cpp',
  label: 'CPP',
}, {
  name: 'prr',
  label: 'PRR (%)',
}];

interface SuggestionsTableProps {
  filter: string;
  sort: string;
}

class SuggestionsTable extends React.Component<any, any> {

  public static defaultProps: SuggestionsTableProps = {
    filter: '',
    sort: '',
  };

  sort(field: string, decreasing: boolean = false) {
    return () => {
      this.props.doSort(updateSort(this.props.sort, field, decreasing));
    };
  }

  onChangeCoinFilter(e) {
    this.props.doFilter(e.target.value);
  }

  render() {
    const {
      filter,
      sort,
      exitStrategyStatus,
      setExitStrategyFor,
    } = this.props;
    const primarySort = sort.split(',')[0].trim().replace(/-/g, '');

    const onIncreasing = ((field: string) => {
      return this.sort(field);
    }).bind(this);
    const onDecreasing = ((field: string) => {
      return this.sort(field, true);
    }).bind(this);

    const $fields = fields.map(field => {
      const rowClass = _.kebabCase(field.name.replace(/[0-9]/g, ''));
      return (
        <TableCell header key={field.name} className={styles[rowClass] + ' ' + styles.header}>
          <div className="flex full-width">
            <div>{field.label}</div>
            <div className="vertical-center">
              <SortingIcons
                primary={primarySort === field.name}
                onIncreasing={onIncreasing(field.name)}
                onDecreasing={onDecreasing(field.name)}
              />
            </div>
          </div>
        </TableCell>
      );
    });

    return (
      <div className={styles.wrapper}>
        <Responsive name="widerDesktop">
          <Table>
            <TableRow className={styles.combinedHeaderRow}>
              <TableCell header className={styles.id}></TableCell>
              <TableCell header className={styles.filterTh}>
                <div className={styles.spaced}>
                  <input
                    className={styles.filterInput}
                    type="text"
                    placeholder="Search"
                    value={filter}
                    onChange={this.onChangeCoinFilter.bind(this)}
                  />
                </div>
              </TableCell>
              <TableCell header className={styles.combinedHeader + ' ' + styles.parametersHeader}>
                <div className={styles.spaced}>
                  FRUGALITY RATIO PARAMETER
                </div>
              </TableCell>
              <TableCell header className={styles['overall-score'] + ' ' + styles.header}>
                <div className="full-width full-height" onDoubleClick={onDecreasing('new_mean_buy_time')}>&nbsp;</div>
              </TableCell>
              <TableCell header className={styles.priceParameters + ' ' + styles.combinedHeader}>
                <div className={styles.spaced}>
                  PRICE RELATIVITY RATIO
                </div>
              </TableCell>
              <TableCell header className={styles.actionsHeader}>&nbsp;</TableCell>
            </TableRow>
            <TableRow>
              <TableCell header className={styles.id}>ID</TableCell>
              {$fields}
              <TableCell header className={styles.actions}>Actions</TableCell>
            </TableRow>
            <Suggestions/>
          </Table>
        </Responsive>
        <Responsive name="mobile">
          <SuggestionsMobile></SuggestionsMobile>
        </Responsive>
        <BuySell/>
        <WatchCoin/>
        {exitStrategyStatus.progressing &&
        <ExitStrategy isModal action={setExitStrategyFor === 'BuySell' ? 'add2SellingWatchList' : 'setDefaults'}/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sort: _.get(state, 'suggestionsTable.sort', ''),
  filter: _.get(state, 'suggestionsTable.filter', ''),
  exitStrategyStatus: state.exitStrategy.status,
  setExitStrategyFor: state.exitStrategy.from,
});

const mapDispatchToProps = {
  doSort,
  doFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsTable);
