import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'Elements/TextField';
import { isProvided } from 'Utils/validators';
import ToggleField from 'Elements/ToggleField';
import RadioField from 'Elements/RadioField';
import Button from 'Elements/Button';
import {
  saveProfile,
  usersQr,
  update2faRules,
  loadUserInfo,
  confirmGoogleAuthentication,
} from './actions';

const styles = require('../my-account.css');

const options = [{
  value: '1',
  label: 'Email',
}, {
  value: '2',
  label: 'SMS',
}, {
  value: '3',
  label: 'Google Authenticator',
}];

class TwoFactorForm extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      revokeGaCode: false,
    };
  }

  componentDidMount() {
    this.props.usersQr();
    this.props.loadUserInfo();
  }

  onSubmit(values: any) {
    const { googleAuthentication, confirmGoogleAuthentication, update2faRules } = this.props;
    if (values.two_factor_approach === '3') {
      this.setState({ revoke: false });
      confirmGoogleAuthentication(values.code, googleAuthentication.secret);
    } else {
      update2faRules(values);
    }
  }

  renderGoogleAuthentication() {
    const { googleAuthentication, googleAuthenticationStatus, currentEnabled2fa } = this.props;
    return (
      <div>
        {(currentEnabled2fa && !this.state.revoke && !googleAuthenticationStatus.loading) ? (
          <Button
            className="medium blue"
            onClick={() => this.setState({ revoke: true })}
            style={{ width: 150 }}
          >Revoke</Button>
        ) : (
          <div className={styles.googleAuthentication}>
            <div className={styles.gaImgWrapper}>
              <img src={googleAuthentication.url} alt="googleAuthentication" className={styles.gaImg}/>
            </div>
            < div>
              < TextField
                label="Enter Code"
                name="code"
                tabIndex={3}
              />
              <Button
                submit tabIndex={12}
                style={{ width: 150 }}
                className='medium blue'
                loading={googleAuthenticationStatus.loading}
              >
                CONFIRM
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { formValues, status, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className={styles.rightPanelSub + ' ' + styles.twoFactorWrapper}>
          <div>
            <ToggleField
              label="Two Factor Authentication"
              name="enabled_2fa"
              tabIndex={1}
              isFormField
              labelClassName={styles.authenticationToggle}
            />
          </div>
          <p className={styles.authenticationDescription}>
            In order to add another layer of protection to your account, you can enable the Two Factor Authentication
            via SMS, Email or Google.</p>
          {formValues.enabled_2fa ? (
            <div>
              <div className={styles.faApproachs}>
                <RadioField
                  horizontal
                  optionClassName={styles.option}
                  name="two_factor_approach" options={options}
                  tabIndex={2}
                />
              </div>
              <div>
                {formValues.two_factor_approach === '3' ? (
                  this.renderGoogleAuthentication()
                ) : (
                  <Button
                    style={{ width: 150 }}
                    submit tabIndex={12}
                    className='medium blue'
                    loading={status.loading}>
                    SAVE
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors: any = {};

  if (!isProvided(values.code)) {
    errors.code = 'Please provide your code.';
  }
  return errors;
};

const mapDispatchToProps = {
  saveProfile,
  usersQr,
  update2faRules,
  loadUserInfo,
  confirmGoogleAuthentication,
};

const form = reduxForm({
  form: 'twoFactorSettings',
  validate,
  enableReinitialize: true,
})(TwoFactorForm);

const mapStateToProps = state => {
  const enabled_2fa = state.accountInformation.twoFactor.enabled_2fa;
  const initialValues = {
    enabled_2fa: !!enabled_2fa,
    two_factor_approach: (enabled_2fa || 1) + '',
  };
  return ({
    formValues: _.get(state, 'form.twoFactorSettings.values', {}),
    status: state.accountInformation.twoFactor.status,
    googleAuthentication: state.accountInformation.googleAuthentication.data,
    googleAuthenticationStatus: state.accountInformation.googleAuthentication.status,
    currentEnabled2fa: enabled_2fa,
    initialValues,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
