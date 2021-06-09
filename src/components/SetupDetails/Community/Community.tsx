import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from 'Elements/Button';
import ProgressWithTip from 'Elements/ProgressWithTip';
import { history } from 'Components/Routes';
import { Status } from 'Models/Status';
import { setupDetails, getTokenOwnersOffers, getTokenOwnersSetupDetails, saveWalletAddress, fetchTokenCredit } from 'Components/SetupDetails/actions';
import TextField from 'Elements/TextField';
import { fetchVoteList, voting } from '../actions';
import OneVote from 'Components/SetupDetails/Community/OneVote';
import PurchaseTokenModal from 'Components/SetupDetails/Community/PurchaseTokenModal';

const styles = require('../setup-details.css');

class CommunityForm extends  React.Component<any, any> {

    constructor(props){
        super(props);
        this.state = {
            isOpenPurchaseModal: false,
            tokenCreditBalance: ''
        };
        this.onChange = this.onChange.bind(this);
        this.initValues = this.initValues.bind(this);
    }

    
    componentDidMount() {
        const { setup_details } = this.props;
        if(setup_details && setup_details.status.success) {
            this.initValues();
        }
    }

    componentWillMount() {
        const { setup_details, voteList, fetchVoteList, tokenData, fetchTokenCredit } = this.props;
        fetchVoteList();
        fetchTokenCredit();
    }
    
    initValues() {
        const { tokenData } = this.props;
        var values = {
            token: tokenData.tokenCredit.token_credit
        }
        this.props.initialize(values);
    }

    onChange(button: any) {
        this.setState({
            activeEntryIndex: button.value,
        });
    }

    onSubmit(values: object) {
        
    }

    openPurchaseModal() {
        this.setState({
            isOpenPurchaseModal: true
        })
    }

    onCancel() {
        this.setState({
            isOpenPurchaseModal: false
        })
    }
    
    render() {
        const { handleSubmit, voteList, exchanges, base_coin, status, tokenData } = this.props;
        const { activeEntryIndex } = this.state;

        var tokenCreditBalance = (tokenData && tokenData.tokenCredit) ? tokenData.tokenCredit.token_credit : "Token Credit Balance";
        return (
            <div>
                <div className={styles.titleSection}>
                    <img src="/public/assets/images/landing1/community.png"/>
                    <span>Community</span>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>
                            <span>Token Credit Balance</span>
                        </div>
                        <div className={styles.itemContent}>
                            <TextField label={tokenCreditBalance} name="token" border={true} disabled/>
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>
                            <span>XRR Wallet Address</span>
                        </div>
                        <div className={styles.itemContent}>
                            <TextField label="" name="wallet" border={true} />
                            <div className={styles.walletDesc}>
                                <span>
                                    The wallet address you are expected to specify 
                                    here would be checked to confirm if you are holding 
                                    the minimum required XRR Tokens eligible to access 
                                    the dashboard.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.itemWrapper + ' ' + styles.margin0}>
                        <div className={styles.itemTitle}>
                            <span>Purchase Voting Credits</span>
                        </div>
                        <div className={styles.itemContent}>
                            <div className={styles.votingCreditContent}>
                                <TextField label="Buy Token Credits" name="tokencredit"/>
                                <div className={styles.purchaseBtnWrapper}>
                                    <Button className={styles.purchaseBtn + " small blue"} onClick={this.openPurchaseModal.bind(this)}>Purchase Token Credit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.communitySubTitle}>
                        <span>Share & Earn</span>
                    </div>
                    <div className={styles.share_earn}>
                        <div className={styles.row}>
                            <div className={styles.w_3 + " "+ styles.textLeft}>
                                <div className={styles.addressText}>Wallet Address for reward</div>
                            </div>
                            <div className={styles.w_3}>
                                <div className={styles.tokenText}>Token Balance</div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.w_3 + " "+ styles.textLeft}>
                                <div className={styles.address}>0x135468454845487541254</div>
                            </div>
                            <div className={styles.w_3}>
                                <div className={styles.token}>2000XRR</div>
                            </div>
                            <div className={styles.w_3}>
                                <Button className={"green "+styles.withdrawBtn}>withdraw</Button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.communitySubTitle}>
                        <span>Vote for your Exchange</span>
                    </div>
                    {
                        voteList && voteList.votes && voteList.votes.data && voteList.votes.data.map((m, index) => {
                            return (
                                <OneVote data={m}/>
                            )
                        })
                    }
                    <Button className={styles.submitBtn + " small blue " + styles.votingSubmit} submit={true}>Submit</Button>
                </form>
                <PurchaseTokenModal isOpen={this.state.isOpenPurchaseModal} onCancel={this.onCancel.bind(this)} width="700"/>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setupDetails,
    getTokenOwnersOffers,
    getTokenOwnersSetupDetails,
    voting,
    fetchVoteList,
    saveWalletAddress,
    fetchTokenCredit
};

const form = reduxForm({
  form: 'token-owners-setup',
  enableReinitialize:true,
  keepDirtyOnReinitialize: true
})(CommunityForm);

const mapStateToProps = (state, ownProps) => ({
    status: state.setupDetails.status as Status,
    exchanges: state.setupDetails.exchanges,
    base_coin: state.setupDetails.base_coin,
    setup_details: state.setupDetails.tokenOwnersSetupDetails,
    voteList: state.setupDetails.voteList,
    tokenData: state.setupDetails.tokenCreditData
});

export default connect(mapStateToProps, mapDispatchToProps)(form);
