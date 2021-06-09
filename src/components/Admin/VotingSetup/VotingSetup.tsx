import * as React from 'react';
import { connect } from 'react-redux';
import { history } from 'Components/Routes';
import { Link } from 'react-router-dom';
import Button from 'Elements/Button';
import PublicHeaderMobile from 'Partials/PublicPageLayout/PublicHeaderMobile';
import PolicyModal from 'Partials/PolicyModal';
import BuyBackEventHeader from 'Partials/BuyBackEventHeader';
import RegisterModal from 'Components/PublicPages/RegisterModal';
import MenuModal from 'Components/PublicPages/Landing/MenuModal';
import TextField from 'Elements/TextField';
import { reduxForm } from 'redux-form';
import XrrtokenModal from 'Components/PublicPages/XrrtokenModal';
import SelectField from 'Elements/SelectField';
import { Status } from 'Models/Status';
import { adminVotingSetup, adminVoteList, updateVotingSetupData } from './actions';
import OneRow from './OneRow';

const styles = require('./voting-setup.css');

class VotingSetup extends React.Component<any, any> {
    mobileHeader: PublicHeaderMobile;

    constructor(props: any) {
        super(props);
        this.state = {
            isOpenPolicyModal: false,
            isOpenChatloginModal : false,
            isMenuModalOpen: false,
            isOpenDeploymentCountdown: false,
            isOpenRegisterThankyouModal: false,
            isOpenXRRTokenModal: false,
            isShareModalOpen: true,
            isOnLoginModal: false,
            defaultTab: 0,
            selectedOption: null,
            file: '',
            imagePreviewUrl: ''
        };
    }

    componentWillMount() {
        this.props.adminVoteList();
    }

    openPolicyModal() {
        this.setState({
            isOpenPolicyModal: true
        });
    }

    onMenuModalCancel() {
        this.setState({
            isMenuModalOpen: false
        })
    }

    onCancelShare() {
        this.setState({
          isShareModalOpen: false
        })
    }

    onConfirmPolicy() {
        history.push('/signup')
        this.setState({
            isOpenPolicyModal: false
        });
    }

    onCancelPolicy() {
        this.setState({
            isOpenPolicyModal: false
        });
    }

    showLoginModal() {
      this.setState({
        isOpenChatloginModal: true
      });
    }

    // Cancel chat login Modal
    onCancelChatLoginModal () {
      this.setState({
        isOpenChatloginModal: false
      });
    }

    onCancelDeploymentCountdown() {

    }

    menuClick(item, e) {
        this.setState({
            isMenuModalOpen: true,
            defaultTab: item
        })
    }

    openXRRTokenModal() {
        this.setState({
            isOpenXRRTokenModal: true
        })
    }

    cancelXRRTokenModal() {
        this.setState({
            isOpenXRRTokenModal: false
        })
    }

    openRegisterThankyouModal() {
        this.setState({
            isOpenRegisterThankyouModal: true
        })
    }

    cancelRegisterThankyouModal() {
        this.setState({
            isOpenRegisterThankyouModal: false
        })
    }

    openLoginModal(){
        this.setState({
            isShareModalOpen: false,
            isOnLoginModal: true
        })
    }

    onCancelLogin(){
        this.setState({
            isOnLoginModal: false
        })
    }

    onSubmit(values: object) {
        console.log(values);
        var formdata = new FormData();
        var file = this.state.file;

        formdata.append('exchange_name', values['exchange_name']);
        formdata.append('exchange_live', '1');
        formdata.append('max_vote', values['max_vote']);
        formdata.append('status', values['statusSelect']);
        formdata.append('exchange_logo', file);
        console.log(formdata);
        this.props.adminVotingSetup(formdata);
    }

    changeFile(ev) {
        ev.preventDefault();
        var returnObj = {};
        returnObj[ev.target.name] = ev.target.files[0];
        this.setState(returnObj);

        let reader = new FileReader();
        let file = ev.target.files[0];
        reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          }
      
        reader.readAsDataURL(file)
    }

    render() {
        const { handleSubmit, voteList, status = new Status() } = this.props;

        const statusSelect = [
            {value: 'voting', label: 'Voting'},
            {value: 'completed', label: 'Completed'}
        ];
        const id="fileLoader";

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Logo Preview</div>);
        }

        const Hearder = (
            <header className={styles.header}>
                <img className={styles.logo} src="/public/assets/images/landing/landingLogo.png" alt="Logo"/>

                <ul className={styles.menu}>
                    <li><Link to="/admin/voting-setup">Vote</Link></li>
                    <li><Link to="/admin/voting-setup" onClick={(e) => this.menuClick(0, e)}>Community</Link></li>
                    <li><Link to="/admin/voting-setup" onClick={(e) => this.menuClick(1, e)}>Traders</Link></li>
                    <li><Link to="/admin/voting-setup" onClick={(e) => this.menuClick(2, e)}>Market Maker</Link></li>
                    <li><Link to="/admin/voting-setup" onClick={(e) => this.menuClick(3, e)}>Token Owners</Link></li>
                    <li><Link to="/admin/voting-setup" onClick={(e) => this.menuClick(4, e)}>Exchanges</Link></li>
                    <li><Link to="/admin/voting-setup" onClick={this.openXRRTokenModal.bind(this)}>Where to Buy</Link></li>
                </ul>

                <div className={styles.buttons}>
                    {/* <Button className="medium blue" onClick={() => history.push('/login')}>Login</Button> */}
                    <Button className="medium white" onClick={this.openPolicyModal.bind(this)}>Sign Up</Button>
                    <Button className="medium blue" onClick={() => history.push('/login')}>Sign In</Button>
                </div>
                <div className={styles.hamburger} onClick={() => this.mobileHeader.toggleMenu()}>
                    <img src="/public/assets/images/icon-burger.svg"/>
                </div>
                <PublicHeaderMobile ref={r => this.mobileHeader = r}/>
                <PolicyModal isOpen={this.state.isOpenPolicyModal} onConfirm={this.onConfirmPolicy.bind(this)} onCancel={this.onCancelPolicy.bind(this)}/>
                <RegisterModal isOpen={this.state.isOpenRegisterThankyouModal} onCancel={this.cancelRegisterThankyouModal.bind(this)} width="600"/>
                <XrrtokenModal isOpen={this.state.isOpenXRRTokenModal} onCancel={this.cancelXRRTokenModal.bind(this)} width="600"/>
            </header>
        );

        return (
            <div className={styles.landingPage}>
                <BuyBackEventHeader />
                {Hearder}
                <div className={styles.voting}>
                    <div className={styles.votingText}>Admin Voting Setup</div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>              
                        <div className={styles.votingAdd}>
                            {/* <img src="/public/assets/images/landing/plaakLogo.png" /> */}
                            <div className={styles.imgPreview}>
                                {$imagePreview}
                            </div>
                            <input id={id} type="file" className={styles.fileLoader} name="file" onChange={this.changeFile.bind(this)} />
                            <label htmlFor={id}>
                                <Button className={styles.logoBtn + " medium blue"}>PICK LOGO</Button>
                            </label>
                            <div className={styles.textField}>
                                <TextField name="exchange_name" label="Exchange Name" />
                            </div>
                            <div className={styles.statusSection}>
                                <div className={styles.status}>Status</div>
                                <div className={styles.statusSelect}>
                                    <SelectField options={statusSelect} name="statusSelect" placeholder="Select"/>
                                </div>
                            </div>
                            <div className={styles.textField}>
                                <TextField name="max_vote" type="number" label="Max Vote" />
                            </div>
                            <Button className={styles.addBtn + " medium blue"} submit={true}>ADD</Button>
                        </div>
                    </form>           
                    <div className={styles.votingTable}>
                        <table>
                            <thead>
                                <tr>                            
                                    <th>Live</th>
                                    <th>Exchange Name</th>
                                    <th>Logo</th>
                                    <th>No of Votes</th>
                                    <th>Max Vote</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                voteList && voteList.votelist && voteList.votelist.map((m, index) => {
                                    return (
                                        <OneRow data={m} />
                                    )                                    
                                })
                            }
                            </tbody>
                        </table>
                    </div>                 
                </div>
                <div className={styles.midContent}>
                    <img className={styles.zeroSectionRightImage} src="/public/assets/images/landing/votingSetup.png" />                    
                </div>
                <div className={styles.footer}>
                    <div className={styles.topFooterMenuWrapper}>
                        <div className={styles.topLeftMenuWrapper}>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">Help and Contact</Link></li>
                                <li><Link to="/">Fees</Link></li>
                                <li><Link to="/public/help">Security</Link></li>
                                <li><Link to="/public/help">Features</Link></li>
                                <li><Link to="/public/help">Shop</Link></li>
                            </ul>
                        </div>
                        <div className={styles.topRightMenuWrapper}>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">English</Link></li>
                                <li><Link to="/">Russian</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.secondFooterMenuWrapper}>
                        <div className={styles.secondLeftMenuWrapper}>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">About</Link></li>
                                <li><Link to="/">Blog</Link></li>
                                <li><Link to="/public/help">Jobs</Link></li>
                                <li><Link to="/public/help">Site Map</Link></li>
                                <li><Link to="/public/help">Developers</Link></li>
                                <li><Link to="/public/help">Partners</Link></li>
                            </ul>
                        </div>
                        <div className={styles.secondRightMenuWrapper}>
                            <span className={styles.copyright}>© 1999-2018</span>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">Privacy</Link></li>
                                <li><Link to="/">Legal</Link></li>
                                <li><Link to="/public/help">Feedback</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.footerDesc}>
                        <span>
                            SMART CONTRACT ADDRESS
                        </span>
                        <span>
                            0x0e75235647330b5e13cad9115254c4b8e16272f8
                        </span>
                        <span className={styles.disclaimerDesc}>
                            Consumer advisory - PayPal Pte. Ltd. the holder of PayPal's stored value facility, does not require the approval of the Monetary Authority of Singapore. Users are advised to read the terms and conditions carefully.
                        </span>
                    </div>
                </div>
                <MenuModal isOpen={this.state.isMenuModalOpen} onCancel={this.onMenuModalCancel.bind(this)} width="800" defaultTab={this.state.defaultTab}/>

            </div>

        );
    }
}

const form = reduxForm({
    form: 'admin-voting',
    enableReinitialize:true,
    keepDirtyOnReinitialize: true
})(VotingSetup);

const mapStateToProps = (state, OwnProps) => ({
    voteList: state.adminVote,
    status: state.adminVote.status,
});

const mapDispatchToProps = {
    adminVoteList,
    adminVotingSetup,
    updateVotingSetupData
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
