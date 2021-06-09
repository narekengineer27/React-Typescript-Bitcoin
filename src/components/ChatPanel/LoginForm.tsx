import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { history } from 'Components/Routes';

import { Status } from 'Models/Status';
import { isEmail, isProvided } from 'Utils/validators';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { login, resetStatus } from './actions';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import ChatColorModal from 'Components/ChatPanel/ChatColorModal/ChatColorModal';

const styles = require('./login.css');

class LoginForm extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpenChatColorModal: false,
      checkColorModal: true
    };
  }

  onSubmit(values: Values) {
    this.props.login(values);
  }

  componentDidMount() {
    this.props.resetStatus();
  }

  onConfirmChatColor() {
    history.push('/');
  }

  onCancelChatColor() {
    // this.setState({
    //   isOpenChatColorModal: false
    // });
  }

  render() {
    const {
      handleSubmit,
      status = new Status(),
      auth = false,
      location,
      twoFactorEnabled = false,
    } = this.props;

    if (auth && this.state.checkColorModal) {
      // return (
      //   <Redirect to={{ pathname: '/', state: { from: location }, }}/>
      //
      // );
      this.setState({
        isOpenChatColorModal: true,
        checkColorModal: false
      });
    }

    if (twoFactorEnabled) {
      return (
        <Redirect to={{ pathname: '/two-factor', state: { from: location }, }}/>
      );
    }

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className={styles.loginInputWrapper}>
            <TextField type="text" label="Email" name="email" border={true} autoComplete/>
          </div>
          <div className={styles.loginInputWrapper}>
            <TextField type="password" label="Password" name="password" border={true} autoComplete/>
          </div>
          <div className={styles.link + ' d-flex flex-column flex-sm-row justify-content-between ' + styles.paddedRow}>
            <Link to="/forgot-password">Forgot your password?</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          <Button className={styles.loginBtn + ' small blue'} submit loading={status.loading}>Login</Button>
        </form>
        <ChatColorModal isOpen={this.state.isOpenChatColorModal} onConfirm={this.onConfirmChatColor.bind(this)} onCancel={this.onCancelChatColor.bind(this)}/>
      </div>
    );
  }
}

type Values = { email: string; password: string; };

const validate = values => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.email)) {
    errors.email = 'Please provide your e-mail.';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid e-mail address.';
  }

  if (!isProvided(values.password)) {
    errors.password = 'Please provide your password.';
  }

  return errors;
};

const mapStateToProps = (state) => ({
  user: state.login.user,
  status: state.login.status,
  auth: state.login.auth,
  twoFactorEnabled: state.login.twoFactorEnabled,
});

const mapDispatchToProps = {
  login,
  resetStatus,
};

interface OwnProps {
  location?: string;
}

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps & OwnProps;

const form = reduxForm({
  form: 'login',
  validate,
})(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
