import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Modal from 'Elements/Modal';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import Button from 'Elements/Button';
import { isProvided } from 'Utils/validators';
import { ExchangeAccount } from 'Models/ExchangeAccount';
import { close, saveAccount } from './actions';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import { UserPackage } from 'Models/UserPackage';
import { Exchange } from 'Models/Exchange';
import { getCurrentUser } from 'Utils/auth';

const styles = require('./manage-exchange-accounts.css');

class EditAccountModal extends React.Component<Props, {}> {

  render() {
    const { handleSubmit, editedAccount, saveStatus, close } = this.props;
    const exchangeOptions = this.getExchangeOptions();
    const editMode = !!editedAccount.id;
    const saveText = editMode ? 'Save' : 'Add account';
    const saveDisabled = saveStatus.loading;

    return (
      <Modal title="Settings" isOpen noFooter onCancel={close}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className={styles.form}>
          <div className={styles.content}>
            <div className="row">
              <div className="col-md-6">
                <SelectField
                  label="Exchange account"
                  name="exchange"
                  options={exchangeOptions}
                  disabled={editMode}
                  leftSideError
                />
              </div>
              <div className={'col-md-6 ' + styles.formAccountName}>
                <TextField label="Account name" name="name" maxLength={8}/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField label="API Key" name="key" leftSideError/>
              </div>
              <div className="col-md-6">
                <TextField label="API Secret" name="secret"/>
              </div>
            </div>
          </div>
          <div className="customModalFooter">
            <a className="customModalCancel" onClick={close}>Cancel</a>
            <Button className={'large blue ' + styles.save} submit loading={saveDisabled}>{saveText}</Button>
          </div>
        </form>
      </Modal>
    );
  }

  onSubmit(values: Values) {
    const { editedAccount, saveAccount } = this.props;
    const name = (values.name || '').trim();
    const key = (values.key || '').trim();
    const secret = (values.secret || '').trim();

    const account: ExchangeAccount = {
      id: editedAccount.id,
      user_id: editedAccount.user_id,
      exchange_id: values.exchange,
      name,
      key,
      secret,
    };

    saveAccount(account);
  }

  getExchangeOptions() {
    const exchanges = this.props.exchanges as Exchange[];
    const pack = this.props.userPackage as UserPackage;

    const exchangeAccounts = this.props.exchangeAccounts as ExchangeAccount[];
    const usedExchanges: { [id: string]: boolean } = {};
    for (let exchangeAccount of exchangeAccounts) {
      usedExchanges[exchangeAccount.exchange_id] = true;
    }

    const exchangeOptions = exchanges.map(it => ({ value: it.id, label: it.name, disabled: false }));
    if (getCurrentUser().is_dev) {
      // Devs can use all accounts
      return exchangeOptions;
    }

    // Prevent re-using the same account
    for (let option of exchangeOptions) {
      option.disabled = usedExchanges[option.value];
    }

    if (pack.all_live_enabled && !pack.all_expired) {
      // All are valid
      return exchangeOptions;
    }

    if (pack.test_enabled && !pack.test_expired) {
      // All are valid
      return exchangeOptions;
    }

    const enabledExchanges: { [id: string]: boolean } = {};
    const packExchanges = pack.exchanges || [];
    for (let item of packExchanges) {
      enabledExchanges[item.exchange] = item.live_enabled && !item.live_expired;
    }

    for (let option of exchangeOptions) {
      option.disabled = option.disabled || !enabledExchanges[option.value];
    }

    return exchangeOptions;
  }
}

type Values = { exchange: string; name: string; key: string; secret: string; };

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};
  if (!isProvided(values.key)) {
    errors.key = 'Please provide your API key.';
  }

  if (!isProvided(values.secret)) {
    errors.secret = 'Please provide your API secret.';
  }

  if (!isProvided(values.name)) {
    errors.name = 'Please provide the account name.';
  }

  if (!isProvided(values.exchange)) {
    errors.exchange = 'Please select an exchange.';
  }

  return errors;
};

const mapStateToProps = state => ({
  initialValues: {
    key: state.exchangeAccountSettings.editedAccount.key,
    secret: state.exchangeAccountSettings.editedAccount.secret,
    exchange: state.exchangeAccountSettings.editedAccount.exchange_id,
    name: state.exchangeAccountSettings.editedAccount.name,
  },
  exchanges: state.exchangeAccountsDropdown.exchanges.data,
  editedAccount: state.exchangeAccountSettings.editedAccount,
  exchangeAccounts: state.exchangeAccountsDropdown.exchangeAccounts.data,
  saveStatus: state.exchangeAccountSettings.saveStatus,
  userPackage: state.platformFeatures.userPackage.data,
});

const mapDispatchToProps = {
  close,
  saveAccount,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps;

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'exchangeAccountSettings',
  validate,
})(EditAccountModal));
