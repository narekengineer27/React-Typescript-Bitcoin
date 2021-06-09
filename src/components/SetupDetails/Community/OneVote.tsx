import * as React from 'react';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import ProgressWithTip from 'Elements/ProgressWithTip';
import { Status } from 'Models/Status';
// import { setupDetails, getTokenOwnersOffers, getTokenOwnersSetupDetails } from 'Components/SetupDetails/actions';
import TextField from 'Elements/TextField';
import { voting } from '../actions';

const styles = require('../setup-details.css');
const env = require('Root/env.json');
const exchangeLogoUrl = env.exchangeLogoUrl;

class OneVote extends  React.Component<any, any> {

    constructor(props){
        super(props);
        this.state = {

        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(button: any) {
        this.setState({
            activeEntryIndex: button.value,
        });
    }

    uservoting() {
        const { voting, data } = this.props;
        var votedata = {
            voting_setup_id: data.id
        };
        voting(votedata);
    }

    render() {
        const { data } = this.props;
        const percent = '' + 100 * data.total_vote/data.max_vote;

        return (
            <div className={styles.itemWrapper + ' ' + styles.votingItem}>
                {/* <div className={styles.votingAvatar}></div> */}
                <img src={exchangeLogoUrl+data.exchange_logo} className={styles.logos}/>                
                <span className={styles.votingExchangeName}>{data.exchange_name}</span>
                <div className={styles.progressBarWrapper}>
                    <span className={styles.progressSpan}>{data.total_vote}</span>
                    <ProgressWithTip 
                        className="progressBar"
                        percent={percent.substring(0,5)}
                        strokeWidth="2"
                        trailWidth="2"
                        strokeColor="#ffc107"
                        isToolTip={true}
                    />
                </div>
                <Button className={styles.voteBtn + " small blue"} onClick={this.uservoting.bind(this)}>Vote</Button>
                <Button className={styles.shareBtn + " small green"}>Share</Button>
            </div>
        );
    }
}

const mapDispatchToProps = {
    voting
};

const mapStateToProps = (state, ownProps) => ({
    setupDestails: state.setupDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(OneVote);
