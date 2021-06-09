import * as React from 'react';
import Button from 'Elements/Button';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import { UserPackage } from 'Models/UserPackage';
import { openCreateAccount } from 'Partials/ManageExchangeAccounts/actions';
import { history } from 'Components/Routes';
import { openActivateLiveModal } from 'Components/MyAccount/PlatformFeatures/actions';
import ActivateLiveModal from 'Components/MyAccount/PlatformFeatures/ActivateLiveModal';
import { Link } from 'react-router-dom';

const styles = require('./manual-trading-robot.css');

class SetupBoard extends React.Component<Props, {}> {

  render() {
    const { pack, openActivateLiveModal } = this.props;

    let showActiveMode = false;
    if (pack.exchanges) {
      const basePack = pack.exchanges.find(item => item.exchange === '');
      showActiveMode = basePack && !!basePack.active_days_eligible;
    }

    return (
      <div className={styles.mainPanel}>
        <div className={styles.setupWrapper}>
          <h1>Welcome, please setup your board</h1>

          <p>In order to get started you need to integrate your trading account from one of the offered exchanges.
            Continue and check out all the packages we offer.</p>

          {showActiveMode && (
            <Button
              className={'large white ' + styles.setupActive}
              onClick={openActivateLiveModal}
            >
              1 Day Active Mode
            </Button>
          )}

          <Button
            className={'large blue ' + styles.setupChoose}
            onClick={() => history.push('/my-account/platform-features/packages')}
          >
            Choose Package
          </Button>

          <div className={styles.setupFooter}>
            If you need any help getting started, please go to our <Link to="/help">Help Center</Link>
          </div>
          <ActivateLiveModal/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  return {
    pack: rootState.platformFeatures.userPackage.data as UserPackage,
    exchangeAccounts: rootState.exchangeAccountsDropdown.exchangeAccounts.data,
  };
};

const mapDispatchToProps = {
  openCreateAccount,
  openActivateLiveModal,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(SetupBoard);
