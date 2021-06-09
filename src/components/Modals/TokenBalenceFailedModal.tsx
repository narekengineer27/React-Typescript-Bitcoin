import * as React from 'react';
import 'Styles/table.less';
import Button from 'Elements/Button';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import CustomModal from 'Components/CustomModal';

const styles = require('./token-modal.css');

export default class TokenBalenceFailedModal extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  onConfirm(values: object) {
    this.setState({
        isOpen: false
    })
  }

  onCancel() {
    this.setState({
        isOpen: false
    })
  }

  openModal() {
    this.setState({
        isOpen: true
    })
  }

  render() {

    const { isOpen } = this.props;

    const options = [
        {value: '1', label: 'Exchanges1'}
    ];

    return (
        <CustomModal isOpen={isOpen && this.state.isOpen} onConfirm={this.onConfirm.bind(this)} onCancel={this.onCancel.bind(this)}>
            <div className={styles.modalWrapper}>
                <div>
                    <i className={styles.failedIcon + " fa fa-times-circle-o"} aria-hidden="true"></i>
                </div>
                <div className={styles.modalTitle}>
                    <span>Token Balance is Insufficient</span>
                </div>
                <div className={styles.modalDesc}>
                    <span>You are required to have 00000XRR tokens in you wallewt to be able to access the dashboard</span>
                </div>
                <div className={styles.modalDesc}>
                    <span>You have insufficient Token Balance to Access the dashboard visit the following exchanges to purchase XRR tokens or mail support@xchangerate.io</span>
                </div>
                <div className={styles.imgWrapper}>
                    <img src="/public/assets/images/landing1/plaakLogoNormal.png"/>
                    <img src="/public/assets/images/landing1/tradeLogoNormal.png"/>
                    <img src="/public/assets/images/landing1/BitmartLogoNormal.png"/>
                </div>
            </div>
        </CustomModal>
    );
  }
}
