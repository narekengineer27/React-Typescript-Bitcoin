import * as React from 'react';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import Modal from 'Elements/Modal';

import { close, editAccount, openDelete, createAccount, cancelDelete, confirmDelete } from './actions';
import { returntypeof } from 'Utils/type';

const styles = require('./manage-exchange-accounts.css');

class ManageAccountsModal extends React.Component<Props, {}> {
  render() {
    const {
      accounts,
      exchanges,
      deleteStatus,
      editAccount,
      createAccount,
      close,
      openDelete,
      deletedAccount,
      cancelDelete,
      confirmDelete
    } = this.props;
    const nameMap: { [id: string]: string } = {};
    for (const exchange of exchanges.data) {
      nameMap[exchange.id] = exchange.name;
    }

    let accountItems = accounts.data.map(item => (
      <div key={item.id} className={styles.account}>
        <div className="row">
          <div className="col-sm-5">
            <div className={styles.accountName}>
              {item.name}
            </div>
            <div className={styles.exchangeName}>
              {nameMap[item.exchange_id]}
            </div>
          </div>
          <div className={'col-sm-7 ' + styles.buttons}>
            <Button onClick={() => editAccount(item)} className={'medium white ' + styles.edit}>Edit</Button>
            <Button
              onClick={() => openDelete(item)}
              className={'medium red ' + styles.delete}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <Modal title="Manage Accounts" isOpen noFooter onCancel={close}>
          <div className={styles.accountList}>
            {accountItems.length > 0 ?
              accountItems : 'There are no accounts yet. Please click the button below to create one.'}
          </div>
          <div className={styles.footer}>
            <Button className={'large blue ' + styles.add} onClick={createAccount}>Add new account</Button>
          </div>
        </Modal>

        <Modal
          isOpen={deleteStatus.progressing}
          title="Remove Account"
          confirmButtonText="Remove"
          cancelButtonText="Cancel"
          onConfirm={() => confirmDelete(deletedAccount)}
          onCancel={cancelDelete}
          buttonStyle={{ width: 150 }}
          buttonClassName="medium red"
          buttonLoading={deleteStatus.loading}
        >
          <div className={styles.headerTitle}>
            Are you sure you want to remove the account?
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    exchanges: state.exchangeAccountsDropdown.exchanges,
    accounts: state.exchangeAccountsDropdown.exchangeAccounts,
    deleteStatus: state.exchangeAccountSettings.deleteStatus,
    saveStatus: state.exchangeAccountSettings.saveStatus,
    deletedAccount: state.exchangeAccountSettings.deletedAccount,
  });
};

const mapDispatchToProps = {
  close,
  editAccount,
  openDelete,
  createAccount,
  cancelDelete,
  confirmDelete,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsModal);
