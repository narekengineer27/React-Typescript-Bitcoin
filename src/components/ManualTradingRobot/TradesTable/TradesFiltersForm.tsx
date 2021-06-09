import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as _ from 'lodash';
import SelectField from 'Elements/SelectField';
import Responsive from 'Partials/Responsive';
import Button from 'Elements/Button';
import { getCoins } from 'Utils/api';
import { mobileShowFilter, mobileShowSort } from './actions';

const styles = require('./trades-table.css');

class TradesFiltersForm extends React.Component<any, any> {

  loadCoinOptions(input: string) {
    return getCoins(input)
      .then(response => {
        const data = _.get(response, 'data', []);
        let options = data.map(it => ({ value: it.symbol, label: it.symbol }));
        options.unshift({
          label: 'Coin',
          value: '',
        });

        return { options, cache: false };
      })
      .catch(error => {
        // Ignore errors during auto-fill
        return { options: [] };
      });
  }

  render() {
    const {
      accounts,
      exchanges,
      mobileFilterVisible,
      mobileSortVisible,
      mobileShowFilter,
      mobileShowSort,
    } = this.props;

    const exchangeOptions = exchanges.data.map(a => ({
      label: a.name,
      value: a.id,
    }));
    exchangeOptions.unshift({
      label: 'Exchanges',
      value: '',
    });
    const exchangeAccountOptions = accounts.data.map(a => ({
      label: a.name,
      value: a.name,
    }));
    exchangeAccountOptions.unshift({
      label: 'Account Name',
      value: '',
    });

    const $filters = (
      <div className={styles.filtersHolder}>
        <div className={styles.fieldsSection}>
          <div className={styles.filter}>
            <SelectField
              name="exchange_id"
              hideLabel={true}
              options={exchangeOptions}
              tabIndex={1}
            />
          </div>
          <div className={styles.filter}>
            <SelectField
              searchable
              name="exchange_account_name"
              hideLabel={true}
              options={exchangeAccountOptions}
              tabIndex={1}
            />
          </div>
        </div>
        <div className={styles.fieldsSection}>
          <div className={styles.filter}>
            <SelectField
              name="status"
              hideLabel={true}
              options={[{
                label: 'Status',
                value: '',
              }, {
                label: 'Sold',
                value: 'sold',
              }, {
                label: 'Sell-Order',
                value: 'sell-order',
              }, {
                label: 'Buy-Order',
                value: 'buy-order',
              }, {
                label: 'Bought',
                value: 'bought',
              }]}
              tabIndex={3}
            />
          </div>
          <div className={styles.filter}>
            <SelectField
              searchable
              loadOptions={input => this.loadCoinOptions(input)}
              onChange={input => this.loadCoinOptions(input)}
              hideLabel={true}
              name="target_coin_id" tabIndex={1}>
            </SelectField>
          </div>
        </div>
      </div>
    );

    const $sort = (
      <div className={styles.mobileSort}>
        <SelectField
          name="mobileSort"
          hideLabel
          options={[{
            label: 'Sort by',
            value: '',
          }, {
            label: 'By Date/Time ascending',
            value: 'placed_at',
          }, {
            label: 'By Date/Time descending',
            value: '-placed_at',
          }, {
            label: 'By Quantity ascending',
            value: 'quantity',
          }, {
            label: 'By Quantity descending',
            value: '-quantity',
          }, {
            label: 'By Price Bought ascending',
            value: 'price_bought',
          }, {
            label: 'By Price Bought descending',
            value: '-price_bought',
          }, {
            label: 'By CPP ascending',
            value: 'cpp',
          }, {
            label: 'By CPP descending',
            value: '-cpp',
          }, {
            label: 'By GAP ascending',
            value: 'gap',
          }, {
            label: 'By GAP descending',
            value: '-gap',
          }, {
            label: 'By Profit ascending',
            value: 'profit',
          }, {
            label: 'By Profit descending',
            value: '-profit',
          }, {
            label: 'By Suggestion ascending',
            value: 'suggestion',
          }, {
            label: 'By Suggestion descending',
            value: '-suggestion',
          }, {
            label: 'By Status ascending',
            value: 'status',
          }, {
            label: 'By Status descending',
            value: '-status',
          }, {
            label: 'By Shrink Differential ascending',
            value: 'shrink_differential',
          }, {
            label: 'By Shrink Differential descending',
            value: '-shrink_differential',
          }, {
            label: 'By Target Price ascending',
            value: 'target_price',
          }, {
            label: 'By Target Price descending',
            value: '-target_price',
          }]}
        />
      </div>
    );

    return (
      <form>
        <Responsive name="widerDesktop">
          {$filters}
        </Responsive>
        <Responsive name="mobile">
          <div className={styles.mobileFilters}>
            <Button
              onClick={mobileShowFilter}
              className={'medium white gray-text ' + (mobileFilterVisible ? 'dark' : '')}
              style={{ width: '48%' }}>
              <i className="fa fa-filter" aria-hidden="true"></i> Filter
            </Button>
            <Button
              onClick={mobileShowSort}
              className={'medium white gray-text ' + (mobileSortVisible ? 'dark' : '')}
              style={{ width: '48%' }}>
              <i className="fa fa-sort" aria-hidden="true"></i> Sort
            </Button>
          </div>
          {mobileFilterVisible && $filters}
          {mobileSortVisible && $sort}
        </Responsive>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  accounts: state.exchangeAccountsDropdown.exchangeAccounts,
  exchanges: state.exchangeAccountsDropdown.exchanges,
  mobileFilterVisible: state.tradesTable.mobileFilterVisible,
  mobileSortVisible: state.tradesTable.mobileSortVisible,
});

const mapDispatchToProps = {
  mobileShowFilter,
  mobileShowSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'tradesTableFilter',
})(TradesFiltersForm));
