import * as _ from "lodash";
import * as React from 'react';
import { connect } from 'react-redux';

const styles = require('./no-data.css');

class NoData extends React.Component<any, any> {
  render() {
    const { type } = this.props;
    return (
      <div className={styles.noData}>
        <h4 className={styles.noDataTitle}>No data on your Manage {_.capitalize(type)}</h4>
        <p className={styles.noDataDescription}>You currently don’t have any data on your {type} to follow.
          Please add blog to continue.</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NoData);
