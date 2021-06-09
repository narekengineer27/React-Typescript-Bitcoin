import * as React from 'react';
import { connect } from 'react-redux';
import Dropdown from 'Elements/Dropdown';
import TextField from 'Elements/TextField';
import { saveSettings } from './actions';

const styles = require('./robot-settings.css');

class EntryForm extends React.Component<any> {

  renderTradeEntryCondition() {
    return (
      <div className={styles.section}>
        <h4 className={styles.title}>Specific Trade Entry Condition</h4>
        <p className={styles.radioFieldTitile}>Determinant</p>
        <div className={styles.determinantWrapper}>
          <div>
            <p className={styles.radioFieldTitile}>Suitability Index</p>
            <div className={styles.priceFlex}>
              <div className={styles.smartMovement}>
                <span className={styles.radioFieldTitile}>Threshold</span>
                <TextField label="" name="auto_entry_maximum_ati" tabIndex={4} leftSideError type="number"/>
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
        <div className={styles.smartLimitersWrapper}>
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
          <div className={styles.timeAllowed}>
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

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
