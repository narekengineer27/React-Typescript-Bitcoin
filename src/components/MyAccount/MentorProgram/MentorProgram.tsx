import * as React from 'react';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import { TextFieldComponent } from 'Elements/TextField';
import { Table, TableCell, TableRow } from 'Elements/Table';
import { IState } from './types';
import { loadReferrals, loadUrl, openSetWallet, setWallet } from './actions';
import { returntypeof } from 'Utils/type';
import { round } from 'Utils/math';
import SetWalletModal from 'Components/MyAccount/MentorProgram/SetWalletModal';
import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';
import { facebookInit, facebookShare } from 'Utils/social';

const styles = require('./mentor-program.css');

const MSG_COPY = {};

class MentorProgram extends React.Component<Props, {}> {
  textLink: TextFieldComponent;

  componentWillMount() {
    this.props.loadReferrals();
    this.props.loadUrl();
    facebookInit();
  }

  render() {
    const { referrals, url, openSetWallet, } = this.props;
    const items = referrals.data.list || [];

    if (!referrals.status.success || !url.status.success) {
      // First load, we don't show anything
      if (referrals.data.has_wallet === undefined) {
        return <div className={styles.placeholder}/>;
      }
    }

    const referralUrl = url.data;
    const registered = !!referrals.data.has_wallet;

    if (!registered || items.length === 0) {
      return this.renderStart(referralUrl, registered);
    }

    return (
      <div className={styles.mainContent}>
        <div className={styles.panelTop}>
          <div className={styles.panelTopContent}>
            <div className={styles.left}>
              <div className={styles.leftHeader}>
                <h3><img src="/public/assets/images/icon-mentor-badge.svg" alt="Mentor Badge"/> Become Mentor</h3>
                <div className={styles.changeWallet} onClick={openSetWallet}>Change Wallet ID?</div>
              </div>
              <p>Use this link to invite people to join our platform. For every package that they purchases,
                you receive 25% of the package total amount in BTC</p>

              <div className={styles.leftControls}>
                {this.renderLinkBox(referralUrl)}
              </div>
            </div>

            <div className={styles.right}>

              <div className={styles.referrals}>
                <label>Referrals</label>
                {items.length}
              </div>
              <div className={styles.total}>
                <label>Total earned</label>
                {round(referrals.data.total)} BTC
              </div>

              <h4>Share link on social media:</h4>
              {this.renderShareButtons(referralUrl)}
            </div>
          </div>

          {!registered && this.renderRegistrationFooter()}
        </div>

        <div className={styles.bottomPanel}>
          <Table>
            <TableRow>
              <TableCell className="th">Referral</TableCell>
              <TableCell className="th">Bonus Date</TableCell>
              <TableCell className="th">Bonus Earned</TableCell>
            </TableRow>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.mentee.name}</TableCell>
                <TableCell>{item.created_at}</TableCell>
                <TableCell>{round(item.mentor_bonus_to_pay)} BTC</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>

        <SetWalletModal/>
      </div>

    );
  }

  renderStart(url: string, registered: boolean) {
    return (
      <div className={styles.panelStart}>
        <div className={styles.panelStartContent}>
          <img src="/public/assets/images/icon-mentor-badge.svg" alt="Mentor Badge" className={styles.panelStartLogo}/>
          <h1>Become Mentor</h1>
          <p className={styles.panelStartMessage}>
            We offer you an opportunity to become a Mentor by inviting other users to join
            and earn bonus from their activities
          </p>
          <hr/>

          <p>Use this link to invite people to join our platform. For every package that they purchases,
            you receive 25% of the package total amount in BTC</p>

          <div className={styles.startLinkBox}>
            {this.renderLinkBox(url)}
          </div>

          <div className={styles.startShare}>
            <h4>Share link on social media</h4>
            {this.renderShareButtons(url)}
          </div>

        </div>

        {!registered && this.renderRegistrationFooter()}
        <SetWalletModal/>
      </div>
    );
  }

  renderRegistrationFooter() {
    return (
      <div className={styles.registrationFooter}>
        <div>
          In order to receive rewards, you need to register your Wallet ID.
          Otherwise you will miss your rewards.
        </div>

        <Button
          className={'medium blue ' + styles.buttonRegister}
          onClick={() => this.props.openSetWallet()}
        >
          Register Id
        </Button>
      </div>
    );
  }

  renderShareButtons(url: string) {
    const tweet = 'XchangeRate Robot brings a unified interface to manage ' +
      'your trades across all major exchanges. Sign up at ' + url;

    const fbMessage = 'XchangeRate Robot brings a unified interface to manage ' +
      'your trades across all major exchanges. Sign up here!';

    return (
      <div className={styles.shareButtons}>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`} target="_blank">
          <img src="/public/assets/images/icon-twitter.svg" alt=""/>
        </a>
        <img
          src="/public/assets/images/icon-facebook.svg"
          alt=""
          onClick={() => facebookShare('XChangeRate Robot', fbMessage, url)}
        />
      </div>
    );
  }

  renderLinkBox(url: string) {
    const link = {
      input: { value: url, readOnly: true },
      label: 'Link', meta: {}, name: '',
    };

    return (
      <div className={styles.linkBox}>
        <TextFieldComponent {...link} ref={r => this.textLink = r}/>
        <Button className={'medium blue ' + styles.copy} onClick={() => this.onButtonCopyClick()}>Copy
          Link</Button>
      </div>
    );
  }

  onButtonCopyClick() {
    this.props.hideMessage(MSG_COPY);

    this.textLink.input.select();
    try {
      document.execCommand('copy');
      this.props.showMessage('The link has been copied to your clipboard.', 'success', MSG_COPY);
    } catch (err) {
      this.props.showMessage(
        'Could not copy the link due to security restrictions in your browser. ' +
        'Please select the text of the link and copy it manually.',
        'warning', MSG_COPY);
    }
  }
}

const mapStateToProps = rootState => {
  const state = rootState.mentorProgram as IState;
  return {
    referrals: state.referrals,
    url: state.url,
  };
};

const mapDispatchToProps = {
  loadReferrals,
  loadUrl,
  setWallet,
  openSetWallet,
  showMessage,
  hideMessage,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MentorProgram);
