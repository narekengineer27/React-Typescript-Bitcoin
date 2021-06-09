import * as React from 'react';
import { connect } from 'react-redux';
import ButtonGroup from 'Elements/ButtonGroup';
import Exit from './Exit';
import Withdrawal from './Withdrawal';
import { CMBSettingsTabs } from './types';
import { getCurrentSettings, fetchAccounts } from './actions';

const myAccountStyles = require('../my-account.css');

const tabs = [{
  label: 'Exit',
  value: CMBSettingsTabs.Exit,
  control: Exit,
  href: `/my-account/cmb-settings/${CMBSettingsTabs.Exit}`,
}, {
  label: 'Withdrawal',
  value: CMBSettingsTabs.Withdrawal,
  control: Withdrawal,
  href: `/my-account/cmb-settings/${CMBSettingsTabs.Withdrawal}`,
}];

class CMBSettings extends React.Component<any, {}> {
  componentDidMount() {
    this.props.getCurrentSettings();
    this.props.fetchAccounts();
  }

  render() {
    const { formTab = tabs[0].value } = this.props;
    const activeMenuIndex = Math.max(tabs.findIndex(menu => menu.value === formTab), 0);
    const Control = tabs[activeMenuIndex].control;

    return (
      <div>
        <div className={myAccountStyles.rightPanelSub}>
          <ButtonGroup
            activeIndex={activeMenuIndex}
            className="medium"
            buttons={tabs}
          />
        </div>
        <div>
          {<Control/>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  accountsStatus: state.cmbSetting.accounts.status,
  ...ownProps,
});

const mapDispatchToProps = ({
  getCurrentSettings,
  fetchAccounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(CMBSettings);
