import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { history } from 'Components/Routes';
import MainFooter from 'Partials/MainFooter';
import DashboardButton from '../DashboardButton';
import VerifyModal from '../VerifyModal';
import AutobotHistoryModal from 'Components/AutobotHistoryModal/AutobotHistoryModal';
import { signOut } from "Partials/MainHeader/actions";
import Button from 'Elements/Button';
import RoleChangeModal from '../RoleChangeModal';
import { token_balance } from 'Components/Share/actions';

const styles = require('../dashboard.css');
const innerstyles = require('./community.css');

class Community extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isOpenVerifyModal: false,
            isOpenHistoryModal: false,
            isOnRoleModal: false
        };
    }

    componentWillMount(){
        this.props.token_balance();
    }

    cancelVerifyModal() {
        var isOpenVerifyModal = !this.state.isOpenVerifyModal;
        this.setState({
            isOpenVerifyModal: isOpenVerifyModal
        });
    }

    onCancelHistoryModal() {
        this.setState({
            isOpenHistoryModal: false
        });
        this.props.signOut();
    }

    goToSetup() {
        history.push('/setup-details/community');
    }

    openRoleModal() {
        this.setState({
            isOnRoleModal: true
        });
    }

    onCancelRole(){
        this.setState({
            isOnRoleModal: false
        })
    }

    render() {
        const { token } = this.props;
        let userJson = localStorage.getItem('user');
        let username = JSON.parse(userJson)['name'];

        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();
        var dd = ''+day;
        var mm = ''+month;

        if(day<10){
            dd='0'+day;
        }
        if(month<10){
            mm='0'+month;
        }
        var today = dd+'/'+mm+'/'+yyyy;

        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        var h = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        // var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        var time = h + ":" + minutes + " " + am_pm;

        return (
            <div className={styles.contentWrapper}>
                <AutobotHistoryModal isOpen={this.state.isOpenHistoryModal} onCancel={this.onCancelHistoryModal.bind(this)} width="700"/>
                <RoleChangeModal isOpen={this.state.isOnRoleModal} onCancel={this.onCancelRole.bind(this)} width="600" />
                <img className={styles.RightImage} src="/public/assets/images/dashboard/rightShape.png" />
                <img className={styles.LeftImage} src="/public/assets/images/dashboard/leftLines.png" />
                <div className={innerstyles.content}>
                    <div className={styles.titleSection}>
                        <div className={styles.firstTitle}>
                            <span className={styles.firstTitleItem + ' ' + styles.mt_10}>Username : {username}</span>
                            <span className={styles.firstTitleItem + ' ' + styles.mt_10}>Date & time : {today} - {time}</span>
                            <span className={styles.firstTitleItem}>
                                User Role : Voter
                                <Button className={styles.btn + " medium blue"} onClick={this.openRoleModal.bind(this)}>CHANGE ROLE</Button>
                            </span>
                        </div>
                        <div className={styles.secondTitle}>
                            <span>XRR Token Balance :  {(token && token.data && token.data.token_credit) ? token.data.token_credit : '0'} XRR</span>
                        </div>
                        <div className={styles.title}>
                            <span>Dashboard</span>
                        </div>
                    </div>
                    <div className={styles.buttonsContent}>
                        <div className={styles.firstRow}>
                            <div className={styles.buttonItem}></div>
                            <DashboardButton img={"/public/assets/images/dashboard/vote.png"} title={"Vote :"} content={"Users can vote their exchanges and use Earn&Share to earn XRR."} reportLine={1}/>
                            <DashboardButton img={"/public/assets/images/dashboard/setup.png"} title={"Setup :"} content={"This is where users store their preferred account profiles."} reportLine={1} onClick={this.goToSetup.bind(this)}/>                            
                        </div>
                        <div className={styles.secondRow}>
                            
                        </div>
                    </div>
                </div>
                <MainFooter/>
                <VerifyModal isOpen={this.state.isOpenVerifyModal} onCancel={this.cancelVerifyModal.bind(this)} width="700"/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    token: state.shareData.token
});

const mapDispatchToProps = {
    signOut,
    token_balance
};

export default connect(mapStateToProps, mapDispatchToProps)(Community);
