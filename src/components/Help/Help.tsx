import * as React from 'react';
import { Link } from 'react-router-dom';
import HelpView from './HelpView';
import Button from 'Elements/Button';
import { history } from 'Components/Routes';

const styles = require('./help.css');

export default class Help extends React.Component<{}, {}> {
  render() {
    return (
      <div className="container-fluid">
        <div className={styles.header}>
          <div className={styles.back + ' ' + styles.navButton}>
                        <span onClick={() => history.goBack()}>
                            <img src="/public/assets/images/icon_back.svg"/> Go back
                     </span>
          </div>
          <h1 className={styles.title}>Help Center</h1>
          <div className={styles.contact}>
            <Button className="medium white">
              <Link to="/public/contact">Contact us</Link>
            </Button>
          </div>
        </div>
        <div className={styles.panel}>
          <HelpView/>
        </div>
      </div>
    );
  }
}
