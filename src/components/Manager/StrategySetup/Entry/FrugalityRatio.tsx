import * as React from "react";
import TextField from "Elements/TextField";
import RadioField from "Elements/RadioField";

const strategyStyles = require('../strategy-setup.css');
const styles = require('./entry.css');
const optionValues = [{
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

class FrugalityRatio extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={strategyStyles.rightPanelSub}>
        <div className={styles.descriptionRobot + ' col-lg-12'}>
          Robot will run for a number of days, and then deactivate itself. Percentage is used to
          display the progress of the robot. As profits accumulate the profit percentage increases.
        </div>
        <div className="row">
          <div className="col-lg-4">
            <TextField label="Number of coins" name="number_of_coins" type="number" tabIndex={1} leftSideError/>
          </div>
        </div>
        <div className="row">
          <div className={styles.radioBoxs}>
            <div className={styles.radioTitle}>Frugality Ratio Threshold</div>
            <RadioField
              optionClassName={styles.option}
              horizontal
              name="frugality_ratio_threshold" options={optionValues}
              tabIndex={2}/>
          </div>
        </div>
        <div className={'row ' + styles.daysInput}>
          <div>
            <TextField label="Target Score Threshold" name="target_score_threshold" type="number" tabIndex={3}
                       leftSideError/>
          </div>
        </div>
      </div>
    );
  }
}

export default FrugalityRatio;

