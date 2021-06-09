import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from './types';
import { IState as MTState } from 'Partials/ExchangeAccountsDropdown/types';
import EditAccountModal from './EditAccountModal';
import ManageAccountsModal from './ManageAccountsModal';
import { returntypeof } from 'Utils/type';

class ExchangeAccountSettings extends React.Component<Props, {}> {
  render() {
    const { visible, exchanges, editedAccount } = this.props;

    if (!visible || !exchanges.status.success) {
      return null;
    }

    return editedAccount ? <EditAccountModal/> : <ManageAccountsModal/>;
  }
}

const mapStateToProps = rootState => {
  const state = rootState.exchangeAccountSettings as IState;
  const mtState = rootState.exchangeAccountsDropdown as MTState;
  return {
    visible: state.visible,
    editedAccount: state.editedAccount,
    exchanges: mtState.exchanges,
    accounts: mtState.exchangeAccounts,
  };
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps;

export default connect(mapStateToProps)(ExchangeAccountSettings);
