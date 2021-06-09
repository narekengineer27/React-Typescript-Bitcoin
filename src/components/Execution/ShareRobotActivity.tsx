import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import Modal from 'Elements/Modal';
import { cancelShare } from './actions';
import { facebookInit, facebookShare } from 'Utils/social';
import { loadUrl } from 'Components/MyAccount/MentorProgram/actions';
import { returntypeof } from 'Utils/type';

const styles = require('./execution.css');

class ShareRobotActivity extends React.Component<Props> {

  componentWillMount() {
    facebookInit();
    this.props.loadUrl();
  }

  onSubmit() {
  }

  render() {
    const {
      shareStatus,
      cancelShare,
      handleSubmit,
      totalProfit,
      totalProfitInBtc,
    } = this.props;

    const url = this.props.url.data;

    const tweet = `XchangeRate Robot brought me a total profit of ${totalProfitInBtc} BTC. Sign up at ${url}`;
    const fbMessage = `XchangeRate Robot brought me a total profit of ${totalProfitInBtc} BTC. Sign up here!`;

    return (
      <Modal
        isOpen={shareStatus.progressing}
        noFooter={true}
        title="Share Robot Activity"
        onCancel={cancelShare}
        buttonStyle={{ width: 150 }}
        buttonClassName="medium blue"
        buttonLoading={shareStatus.loading}
      >
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className={styles.shareWrapper}>
            <div className={styles.shareHeader}>
              <div>
                <Link to="/mtr" className="flex">
                  <div className={styles.logo}/>
                </Link>
                <div className={styles.shareHeaderTitle}>Robot Activity Report</div>
              </div>
              <div className={styles.reportDate}>03.10.2017.</div>
            </div>
            <div className={styles.mainReport}>
              <div className={styles.mainReportLeft}>
                <div>
                  <span className={styles.profitTitle}>Total Profit  </span>
                  <i className={'fa fa-caret-up ' + styles.faIcon} aria-hidden="true"/>
                </div>
                <div className={styles.profit}>
                  {totalProfit}
                </div>
              </div>
              <div className={styles.mainReportRight}>
                <div className={styles.profitTitle + ' ' + styles.cycleCount}>27 total cycles</div>
                <div className={styles.profit}>{totalProfitInBtc}</div>
              </div>
            </div>
          </div>
          <div className="flex margin-top">
            <p className={styles.shareOnSocial}>Share link on social media</p>
            <div>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`}
                target="_blank"
                className={styles.socialIcon}
              >
                <img src="/public/assets/images/icon-twitter.svg" alt=""/>
              </a>
              <img
                src="/public/assets/images/icon-facebook.svg"
                alt=""
                onClick={() => facebookShare('XChangeRate Robot', fbMessage, url)}
                className={styles.socialIcon}
              />
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  shareStatus: state.execution.share.status,
  totalProfit: state.execution.activity.totalProfit,
  totalProfitInBtc: state.execution.activity.totalProfitInBtc,
  url: state.mentorProgram.url,
  ...ownProps,
});

const mapDispatchToProps = {
  cancelShare,
  loadUrl,
};

const form = reduxForm({
  form: 'shareRobotActivityForm',
  enableReinitialize: true,
})(ShareRobotActivity);

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(form);
