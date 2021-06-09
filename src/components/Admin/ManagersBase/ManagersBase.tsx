import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import SectionHeader from 'Partials/SectionHeader';
import FindManager from 'Components/AssignManager/FindManager';
import ManagersList from 'Components/Admin/ManagersBase/ManagersList';
import QuestionnaireForm from 'Components/Admin/Settings/Questionnaire/QuestionnaireForm';
import SettingsPanel from 'Partials/SettingsPanel';

const styles = require('./managers-base.css');

export enum MenuTabs {
  ActiveManagers = 'active-managers',
  NewManagers = 'new-managers',
  RejectedManagers = 'rejected-managers',
  ManagersQuestionnaire = 'managers-questionnaire',
}

const menus = [{
  label: 'Active Managers',
  value: MenuTabs.ActiveManagers,
  title: 'Active Managers',
  control: () => <FindManager actionButtons={['details']}/>,
}, {
  label: 'New Managers',
  value: MenuTabs.NewManagers,
  title: 'New Managers',
  badge: (<div className={styles.badge}>12</div>),
  control: ManagersList,
}, {
  label: 'Rejected Managers',
  value: MenuTabs.RejectedManagers,
  title: 'Rejected Managers',
  control: () => <ManagersList actionButtons={['view']}/>,
}, {
  label: 'Managers Questionnaire',
  value: MenuTabs.ManagersQuestionnaire,
  title: 'Managers Questionnaire',
  control: QuestionnaireForm,
}];

export default class ManagersBase extends React.Component<RouteComponentProps<{ tab: string }>, any> {
  render() {
    const { match, history } = this.props;
    let activeMenuIndex = menus.findIndex(menu => menu.value === match.params.tab);
    if (activeMenuIndex < 0) {
      activeMenuIndex = 0;
    }
    const activeMenu = menus[activeMenuIndex];
    const Control = activeMenu.control;

    return (
      <div className={`container-fluid ` + styles.wrapper}>
        <SectionHeader
          hasBorder={false}
          title="Managers Base"
        />
        <div>
          <SettingsPanel
            activeIndex={activeMenuIndex}
            menus={menus}
            onChange={(menu) => history.push('/admin/managers-base/' + menu.value)}
          >
            <div className={activeMenu.value === MenuTabs.ManagersQuestionnaire ? styles.page : ''}>
              <Control />
            </div>
          </SettingsPanel>
        </div>
      </div>
    );
  }
}
