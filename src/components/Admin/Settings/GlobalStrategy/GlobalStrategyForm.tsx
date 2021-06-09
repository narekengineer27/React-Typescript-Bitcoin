import * as React from "react";
import { reduxForm } from "redux-form";
import ButtonGroup from "Elements/ButtonGroup";
import ApproachForm from "./ApproachForm";
import Button from "Elements/Button";
import { isProvided, isStrictlyPositiveNumber } from "Utils/validators";
import { connect } from "react-redux";
import { GlobalStrategyTabs } from "./types";
import { saveSetting, getSetting, switchTab } from "./actions";
//import EntryForm from "./EntryForm";
//import ExitForm from "./ExitForm";

const settingStyles = require('../settings.css');
const styles = require('./global-strategy.css');

class GlobalStrategyForm extends React.Component<any, any> {

  onChange(button: any) {
    const { switchTab, dispatch } = this.props;
    dispatch(switchTab(button.value));
  }


  onSubmit(values: object) {
    const { saveSetting, dispatch } = this.props;
    dispatch(saveSetting(values));
  }

  render() {
    const { handleSubmit, status, invalid = true, tab } = this.props;
    const forms = {
      [GlobalStrategyTabs.Approach]: <ApproachForm></ApproachForm>,
      [GlobalStrategyTabs.Entry]: <ApproachForm></ApproachForm>,
      [GlobalStrategyTabs.Exit]: <ApproachForm></ApproachForm>,
    };

    const $form = (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {forms[tab]}
        <div className={styles.footer}>
          <div className={styles.btn}>
            <Button
              submit tabIndex={6}
              disabled={invalid}
              className="large blue " loading={status.loading}>
              SAVE SETTINGS
            </Button>
          </div>
        </div>
      </form>
    );

    return (
      <div>
        <div className={settingStyles.titleWrapper}>
          <h4 className={settingStyles.title}>Global Trading Strategy Settings</h4>
          <p>Here you define what are the global trading strategy parameters.</p>
        </div>

        <div className={styles.btnGroup}>
          <ButtonGroup
            activeIndex={tab}
            className="medium"
            buttons={[
              { label: 'Approach', value: GlobalStrategyTabs.Approach },
              { label: 'Entry', value: GlobalStrategyTabs.Entry },
              { label: 'Exit', value: GlobalStrategyTabs.Exit },
            ]}
            onChange={this.onChange.bind(this)}
          />
        </div>
        {$form}
      </div>
    );
  }
}

const validate = values => {
  const errors: any = {};
  // Entry tabs validation
  if (!isProvided(values.entry_frugality_ratio)) {
    errors.entry_frugality_ratio = 'Please provide your frugality ratio.';
  } else if (!isStrictlyPositiveNumber(values.entry_frugality_ratio)) {
    errors.entry_frugality_ratio = 'Please provide a valid amount.';
  }

  if (!isProvided(values.entry_price_relativity_ratio)) {
    errors.entry_price_relativity_ratio = 'Please provide a valid';
  } else if (!isStrictlyPositiveNumber(values.entry_price_relativity_ratio)) {
    errors.entry_price_relativity_ratio = 'Please provide a valid amount.';
  }

  // Withdrawal tabs validation
  if (!isProvided(values.withdrawal_capital_balance)) {
    errors.withdrawal_capital_balance = 'Please provide your capital balance.';
  } else if (!isStrictlyPositiveNumber(values.withdrawal_capital_balance)) {
    errors.withdrawal_capital_balance = 'Please provide a valid amount.';
  }

  if (!isProvided(values.withdrawal_capital_balance_currency)) {
    errors.withdrawal_capital_balance_currency = 'Please provide your capital balance currency.';
  }
  if (!isProvided(values.withdrawal_value)) {
    errors.withdrawal_value = 'Please provide your withdrawal value.';
  } else if (!isStrictlyPositiveNumber(values.withdrawal_value)) {
    errors.withdrawal_value = 'Please provide a valid amount.';
  }

  if (!isProvided(values.withdrawal_value_coin)) {
    errors.withdrawal_value_coin = 'Please provide your withdrawal value coin.';
  }

  if (!isProvided(values.withdrawal_address)) {
    errors.withdrawal_address = 'Please provide your withdrawal address.';
  }

  // Exit tabs validation
  if (!isProvided(values.exit_target)) {
    errors.exit_target = 'Please provide your target.';
  } else if (!isStrictlyPositiveNumber(values.exit_target)) {
    errors.exit_target = 'Please provide a valid amount.';
  }

  if (!isProvided(values.exit_shrink_differential)) {
    errors.exit_shrink_differential = 'Please provide your shrink differential.';
  } else if (!isStrictlyPositiveNumber(values.exit_shrink_differential)) {
    errors.exit_target = 'Please provide a valid amount.';
  }

  if (!isProvided(values.exit_option)) {
    errors.exit_option = 'Please provide your option exit.';
  }
  return errors;
};

const mapStateToProps = state => ({
  status: state.globalStrategy.status,
  initialValues: state.globalStrategy.getGlobalStrategy,
  tab: state.globalStrategy.tab,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  saveSetting,
  getSetting,
  switchTab,
});

const form = reduxForm({
  form: 'globalStrategy',
  enableReinitialize: true,
  validate
})(GlobalStrategyForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
