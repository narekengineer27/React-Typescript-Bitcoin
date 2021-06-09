import * as React from 'react';
import 'Styles/table.less';
import Button from 'Elements/Button';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import CustomModal from 'Components/CustomModal';

const styles = require('./token-modal.css');

export default class TokenBalenceCheckModal extends React.Component<{}, {}> {

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
                    <i className={styles.checkIcon + " fa fa-check-circle-o"} aria-hidden="true"></i>
                </div>
                <div className={styles.modalTitle}>
                    <span>Token Balance Check</span>
                </div>
                <div className={styles.modalDesc}>
                    <span>Welcome to the XchangeRate Market Maker Dashboard</span>
                </div>
                <div className={styles.modalDesc}>
                    <span><span className={styles.bold}>Click Here</span> for a tour guide on how to use its features</span>
                </div>
                <div className={styles.footerText}>
                    <span>
                        this window should come up at next login
                    </span>
                </div>
            </div>
        </CustomModal>
    );
  }
}
