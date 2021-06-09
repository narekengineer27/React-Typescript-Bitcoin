import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { returntypeof } from 'Utils/type';
import { IState } from 'Components/Admin/Settings/ReferralBonuses/types';
import { loadPaid, loadUnpaid, markBonusPaid } from 'Components/Admin/Settings/ReferralBonuses/actions';
import { Table, TableCell, TableRow } from 'Elements/Table';
import Loader from 'Elements/Loader';
import { round } from 'Utils/math';
import Button from 'Elements/Button';
import Pagination from 'Elements/Pagination';
import ButtonGroup from 'Elements/ButtonGroup';

const styles = require('./referral-bonuses.css');

class ReferralBonuses extends React.Component<Props, {}> {
  componentWillMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.section !== prevProps.match.params.section) {
      this.loadData();
    }
  }

  render() {
    const showPaid = this.props.match.params.section === 'paid';

    const tabs = [
      {
        label: 'Unpaid',
        value: null,
        href: '/admin/settings/referral-bonuses/unpaid'
      },
      {
        label: 'Paid',
        value: null,
        href: '/admin/settings/referral-bonuses/paid'
      }
    ];

    return (
      <div className={styles.mainContent}>
        <h4 className={styles.title}>Referral Bonuses</h4>
        <div className={styles.tabs}>
          <ButtonGroup activeIndex={showPaid ? 1 : 0} className="medium" buttons={tabs}/>
        </div>
        <div>
          {showPaid ? this.renderPaid() : this.renderUnpaid()}
        </div>
      </div>
    );
  }

  loadData(page?: number) {
    const { match, paid, unpaid, loadPaid, loadUnpaid } = this.props;
    if (match.params.section === 'paid') {
      const meta = page === undefined ? paid.meta : paid.meta.setActivePage(page);
      loadPaid(meta);
    } else {
      const meta = page === undefined ? unpaid.meta : unpaid.meta.setActivePage(page);
      loadUnpaid(meta);
    }
  }

  renderPaid() {
    const { paid: { data, status, meta, } } = this.props;
    return (
      <div className={styles.table}>
        {status.loading && <Loader isOpen className="large transparent"/>}
        {status.success && (
          <div>
            <Table>
              <TableRow>
                <TableCell className="th">Name</TableCell>
                <TableCell className="th">Email</TableCell>
                <TableCell className="th">Date</TableCell>
                <TableCell className="th">Amount</TableCell>
              </TableRow>
              {data.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.mentor.name}</TableCell>
                  <TableCell>{entry.mentor.email}</TableCell>
                  <TableCell>{entry.last_paid_bonus_date}</TableCell>
                  <TableCell>{round(+entry.total_mentor_bonus_paid)} BTC</TableCell>
                </TableRow>
              ))}
            </Table>

            <div className={styles.pager}>
              <Pagination
                totalPages={meta.page.total_pages}
                activePage={+meta.page.offset + 1}
                className={'large'}
                onChange={targetIndex => this.loadData(targetIndex)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  renderUnpaid() {
    const { unpaid: { data, status, meta, } } = this.props;
    return (
      <div className={styles.table}>
        {status.loading && <Loader isOpen className="large transparent"/>}
        {status.success && (
          <div>
            <Table>
              <TableRow>
                <TableCell className="th">Name</TableCell>
                <TableCell className="th">Email</TableCell>
                <TableCell className="th">Wallet Id</TableCell>
                <TableCell className="th">Amount</TableCell>
                <TableCell className="th"/>
              </TableRow>
              {data.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.mentor.name}</TableCell>
                  <TableCell>{entry.mentor.email}</TableCell>
                  <TableCell>{entry.mentor.wallet_id}</TableCell>
                  <TableCell>{round(+entry.total_mentor_bonus_to_pay)} BTC</TableCell>
                  <TableCell>
                    <Button
                      className="medium white"
                      onClick={() => this.onMarkPaidClick(entry.mentor_id, entry.last_unpaid_bonus_date)}
                    >
                      Mark Paid
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </Table>

            <div className={styles.pager}>
              <Pagination
                totalPages={meta.page.total_pages}
                activePage={+meta.page.offset + 1}
                className={'large'}
                onChange={targetIndex => this.loadData(targetIndex)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  onMarkPaidClick(userId: number, lastDate: string) {
    if (confirm('Are you sure you want to mark as paid?')) {
      (this.props.markBonusPaid(userId, lastDate) as any)
        .then(() => this.loadData());
    }
  }
}

const mapStateToProps = (rootState, ownProps: OwnProps) => {
  const state = rootState.adminReferralBonuses as IState;

  return {
    ...state
  };
};

const mapDispatchToProps = {
  loadPaid,
  loadUnpaid,
  markBonusPaid,
};

const stateProps = returntypeof(mapStateToProps);

interface OwnProps extends RouteComponentProps<{ tab: string; section: string }> {
}

type Props = typeof stateProps & typeof mapDispatchToProps & OwnProps;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReferralBonuses));
