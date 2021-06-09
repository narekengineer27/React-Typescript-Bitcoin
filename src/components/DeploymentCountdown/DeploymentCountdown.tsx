import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import * as moment from 'moment';
import { history } from 'Components/Routes';

const styles = require('./deployment-countdown.css');

class DeploymentCountdown extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false,
            currentCount: 0,
            movePercent: 0,
            checkPercent: 0,
            testPercent: 0,
            loadPercent: 0
        };
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 1000);
        var after3days = moment('2018-08-05');
        var ms = after3days.diff(moment());
        console.log('timediff', ms);
        var seconds = Math.floor(ms / 1000) - 34200;
        if(seconds < 0) seconds = 0;
        // store intervalId in the state so it can be accessed later:
        this.setState({
            intervalId: intervalId,
            currentCount: seconds
        });
    }
    
    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }
    
    timer() {
        // setState method is used to update the state
        var timediff = 259200 - this.state.currentCount;
        var movePercent = 0;
        var checkPercent = 0;
        var testPercent = 0;
        var loadPercent = 0;
        var tempPercent = 0;
        if(timediff < 0) timediff = 0;
        if(timediff > 259200) clearInterval(this.state.intervalId);

        tempPercent = Math.floor(timediff / 64800 * 100);

        if(tempPercent > 100) movePercent = 100;
        else movePercent = tempPercent;

        
        tempPercent = Math.floor((timediff - 64800) / 64800 * 100);

        if(tempPercent < 0) tempPercent = 0;
        if(tempPercent > 100) checkPercent = 100;
        else checkPercent = tempPercent;

        
        tempPercent = Math.floor((timediff - 64800 * 2) / 64800 * 100);
        if(tempPercent < 0) tempPercent = 0;
        if(tempPercent > 100) testPercent = 100;
        else testPercent = tempPercent;

        
        tempPercent = Math.floor((timediff - 64800 * 3) / 64800 * 100);
        if(tempPercent < 0) tempPercent = 0;
        if(tempPercent > 100) loadPercent = 100;
        else loadPercent = tempPercent;
        this.setState({
            currentCount: ((this.state.currentCount -1) < 0) ? 0 : this.state.currentCount -1,
            movePercent: movePercent,
            checkPercent: checkPercent,
            testPercent: testPercent,
            loadPercent: loadPercent
        });
    }

    render() {
        const { isOpen, onCancel, width } = this.props;

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
                <img src="/public/assets/images/dashboard/close.png" onClick={onCancel} className={styles.closeBtn}/>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span>
                            Deployment Countdown
                        </span>
                    </div>
                    <div className={styles.timeRemaining}>
                        <span>
                            Estimated Time Remaining
                        </span>
                    </div>
                    <div className={styles.countDisplays}>
                        <div className={styles.displayItem}>
                            <div className={styles.displayItemContent}>
                                <span className={styles.displayCount}>{(this.state.currentCount / 3600) < 10 ? '0' + Math.floor(this.state.currentCount / 3600) : Math.floor(this.state.currentCount / 3600)}</span>
                                <span className={styles.displayDesc}>HOURS</span>
                            </div>
                        </div>
                        <div className={styles.displayItem}>
                            <div className={styles.displayItemContent}>
                                <span className={styles.displayCount}>{(this.state.currentCount % 3600 / 60) < 10 ? '0' + Math.floor(this.state.currentCount % 3600 / 60) : Math.floor(this.state.currentCount % 3600 / 60)}</span>
                                <span className={styles.displayDesc}>MINUTES</span>
                            </div>
                        </div>
                        <div className={styles.displayItem}>
                            <div className={styles.displayItemContent}>
                                <span className={styles.displayCount}>{(this.state.currentCount % 60) < 10 ? '0' + Math.floor(this.state.currentCount % 60) : Math.floor(this.state.currentCount % 60)}</span>
                                <span className={styles.displayDesc}>SECONDS</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <div>
                            <div className={styles.spinImageSection}>
                                <img className={styles.spinImage} src="/public/assets/images/execution/blue-circle.svg"/>
                                <span className={styles.spinImagePercent + ' ' + styles.blue}>{this.state.movePercent + '%'}</span>
                            </div>
                            <div className={styles.smallDescWrapper}>
                                <span className={styles.spinImageDesc}>
                                    MOVING FILES
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.spinImageSection}>
                                <img className={styles.spinImage} src="/public/assets/images/execution/orange-circle.svg"/>
                                <span className={styles.spinImagePercent + ' ' + styles.orange}>{this.state.checkPercent + '%'}</span>
                            </div>
                            <div className={styles.fullDescWrapper}>
                                <span className={styles.spinImageDesc}>
                                    CHECKING COMPATIBILITIES & DEPENDENCIES
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.spinImageSection}>
                                <img className={styles.spinImage} src="/public/assets/images/execution/red-circle.svg"/>
                                <span className={styles.spinImagePercent + ' ' + styles.red}>{this.state.testPercent + '%'}</span>
                            </div>
                            <div className={styles.smallDescWrapper}>
                                <span className={styles.spinImageDesc}>
                                    TESTING API
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className={styles.spinImageSection}>
                                <img className={styles.spinImage} src="/public/assets/images/execution/green-circle.svg"/>
                                <span className={styles.spinImagePercent + ' ' + styles.green}>||</span>
                            </div>
                            <div className={styles.smallDescWrapper}>
                                <span className={styles.spinImageDesc}>
                                    LOAD BALANCING
                                </span>
                            </div>
                        </div>
                        
                    </div>
                    <div className={styles.registerBtnWrapper}>
                        <Button className={styles.registerBtn + " medium blue"} onClick={() => {history.push('/pre-signup')}}>REGISTER</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentCountdown);
