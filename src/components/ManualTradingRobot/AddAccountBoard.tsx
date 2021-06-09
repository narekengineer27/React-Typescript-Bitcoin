import * as React from 'react';
import Button from 'Elements/Button';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import { openCreateAccount } from 'Partials/ManageExchangeAccounts/actions';
import { Link } from 'react-router-dom';

const styles = require('./manual-trading-robot.css');

class AddAccountBoard extends React.Component<Props, {}> {

  render() {
    const { openCreateAccount } = this.props;

    return (
      <div className={styles.mainPanel}>
        <div className={styles.addAccountWrapper}>
          <h1>Your platform is ready!</h1>

          <img className={styles.successImage} src="/public/assets/images/signup-success.svg" alt="Success"/>

          <p>
            Your platform is ready for trading.<br/>
            Please add an exchange account to continue.
          </p>
          <Button
            className={'large blue ' + styles.addAccount}
            onClick={openCreateAccount}
          >
            Add Account
          </Button>

          <div className={styles.setupFooter}>
            If you need any help getting started, please go to our <Link to="/help">Help Center</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  return {};
};

const mapDispatchToProps = {
  openCreateAccount,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(AddAccountBoard);
