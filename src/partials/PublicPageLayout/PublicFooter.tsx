import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from 'Elements/Button';
import { history } from 'Components/Routes';

const styles = require('./public-page-layout.css');

export default class PublicFooter extends React.Component<Props, {}> {
  render() {
    const { minimal, noStepsSeparator } = this.props;

    const steps = (
      <div>
        {!noStepsSeparator && <hr/>}
        <div className={styles.steps}>
          <div className={styles.step}>
            <img src="/public/assets/images/landing/book.svg" alt="Learn"/>
            <p>Take online courses and learn how to use our platform</p>
            <div className={styles.next}/>
          </div>

          <div className={styles.step}>
            <img src="/public/assets/images/landing/blog.svg" alt="Follow us"/>
            <p>Follow our blog to read the best tips and tricks</p>
            <div className={styles.next} onClick={() => history.push('/public/blog')}/>
          </div>
        </div>

        <div className={styles.conclusion}>
          <p>We bring you a unified interface to manage your trades across all major exchanges along with powerful
            tools to increase your profits</p>
          <Button className="large white" onClick={() => history.push('/public/help')}>Learn more</Button>
          <Button className="large blue" onClick={() => history.push('/signup')}>Get started</Button>
        </div>
      </div>
    );

    return (
      <div>
        {!minimal && steps}

        <hr/>
        <footer className={styles.footer}>
          <div className={styles.copyright}>
            &copy; {new Date().getFullYear()} Think AI - All&nbsp;rights&nbsp;reserved
          </div>

          <ul className={styles.menu}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/public/pricing">Pricing</Link></li>
            <li><Link to="/public/blog">Blog</Link></li>
            <li><Link to="/public/help">FAQ</Link></li>
            <li><Link to="/public/contact">Contact</Link></li>
            <li>TERMS OF USE</li>
          </ul>
        </footer>
      </div>

    );
  }
}

interface Props {
  minimal?: boolean;
  noStepsSeparator?: boolean;
}
