import * as React from "react";
import { connect } from "react-redux";
import Button from "Elements/Button";
import Dropdown from "Elements/Dropdown";
import Modal from "Elements/Modal";
import Loader from "Elements/Loader";
import { fetchTrades, openDeactivateRobot, cancelDeactivate, confirmDeactivate } from "./actions";

const styles = require('./execution.css');

const fields = [{
  name: 'coin_sold',
  label: 'Coin Sold',
}, {
  name: 'coin_bought',
  label: 'Coin Bought',
}, {
  name: 'time',
  label: '',
}, {
  name: 'price_bought',
  label: 'Price Bought',
}, {
  name: 'frugility_ratio',
  label: 'Frugility Ratio',
}];


class Execution extends React.Component<any> {

  componentDidMount() {
    this.props.fetchTrades();
  }

  renderTrades() {
    const { trades } = this.props;

    return trades.map((m, index) => {
      return (
        <div key={index} className={styles.trade + ' ' + (m.coin_sold ? styles.sold : styles.bought)}>
          <div className={styles.tradeDetail}>
            {fields.map((f, i) => {
              const isTime = f.name === 'time';
              return m[f.name] ? (
                <div key={i} className={styles.fieldRow}>
                  <div className={styles.tradeLable + ' ' + (isTime ? styles.time : '')}>
                    {isTime ? m.time : f.label}
                  </div>
                  <div className={styles.tradeName}>{isTime ? '' : m[f.name]}</div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      );
    });
  }

  render() {
    const {
      tradesStatus,
      openDeactivateRobot,
      deactivateRobotStatus,
      cancelDeactivate,
      confirmDeactivate,
    } = this.props;
    const $trades = this.renderTrades();
    console.log('tradesStatus', tradesStatus);

    return (
      <div className="container fluid">
        <div className={styles.headerFlex}>
          <div className={styles.dropdown}>
            <Dropdown
              minWidth={0}
              className="medium"
              menus={[
                { label: 'Samuel Rogers', value: 'samuel' },
                { label: 'Rogers', value: 'g' },
                { label: 'WSSW', value: 'ws' },
                { label: 'tSs', value: 'e' }
              ]}
            />
          </div>
          <div>
            <span className={styles.title}>Robot is currently active</span><br/>
            <span className={styles.description}>The robot has been active for 3d 12h 24m</span>
          </div>
          <div className={styles.dropdown}>
            <Button
              className="red medium"
              style={{ width: 180 }}
              onClick={() => openDeactivateRobot()}>
              DEACTIVATE ROBOT
            </Button>
          </div>
        </div>
        <div className={styles.tradesWrapper}>
          {$trades}
          <Loader isOpen={tradesStatus.loading}></Loader>
        </div>
        <Modal
          isOpen={deactivateRobotStatus.progressing}
          title='Deactivate Robot'
          confirmButtonText='DEACTIVATE'
          cancelButtonText='Cancel'
          onConfirm={confirmDeactivate}
          onCancel={cancelDeactivate}
          buttonStyle={{ width: 'auto' }}
          buttonClassName="medium red"
          buttonLoading={deactivateRobotStatus.loading}
        >
          <div>
            <p>
              Warning~
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trades: state.adminExecution.trades.data,
  tradesStatus: state.adminExecution.trades.status,
  deactivateRobotStatus: state.adminExecution.deactivateRobot.status,
});

const mapDispatchToProps = {
  fetchTrades,
  openDeactivateRobot,
  cancelDeactivate,
  confirmDeactivate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Execution);
