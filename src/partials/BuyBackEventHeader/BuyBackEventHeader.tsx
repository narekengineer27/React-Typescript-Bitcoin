import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import BuyBackEventModal from './Modal';

const styles = require('./buy-back-event-header.css');

class BuyBackEventHeader extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false,
            isOpenModal: false
        };
    }

    componentDidMount() {
        
    }

    openSeeMore() {
        this.setState({
            isOpenModal: true
        });
    }

    onCancelModal() {
        this.setState({
            isOpenModal: false
        });
    }

    render() {
        // const { isOpen, onCancel, width } = this.props;

        return (
            <div className={styles.countHeaderWrapper}>
                <div className={styles.countHeader}>
                    <span className={styles.countTitle}>Buy Back Event</span>
                    <span className={styles.countText}>COUNT DOWN</span>
                    <div className={styles.countDisplays}>
                        <div className={styles.displayItem}>
                            <div className={styles.displayItemContent}>
                                <span className={styles.displayCount}>119</span>
                                <span className={styles.displayDesc}>DAYS</span>
                            </div>
                        </div>
                        <div className={styles.displayItem}>
                            <div className={styles.displayItemContent}>
                                <span className={styles.displayCount}>23</span>
                                <span className={styles.displayDesc}>HOURS</span>
                            </div>
                        </div>
                        <div className={styles.displayItem}>
                            <div className={styles.displayItemContent}>
                                <span className={styles.displayCount}>59</span>
                                <span className={styles.displayDesc}>MINUTES</span>
                            </div>
                        </div>
                        <div className={styles.displayItem}>
                            <div className={styles.displayItemContent}>
                                <span className={styles.displayCount}>60</span>
                                <span className={styles.displayDesc}>SECONDS</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.countBtnWrapper}>
                        <Button className={styles.countBtn + ' small blue'} onClick={this.openSeeMore.bind(this)}>See More</Button>
                    </div>
                </div>
                <BuyBackEventModal isOpen={this.state.isOpenModal} onCancel={this.onCancelModal.bind(this)} width="700"/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyBackEventHeader);
