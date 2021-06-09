import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';

const styles = require('./coming-soon.css');

class ComingSoon extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false
        };
    }

    componentDidMount() {
        
    }

    changeAccess() {
        var isAccess = this.state.isAccess;
        this.setState({
            isAccess: !isAccess
        })
    }

    render() {
        const { isOpen, onCancel, width } = this.props;

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5}>
                <img className={styles.logo} src="/public/assets/images/landing1/xrAsset.png"/>
                <span onClick={onCancel} className={styles.closeBtn}>X</span>
                <div className={styles.content}>
                    <div className={styles.worldsN1ExchangeVolumeProvider}>
                        <span>
                            World’s N°1 Exchange Volume Provider
                        </span>
                    </div>
                    <div className={styles.pLATFORMCOMINGSOON}>
                        <span>
                            PLATFORM COMING SOON
                        </span>
                    </div>
                    <div>
                        <img src="/public/assets/images/landing1/comingsoon.png"/>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <Button className={styles.accessBtn + ' small blue'} onClick={this.changeAccess.bind(this)}>Access Your Wallet</Button>
                    </div>
                    <div className={styles.walletAddress}>
                        {
                            this.state.isAccess && (<span>0x0e75235647330b5e13cad9115254c4b8e16272f8</span>)
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon);
