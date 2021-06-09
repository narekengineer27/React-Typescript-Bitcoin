import * as React from 'react';
import { connect } from 'react-redux';
import { close, open } from './actions';
import { IState } from './types';
import Modal from 'Elements/Modal';

const styles = require('./activate-robot-modal.css');

class ActiveRobotModal extends React.Component<any, {}> {

  constructor(props){
    super(props);
  }

  render() {
    const {activateRobotIsOpen,onCloseRobot } = this.props;
    return (
      <Modal title="Activate Robot" isCloseable={true} noFooter={false} confirmButtonText={"Activate"}
             cancelButtonText={"Cancel"} isOpen={activateRobotIsOpen} onCancel={onCloseRobot}>
        <div className={styles.baseMain}>
          <p className={styles.info}>
            You have not saved the changes you made in the configuration,
            are you sure you want to activate the robot?
          </p>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
 let activateRobot = state.activateRobot as IState;
 return {
   activateRobotVisible: activateRobot.activateRobotVisible,
 };
};

 const mapDispatchToProps = {
   close,
   open
 };

export default connect(mapStateToProps, mapDispatchToProps)(ActiveRobotModal);

