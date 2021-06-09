import * as React from 'react';
import { connect } from 'react-redux';
import ActiveRobotModal from './ActiveRobotModal';

class ActivateRobot extends React.Component<any, any> {
  constructor(props){
    super();
  }

  render() {
    return <ActiveRobotModal {...this.props}/>;
  }
}
 const mapStateToProps = state => ({
   activateRobotVisible: state.activateRobot.activateRobotVisible,
 });

export default connect(mapStateToProps)(ActivateRobot);
