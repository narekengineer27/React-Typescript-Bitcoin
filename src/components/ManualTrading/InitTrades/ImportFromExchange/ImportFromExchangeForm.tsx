import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { isProvided, isEmail } from "Utils/validators";
import TextField from "Elements/TextField";
import { importTradesCredential, resetStatus, confirmSignIn } from "./actions";

const styles = require('./import-from-exchange.css');

class ImportFromExchangeForm extends React.Component<any> {

  onSubmit(values) {
    this.props.importTradesCredential(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className={styles.importForm}
      >
        <p>Please sign in to your POLONEX account to import your trades.</p>
        <div>
          <TextField label="Your e-mail" name="email"/>
        </div>
        <div>
          <TextField type="password" label="Password" name="password"/>
        </div>

      </form>
    );
  }
}

const validate = values => {
  const errors: any = {};
  console.log('values', values);
  if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid email address.';
  }
  if (!isProvided(values.password)) {
    errors.password = 'Please provide your password.';
  }
  return errors;
};

const mapStateToProps = state => ({
  status: state.importFromExchange.status,
});

const mapDispatchToProps = {
  importTradesCredential,
  resetStatus,
  confirmSignIn,
};

const form = reduxForm({
  form: 'importTradesCredential',
  validate,
})(ImportFromExchangeForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
