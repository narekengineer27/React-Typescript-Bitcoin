import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { Redirect } from 'react-router';

import { Status } from 'Models/Status';
import { isProvided, isEmail, isMobilePhone } from 'Utils/validators';
import { signup, loadCountries, loadCurrencies } from './actions';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';

const styles = require('./signup.css');

class SignupForm extends React.Component<Props, { options?: any[] }> {

  constructor(props: Props) {
    super();
    this.state = {
      options: []
    };
  }

  componentDidMount() {
    this.props.loadCountries();
    this.props.loadCurrencies();
  }

  componentWillUpdate(nextProps: Props) {
    // if (this.props.country !== nextProps.country) {
    //   this.props.change('city', '');
    //   this.props.untouch('city');
    // }
  }

  onSubmit(values: object) {
    
    this.props.signup({ ...values, referral: this.props.referral });
    
  }

  render() {
    const {
      handleSubmit, status = new Status()
    } = this.props;
    const { options } = this.state;

    if (status.success) {
      return (
        <Redirect to={{ pathname: '/verify-email', }}/>
      );
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className={styles.signupInputWrapper}>
          <TextField type="text" label="Email" name="email" autoComplete/>
        </div>
        <div className={styles.signupInputWrapper}>
          <TextField type="text" label="Username" name="user_name" autoComplete/>
        </div>
        <div className={styles.signupInputWrapper}>
          <TextField type="password" label="Password" name="password" autoComplete/>
        </div>
        <div className={styles.signupInputWrapper}>
          <TextField type="password" label="Re-enter" name="password_confirmation" autoComplete/>
        </div>
        <Button className={styles.signupBtn + " small orange"} submit loading={status.loading}>Next</Button>
      </form>
    );
  }
}

type Values = {
  email: string;
  password: string;
  password_confirmation: string;
  user_name: string;
};

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};
  if (!isProvided(values.email)) {
    errors.email = 'Please provide your e-mail.';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid e-mail.';
  }

  if (!isProvided(values.password)) {
    errors.password = 'Please provide your password.';
  }

  if (!isProvided(values.password_confirmation)) {
    errors.password_confirmation = 'Please confirm your password.';
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match.';
  }

  if (!isProvided(values.user_name)) {
    errors.user_name = 'Please provide your username.';
  }

  return errors;
};

const mapDispatchToProps = {
  signup,
  loadCountries,
  loadCurrencies
};

const form = reduxForm({
  form: 'signup',
  validate,
})(SignupForm);

const selector = formValueSelector('signup');

const mapStateToProps = (state, ownProps: OwnProps) => {
  const agreeTermsOfUse = selector(state, 'agreeTermsOfUse');
  const country = selector(state, 'country');

  return ({
    user: state.signup.user,
    status: state.signup.status,
    agreeTermsOfUse,
    countries: state.signup.countries,
    currencies: state.signup.currencies,
    country
  });
};

type OwnProps = { referral?: string; };
const stateProps = returntypeof(mapStateToProps);
type Props = OwnProps & typeof stateProps & typeof mapDispatchToProps & FormProps;

export default connect(mapStateToProps, mapDispatchToProps)(form);
