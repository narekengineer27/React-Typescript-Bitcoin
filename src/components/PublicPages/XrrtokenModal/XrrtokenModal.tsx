import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';

const styles = require('./xrrtoken.css');

class XrrtokenModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { isOpen, onCancel, width } = this.props;
        return (
                <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>
                    <div className={styles.content}>
                        <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                        <img src="/public/assets/images/landing1/xrAsset.png"/>
                        <div className={styles.text}>
                            <span>XRR Token can be purchased</span>
                            <span>at the following exchanges.</span>
                        </div>
                        <div className={styles.exchanges}>
                            <div className={styles.row}>
                                <div className={styles.w_3}>
                                    <img src="/public/assets/images/landing1/plaakLogoNormal.png"/>
                                    <span>COMING SOON</span>
                                </div>
                                <div className={styles.w_3}>
                                    <img src="/public/assets/images/landing1/tradeLogoNormal.png"/>
                                    <span>COMING SOON</span>
                                </div>
                                <div className={styles.w_3}>
                                    <img src="/public/assets/images/landing1/BitmartLogoNormal.png"/>
                                </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(XrrtokenModal);
