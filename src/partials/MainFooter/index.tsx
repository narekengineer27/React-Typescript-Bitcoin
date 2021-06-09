import * as React from "react";
import * as _ from 'lodash';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "Elements/Dropdown";
import { getUserRole } from "Utils/auth";
import Notifier from 'Partials/MainHeader/Notifier';

const styles = require('./footer.css');

class MainFooter extends React.Component<any, any> {
  componentDidMount() {
    // this.props.resetStatus();
  }

  render() {
    
    return (
        <div className={styles.footer}>
            {/* <div className={styles.topFooterMenuWrapper}> */}
                {/* <div className={styles.topLeftMenuWrapper}>
                    <ul className={styles.footerMenu}>
                        <li><Link to="/">Help and Contact</Link></li>
                        <li><Link to="/">Fees</Link></li>
                        <li><Link to="/public/help">Security</Link></li>
                        <li><Link to="/public/help">Features</Link></li>
                        <li><Link to="/public/help">Shop</Link></li>
                    </ul>
                </div> */}
                {/* <div className={styles.topRightMenuWrapper}>
                    <ul className={styles.footerMenu}>
                        <li><Link to="/">English</Link></li>
                        <li><Link to="/">Russian</Link></li>
                    </ul>
                </div> */}
            {/* </div>
            <div className={styles.secondFooterMenuWrapper}> */}
                {/* <div className={styles.secondLeftMenuWrapper}>
                    <ul className={styles.footerMenu}>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/">Blog</Link></li>
                        <li><Link to="/public/help">Jobs</Link></li>
                        <li><Link to="/public/help">Site Map</Link></li>
                        <li><Link to="/public/help">Developers</Link></li>
                        <li><Link to="/public/help">Partners</Link></li>
                    </ul>
                </div> */}
                {/* <div className={styles.secondRightMenuWrapper}>
                    <span className={styles.copyright}>© 1999-2018</span>
                    <ul className={styles.footerMenu}>
                        <li><Link to="/">Privacy</Link></li>
                        <li><Link to="/">Legal</Link></li>
                        <li><Link to="/public/help">Feedback</Link></li>
                    </ul>    
                </div> */}
            {/* </div> */}
            {/* <div className={styles.footerDesc}> */}
                {/* <span>
                    SMART CONTRACT ADDRESS
                </span> */}
                {/* <span>
                    Consumer advisory - PayPal Pte. Ltd. 
                    the holder of PayPal's stored value facility, 
                    does not require the approval of the Monetary 
                    Authority of Singapore. Users are advised to 
                    read the terms and conditions carefully.
                </span> */}
            {/* </div> */}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  // status: state.mainHeader.status,
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFooter);
