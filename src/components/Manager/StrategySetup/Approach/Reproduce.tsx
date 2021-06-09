import * as React from 'react';
import TextField from 'Elements/TextField';
const strategyStyles = require('../strategy-setup.css');
const styles = require('./approach.css');

class Reproduce extends React.Component<any, any> {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={strategyStyles.rightPanelSub}>
        <div className={styles.descriptionRobot + ' col-lg-12'}>
          Robot will run until profit percentage reaches 100%.
        </div>
        <div className="row">
          <div className="col-lg-4">
            <TextField label="Percentage Profit" name="percentage_profit" type="number" tabIndex={1} leftSideError />
          </div>
        </div>
        <div className={styles.messageBox + ' row'}>
          <div className="col-lg-12">
            <span className={styles.message}>* Current Balance is fetched from Exchange</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Reproduce;

