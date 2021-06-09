import * as React from 'react';
import { connect } from 'react-redux';
import Loader from 'Elements/Loader';
import Button from 'Elements/Button';
import {
  fetchConfigurationData,
  cancelConfiguration,
  openConfiguration,
} from './actions';

const styles = require('./execution.css');

class TradingConfiguration extends React.Component<any> {

  componentDidMount() {
    this.props.fetchConfigurationData();
  }
  
  render() {
    const {
      fetchConfigurationData,
      cancelConfiguration,
      openConfiguration,
      configurationStatus,
      configuration,
    } = this.props;

    return (
      <div className={styles.videoWrapper}>
        <video autoPlay loop preload="auto" className={styles.video}>
          <source src="/public/assets/videos/WorkingRobot.mp4" type="video/mp4"/>
        </video>
        {configurationStatus.progressing ? (
          <div onClick={fetchConfigurationData} className={styles.configurationWrapper}>
            <Loader isOpen={configurationStatus.loading}></Loader>
            <div className={styles.configurationHeader}>
              <div className={styles.configurationTitle}>Configuration</div>
              <i
                className={"fa fa-times-thin fa-3x " + styles.icon}
                aria-hidden="true"
                onClick={cancelConfiguration}
              />
            </div>
            <div className={styles.configurationData}>
              <div>
                <p className={styles.indexTitle}>Target</p>
                <div className={styles.ratioFlex}>
                  <div className={styles.ratioTitle}>Percentage profit</div>
                  <div className={styles.ratioData}>{configuration.percentage_profit}</div>
                </div>
                <div className={styles.ratioFlex}>
                  <div className={styles.ratioTitle}>Number of days</div>
                  <div className={styles.ratio}>{configuration.number_of_days}</div>
                </div>
              </div>
              <div className={styles.frugalityRatio}>
                <p className={styles.indexTitle}>Frugality Ratio</p>
                <div>
                  <div className={styles.ratioFlex}>
                    <div className={styles.ratioTitle}>Number of coins</div>
                    <div className={styles.ratio}>{configuration.number_of_coins}</div>
                  </div>
                  <div className={styles.ratioFlex}>
                    <div className={styles.ratioTitle}>Frugality Ratio Threshold</div>
                    <div className={styles.ratio}>{configuration.frugality_ratio_threshold}</div>
                  </div>
                  <div className={styles.ratioFlex}>
                    <div className={styles.ratioTitle}>Target Score Threshold</div>
                    <div className={styles.ratio}>{configuration.target_score_threshold}</div>
                  </div>
                </div>
              </div>
              <div className={styles.editBtn}>
                <Button className="blue medium" style={{ width: 110 }}>Edit</Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            className={'large white ' + styles.configureButton}
            onClick={openConfiguration}
          >
            Trading Configuration
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    configuration: state.execution.configuration.data,
    configurationStatus: state.execution.configuration.status,
    ...ownProps,
  });

const mapDispatchToProps = {
    fetchConfigurationData,
    cancelConfiguration,
    openConfiguration,
  };

export default connect(mapStateToProps, mapDispatchToProps)(TradingConfiguration);
