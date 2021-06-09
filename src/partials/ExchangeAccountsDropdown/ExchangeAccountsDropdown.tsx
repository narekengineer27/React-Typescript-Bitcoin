import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import Dropdown, { MenuProps } from 'Elements/Dropdown';
import { Exchange } from 'Models/Exchange';
import ExchangeAccountSettings from 'Partials/ManageExchangeAccounts';
import { openManageAccounts } from 'Partials/ManageExchangeAccounts/actions';
import { setActiveExchangeAccount, fetchExchangeAccounts, fetchExchanges } from './actions';
import { IState } from './types';
import { returntypeof } from 'Utils/type';

const styles = require('./exchange-accounts-dropdown.css');

class ExchangeAccountsDropdown extends React.Component<Props, any> {
  dropdown: Dropdown;

  onChange(menu: MenuProps) {
    const { activeExchangeAccount, setActiveExchangeAccount } = this.props;
    if (_.get(menu.data, 'id') !== _.get(activeExchangeAccount, 'id')) {
      setActiveExchangeAccount(menu.data);
    }
  }

  componentDidMount() {
    this.props.fetchExchangeAccounts();
    this.props.fetchExchanges();
  }

  componentDidUpdate(prevProps: Props) {
    if (_.get(prevProps.activeExchangeAccount.data, 'id') !==
      _.get(this.props.activeExchangeAccount.data, 'id')) {

      const activeAccountId = _.get(this.props.activeExchangeAccount.data, 'id');
      const activeIndex = this.props.accounts.data.findIndex(item => item.id === activeAccountId);
      this.dropdown.setActiveIndex(activeIndex);
    }
  }

  render() {
    const { exchanges, accounts, openManageAccounts } = this.props;
    const menus: MenuProps[] = [];

    if (exchanges.status.success && accounts.status.success) {
      const exchangesMap: { [id: string]: Exchange } = {};
      for (const exchange of exchanges.data) {
        exchangesMap[exchange.id] = exchange;
      }

      for (const account of accounts.data) {
        const exchange = exchangesMap[account.exchange_id];

        menus.push({
          label: account.name,
          value: '' + account.id,
          data: account,
          renderItem: getItemRenderer(account.name, exchange.name, exchange.color),
        });
      }

      menus.push({
        label: 'Manage all accounts',
        value: '',
        nonSelectable: true,
        onClick: openManageAccounts,
      });
    }

    return (
      <div>
        <Dropdown
          className="medium"
          menus={menus}
          minWidth={217}
          onChange={this.onChange.bind(this)}
          ref={r => this.dropdown = r}
        />
        <ExchangeAccountSettings/>
      </div>
    );
  }
}

const getItemRenderer = (accountName: string, exchangeName: string, exchangeColor: string) => (
  (menu: MenuProps, index: number, isActive: boolean, isOpen: boolean, onChange: () => void): JSX.Element => {
    if (!isOpen) {
      return (
        <div key={index}>
          <span className={styles.dropAccountPrefix}>Account: </span>
          <span className={styles.dropAccountName}>{accountName}</span>
        </div>
      );
    } else {
      return (
        <div className={styles.dropAccountOpen} key={index} onClick={onChange}>
          {isActive && <div className={styles.dropAccountActive}>ACTIVE</div>}
          <div className={styles.dropAccountName}>{accountName}</div>
          <div className={styles.dropAccountExchange} style={{ color: exchangeColor }}>{exchangeName}</div>
        </div>
      );
    }
  });

const mapStateToProps = rootState => {
  const state = rootState.exchangeAccountsDropdown as IState;
  return {
    accounts: state.exchangeAccounts,
    exchanges: state.exchanges,
    activeExchangeAccount: state.activeExchangeAccount,
  };
};

const mapDispatchToProps = {
  openManageAccounts,
  setActiveExchangeAccount,
  fetchExchangeAccounts,
  fetchExchanges,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeAccountsDropdown);
