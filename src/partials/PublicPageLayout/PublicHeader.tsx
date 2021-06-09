import * as React from 'react';
import Button from 'Elements/Button';
import { Link } from 'react-router-dom';
import { history } from 'Components/Routes';
import PublicHeaderMobile from 'Partials/PublicPageLayout/PublicHeaderMobile';
import { isAuthenticated } from 'Utils/auth';
import PolicyModal from 'Partials/PolicyModal';
import MenuModal from 'Components/PublicPages/Landing/MenuModal';
import RegisterModal from 'Components/PublicPages/RegisterModal';
import XrrtokenModal from 'Components/PublicPages/XrrtokenModal';
// import ShareModal from 'Components/Share';

const styles = require('./public-page-layout.css');

export default class PublicHeader extends React.Component<{}, {}> {
  mobileHeader: PublicHeaderMobile;

  constructor(props: any) {
    super(props);
    this.state = {
        isOpenPolicyModal: false,
        isMenuModalOpen: false,
        isOpenRegisterThankyouModal: false,
        isOpenXRRTokenModal: false,
        // isShareModalOpen: true,
        defaultTab: 0
    };
  }

  openPolicyModal() {
      this.setState({
          isOpenPolicyModal: true
      })
  }

  onMenuModalCancel() {
    this.setState({
        isMenuModalOpen: false
    })
  }

  // onCancelShare() {
  //   this.setState({
  //     isShareModalOpen: false
  //   })
  // }

  onConfirmPolicy() {
      history.push('/pre-signup')
      this.setState({
          isOpenPolicyModal: false
      })
  }

  onCancelPolicy() {
      this.setState({
          isOpenPolicyModal: false
      })
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

  render() {
    const pricingLink = isAuthenticated() ? '/my-account/platform-features/packages' : '/public/pricing';

    return (
      <div>
        <header className={styles.header}>
          <img className={styles.logo} src="/public/assets/images/xchangerate-logo.svg" alt="Logo"/>

          <ul className={styles.menu}>
            <li><Link to="/">Vote</Link></li>
            <li><Link to="#" onClick={(e) => this.menuClick(0, e)}>Community</Link></li>
            <li><Link to="#" onClick={(e) => this.menuClick(1, e)}>Traders</Link></li>
            <li><Link to="#" onClick={(e) => this.menuClick(2, e)}>Market Maker</Link></li>
            <li><Link to="#" onClick={(e) => this.menuClick(3, e)}>Token Owners</Link></li>
            <li><Link to="#" onClick={(e) => this.menuClick(4, e)}>Exchanges</Link></li>
            <li onClick={this.openXRRTokenModal.bind(this)}>Where to Buy</li>
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
          <XrrtokenModal isOpen={this.state.isOpenXRRTokenModal} onCancel={this.cancelXRRTokenModal.bind(this)} width="700"/>
        </header>
        {/* <ShareModal isOpen={this.state.isShareModalOpen} onCancel={this.onCancelShare.bind(this)} width="900"/> */}
        <MenuModal isOpen={this.state.isMenuModalOpen} onCancel={this.onMenuModalCancel.bind(this)} width="800" defaultTab={this.state.defaultTab}/>
      </div>
    );
  }

}
