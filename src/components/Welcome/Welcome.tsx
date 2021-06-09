import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Arrow from 'Elements/Arrow';

const styles = require('./welcome.css');

interface WelcomeProps extends RouteComponentProps<{}> {
}

class Welcome extends React.Component<WelcomeProps> {

  render() {
    return (
      <div>
        <h1 className={styles.title}>Welcome to XChangeRate</h1>
        <p className={styles.description}>
          You can chosse to continue as a Subscriber, apply as a Manager or access Manual Trading
        </p>
        <Link to='/subscribe' className={styles.role}>
          <h4 className={styles.roleTitle}>Continue as </h4>
          <h4 className={styles.roleTitle}><strong>Subscriber</strong></h4>
          <p className={styles.roleDescription}>
            You can subscribe to one of our offered plans, find a Manager who will handle your trading strategy, and
            receive the profits that our robot makes by trading on your part.
          </p>
          <Arrow className={styles.arrow}/>
        </Link>
        <Link to='/mtr' className={styles.role}>
          <h4 className={styles.roleTitle}>Apply as</h4>
          <h4 className={styles.roleTitle}><strong>Manager</strong></h4>
          <p className={styles.roleDescription}>You can handle trading strategy for one or more subscribers, create your
            own strategy, and receive percentage of profit from every subscriber that you manage.
          </p>
          <Arrow className={styles.arrow}/>
        </Link>
        <Link to='/mtr' className={styles.role}>
          <h4 className={styles.roleTitle}>Access</h4>
          <h4 className={styles.roleTitle}><strong>Manual Trading</strong></h4>
          <p className={styles.roleDescription}>You can always access Manual Trading and enter all of your previous
            trades manually.
          </p>
          <Arrow className={styles.arrow}/>
        </Link>
      </div>
    );
  }
}

export default Welcome;
