import * as React from 'react';
import Button from 'Elements/Button';
import { round } from 'Utils/math';
import { Package } from 'Models/Package';

interface Props {
  pack: Package;
  onActivate: () => void;
  onScratch: () => void;
}

const styles = require('./platform-features.css');

export default class PackageCard extends React.Component<Props, {}> {

  render() {
    const { type, emails, sms, price, description, enabled, completed, purchased } = this.props.pack;
    const days = this.props.pack.live_days;
    const testDays = this.props.pack.test_days || days;
    const isExchange = type === 'one-exchanges' || type === 'all-exchanges' || type === 'education';
    const isNotifications = type === 'notifications';
    const isEducation = type === 'education';
    const isAllExchanges = type === 'all-exchanges';
    const paymentPending = purchased && !completed;

    let bullets: JSX.Element;
    let duration: JSX.Element;
    let color = 'blue';

    if (isExchange) {
      color = days > 1 || isEducation ? 'green' : 'orange';
      const durationDays = isEducation ? testDays : days;
      duration = (
        <div className={styles.duration}>
          <div className={styles.days}>{durationDays}</div>
          day{durationDays > 1 ? 's' : ''}
        </div>
      );

      bullets = (
        <ul className={styles.packageCardList}>
          <li>Trade on {isAllExchanges ? 'all exchanges' : 'one exchange'} for {days} day{days > 1 ? 's' : ''}</li>
          <li>Test mode for {testDays} day{testDays > 1 ? 's' : ''}</li>
          <li>{emails} emails and {sms} sms</li>
        </ul>
      );

    } else if (isNotifications) {
      duration = (
        <div className={styles.duration}>
          <img src="/public/assets/images/icon-bell-white.svg" alt=""/>
        </div>
      );

      bullets = (
        <ul className={styles.packageCardList}>
          <li>{emails} email notifications</li>
          <li>{sms} sms notifications</li>
        </ul>
      );
    }

    let status: JSX.Element;
    if (isEducation) {
      status = (
        <div
          className={styles.statusCode}
          onClick={this.props.onScratch}
        >
          Activate via scratch code
        </div>
      );
    } else if (paymentPending) {
      status = <div className={styles.statusProcessing}>Payment processing...</div>;
    } else if (!enabled) {
      status = <div className={styles.statusDisabled}>Option disabled</div>;
    }

    return (
      <div className={styles.packageCard + ' ' + styles[color]}>
        <div className={styles.packageCardHeader}>
          {duration}
          <div>
            <div className={styles.title}>{description}</div>
            <div className={styles.price}>
              {round(+price)} BTC
            </div>
          </div>
        </div>
        {bullets}
        <div className={styles.buttonArea}>
          {(!enabled || paymentPending) ? null : (
            <Button
              className={'large blue ' + styles.button}
              onClick={this.props.onActivate}
              disabled={!enabled || paymentPending}
            >
              Activate
            </Button>
          )}
          {status}
        </div>
      </div>
    );
  }
}
