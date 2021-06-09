import * as React from 'react';
import Target from './Target';
import Continuous from './Continuous';
import Reproduce from './Reproduce';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ButtonGroup from 'Elements/ButtonGroup';
import Button from 'Elements/Button';
const strategyStyles = require('../strategy-setup.css');
const styles = require('./approach.css');

class ApproachForm extends  React.Component<any, any> {

  constructor(props){
    super(props);
    this.state = {
      activeApproachIndex: 'Target',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
  }

  onChange(button: any) {
    this.setState({
      activeApproachIndex: button.value,
    });
  }

  onSubmit(values: object) {
    // this.props.saveProfile(values);
  }

  render() {
      const { handleSubmit } = this.props;
      const { activeApproachIndex } = this.state;
    return (
      <div>
        <div className={strategyStyles.rightPanelSub}>
          <div className="row">
            <div className="col-lg-12">
              <span className={styles.subTitle}>Approach Setting</span>
            </div>
          </div>
          <div className={styles.description}>
            Approach defines what is the target of the robot, so that it can deactivate itself when
            the target is met. This choice also affects how progress is displayed to the user.
          </div>
          <ButtonGroup
            className="medium"
            buttons={[
              { label: 'Target', value: 'Target' },
              { label: 'Continuous', value: 'Continuous' },
              { label: 'Reproduce', value: 'Reproduce' },
            ]}
            onChange={this.onChange.bind(this)}
          />
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {(activeApproachIndex == 'Target') ? <Target {...this.props}/> : (activeApproachIndex == 'Continuous') ? <Continuous {...this.props}/> : (activeApproachIndex == 'Reproduce')? <Reproduce {...this.props}/> :true}
        </form>
        <div className={strategyStyles.bottomPanel}>
          <div className={strategyStyles.rightPanelSub + ' row'}>
            <Button submit tabIndex={6}
                    className={"large blue pull-left "+ strategyStyles.submitButton}>
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
};

const form = reduxForm({
  form: 'approach-setup',
  enableReinitialize:true,
})(ApproachForm);

const mapStateToProps = state => {
  return ({});
};

export default connect(mapStateToProps, mapDispatchToProps)(form);

