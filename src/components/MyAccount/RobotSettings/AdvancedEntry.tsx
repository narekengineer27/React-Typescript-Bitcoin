import * as React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'Elements/Dropdown';
import TextField from 'Elements/TextField';
import RadioField from 'Elements/RadioField';
import SelectField from 'Elements/SelectField';
import { saveSettings } from './actions';

const styles = require('./robot-settings.css');

const frScoreOptions = [{
  value: '25',
  label: '25%',
}, {
  value: '50',
  label: '50%',
}, {
  value: '75',
  label: '75%',
}, {
  value: '100',
  label: '100%',
}];

const movementOptions = [{
  value: 'progressive',
  label: 'Progressive',
}, {
  value: 'regressive',
  label: 'Regressive',
}];

const initialChangeDirectionOptions = [{
  value: 'positive',
  label: 'Positive',
}, {
  value: 'negative',
  label: 'Negative',
}, {
  value: 'any',
  label: 'Any',
}];


class AdvancedEntryForm extends React.Component<any> {

  renderTradeEntryCondition() {
    return (
      <div className={styles.section}>
        <h4 className={styles.title}>Specific Trade Entry Condition</h4>
        <div>
          <p className={styles.radioFieldTitile}>Minimum FR Score</p>
          <div className={styles.frScore}>
            <RadioField
              optionClassName={styles.option}
              name="auto_entry_minimum_fr" options={frScoreOptions}
              horizontal
              tabIndex={7}/>
          </div>
        </div>
        <div>
          <p className={styles.radioFieldTitile}>Determinant</p>
          <div className={styles.determinantWrapper + ' ' + styles.noBackground}>
            <div>
              <p className={styles.radioFieldTitile}>
                Price (highest prices attained in each of the hours under watch)
              </p>
              <div className={styles.priceFlex}>
                <div className={styles.movement}>
                  <p className={styles.radioFieldTitile}>Movement</p>
                  <div>
                    <RadioField
                      optionClassName={styles.option}
                      name="auto_entry_price_movement" options={movementOptions}
                      tabIndex={7}/>
                  </div>
                </div>
                <div className={styles.initial}>
                  <p className={styles.radioFieldTitile}>Initial Change Direction</p>
                  <div>
                    <RadioField
                      optionClassName={styles.option}
                      name="auto_entry_price_sign" options={initialChangeDirectionOptions}
                      tabIndex={7}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className={styles.radioFieldTitile}>Volume (Sum of buys in each of the hours,  4 hours behind)</p>
              <div className={styles.priceFlex}>
                <div className={styles.movement}>
                  <p className={styles.radioFieldTitile}>Movement</p>
                  <div>
                    <RadioField
                      optionClassName={styles.option}
                      name="auto_entry_volume_movement" options={movementOptions}
                      tabIndex={7}/>
                  </div>
                </div>
                <div className={styles.initial}>
                  <p className={styles.radioFieldTitile}>Initial Change Direction</p>
                  <div>
                    <RadioField
                      optionClassName={styles.option}
                      name="auto_entry_volume_sign" options={initialChangeDirectionOptions}
                      tabIndex={7}/>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className={styles.radioFieldTitile}>Suitability Index</p>
              <div className={styles.priceFlex}>
                <div className={styles.threshold}>
                  <span className={styles.radioFieldTitile}>Threshold</span>
                  <div className={styles.thresholdTextField}>
                    <TextField label="" name="auto_entry_maximum_ati" tabIndex={4} leftSideError type="number"/>
                  </div>

                </div>
                <div className={styles.initial}>
                  <p className={styles.radioFieldTitile}>Movement</p>
                  <div>
                    <RadioField
                      optionClassName={styles.option}
                      name="auto_entry_ati_movement" options={movementOptions}
                      tabIndex={7}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={styles.radioFieldTitile}>Limiters (Optional)</p>
          <div className={styles.determinantWrapper}>
            <div className={styles.limitersFlex}>
              <div className={styles.limitersVariance}>
                <TextField
                  label="Minimum Liquidity Variance"
                  name="auto_entry_minimum_liquidity_variance"
                  type="number"
                  smallLabel
                  tabIndex={6}
                  leftSideError
                />
              </div>
              <div className={styles.limiterPRR}>
                <TextField
                  label="Minimum PRR"
                  name="auto_entry_minimum_prr"
                  type="number"
                  smallLabel
                  tabIndex={6}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={styles.radioFieldTitile}>Event</p>
          <div className={styles.determinantWrapper}>
            <div className={styles.event}>
              <TextField
                label="Hold Time"
                name="auto_entry_hold_time"
                type="number"
                tabIndex={5}
                leftSideError
              />
              <div className={styles.robotRoundDays}>
                <SelectField
                  options={[
                    { label: 'Hours', value: 'hours' },
                    { label: 'Minutes', value: 'minutes' }
                  ]}
                  wrapperCustomClass={styles.customSelectWrapper}
                  label=""
                  name="auto_entry_hold_time_granularity"
                  tabIndex={2}
                >
                </SelectField>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  renderTradeEntrySettings() {
    return (
      <div className={styles.section}>
        <h4 className={styles.title}>Special Trade Entry Settings</h4>
        <div className={styles.limitersWrapper}>
          <div className={styles.amount}>
            <TextField
              label="BTC used for each entry position"
              name="auto_entry_position_btc"
              type="number"
              smallLabel
              tabIndex={5}
              leftSideError
            />
            <div className={styles.currency}>
              <Dropdown
                minWidth={0}
                className="tiny"
                menus={[{ label: 'BTC', value: 'btc' }]}
              />
            </div>
          </div>
          <div className={styles.openTime}>
            <TextField
              label="Time allowed for opened orders (minutes)"
              name="auto_entry_open_time"
              type="number"
              smallLabel
              tabIndex={6}
              leftSideError
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const $condition = this.renderTradeEntryCondition();
    const $tradeEntrySettings = this.renderTradeEntrySettings();

    return (
      <div>
        <div className={styles.description}>
          Entry defines the condition at which the robot decides to purchase the coins.
        </div>
        {$condition}
        {$tradeEntrySettings}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  status: state.robotSettings.status,
  ...ownProps,
});

const mapDispatchToProps = ({
  saveSettings,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedEntryForm);
