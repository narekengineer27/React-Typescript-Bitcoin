import * as React from 'react';
const strategyStyles = require('../strategy-setup.css');
const styles = require('./approach.css');

class Continuous extends React.Component<any, any> {

  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={strategyStyles.rightPanelSub}>
        <div className={styles.descriptionRobot + ' col-lg-12'}>
          Robot will run continuously and it not going to stop until you deactivate it.
        </div>
      </div>
    );
  }
}

export default Continuous;

