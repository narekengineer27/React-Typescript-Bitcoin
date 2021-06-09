import * as React from 'react';
import * as _ from 'lodash';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ButtonGroup from 'Elements/ButtonGroup';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import RadioField from 'Elements/RadioField';
import SelectField from 'Elements/SelectField';
import Loader from 'Elements/Loader';
import ToggleField from 'Elements/ToggleField';
import Entry from './Entry';
import Exit from './Exit';
import AdvancedEntry from './AdvancedEntry';
import ExchangeAccountsDropdown from 'Partials/ExchangeAccountsDropdown';
import { RobotSettingsTabs } from './types';
import { isNumber, isProvided } from 'Utils/validators';
import { mergeWithoutNull } from 'Utils/object';
import { saveSettings } from './actions';

const myAccountStyles = require('../my-account.css');
const styles = require('./robot-settings.css');

const tabs = [{
  label: 'Entry',
  value: RobotSettingsTabs.Entry,
  simpleControl: Entry,
  advancedControl: AdvancedEntry,
  href: `/my-account/robot-settings/${RobotSettingsTabs.Entry}`,
}, {
  label: 'Exit',
  value: RobotSettingsTabs.Exit,
  simpleControl: Exit,
  advancedControl: Exit,
  href: `/my-account/robot-settings/${RobotSettingsTabs.Exit}`,
}];

const ageOption = [{
  value: '2',
  label: '2 hours',
}, {
  value: '3',
  label: '3 hours',
}];

const defaultInitialValues = {
  "auto_global_is_auto_trading": true, // or false
  "auto_global_round_duration": 12,
  "auto_global_round_granularity": "hours", // "hours" or "days"
  "auto_global_cycles": 4,
  "auto_global_age": '2', // 2 or 3,
  "auto_entry_minimum_fr": '50', // 25, 50, 75 or 100
  "auto_entry_price_movement": "progressive", // progressive or regressive,
  "auto_entry_price_sign": "any", // any, positive or negative
  "auto_entry_volume_movement": "progressive", // progressive or regressive,
  "auto_entry_volume_sign": "any", // any, positive or negative,
  "auto_entry_maximum_ati": 2.232456,
  "auto_entry_ati_movement": "progressive", // progressive or regressive,
  "auto_entry_ati_sign": "any", // any, positive or negative,
  "auto_entry_minimum_liquidity_variance": 2.234567,
  "auto_entry_minimum_prr": 2.234567,
  "auto_entry_hold_time_granularity": "hours", // "hours" or "minutes"
  "auto_entry_hold_time": 4,
  "auto_entry_price": "low", // "low" or "current"
  "auto_entry_position_btc": 2.0,
  "auto_entry_open_time": 54,
  "auto_exit_action": "sell", // "sell" or "move"
  "auto_exit_intervals": 9,
  "auto_exit_drops": 3,
  'smart_settings': false,
};

class RobotSettings extends React.Component<any, {}> {

  onSubmit(values:any) {
    this.props.saveSettings(this.props.activeExchangeAccount.id, values);
  }

  renderSmartSettings() {
    return (
      <div className={styles.smartSettings}>
        <ToggleField
          label="Smart Settings"
          name="smart_settings"
          tabIndex={1}
          isFormField
          labelClassName={styles.smartSettingsToggle}
        />
        <span className={styles.radioFieldTitile}>allows the robot to pick the best options for you</span>
      </div>
    );
  }

  renderSmartGlobalSettings() {
    return (
      <div className={styles.globalSettings}>
        <p className={styles.radioFieldTitile}>Global Settings</p>
        <div className={styles.priceFlex}>
          <div className={styles.robotRound}>
            <span className={styles.radioFieldTitile}>Robot Round</span>
            <div className={styles.robotRoundTextField}>
              <TextField
                label=""
                name="auto_global_round_duration"
                type="number"
                tabIndex={1}
                leftSideError
              />
              <div className={styles.robotRoundDays}>
                <SelectField
                  options={[
                    { label: 'Hours', value: 'hours' },
                    { label: 'Days', value: 'days' }
                  ]}
                  wrapperCustomClass={styles.customSelectWrapper}
                  label=""
                  name="auto_global_round_granularity"
                  tabIndex={2}
                  leftSideError>
                </SelectField>
              </div>
            </div>
          </div>

          <div className={styles.cyclesPerRound}>
            <span className={styles.radioFieldTitile}>
              Cycles per Round
            </span>
            <div>
              <TextField
                label=""
                name="auto_global_cycles"
                tabIndex={3}
                leftSideError
                type="number"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAdvancedGlobalSettings() {
    return (
      <div className={styles.globalSettings}>
        <p className={styles.radioFieldTitile}>Global Settings</p>
        <div className={styles.globalSettingsData}>
          <div className={styles.noSmartRobotRound}>
            <span className={styles.radioFieldTitile}>Robot Round</span>
            <div className={styles.robotRoundTextField}>
              <TextField
                label=""
                name="auto_global_round_duration"
                type="number"
                tabIndex={1}
                leftSideError
              />
              <div className={styles.robotRoundDays}>
                <SelectField
                  options={[
                    { label: 'Hours', value: 'hours' },
                    { label: 'Days', value: 'days' }
                  ]}
                  wrapperCustomClass={styles.customSelectWrapper}
                  label=""
                  name="auto_global_round_granularity"
                  tabIndex={2}
                  leftSideError>
                </SelectField>
              </div>
            </div>
          </div>

          <div className={styles.noSmartRobotRound + ' ' + styles.noSmartCyclesRound}>
            <span className={styles.radioFieldTitile}>
              Cycles per Round
            </span>
            <div className={styles.noSmartCycles}>
              <TextField
                label=""
                name="auto_global_cycles"
                tabIndex={3}
                leftSideError
                type="number"/>
            </div>
          </div>

          <div className={styles.noSmartRobotRound + ' ' + styles.noSmartAge}>
            <p className={styles.radioFieldTitile}>
              Age of Data
            </p>
            <div>
              <RadioField
                optionClassName={styles.option}
                name="auto_global_age" options={ageOption}
                tabIndex={7}/>
            </div>
          </div>


        </div>
      </div>
    );
  }

  render() {
    const {
      formTab = tabs[0].value,
      handleSubmit,
      status,
      activeExchangeAccount,
      smartSettings,
    } = this.props;

    const activeMenuIndex = Math.max(tabs.findIndex(menu => menu.value === formTab), 0);
    const Control = tabs[activeMenuIndex][smartSettings ? 'simpleControl' : 'advancedControl'];
    const $smartSettings = this.renderSmartSettings();
    const $smartGlobalSettings = this.renderSmartGlobalSettings();
    const $advancedGlobalSettings = this.renderAdvancedGlobalSettings();

    const exchangeColor = (activeExchangeAccount.exchange_id === 'bittrex' ? 'orange' : 'blue');

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="relative">
        <div className={myAccountStyles.rightPanelSub}>
          <div className={styles.header}>
            <div className={styles.account}>
              <div className={styles.currentAccount}>
                <div className={styles.accountName}>{activeExchangeAccount.name}</div>
                <div className={activeExchangeAccount.id ? styles.cycle : ''}></div>
              </div>
              <div
                className={styles.exchangeName + ' ' + exchangeColor}>
                {_.capitalize(activeExchangeAccount.exchange_id)}
              </div>
            </div>
            <div className={styles.accountDropdown}>
              <ExchangeAccountsDropdown></ExchangeAccountsDropdown>
            </div>
          </div>
          <Loader isOpen={_.isEmpty(activeExchangeAccount)}></Loader>
          {$smartSettings}
          {smartSettings ? $smartGlobalSettings : $advancedGlobalSettings}
          <ButtonGroup
            activeIndex={activeMenuIndex}
            className="medium"
            buttons={tabs}
          />
          {<Control/>}
        </div>
        <div className={myAccountStyles.bottomPanel}>
          <div className={myAccountStyles.rightPanelSub}>
            <Button
              submit
              className="large blue"
              style={{ width: 250 }}
              loading={status.loading}
            >SAVE SETTINGS</Button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors:any = {};

  [
    'auto_global_cycles',
    'auto_entry_maximum_ati',
    'auto_entry_hold_time',
    'auto_entry_position_btc',
    'auto_entry_open_time',
  ].forEach(field => {
    if (!isProvided(values[field]) || !isNumber(values[field])) {
      errors[field] = 'Please provide a valid number';
    }
  });

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const merged = mergeWithoutNull(defaultInitialValues, state.exchangeAccountsDropdown.activeExchangeAccount.data);
  merged.smart_settings = merged.auto_global_strategy === 'simple';
  return ({
    status: state.robotSettings.status,
    activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
    initialValues: merged,
    smartSettings: _.get(state, 'form.robotSettings.values.smart_settings'),
    ...ownProps,
  });
};

const mapDispatchToProps = ({
  saveSettings,
});

const form = reduxForm({
  form: 'robotSettings',
  validate,
  enableReinitialize: true,
})(RobotSettings);

export default connect(mapStateToProps, mapDispatchToProps)(form);
