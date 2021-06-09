import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Modal from 'Elements/Modal';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { isProvided } from 'Utils/validators';
import { closeSetWallet, submitSetWallet } from './actions';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import { IState } from './types';

const styles = require('./mentor-program.css');

class SetWalletModal extends React.Component<Props, {}> {
  render() {
    const { visible, status, handleSubmit, submitSetWallet, closeSetWallet } = this.props;
    return (
      <Modal isOpen={visible} onCancel={closeSetWallet} title="Become Mentor" noFooter>
        <form onSubmit={handleSubmit((values: Values) => submitSetWallet(values.walletId))}>
          <div className={styles.modalFormContent}>
            <p>Please enter your Wallet ID for receiving the profits from future transactions.</p>
            <TextField name="walletId" label="Your wallet ID"/>
          </div>
          <div className={'customModalFooter ' + styles.modalFooter}>
            <a className="customModalCancel" onClick={() => closeSetWallet()}>Cancel</a>
            <Button className="medium blue" submit disabled={status.loading}>Save Wallet Id</Button>
          </div>
        </form>
      </Modal>
    );
  }
}

type Values = { walletId: string };

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.walletId)) {
    errors.walletId = 'Please provide the Wallet ID';
  }

  return errors;
};

const mapStateToProps = rootState => {
  const state = rootState.mentorProgram as IState;
  return {
    ...state.setWalletModal,
  };
};

const mapDispatchToProps = {
  submitSetWallet,
  closeSetWallet,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps;

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'mentorWallet',
  validate
})(SetWalletModal));
