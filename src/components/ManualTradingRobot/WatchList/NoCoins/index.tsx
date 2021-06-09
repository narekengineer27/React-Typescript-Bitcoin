import * as React from 'react';
import { Link } from "react-router-dom";
import Button from 'Elements/Button';

const styles = require('./no-coins.css');

export default class NoCoins extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.noCoins}>
        <h3 className={styles.noCoinsTitle}>No coins on your Watch list</h3>
        <p className={styles.noCoinsDescription}>You currently don’t have any coins on your watchlist to follow.
          Please add coins from your suggestions to continue.</p>
        <div className={styles.viewSuggestions}>
          <Link to="/mtr/monitor">
            <Button
              className="large blue"
            >
              View Suggestions
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
