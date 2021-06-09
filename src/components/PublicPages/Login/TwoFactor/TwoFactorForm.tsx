import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router';
import { Status } from 'Models/Status';
import { isProvided } from 'Utils/validators';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { confirmCode } from './actions';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';

const styles = require('./two-factor.css');

class TwoFactorForm extends React.Component<Props, {}> {

  onSubmit(values) {
    const { user, confirmCode } = this.props;
    confirmCode(user.email, user.password, values.code);
  }

  render() {
    const { handleSubmit, status = new Status(), auth, twoFactorEnabled } = this.props;

    if (auth) {
      return (
        <Redirect to={{ pathname: '/mtr', state: { from: location }, }}/>
      );
    }

    if (!twoFactorEnabled) {
      return (
        <Redirect to={{ pathname: '/login', state: { from: location }, }}/>
      );
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <p className={styles.description}>
          In order to sign in your account you  need to verify your identity by entering the code you received.</p>
        <div className={styles.enterCode}>
          <TextField label="Enter code" name="code"/>
        </div>
        <Button
          className="large blue full"
          submit
          loading={status.loading}>
          CONFIRM CODE
        </Button>
      </form>
    );
  }
}

type Values = { code:number; };

const validate = values => {
  const errors:FormErrors<Values> = {};

  if (!isProvided(values.code)) {
    errors.code = 'Please provide your code.';
  }

  return errors;
};

const mapStateToProps = (state, props:OwnProps) => ({
  status: state.twoFactor.status,
  user: state.login.user,
  auth: state.login.auth,
  twoFactorEnabled: state.login.twoFactorEnabled,
});

const mapDispatchToProps = {
  confirmCode,
};

interface OwnProps {
  location?:string;
}

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps & OwnProps;

const form = reduxForm({
  form: 'twoFactor',
  validate,
})(TwoFactorForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);

