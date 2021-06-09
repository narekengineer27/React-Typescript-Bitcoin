import * as React from 'react';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import Modal from 'Elements/Modal';

const styles = require('./policy-modal.css');

interface ModalProps {
    isOpen?: boolean;
    loading?: boolean;
    width?: number;
    onConfirm?(): void;
    onCancel?(): void;
}

class PolicyModal extends React.Component<ModalProps, {}> {

    public static defaultProps: ModalProps = {
        isOpen: false,
        loading: false,
        onConfirm: () => {
        },
        onCancel: () => {
        },
        width: 500,
    };

  constructor(props: any) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const {isOpen, onConfirm, onCancel, width} = this.props;
    return (
        <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={700}>
            <div className={styles.title}>
              <span>GDPR Policy</span>
            </div>
            <div className={styles.content}>
              <span className={styles.pharagraph}>
                  Dear Valued User, 
              </span>
              <span className={styles.pharagraph}>
                  As at May 25 2018, the General Data Protection Regulation (GDPR) came into effect, affecting users in the European Union. As defined by Council of the European Union: http://www.consilium.europa.eu/en/policies/data-protection-reform/data-protection-regulation/

              </span>
              <span className={styles.pharagraph}>
                  "The General Data Protection Regulation (GDPR) (EU) 2016/679 is a regulation in EU law on data protection and privacy for all individuals within the European Union (EU) and the European Economic Area (EEA). It also addresses the export of personal data outside the EU and EEA areas. The GDPR aims primarily to give control to citizens and residents over their personal data and to simplify the regulatory environment for international business by unifying the regulation within the EU."
                  Source: http://data.consilium.europa.eu/doc/document/ST-9565-2015-INIT/en/pdf

              </span>
              <span className={styles.pharagraph}>
                  Our relationship with you is fundamentally based on consent. We do not collect or use your data without your consent. As a result, we have included this landing page to inform users of this change in EU privacy regulation. In order to use this service, we are required to access certain information upon the signup process. All information pertaining to data collection and the measures we take to protect your data is detailed in our privacy policy, which can be found here. Furthermore, in compliance with the GDPR, we require your consent to receive electronic marketing communication (for example: email marketing, exclusive offers, etc.). We have included an "Opt-In" box at the bottom of this page (not a requirement for use of service). However, certain email communication is necessary for usage of our service. This includes Login Notifications, Withdrawal Confirmations, Deposit Notifications and 2-Factor Authentication (this can be replaced with Google Authenticator, Authy, or Trezor). We highly recommend not turning off 2-Factor Authentication, as this provides the maximum amount of security for your account, This communication is necessary to use the Xchangerate platform.

              </span>
              <span className={styles.pharagraph}>
                  Please check the box below to confirm you understand and consent to continue using Xchangerate service. If you chose not to consent, we will grant you a period of 15 business days from the moment you sign in to move your funds into separate digital wallets of your choosing. After 90 days, your account and all data within will be deleted.

              </span>
              <span className={styles.pharagraph}>
                      I consent to have Xchagerate.io access my data required for use of the platform, as per Xchangerate's privacy policy.
              </span>
              <span className={styles.pharagraph}>
                      I consent to receive electronic marketing communication from Xchangerate.io, including e-mail offers and marketing notifications.

              </span>
              <span className={styles.pharagraph}>
                  Thank you for taking the time to read this. We value each and every one of our customers and will continue to provide the best experience possible.
              </span>
              <span className={styles.pharagraph_bottom}>
                  The XchangerateTeam
              </span>
            </div>
            <div className={styles.buttonWrapper}>
                <Button className={styles.agreeBtn + ' small blue'} onClick={onConfirm}>I Agree</Button>
            </div>
        </Modal>
    );
  }
}


const mapDispatchToProps = {
};

const mapStateToProps = state => {
  return ({});
};

export default connect(mapStateToProps, mapDispatchToProps)(PolicyModal);
