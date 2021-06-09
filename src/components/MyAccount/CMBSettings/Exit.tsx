import * as React from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import Button from 'Elements/Button';
import ExitStrategy from "Components/ExitStrategy";

const myAccountStyles = require('../my-account.css');
const styles = require('./cmb-settings.css');

class ExitForm extends React.Component<any> {

  constructor(props) {
    super(props);
  }

  onSubmit(values) {
    const { saveDefaultExitStrategy, dispatch, cmbSettingFormValues } = this.props;
    dispatch(saveDefaultExitStrategy({
      ...cmbSettingFormValues,
      ...values,
    }));
  }

  render() {
    const { status, dispatch } = this.props;
    return (
      <div className={styles.exitForm}>
        <ExitStrategy
          wrapperClass={myAccountStyles.rightPanelSub}
          formClass={styles.exitStrategyForm}
          toSetDefaults
        />
        <div className={myAccountStyles.bottomPanel}>
          <div className={styles.btn}>
            <Button
              onClick={() => dispatch(submit('exitStrategyForm'))}
              className={"large blue pull-left " + myAccountStyles.submitButton}
              loading={status.loading}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  status: state.exitStrategy.status,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExitForm);
