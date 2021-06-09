import * as React from 'react';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import { loadBillingHistory } from './actions';
import { IState } from './types';
import { Table, TableCell, TableRow } from 'Elements/Table';
import { round } from 'Utils/math';
import Loader from 'Elements/Loader';

const styles = require('./billing-history.css');

class BillingHistory extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.loadBillingHistory();
  }

  render() {
    const { billingHistory: { status, data } } = this.props;
    return (
      <div className={styles.table}>
        {status.loading && <Loader isOpen className="large transparent"/>}
        {status.success && (
          <Table>
            <TableRow>
              <TableCell className="th">Date</TableCell>
              <TableCell className="th">Purpose</TableCell>
              <TableCell className="th">Amount</TableCell>
            </TableRow>
            {data.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.created_at}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{round(+entry.total_price)} BTC</TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  const state = rootState.billingHistory as IState;
  return {
    billingHistory: state.billingHistory
  };
};

const mapDispatchToProps = {
  loadBillingHistory
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BillingHistory);
