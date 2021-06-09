import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "Elements/Button";
import { Status } from "Models/Status";
import Modal from "Elements/Modal";
import { saveSettings, addNewAccount, confirmAddAccount, cancelAddAccount, } from "./actions";

const settingStyles = require('../settings.css');
const styles = require('./exchange-accounts.css');

@reduxForm({
  form: 'addNewAccountForm',
})

class AddNewAccountForm extends React.Component<any, any> {
  onSubmit(values: object) {
    this.props.addNewQuestion(values);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          123456
        </div>
      </form>
    );
  }
}


class ExchangeAccountsForm extends React.Component<any, any> {

  onClick(values: object) {
    const { saveSettings } = this.props;
    saveSettings(values);
  }


  render() {
    const {
      status = new Status(),
      addStatus = new Status(),
      addNewAccount,
      confirmAddAccount,
      cancelAddAccount,
    } = this.props;
    return (
      <div>
        <div className={settingStyles.titleWrapper}>
          <h4 className={settingStyles.title}>Exchange accounts</h4>
          <p>
            Here you define the exchange accounts which the user will choose in signup process
          </p>
          <div className={settingStyles.questions}>
            <div className={settingStyles.questionFlex}>
              <h4 className={"vertical-center " + styles.description}>Poloniex</h4>
              <div className={styles.removeBtn}>
                <Button
                  style={{width: 90}}
                  className="small red">
                  REMOVE
                </Button>
              </div>
            </div>
            <div className={settingStyles.questionFlex}>
              <h4 className={"vertical-center " + styles.description}>BITTERX</h4>
              <div className={styles.removeBtn}>
                <Button
                  style={{width: 90}}
                  className="small red">
                  REMOVE
                </Button>
              </div>
            </div>
            <div className={settingStyles.questionFlex}>
              <h4 className={"vertical-center " + styles.description}>YOBIT.net</h4>
              <div className={styles.removeBtn}>
                <Button
                  style={{width: 90}}
                  className="small red">
                  REMOVE
                </Button>
              </div>
            </div>
            <div onClick={addNewAccount} className={settingStyles.addMoreAnswer}>
              <i className={"fa fa-plus " + styles.icon} aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;
              <span className={styles.addDescription}>Add new account</span>
            </div>
          </div>
        </div>
        <div className={settingStyles.btnFlex}>
          <div className={settingStyles.btn}>
            <Button
              onClick={addNewAccount}
              className="large white" loading={addStatus.loading}>
              NEW ACCOUNT
            </Button>
          </div>
          <div className={settingStyles.btn}>
            <Button
              onClick={this.onClick.bind(this)}
              className="large blue " loading={status.loading}>
              SAVE SETTINGS
            </Button>
          </div>
        </div>
        <Modal
          isOpen={addStatus.progressing}
          title="New Account"
          confirmButtonText="ADD ACCOUNT"
          cancelButtonText='Cancel'
          onConfirm={confirmAddAccount}
          onCancel={cancelAddAccount}
          buttonStyle={{width: 'auto'}}
        >
          <AddNewAccountForm></AddNewAccountForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.exchangeAccounts.status,
  addStatus: state.exchangeAccounts.add.status,
});

const mapDispatchToProps = {
  saveSettings,
  addNewAccount,
  confirmAddAccount,
  cancelAddAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeAccountsForm);
