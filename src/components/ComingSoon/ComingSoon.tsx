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

const styles = require('./coming-soon.css');

class ComingSoon extends React.Component<any, any> {
    mobileHeader: PublicHeaderMobile;
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: true
        };
    }

    componentDidMount() {
        
    }

    onClose() {
        this.setState({
            isOpen: false
        })
    }

    render() {

        const Hearder = (
            <header className={styles.header}>
                <img className={styles.logo} src="/public/assets/images/landing1/logo.png" alt="Logo"/>
    
                <ul className={styles.menu}>
                    <li><Link to="/">Market Makers/ Traders</Link></li>
                    <li><Link to="/">Token Owners</Link></li>
                    <li><Link to="/">Exchanges</Link></li>
                </ul>
    
                <div className={styles.buttons}>
                    <Button className="medium blue" onClick={() => history.push('/login')}>Login</Button>
                    <Button className="medium white" onClick={() => history.push('/signup')}>Sign Up</Button>
                </div>
                <div className={styles.hamburger} onClick={() => this.mobileHeader.toggleMenu()}>
                <img src="/public/assets/images/icon-burger.svg"/>
                </div>
                {/* <PublicHeaderMobile ref={r => this.mobileHeader = r}/> */}
            </header>
        );

        
        return (
            <PublicPageLayout footerHidden>
                <div className={styles.titleWrapper}>
                    <img src="/public/assets/images/landing1/xrAsset.png"/>
                    <span>XchangeRate Ecosystem</span>
                </div>
                
                <div className={styles.chartContent}>
                    <Responsive name="desktop">
                        <img src="/public/assets/images/landing1/chart.png" />
                    </Responsive>
                    <Responsive name="phone">
                        <img src="/public/assets/images/landing1/chartMobile.png" />
                    </Responsive>
                </div>
                <ComingSoonModal isOpen={this.state.isOpen} onCancel={this.onClose.bind(this)} width="700" />
            </PublicPageLayout>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon);
