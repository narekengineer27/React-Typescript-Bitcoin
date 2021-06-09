import * as React from 'react';
import { loadUserPackage, openActivateLiveModal } from './actions';
import { IState } from './types';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import FeatureCard from './FeatureCard';
import { history } from 'Components/Routes';
import Loader from 'Elements/Loader';
import { ExchangePackage } from 'Models/ExchangePage';
import { fetchExchanges } from 'Partials/ExchangeAccountsDropdown/actions';
import { IState as MTRState } from 'Partials/ExchangeAccountsDropdown/types';
import ActivateLiveModal from './ActivateLiveModal';

const styles = require('./platform-features.css');

class Features extends React.Component<Props, {}> {

  static getTimeLeft(seconds: number) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor(seconds / 60);

    if (days > 0) {
      return { amount: days, unit: 'day' };
    }

    if (hours > 0) {
      return { amount: hours, unit: 'hour' };
    }

    return { amount: minutes, unit: 'minute' };
  }

  componentWillMount() {
    this.props.loadUserPackage();
    this.props.fetchExchanges();
  }

  render() {
    const { data, status } = this.props.userPackage;
    const { exchanges, openActivateLiveModal } = this.props;

    if (!status.success || !exchanges.status.success) {
      return <Loader isOpen className="large transparent"/>;
    }

    const testEnabled = !!data.test_enabled;
    const testLeft = Features.getTimeLeft(data.test_time_left);

    const allEnabled = !!data.all_live_enabled;
    const allLeft = Features.getTimeLeft(data.all_time_left);

    const emailsLeft = (data.email_max - data.email_used) || 0;
    const smsLeft = (data.sms_max - data.sms_used) || 0;

    const exchangeControls: JSX.Element[] = [];
    let showActivateDay = false;

    if (data.exchanges) {
      const exchangesMap: { [id: string]: ExchangePackage } = {};
      for (let exchange of data.exchanges) {
        exchangesMap[exchange.exchange] = exchange;
      }

      if (exchangesMap[''] && exchangesMap[''].active_days_eligible) {
        showActivateDay = true;
      }

      for (let exchange of exchanges.data) {
        const pack = exchangesMap[exchange.id];
        if (pack && pack.live_enabled) {
          const left = Features.getTimeLeft(pack.live_time_left);

          exchangeControls.push(
            <FeatureCard
              key={exchange.id}
              title={exchange.name}
              type="amount"
              amount={left.amount}
              unit={left.unit}
              warn={left.unit !== 'day' || left.amount <= 3}
            />
          );
        } else {
          exchangeControls.push(<FeatureCard key={exchange.id} title={exchange.name} type="inactive"/>);
        }
      }
    }

    return (
      <div className={styles.featuresWrapper}>
        {exchangeControls}

        {allEnabled && (
          <FeatureCard
            title="All Exchanges"
            type="amount"
            amount={allLeft.amount}
            unit={allLeft.unit}
            warn={allLeft.unit !== 'day' || allLeft.amount <= 3}
          />
        )}

        {testEnabled && (
          <FeatureCard
            title="Test Mode"
            type="amount"
            amount={testLeft.amount}
            unit={testLeft.unit}
            warn={testLeft.unit !== 'day' || testLeft.amount <= 3}
          />
        )}

        <FeatureCard title="Email Notifications" amount={emailsLeft} warn={emailsLeft <= 100} type="amount"/>
        <FeatureCard title="SMS Notifications" amount={smsLeft} warn={smsLeft <= 100} type="amount"/>
        {showActivateDay && (
          <FeatureCard title="1 day Active Mode" type="activate" onActivate={() => openActivateLiveModal()}/>
        )}

        <Button
          className={'large white ' + styles.viewAllButton}
          onClick={() => history.push('/my-account/platform-features/packages')}
        >
          View All Packages
        </Button>

        <ActivateLiveModal/>
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  const state = rootState.platformFeatures as IState;
  const exchanges = (rootState.exchangeAccountsDropdown as MTRState).exchanges;

  return {
    userPackage: state.userPackage,
    exchanges,
  };
};

const mapDispatchToProps = {
  loadUserPackage,
  fetchExchanges,
  openActivateLiveModal,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Features);
