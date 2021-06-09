import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import AccountSettings from './AccountInformation/index';
import SectionHeader from 'Partials/SectionHeader';
import CMBSettings from './CMBSettings';
import BillingHistory from './BillingHistory';
import SettingsPanel from 'Partials/SettingsPanel';
import MentorProgram from './MentorProgram';
import PlatformFeatures from './PlatformFeatures';
import RobotSettings from './RobotSettings';

const styles = require('./my-account.css');

enum MenuTabs {
  AccountInfo = 'account-info',
  RobotSettings= 'robot-settings',
  CMBSettings = 'cmb-settings',
  PaidFeatures = 'paid-features',
  PlatformFeatures = 'platform-features',
  BillingHistory = 'billing-history',
  MentorProgram = 'mentor-program',
}

const menus = [{
  label: 'Account Information',
  value: MenuTabs.AccountInfo,
  title: 'Account Information Settings',
  control: AccountSettings,
}, {
  label: 'Robot Settings',
  value: MenuTabs.RobotSettings,
  title: 'Robot Settings',
  control: RobotSettings,
}, {
  label: 'CMB Settings',
  value: MenuTabs.CMBSettings,
  title: 'CMB Settings',
  control: CMBSettings,
}, {
  label: 'Platform Features',
  value: MenuTabs.PlatformFeatures,
  title: 'Platform Settings',
  control: PlatformFeatures,
}, {
  label: 'Billing History',
  value: MenuTabs.BillingHistory,
  title: 'Billing History',
  control: BillingHistory,
}, {
  label: 'Become Mentor',
  value: MenuTabs.MentorProgram,
  title: 'Become Mentor',
  control: MentorProgram,
}];

export default class MyAccount extends React.Component<RouteComponentProps<{ tab: string, cmbForm: string }>, {}> {
  render() {
    const { match, history } = this.props;
    let activeMenuIndex = menus.findIndex(menu => menu.value === match.params.tab);
    if (activeMenuIndex < 0) {
      activeMenuIndex = 0;
    }
    const activeMenu = menus[activeMenuIndex];

    const title = activeMenu.title;
    const Control = activeMenu.control;

    return (
      <div className={`container-fluid ` + styles.wrapper}>
        <SectionHeader
          goBack="/mtr"
          hasBorder={false}
          iconBackCustomClass={styles.iconBackCustomClass}
          headingTextCustomClass={styles.headingTextCustomClass}
          sectionHeaderCustomClass={styles.sectionHeaderCustomClass}
          title={title}
        />
        <div>
          <SettingsPanel
            activeIndex={activeMenuIndex}
            menus={menus}
            onChange={(menu) => history.push('/my-account/' + menu.value)}
          >
            <div className={styles.page}>
              <Control formTab={match.params.cmbForm}/>
            </div>
          </SettingsPanel>
        </div>
      </div>
    );
  }
}
