import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, change, untouch } from 'redux-form';
import { Country } from 'Models/Country';
import { City } from 'Models/City';
import { Currency } from 'Models/Currency';
import { isProvided, isEmail, isMobilePhone } from 'Utils/validators';
import { getCurrentUser } from 'Utils/auth';
import { loadCountries, loadCurrencies } from 'Components/PublicPages/Signup/actions';
import { saveProfile } from './actions';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import { cities } from 'Utils/api';
import Button from 'Elements/Button';
import TextInputMask from 'Elements/TextMaskField';
import TwoFactorForm from './TwoFactorForm';

const styles = require('../my-account.css');

class AccountSettingsForm extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      cityLoadedFirstTime: false,
      options: []
    };
  }

  componentDidMount() {
    this.props.loadCountries();
    this.props.loadCurrencies();
  }

  componentWillUpdate(nextProps) {
    const { cityLoadedFirstTime } = this.state;
    const { city, country } = getCurrentUser();
    if (!cityLoadedFirstTime && this.props.country === country) {
      this.props.dispatch(change('account-settings', 'city', city));
      this.props.dispatch(untouch('account-settings', 'city', city));
    } else if (this.props.country !== nextProps.country) {
      this.props.dispatch(change('account-settings', 'city', ''));
      this.props.dispatch(untouch('account-settings', 'city', ''));
    }
    if (this.props.status.loading) {
      this.props.dispatch(change('account-settings', 'password', ''));
      this.props.dispatch(change('account-settings', 'password_confirmation', ''));
    }
  }

  setChangeSelected(event, value) {
    if (value !== this.props.initialValues.city) {
      this.loadCityOptions(value);
    }
  }

  setBlurSelected(event, value) {
    if (value !== this.props.initialValues.city) {
      this.loadCityOptions(value);
    }
  }

  onSubmit(values:object) {
    const { enabled_2fa } = this.props;
    this.props.saveProfile(values, enabled_2fa);
  }

  render() {
    const {
      handleSubmit, status, invalid = true,
      countries, currencies
    } = this.props;
    const { options } = this.state;

    const countryOptions = (countries as Country[]).map(it => ({ value: it.country_code, label: it.country_name }));
    const currencyOptions = (currencies as Currency[]).map(it => ({ value: it.id, label: it.code }));

    return (
      <div>
        <TwoFactorForm></TwoFactorForm>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className={styles.rightPanelSub}>
            <div className={"row " + styles.label}>
              <div className="col-lg-6">
                <TextField label="Your name" name="name" tabIndex={4} leftSideError/>
              </div>
              <div className="col-lg-6">
              </div>
            </div>

            <div className={"row " + styles.label}>
              <div className="col-lg-6">
                <TextField label="Your e-mail" name="email" tabIndex={5} leftSideError/>
              </div>
              <div className={"col-lg-6 "+ styles.label}>
                <TextInputMask label="Your phone number" name="phone" tabIndex={6} mask="+99\9999999999" maskChar=" "/>
              </div>
            </div>

            <div className={"row " + styles.label}>
              <div className="col-lg-6">
                <SelectField searchable
                             options={countryOptions}
                             label="Your country" name="country" tabIndex={7} leftSideError>
                </SelectField>
              </div>
              <div className={"col-lg-6 "+ styles.label}>
                <SelectField searchable key={this.props.country}
                             loadOptions={input => this.loadCityOptions(input)}
                             label="Your city" name="city" tabIndex={8} options={options}
                             onChange={this.setChangeSelected.bind(this)} onBlur={this.setBlurSelected.bind(this)}>
                </SelectField>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <TextField type="password" label="Password" name="password" tabIndex={9} leftSideError/>
              </div>
              <div className="col-lg-6">
                <TextField type="password" label="Repeat password" name="password_confirmation" tabIndex={10}/>
              </div>
            </div>
            <div className={"row " + styles.label}>
              <div className="col-lg-6">
                <SelectField searchable
                             options={currencyOptions}
                             label="Your currency" name="currency" tabIndex={11} leftSideError/>
              </div>
              <div className="col-lg-6">
              </div>
            </div>
          </div>
          <div className={styles.bottomPanel}>
            <div className={styles.rightPanelSub}>
              <Button submit tabIndex={12}
                      disabled={invalid}
                      className={'large blue ' + styles.submitButton} loading={status.loading}>
                Save Settings
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  loadCityOptions(input:string) {
    if (!this.props.country) {
      return Promise.resolve({ options: [], cache: false });
    }
    const { city, country } = getCurrentUser();
    const { cityLoadedFirstTime } = this.state;

    if (!cityLoadedFirstTime && this.props.country === country) {
      if (city.length > 3) {
        input = city.substring(0, 3);
      } else {
        input = city.substring(0, 1);
      }
      this.setState({
        cityLoadedFirstTime: true
      });
    }
    return cities(this.props.country, input)
      .then(response => {
        const data = _.get(response, 'data', []) as City[];
        let options = data.map(it => ({ value: it.city_name, label: it.city_name }));
        this.setState({ options: options });
        return { options, cache: false };
      })
      .catch(error => {
        // Ignore errors during auto-fill
        return { options: [] };
      });
  }
}

const validate = values => {
  const errors:any = {};
  if (!isProvided(values.email)) {
    errors.email = 'Please provide your e-mail.';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid e-mail.';
  }

  if (values.password_confirmation && !isProvided(values.password)) {
    errors.password = 'Please provide your password.';
  }

  if (values.password && !isProvided(values.password_confirmation)) {
    errors.password_confirmation = 'Please confirm your password.';
  } else if (values.password && values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match.';
  }

  if (!isProvided(values.name)) {
    errors.name = 'Please provide your name.';
  }

  if (!isProvided(values.country)) {
    errors.country = 'Please select your country.';
  }

  if (!isProvided(values.city)) {
    errors.city = 'Please select your city.';
  }

  if (!isProvided(values.phone)) {
    errors.phone = 'Please provide your phone number.';
  } else if (!isMobilePhone(values.phone)) {
    errors.phone = 'Please provide a valid phone number.';
  }

  if (!isProvided(values.currency)) {
    errors.currency = 'Please select your currency.';
  }

  return errors;
};

const mapDispatchToProps = {
  saveProfile,
  loadCountries,
  loadCurrencies,
};

const form = reduxForm({
  form: 'account-settings',
  validate,
  enableReinitialize: true,
})(AccountSettingsForm);

const selector = formValueSelector('account-settings');

const mapStateToProps = state => {
  const country = selector(state, 'country');
  return ({
    formValues: _.get(state, 'form.account-settings.values', {}),
    enabled_2fa: _.get(state, 'form.twoFactorSettings.values.enabled_2fa', false),
    user: state.signup.user,
    status: state.accountInformation.status,
    countries: state.signup.countries,
    currencies: state.signup.currencies,
    country,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
