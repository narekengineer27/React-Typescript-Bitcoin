import * as React from 'react';
import ApproachForm from 'Components/Manager/StrategySetup/Approach/ApproachForm';
import EntryForm from 'Components/Manager/StrategySetup/Entry/EntryForm';
import ExitForm from 'Components/Manager/StrategySetup/Exit/ExitForm';
import SectionHeader from 'Partials/SectionHeader';
import 'Styles/table.less';
import Button from 'Elements/Button';
import SettingsPanel from 'Partials/SettingsPanel';
import { RouteComponentProps } from 'react-router';

const styles = require('./strategy-setup.css');

export enum MenuTabs {
  Approach = 'approach',
  Entry = 'entry',
  Exit = 'exit',
}

const menus = [{
  label: 'Approach',
  value: MenuTabs.Approach,
  title: 'Approach Setting',
  control: ApproachForm,
}, {
  label: 'Entry',
  value: MenuTabs.Entry,
  title: 'Entry Setting',
  control: EntryForm,
}, {
  label: 'Exit',
  value: MenuTabs.Exit,
  title: 'Exit Setting',
  control: ExitForm,
}];

export default class StrategySetup extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      activateRobotBlock: true,
      strategySetup: true,
      hasBorder: false,
      activateRobotIsOpen: false
    };
  }

  render() {
    const { match, history } = this.props;
    let activeMenuIndex = menus.findIndex(menu => menu.value === match.params.tab);
    if (activeMenuIndex < 0) {
      activeMenuIndex = 0;
    }
    const activeMenu = menus[activeMenuIndex];
    const Control = activeMenu.control;

    const robotConfiguration = (
      <div className={styles.mainPanel}>
        <div>
          <span className={styles.currentRobotConfig}>Current Robot Config</span>
          <div className={styles.listBox}>
            <h4 className={styles.baseTitle}>Target</h4>
            <ul>
              <li className={styles.list}>Percentage Profit <span className={styles.number}>12%</span></li>
              <li className={styles.list}>Number of Days <span className={styles.number}>25</span></li>
            </ul>
            <h4 className={styles.baseTitle}>Frugality Ratio</h4>
            <ul>
              <li className={styles.list}>Number of Coins <span className={styles.number}>520%</span></li>
              <li className={styles.list}>Frugality Ratio Threshold <span className={styles.number}>10</span></li>
              <li className={styles.list}>Target Score Threshold <span className={styles.number}>0.1641</span></li>
            </ul>
          </div>
          <div className={styles.resetButtonBottomPanel}>
            <Button submit className={'large white ' + styles.resetButton}>
              Reset Configuration
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <div className={`container-fluid ` + styles.wrapper}>
        <SectionHeader
          hasBorder={false}
          iconBackCustomClass={styles.iconBackCustomClass}
          headingTextCustomClass={styles.headingTextCustomClass}
          sectionHeaderCustomClass={styles.sectionHeaderCustomClass}
          title="Trading Strategy Setup"
        />
        <div className={styles.content}>
          <SettingsPanel
            activeIndex={activeMenuIndex}
            menus={menus}
            onChange={(menu) => history.push('/strategy-setup/' + menu.value)}
            configuration={robotConfiguration}
          >
            <div className={styles.page}>
              <Control/>
            </div>
          </SettingsPanel>
        </div>
      </div>
    );
  }
}

type Props = RouteComponentProps<{ tab: string }>;
