import * as React from 'react';
import { connect } from 'react-redux';

const styles = require('./no-data.css');

class NoData extends React.Component<any, any> {
  render() {
    return (
      <div className={styles.noData}>
        <h4 className={styles.noDataTitle}>No data on your Message Center</h4>
        <p className={styles.noDataDescription}>You currently don’t have any data on your message center to follow.
          Please add message to continue.</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NoData);
