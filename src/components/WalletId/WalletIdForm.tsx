import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Status } from 'Models/Status';
import { isProvided } from 'Utils/validators';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { walletId, resetStatus } from 'Components/WalletId/actions';

const styles = require('Components/WalletId/walletId.css');

class WalletIdForm extends React.Component<any> {

  componentDidMount() {
    this.props.resetStatus();
  }

  onSubmit(values) {
    this.props.walletId(values.walletId);
  }

  render() {
    const { handleSubmit, status = new Status(), invalid = true } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className={styles.walletForm}>
        <p>Please enter your wallet ID for receiving the profits from future transactions.</p>
        <div className={styles.walletID}>
          <TextField label="Your wallet ID" name="walletId"/>
        </div>
        <Button className="large blue full" submit loading={status.loading} disabled={invalid}>FINISH SETUP</Button>
      </form>
    );
  }
}

const validate = values => {
  const errors: any = {};
  if (!isProvided(values.walletId)) {
    errors.walletId = 'Please provide your wallet ID.';
  }
  return errors;
};

const mapStateToProps = state => ({
  user: state.walletId.user,
  status: state.walletId.status,
  auth: state.walletId.auth,
});

const mapDispatchToProps = {
  walletId,
  resetStatus,
};

const form = reduxForm({
  form: 'walletId',
  validate,
})(WalletIdForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
