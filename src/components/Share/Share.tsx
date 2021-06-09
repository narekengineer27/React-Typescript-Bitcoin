import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import { isProvided, isEmail } from 'Utils/validators';
import { FormErrors } from 'Utils/type';
import { signup } from 'Components/PublicPages/Signup/actions';
import TextField from 'Elements/TextField';
import { isAuthenticated } from 'Utils/auth';
import { facebookInit, facebookShare } from 'Utils/social';
import { loadReferrals, loadUrl, openSetWallet, setWallet, token_balance } from './actions';
import { Redirect, Route } from 'react-router';
import { Status } from 'Models/Status';
import GlobalMessage from 'Components/GlobalMessage';

const styles = require('./share.css');

class ShareModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        if(isAuthenticated()) {
            this.props.loadReferrals();
            this.props.loadUrl();
            this.props.token_balance();
            facebookInit();
        }
    }

    onSubmit(values){
        this.props.signup({ ...values, referral: 5 });
    } 

    render() {
        const { isOpen, onConfirm, onCancel, width, handleSubmit, status = new Status(), token, referalUrl} = this.props;
        const fbMessage = 'XchangeRate Robot brings a unified interface to manage your trades across all major exchanges. Sign up here!';

        if (status.success) {
            return (
              <Redirect to={{ pathname: '/verify-email', }}/>
            );
        }

        if (isAuthenticated()) {
            return (
                <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>         
                    <div className={styles.content}>
                        <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                        <div className={styles.head}>SHARE & EARN</div>
                        <div className={styles.box}>
                            <div className={styles.boxhead}>
                            {
                                (referalUrl && referalUrl.data && referalUrl.data.url) ? "www.Xchangerate.io/#/"+referalUrl.data.url:"www.Xchangerate.io"
                            }
                            </div>
                            <img src="/public/assets/images/landing/xchangerate.png" />
                            <div className={styles.explain}>You earn <span className={styles.blueFont}>10XRR</span> for any member who registers using your referral link.</div>
                            <Button className={"blue "+styles.shareBtn}  onClick={()=>facebookShare('XChangeRate Robot', fbMessage, "https://xchangerate.io/#/"+referalUrl.data.url)}>SHARE</Button>
                        </div>
                        <div className={styles.footer}>
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
                                    {/* <div className={styles.address}> </div> */}
                                </div>
                                <div className={styles.w_3}>
                                    <div className={styles.token}>
                                    {
                                        (token && token.data && token.data.token_credit) ? token.data.token_credit.substr(0,15)+'XRR' : '0XRR'
                                    }
                                    </div>
                                </div>
                                <div className={styles.w_3}>
                                    <Button className={"green "+styles.withdrawBtn}>withdraw</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            );
        }else{
            return (
                <Modal onConfirm={onConfirm} isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>              
                    <div className={styles.content}>
                        <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                        <div className={styles.head}>SHARE & EARN</div>
                        <div className={styles.boxIn}>
                            <div className={styles.boxhead}>Sign Up to have your Referral link Here</div>
                            <img src="/public/assets/images/landing/xchangerate.png" />
                            <div className={styles.explain}>You earn <span className={styles.blueFont}>10XRR</span> for any member who registers using your referral link.</div>
                            <div className={styles.signup}>SIGN UP</div>
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div className={styles.row}>
                                    <div className={styles.w_2_px_20}>
                                        <TextField label="Email" name="email" />
                                    </div>                                
                                    <div className={styles.w_2_px_20}>
                                        <TextField label="Username" name="user_name" />
                                    </div>                                
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.w_2_px_20}>
                                        <TextField type="password" label="Password" name="password"/>
                                    </div>
                                    <div className={styles.w_2_px_20}>
                                        <TextField type="password" label="Re-enter password" name="password_confirmation" />
                                    </div>  
                                </div>
                                <Button className={styles.submitBtn + " medium blue"} submit={true} loading={status.loading}>SIGN UP</Button>
                            </form>
                            <div className={styles.mt_10}>
                                Already a member. <span className={styles.signin} onClick={onConfirm}>Sign In</span>
                            </div>
                        </div>
                    </div>
                    <Route component={GlobalMessage}/>
                </Modal>
            );
        }        
    }
}

type Values = {
    email: string;
    password: string;
    password_confirmation: string;
    user_name: string;
};
const validate = (values: Values) => {
    const errors: FormErrors<Values> = {};
    if (!isProvided(values.email)) {
      errors.email = 'Please provide your e-mail.';
    } else if (!isEmail(values.email)) {
      errors.email = 'Please provide a valid e-mail.';
    }
  
    if (!isProvided(values.password)) {
      errors.password = 'Please provide your password.';
    }
  
    if (!isProvided(values.password_confirmation)) {
      errors.password_confirmation = 'Please confirm your password.';
    } else if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'Passwords do not match.';
    }
  
    if (!isProvided(values.user_name)) {
      errors.user_name = 'Please provide your username.';
    }
  
    return errors;
};

const form = reduxForm({
    form: 'exit-setup',
    enableReinitialize:true,
    keepDirtyOnReinitialize: true,
    validate
})(ShareModal);

const mapStateToProps = (state, ownProps) => ({
    referalUrl: state.shareData.referalUrl,
    url: state.shareData.url,
    status: state.signup.status,
    token: state.shareData.token
});

const mapDispatchToProps = {
    signup,
    loadReferrals,
    loadUrl,
    setWallet,
    openSetWallet,
    token_balance
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
