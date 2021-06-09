import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import { history } from 'Components/Routes';
import Responsive from 'Partials/Responsive';
import ComingSoonModal from 'Components/ComingSoon/ComingSoonModal';
import PublicPageLayout from 'Partials/PublicPageLayout';
import PublicHeaderMobile from 'Partials/PublicPageLayout/PublicHeaderMobile';
import Button from 'Elements/Button';
import { Link } from 'react-router-dom';
import { confirm } from 'Components/SetupDetails/actions';

const styles = require('./authentication.css');

class Authentication extends React.Component<any, any> {
    mobileHeader: PublicHeaderMobile;
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        let userJson = localStorage.getItem('user');
        let id = JSON.parse(userJson)['role_id'];
        this.props.confirm(id);
    }

    render() {
        return (
            <div className={styles.contentWrapper}>
                <img className={styles.trImage} src="/public/assets/images/trimage.png"/>
                <img className={styles.blImage} src="/public/assets/images/blimage.png"/>
                <div className={styles.content}>
                    <img className={styles.xrImage} src="/public/assets/images/xrImage.png"/>
                    <div className={styles.title}>
                        <span>Authentication Required</span>
                    </div>
                    <div className={styles.welcome}>
                        <span>
                            Welcome to the XchangeRate Platform. 
                            You have submitted 0xXXXXXXXXYYYYYYYYYYYYYVVVVVVVVV 
                            wallet address. This wallet address has been sent to 
                            our authentication engine and you are required to 
                            leave EXACTLY 000000000 XRR tokens in this wallet.
                        </span>
                    </div>
                    <div className={styles.secontDesc}>
                        <span>
                            Once authentication is passed, this process will 
                            only be repeated if the wallet address on the 
                            account is changed.
                        </span>
                    </div>
                    <div className={styles.thankyou}>
                        <span>
                            Thank you for your continued interest.
                        </span>
                    </div>
                    <div className={styles.team}>
                        <span>
                            The XchangeRate Team
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
    confirm
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
