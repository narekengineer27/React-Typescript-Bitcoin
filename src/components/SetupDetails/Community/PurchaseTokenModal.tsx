import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';
import CustomText from 'Elements/CustomText';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { saveWalletAddress } from 'Components/SetupDetails/actions';

const styles = require('./community.css');

class PurchaseTokenModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            wallet: ''
        };
    }

    componentDidMount() {
        
    }

    changeWallet(e) {
        var returnObj = {};
        returnObj[e.target.name] = e.target.value;
    
        this.setState(returnObj);
    }

    saveWallet() {
        const { saveWalletAddress } = this.props;
        saveWalletAddress(this.state.wallet);
    }

    render() {
        const { isOpen, onCancel, width } = this.props;
        return (
                <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} noPadding={styles.noPadding}>
                    <div className={styles.content}>
                        <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                        <div className={styles.modalTitle}>
                            <span>Purchase Token Credit</span>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.modalDesc}>
                                <span>Payment for XRR Token Credit.</span>
                            </div>
                            <div className={styles.modalInput}>
                                {/* <CustomText  className="normal" type="text" value={this.state.wallet} onChange={this.changeWallet.bind(this)} name="wallet" label="Wallet Address used for the payment."/> */}
                                <div className={styles.addressModal}>0x4fA60A534EEeBaBE63e1Ec3C758Ad67aF29c321c</div>
                            </div>
                            <div className={styles.modalButton}>
                                <Button className={styles.button + ' medium blue'} onClick={this.saveWallet.bind(this)}>PAYMENT COMPLETED</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
    saveWalletAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTokenModal);
