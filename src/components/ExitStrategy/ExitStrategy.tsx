import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, submit, change } from 'redux-form';
import { isProvided } from 'Utils/validators';
import { FormErrors } from 'Utils/type';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import Modal from 'Elements/Modal';
import Loader from 'Elements/Loader';
import CheckboxField from 'Elements/CheckboxField';
import Tooltip from 'Elements/Tooltip';
import { exitStrategySet } from 'Utils/auth';
import {
  cancelExitStrategy,
  saveExitStrategy,
  saveDefaultExitStrategy,
  loadDefaultSettings,
  updateExitStrategy,
  setAsDefault,
} from './actions';

const styles = require('./exit-strategy.css');

const initialValues = {
  exit_target: 2.25,
  smart_sell_enabled: false,
  smart_sell_interval: 9,
  smart_sell_drops: 3,
  exit_notified_by_email: false,
  exit_notified_by_sms: false,
};


type Values = { smart_sell_interval: number; smart_sell_drops: number; };

const validate = values => {
  const errors: FormErrors<Values> = {};

  if(values.smart_sell_enabled) {
    if (!isProvided(values.smart_sell_interval)) {
      errors.smart_sell_interval = 'Please provide your number of intervals.';
    }

    if (!isProvided(values.smart_sell_drops)) {
      errors.smart_sell_drops = 'Please provide your number of price drops allowed.';
    }
  }
  return errors;
};

@reduxForm({
  form: 'exitStrategyForm',
  validate,
})
class ExitStrategyForm extends React.Component<any, any> {

  render() {
    const { defaultSettingsStatus, handleSubmit, onSubmit, formValues, setDefaults, formClass = '' } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form + ' ' + formClass}>
        <div className={styles.description}>
          <p className={styles.strategyDescription}>
            Please choose your exit strategy for this purchase
          </p>
          <div className="row">
            <div className={'col-md-6 ' + styles.target}>
              <TextField label="Target %" name="exit_target" type="number" tabIndex={1}/>
            </div>
          </div>
        </div>
        <Loader isOpen={defaultSettingsStatus.loading}></Loader>
        <div className={styles.smartSellingWrapper + ' ' + (setDefaults ? styles.setDefaults : '')}>
          <div className={styles.enableSmartSelling + ' ' + (formValues.smart_sell_enabled ? 'margin-bottom' : '')}>
            <ToggleField
              name="smart_sell_enabled"
              label={(
                <div>Enable&nbsp;
                  <Tooltip
                    width={250}
                    text="Smart selling allows you to sell coins automatically when the conditions are best for selling"
                  >
                    <span className={styles.smartSelling}>Smart Selling</span>
                  </Tooltip> for this coin
                </div>
              )}
              tabIndex={2}
              isFormField
            />
          </div>
          {formValues.smart_sell_enabled ? (
            <div>
              <div className={styles.flex}>
                <div className={styles.intervals}>
                  <TextField
                    smallLabel
                    label="Number of intervals"
                    name="smart_sell_interval"
                    type="number"
                    tabIndex={3}
                    leftSideError
                  />
                </div>
                <div className={styles.priceDrops}>
                  <TextField
                    smallLabel
                    label="Number of price drops allowed"
                    name="smart_sell_drops"
                    type="number"
                    tabIndex={4}
                  />
                </div>
              </div>
              <p className={styles.explanation}>
                App would wait for the price to increase for the specified number of intervals, before selling. To
                prevent loss, it would sell if a price drop appears for the specified number of times.
              </p>
              <div className={styles.toggle}>
                <ToggleField
                  label="Send an Email when the coins is sold"
                  name="exit_notified_by_email"
                  tabIndex={5}
                  isFormField
                />
              </div>
              <div className={styles.toggle}>
                <ToggleField
                  label="Send SMS when the coins is sold"
                  name="exit_notified_by_sms"
                  tabIndex={6}
                  isFormField
                />
              </div>
            </div>
          ) : null}
        </div>
      </form>
    );
  }
}

class ExitStrategy extends React.Component <any, any> {
  componentDidMount() {
    const { dispatch, loadDefaultSettings } = this.props;
    dispatch(loadDefaultSettings());
  }

  componentWillUpdate(nextProps) {
    const { action, dispatch } = this.props;
    const updateFieldValues = (newValues) => {
      const fields = Object.keys(newValues);
      fields.forEach(f => {
        dispatch(change('exitStrategyForm', f, newValues[f]));
      });
    };
    if (action === 'updateSellingRule') {
      if (!_.isEqual(this.props.trade, nextProps.trade)) {
        const { trade } = nextProps;
        updateFieldValues(trade);
      }
    } else {
      if (!_.isEqual(this.props.defaultSettings, nextProps.defaultSettings)) {
        const { defaultSettings } = nextProps;
        updateFieldValues(defaultSettings);
      }
    }
  }

  render() {
    const {
      status,
      cancelExitStrategy,
      dispatch,
      saveExitStrategy,
      saveDefaultExitStrategy,
      isModal = false,
      formValues,
      cmbSettingsFormValues,
      action = 'setDefaults',
      defaultSettingsStatus,
      defaultSettings,
      mode,
      trade,
      updateExitStrategy,
      formClass = '',
      wrapperClass = '',
      activeExchangeAccount,
      setAsDefault,
      toSetAsDefault,
    } = this.props;

    const shouldSetAsDefault = !exitStrategySet() || toSetAsDefault;
    const saveStrategy = (values) => {
      return saveExitStrategy(this.props.trade, mode, values, activeExchangeAccount.id, shouldSetAsDefault);
    };
    const updateStrategy = (values) => {
      return updateExitStrategy(this.props.trade, values, shouldSetAsDefault);
    };

    // Different actions.
    const onSubmit = ({
      setDefaults: saveDefaultExitStrategy,       // Set global default exit strategy on CMB settings page
      add2SellingWatchList: saveStrategy,    // Set a new exit strategy for a newly bought coin
      updateSellingRule: updateStrategy,        // Update an existing exit strategy for a coin on selling watch list.
    })[action] || saveDefaultExitStrategy;

    const mergedValues = {
      ...initialValues,           // default hard-coded values
      ...cmbSettingsFormValues,   // default global exit strategy form with user inputs
      ...formValues,              // the form with user inputs.
      ...defaultSettings,         // default global exit strategy values from db
      ...trade,                   // selected coin values
    };

    const $exitStrategyForm = (
      <ExitStrategyForm
        defaultSettingsStatus={defaultSettingsStatus}
        initialValues={mergedValues}
        formValues={formValues}
        onSubmit={values => dispatch(onSubmit(action === 'setDefaults' ? {
          ...cmbSettingsFormValues,
          ...values,
        } : values))}
        setDefaults={action === 'setDefaults'}
        formClass={formClass}
      />
    );

    const $form = isModal ? (
      <Modal
        confirmButtonText="Save"
        loading={defaultSettingsStatus.loading}
        isOpen={status.progressing}
        onCancel={() => dispatch(cancelExitStrategy())}
        onConfirm={() => dispatch(submit('exitStrategyForm'))}
        buttonLoading={status.loading}
        buttonDisabled={defaultSettingsStatus.loading}
        title="Exit Strategy"
        leftNodeInFooter={(
          <div>
            <CheckboxField
              disabled={!exitStrategySet()}
              checked={shouldSetAsDefault}
              label="Set as default"
              name="setAsDefault"
              isFormField={false}
              onChange={(checked) => dispatch(setAsDefault(checked))}
            />
          </div>
        )}
      >
        {$exitStrategyForm}
      </Modal>
    ) : (
      <div>
        {$exitStrategyForm}
      </div>
    );
    return (
      <div className={wrapperClass}>
        {$form}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  status: state.exitStrategy.status,
  formValues: _.get(state, 'form.exitStrategyForm.values', {}),
  cmbSettingsFormValues: _.get(state, 'form.cmbSettings.values', {}),
  defaultSettings: state.exitStrategy.defaultSettings.data,
  defaultSettingsStatus: state.exitStrategy.defaultSettings.status,
  trade: state.exitStrategy.trade,
  mode: state.manualTradingRobot.mode,
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  toSetAsDefault: state.exitStrategy.setAsDefault,
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  cancelExitStrategy,
  saveExitStrategy,
  saveDefaultExitStrategy,
  loadDefaultSettings,
  updateExitStrategy,
  setAsDefault,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExitStrategy);
