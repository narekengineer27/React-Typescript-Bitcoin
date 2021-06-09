import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';

const styles = require('./verify-modal.css');

class VerifyModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { isOpen, onCancel, width } = this.props;

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
                <img className={styles.logo} src="/public/assets/images/dashboard/bottomImage.png"/>
                <div onClick={onCancel} className={styles.closeBtn}>
                    <img src="/public/assets/images/dashboard/close.png"/>
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span>
                            welcome member
                        </span>
                    </div>
                    <div className={styles.verifyMark}>
                        <img src="/public/assets/images/dashboard/check.png"/>
                    </div>
                    <div className={styles.bigText}>
                        <span>Your Account is Verified.</span>
                    </div>
                    <div className={styles.smallText}>
                        <span>Explore the XchangeRate Ecosystem</span>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button className={styles.continueBtn + ' small blue'}>Continue</Button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyModal);
