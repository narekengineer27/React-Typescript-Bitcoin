import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import ToggleField from 'Elements/ToggleField';

const styles = require('../buy-back-event-header.css');

class BuyBackEventModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false
        };
    }

    componentDidMount() {
        
    }

    changeSettingMode() {

    }

    render() {
        const { isOpen, onCancel, width } = this.props;

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
                <img src="/public/assets/images/dashboard/close.png" onClick={onCancel} className={styles.closeBtn}/>
                <div className={styles.content}>
                    <div className={styles.modalTitle}>
                        <span>
                            BUY BACK EVENT
                        </span>
                    </div>
                    <div className={styles.modalImage}>
                        <img src="/public/assets/images/buybackevent.png"/>
                    </div>
                    <div className={styles.toggleWrapper}>
                        <span className={styles.blueText}>TOKEN QUANTITY</span>
                        <ToggleField
                            disabled={false}
                            checked={this.state.mode}
                            icons={false}
                            className="react-toggle-mr"
                            onChange={this.changeSettingMode.bind(this)}/>
                        <span className={styles.normalText}>FLAT VALUE</span>
                    </div>
                    <div className={styles.countdownModalLabel}>
                        <span className={styles.modalCountText}>COUNT DOWN</span>
                    </div>
                    <div className={styles.countDisplaysModalWrapper}>
                        <div className={styles.countDisplays}>
                            <div className={styles.displayItem}>
                                <div className={styles.modalDisplayItemContent}>
                                    <span className={styles.modalDisplayCount}>119</span>
                                    <span className={styles.modalDisplayDesc}>DAYS</span>
                                </div>
                            </div>
                            <div className={styles.displayItem}>
                                <div className={styles.modalDisplayItemContent}>
                                    <span className={styles.modalDisplayCount}>23</span>
                                    <span className={styles.modalDisplayDesc}>HOURS</span>
                                </div>
                            </div>
                            <div className={styles.displayItem}>
                                <div className={styles.modalDisplayItemContent}>
                                    <span className={styles.modalDisplayCount}>59</span>
                                    <span className={styles.modalDisplayDesc}>MINUTES</span>
                                </div>
                            </div>
                            <div className={styles.displayItem}>
                                <div className={styles.modalDisplayItemContent}>
                                    <span className={styles.modalDisplayCount}>60</span>
                                    <span className={styles.modalDisplayDesc}>SECONDS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.descWrapper}>
                        <div className={styles.modalDescItem}>
                            <span className={styles.modalDescItemTitle}>RULES</span>
                            <span className={styles.modalDescItemDesc}>
                                The weighted average value of XRR tokens held must be greater 
                                than the total value of other holding in the XchangeRate portfolio.
                                The spread between the lowest Ask and highest bid have sustained 
                                a variance above 10% for 6hours on the exchange with the largest 
                                volume of XRR sold within 24hours.
                            </span>
                        </div>
                        <div className={styles.modalDescItem}>
                            <span className={styles.modalDescItemTitle}>PROCESS</span>
                            <span className={styles.modalDescItemDesc}>
                                Not less than 50% of the aggregate portfolio value excluding XRR token 
                                is bound for exchange to XRR tokens at the end of the 120hours count 
                                down when the 2 rules are true in that order.
                                The authentication engine shifts toggle to the reverse option between 
                                the Token Quantity or Fiat Value.
                            </span>
                        </div>
                        <div className={styles.modalDescItem}>
                            <span className={styles.modalDescItemTitle}>EXECUTION</span>
                            <span className={styles.modalDescItemDesc}>
                                The set of variables has be fetched using combinatorial optimization to 
                                help find a relational balance between the portfolio held by XchangeRate 
                                and its token price. The effort seeks to drive the price upwards by 
                                giving XRR tokens dominance over other positions held.
                            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyBackEventModal);
