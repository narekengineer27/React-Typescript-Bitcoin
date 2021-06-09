import * as React from "react";
import Button from "Elements/Button";
const styles = require('./subscription-plans.css');

interface SubscriptionPlansProps {
  activePlan?: number;
  onChange?(any): void;
}

class SubscriptionPlans extends React.Component<SubscriptionPlansProps> {

  public static defaultProps: SubscriptionPlansProps = {
    activePlan: -1,
    onChange: () => {
    },
  };

  render() {
    const { activePlan, onChange } = this.props;
    const subscriptions = [{
      name: 'Subscription Plan 1',
      amount: '250 BTC',
    }, {
      name: 'Subscription Plan 2',
      amount: '350 BTC',
    }];
    const activeButton = <Button className="large white full">SUBSCRIBED</Button>;
    const inActiveButtonOne = <Button onClick={() => { onChange(subscriptions[0]) } } className="large blue full">CHOOSE (250 BTC)</Button>;
    const inActiveButtonTwo = <Button onClick={() => { onChange(subscriptions[1]) } } className="large blue full">CHOOSE (350 BTC)</Button>;
    return (
      <div className={"container " + styles.wrapper}>
        <div className="row">
          <div className={styles.content + ' ' + styles.contentOne}>
            <div className={styles.plan}>
              <h4 className={styles['subscription-plan']}>Subscription Plan 1</h4>
              <ul className="list-unstyled">
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  Onetime setup fees
                </li>
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  10% profit goes to Admin
                </li>
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  5% profit goes to Manager
                </li>
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  Automatic Wthdrawal profits as fees
                </li>
              </ul>
            </div>
            {activePlan === 0 ? activeButton : inActiveButtonOne}
          </div>
          <div className={styles.content}>
            <div className={styles.plan}>
              <h4 className={styles['subscription-plan']}>Subscription Plan 2</h4>
              <ul className="list-unstyled">
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  No setup fee
                </li>
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  Minimum account capital required
                </li>
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  50% profit goes to Manager
                </li>
                <li className={styles.li}><i className={styles.icon + " fa fa-check fa-lg"} aria-hidden="true"></i>
                  The Withdrawal on the API settings can be disabled by the user
                </li>
              </ul>
            </div>
            {activePlan === 1 ? activeButton : inActiveButtonTwo}
          </div>
        </div>
      </div>
    );
  }
}

export default SubscriptionPlans;
