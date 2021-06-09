import * as React from 'react';
import { history } from 'Components/Routes';
import { Link } from 'react-router-dom';
import Button from 'Elements/Button';
import PolicyModal from 'Partials/PolicyModal';
import XrrtokenModal from 'Components/PublicPages/XrrtokenModal';
import RegisterModal from 'Components/PublicPages/RegisterModal';
import MenuModal from 'Components/PublicPages/Landing/MenuModal';

const styles = require('./public-page-layout.css');

interface State {
  isMenuOpen?: boolean;
  isOpenPolicyModal?: boolean;
  isOpenRegisterThankyouModal?: boolean;
  isOpenXRRTokenModal?: boolean;
  isMenuModalOpen?: boolean;
  defaultTab?: number;
}

export default class PublicHeaderMobile extends React.Component<{}, State> {
  removeListener: () => void;
  
  constructor(props: any) {
    super(props);
    this.state = {
        isOpenRegisterThankyouModal: false,
        isOpenXRRTokenModal: false,
        isOpenPolicyModal: false,
        isMenuModalOpen: false,
        defaultTab: 0
    };
  }

  openPolicyModal() {
      this.setState({
          isOpenPolicyModal: true
      })
  }

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

  
  menuClick(item, e) {
    this.setState({
        isMenuModalOpen: true,
        defaultTab: item
    })
  }

  onMenuModalCancel() {
    this.setState({
        isMenuModalOpen: false
    })
  }
  
  render() {
    const { isMenuOpen } = this.state;
    if (!isMenuOpen) {
      return null;
    }

    return (
      <div className={styles.mobileHeader} onClick={() => this.toggleMenu()}>

        <div className={styles.header}>
          <img className={styles.logo} src="/public/assets/images/xchangerate-logo.svg" alt="Logo"/>

          <div className={styles.hamburgerClose} onClick={() => this.toggleMenu()}>
            <img src="/public/assets/images/icon-x.svg"/>
          </div>
        </div>

        <hr/>

        <div className={styles.mobileHeaderContent} onClick={ev => ev.stopPropagation()}>
          <ul className={styles.mobileMenu}>
            <li><Link to="/">Vote</Link></li>
            <li><Link to="#">Community</Link></li>
            <li><Link to="#">Traders</Link></li>
            <li><Link to="#">Market Maker</Link></li>
            <li><Link to="#">Token Owners</Link></li>
            <li><Link to="#">Exchanges</Link></li>
            <li onClick={this.openXRRTokenModal.bind(this)}>Where to Buy</li>
          </ul>

          <div className={styles.mobileButtons}>
            {/* <Button className="medium white full" onClick={() => history.push('/login')}>Sign in</Button> */}
            {/* <Button className="medium blue">Login</Button> */}
            <Button className="medium blue full" onClick={this.openPolicyModal.bind(this)}>Get started</Button>
            <Button className="medium white full" onClick={() => history.push('/login')}>Sign in</Button>
          </div>
        </div>
        <PolicyModal isOpen={this.state.isOpenPolicyModal} onConfirm={this.onConfirmPolicy.bind(this)} onCancel={this.onCancelPolicy.bind(this)}/>
        <RegisterModal isOpen={this.state.isOpenRegisterThankyouModal} onCancel={this.cancelRegisterThankyouModal.bind(this)} width="600"/>
        <XrrtokenModal isOpen={this.state.isOpenXRRTokenModal} onCancel={this.cancelXRRTokenModal.bind(this)} width="700"/>
        <MenuModal isOpen={this.state.isMenuModalOpen} onCancel={this.onMenuModalCancel.bind(this)} width="800" defaultTab={this.state.defaultTab}/>
      </div>
    );
  }

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  componentWillMount() {
    this.removeListener = history.listen(() => {
      this.setState({ isMenuOpen: false });
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }
}
