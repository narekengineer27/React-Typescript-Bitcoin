import * as React from 'react';
import TextField from 'Elements/TextField';
const strategyStyles = require('../strategy-setup.css');
const styles = require('./exit.css');

class PriceRelativity extends React.Component<any, any> {

  constructor(props){
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
            <TextField label="Relativity Ratio" name="relativity_ratio" type="number" tabIndex={1} leftSideError />
          </div>
        </div>
        <div className={'row ' + styles.inputBase}>
          <div className="col-lg-4">
            <TextField label="Number of Coins" name="number_of_coins" type="number" tabIndex={1} leftSideError />
          </div>
        </div>
      </div>
    );
  }
}

export default PriceRelativity;
