import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Loader from 'Elements/Loader';
import ExchangeAccountsDropdown from 'Partials/ExchangeAccountsDropdown';
import Button from 'Elements/Button';
import Modal from 'Elements/Modal';
import Card from 'Components/Execution/Card';
import TradingActivity from './TradingActivity';
import TradingConfiguration from './TradingConfiguration';
import {
  openActivity,
  openStop,
  fetchCycles,
  openActivation,
  cancelActivation,
  activateRobot,
  cancelStop,
  confirmStop,
  clearData,
} from './actions';

const styles = require('./execution.css');

class Execution extends React.Component<any, any> {
  cycleTimer: any;

  constructor(props: any) {
    super(props);
    this.state = {
      timer: null,
      step: 0,
    };
  }

  componentWillMount() {
    this.refresh();
  }

  componentWillUnmount() {
    this.stopTimer();
    window.clearTimeout(this.cycleTimer);
    this.cycleTimer = null;
    this.props.clearData();
  }

  componentWillUpdate(nextProps: any) {
    const { lastSyncTime, cyclesStatus: { loading } } = this.props;
    if ((loading === true && nextProps.cyclesStatus.loading === false)
      || (lastSyncTime !== nextProps.lastSyncTime)) {
      this.cycleTimer = setTimeout(() => {
        this.refresh(true);
      }, 5000);
    }

    if (nextProps.isActive && !this.props.isActive) {
      this.startTimer();
    }

    if (!_.isEqual(this.props.activeExchangeAccount, nextProps.activeExchangeAccount)) {
      this.refresh(false, nextProps);
    }
  }

  startTimer() {
    const { cyclesData } = this.props;
    if (cyclesData.progress >= 0 && cyclesData.progress < 100) {
      this.setState({
        timer: window.setInterval(() => {
          this.setState({
            step: this.state.step + 1,
          });
        }, 1000),
      });
    } else {
      this.setState({ step: cyclesData.cycle_count });
    }
  }

  stopTimer() {
    if (this.state.timer) {
      window.clearInterval(this.state.timer);
      this.state.timer = null;
    }
  }

  refresh(silent: boolean = false, props = this.props) {
    const { activeExchangeAccount: { id } } = props;
    id && this.props.fetchCycles(id, silent);
  }

  activateRobot() {
    const { activeExchangeAccount: { id } } = this.props;
    this.props.activateRobot(id);
  }

  stopRobot() {
    const { activeExchangeAccount: { id } } = this.props;
    this.props.confirmStop(id);
  }

  render() {
    const {
      openActivity,
      openStop,
      activityStatus,
      cyclesStatus,
      cyclesData,
      isActive,
      robotStatus,
      cancelActivation,
      openActivation,
      cancelStop,
      stopStatus,
      exchangeAccountsStatus,
      activeExchangeAccount: { id },
    } = this.props;
    const { step } = this.state;
    const { cycle_count = 10, current_cycle, progress = 0 } = cyclesData;
    const stepFraction = step % (current_cycle + 1);
    const stepEpoch = Math.floor(step / (current_cycle + 1));

    const reachMax = (stepFraction >= current_cycle);
    const percentage = (100 / (cycle_count - 1) * stepFraction);
    const barStyles = {
      width: Math.min(100, (reachMax ? progress : percentage )) + '%',
    };

    return (
      <div className={'container-fluid ' + styles.wrapper}>

        <div className={styles.header}>
          <div className={styles.users}>
            <ExchangeAccountsDropdown/>
          </div>
          <h2>
            {exchangeAccountsStatus.loading ? 'Fetching your exchange accounts ...' : (
              cyclesStatus.loading ?
                'Checking Robot status ...' :
                `Robot is currently ${isActive ? 'active' : 'inactive'}`
            )}
          </h2>
          <div className={styles.buttons}>
            {!isActive && (
              <Button
                loading={cyclesStatus.loading || exchangeAccountsStatus.loading}
                className={'medium blue ' + styles.activateButton}
                onClick={openActivation}
              >
                Activate robot
              </Button>
            )}
            {isActive && (
              <div>
                <Button
                  className={'medium white ' + styles.activityButton}
                  onClick={openActivity}
                >
                  Activity
                </Button>
                <Button
                  className={'medium red ' + styles.stopButton}
                  onClick={openStop}>
                  Stop
                </Button>
              </div>
            )}
          </div>
        </div>

        {(isActive && id) ? (
          <div className="relative">
            <div className={styles.topSection}>
              <Loader isOpen={cyclesStatus.loading}></Loader>
              <div className={styles.progress}>
                <div className={styles.progressLineGray} key={stepEpoch}/>
                <div className={styles.progressLine} style={barStyles}/>

                {_.range(cycle_count).map(index => (
                  <div key={index}>
                    <div className={styles.progressBulletGray}>
                      {(index === 0 || (index < stepFraction)) && (
                        <div className={styles.progressBullet}>
                          <i className={`fa fa-check ${styles.checkIcon}`} aria-hidden="true"/>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cards}>
                <Card color="blue" title="Minimum FR Score" value={cyclesData.minimum_fr_count || 0} unit="coins"/>
                <Card color="green" title="Price / Volume" value={cyclesData.price_volume_count || 0} unit="coins"/>
                <Card color="orange" title="Average Time Interval" value={cyclesData.ati_count || 0} unit="coins"/>
                <Card color="red" title="Limiters" value={cyclesData.limiters_count || 0} unit="coins"/>
                <Card color="gray" title="Hold Time" value={cyclesData.hold_time || 0} unit="hours" noSpin/>
              </div>
            </div>
            {activityStatus.progressing ? <TradingActivity/> : null}
            <TradingConfiguration></TradingConfiguration>
          </div>
        ) : (
          <div className={styles.inactiveRobot}>
            <img className="full-width" src={`/public/assets/images/inactive-robot-min.png`} alt="Inactive Robot"/>
          </div>
        )}

        <Modal
          isOpen={robotStatus.progressing}
          title="Activate Robot"
          confirmButtonText="Activate"
          cancelButtonText="Cancel"
          onConfirm={this.activateRobot.bind(this)}
          onCancel={cancelActivation}
          buttonStyle={{ width: 150 }}
          buttonClassName="medium blue"
          buttonLoading={robotStatus.loading}
        >
          <div className={styles.headerTitle}>
            Do you really want to activate the robot?
          </div>
        </Modal>

        <Modal
          isOpen={stopStatus.progressing}
          title="Stop Robot"
          confirmButtonText="Stop"
          cancelButtonText="Cancel"
          onConfirm={this.stopRobot.bind(this)}
          onCancel={cancelStop}
          buttonStyle={{ width: 150 }}
          buttonClassName="medium red"
          buttonLoading={stopStatus.loading}
        >
          <div className={styles.headerTitle}>
            Are you sure you want to stop the robot?
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  activityStatus: state.execution.activity.status,
  stopStatus: state.execution.stop.status,
  cyclesStatus: state.execution.cycles.status,
  cyclesData: state.execution.cycles.data,
  isActive: state.execution.robot.active,
  robotStatus: state.execution.robot.status,
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  exchangeAccountsStatus: state.exchangeAccountsDropdown.exchangeAccounts.status,
  lastSyncTime: state.execution.cycles.lastSyncTime,
  ...ownProps,
});

const mapDispatchToProps = {
  openActivity,
  openStop,
  fetchCycles,
  openActivation,
  cancelActivation,
  activateRobot,
  confirmStop,
  cancelStop,
  clearData,
};

const form = reduxForm({
  form: 'executionForm',
  enableReinitialize: true,
})(Execution);

export default connect(mapStateToProps, mapDispatchToProps)(form);
