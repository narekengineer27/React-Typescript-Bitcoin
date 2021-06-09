import * as React from 'react';
import Button from 'Elements/Button';

const styles = require('./platform-features.css');

interface Props {
  title: string;
  amount?: number;
  unit?: string;
  warn?: boolean;
  type: 'amount' | 'activate' | 'inactive';
  onActivate?: () => void;
}

export default class FeatureCard extends React.Component<Props, {}> {
  render() {
    const { title, onActivate, amount, warn, unit, type } = this.props;
    let right: JSX.Element;
    if (type === 'amount') {
      right = (
        <div className={styles.amount + ' ' + (warn ? styles.warn : '')}>
          {amount} {!unit ? '' : (unit + (amount > 1 ? 's' : ''))} left
        </div>
      );
    } else if (type === 'activate') {
      right = (<Button onClick={onActivate} className={'medium blue ' + styles.activateButton}>Activate</Button>);
    } else if (type === 'inactive') {
      right = <div className={styles.inactive}>Inactive</div>;
    }

    return (
      <div className={styles.featureCard}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.right}>
          {right}
        </div>
      </div>
    );
  }
}
