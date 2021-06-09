import * as React from "react";
import * as _ from 'lodash';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "Elements/Dropdown";
import { getUserRole } from "Utils/auth";
import { signOut, resetStatus } from "Components/MainHeader/actions";
import Notifier from 'Components/MainHeader/Notifier';

const styles = require('Components/MainHeader/main-header.css');

const menus = {
  admin: [{
    path: '/admin/settings',
    label: 'Settings',
  }, {
    path: '/admin/message-center',
    label: 'Message Center',
  }, {
    path: '/admin/subscribers',
    label: 'Subscribers',
  }, {
    path: '/admin/managers-base',
    label: 'Managers',
  }, {
    path: '/admin/data-management',
    label: 'Rich Data',
  }],
  standard: [{
    path: '/strategy-setup',
    label: 'Strategy',
  }, {
    path: '/execution',
    label: 'Execution',
  }, {
    path: '/dashboard',
    label: 'Dashboard',
  }, {
    path: '/manual-trading',
    label: 'Manual Trading',
  }, {
    path: '/mtr',
    label: 'Manual Trading via Robot',
  }],
};

const dropdownMenus = {
  standard: [{
    label: 'My Account',
    value: 'my-account-default',
  }, {
    label: 'Settings',
    value: 'my-account',
    href: '/my-account',
    nonSelectable: true,
  }, {
    label: 'Help Center',
    value: 'help',
    href: '/help',
    nonSelectable: true,
  }, {
    label: 'Sign Out',
    value: 'sign-out',
  }],
  admin: [{
    label: 'My Account',
    value: 'my-account-default',
  }, {
    label: 'My Account',
    value: 'my-account',
    href: '/my-account',
    nonSelectable: true,
  }, {
    label: 'Help Center',
    value: 'help',
    href: '/help',
    nonSelectable: true,
  }, {
    label: 'Sign Out',
    value: 'sign-out',
  }],
};

class MainHeader extends React.Component<any, any> {

  static renderMyAccount(menu: any, index: number, isActive: boolean,
                         isOpen: boolean, onChange: () => void): JSX.Element {
    if (isOpen) {
      return null;
    }

    return (
      <div>
        <div className={styles.myAccount}>My Account</div>
        <div className={styles.myAccountIcon}><i className="fa fa-user" aria-hidden="true"/></div>
      </div>
    );
  }

  componentDidMount() {
    this.props.resetStatus();
  }

  renderMidMenus(role: string) {
    return (
      <ul className={styles.navigation}>
        {menus[role].map((menu, index) => {
          return (
            <li
              key={index}
              className={styles.menu + ' ' + (_.startsWith(this.props.path, menu.path) ? styles.active : '')}
            >
              <Link to={menu.path}>{menu.label}</Link>
            </li>
          );
        })}
      </ul>
    );
  }

  renderDropdownMenus(role: string) {
    const { status, signOut } = this.props;
    const menus = dropdownMenus[role];
    const menusWithAction = menus.map(menu => {
      if (menu.value === 'my-account-default') {
        menu.renderItem = MainHeader.renderMyAccount;
      }
      if (menu.value === 'sign-out') {
        menu.onClick = signOut;
      }
      return menu;
    });

    return (
      <Dropdown
        loading={status.loading}
        menus={menusWithAction}
        className="medium md-small md-auto-size-popup-left"
        minWidth={1}
      />
    );
  }

  render() {
    const { status, path } = this.props;
    const role = getUserRole();
    const $midMenus = this.renderMidMenus(role);
    const $dropdownMenus = this.renderDropdownMenus(role);

    const noMenusInMiddle = !![
      '/welcome',
      '/subscribe',
      '/assign-manager',
      '/wallet-id',
      '/exchange-accounts',
    ].find(p => p === path);

    if (status.success) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }

    return (
      <div className={styles.header}>
        <div className="container-fluid">
          <div className={styles.headerLayout}>
            <Link to="/mtr" className="flex">
              <div className={styles.logo}/>
            </Link>
            {!noMenusInMiddle && (
              <div className={styles.navigationBox}>
                {$midMenus}
              </div>
            )}
            <div className={styles.right}>
              <Notifier/>
              {$dropdownMenus}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.mainHeader.status,
});

const mapDispatchToProps = {
  signOut,
  resetStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
