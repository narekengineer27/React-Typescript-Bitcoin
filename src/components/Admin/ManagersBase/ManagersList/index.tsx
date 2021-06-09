import * as React from "react";
import * as _ from "lodash";
import { connect } from "react-redux";
import ReactIScroll from "react-iscroll";
import * as iScroll from "iscroll";
import Rating from "Elements/Rating";
import Loader from "Elements/Loader";
import Button from "Elements/Button";
import SortingIcons from "Elements/SortingIcons";
import { Table, TableRow, TableCell } from "Elements/Table";
import Modal from "Elements/Modal";
import {
  fetchManagersList,
  openApprove,
  openReject,
  openView,
  confirmApprove,
  cancelApprove,
  fetchReports
} from "./actions";
const styles = require('./managers-list.css');
const iScrollOptions = require('Constants/options.json').iScroll;

const allFields = [{
  name: 'picture',
  label: 'Picture',
  sortable: false,
}, {
  name: 'name',
  label: 'Name',
  sortable: false,
}, {
  name: 'country',
  label: 'Country',
  sortable: false,
}, {
  name: 'city',
  label: 'City',
  sortable: false,
}, {
  name: 'rating',
  label: 'Rating',
  sortable: true,
}, {
  name: 'total_profit_made',
  label: 'Total Profit made',
  sortable: true,
}, {
  name: 'email',
  label: 'Email',
  sortable: false,
}, {
  name: 'actions',
  label: 'Actions',
  sortable: false,
}];

class ManagersList extends React.Component<any, any> {

  componentDidMount() {
    this.props.fetchManagersList();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.viewStatus.progressing && !this.props.viewStatus.progressing) {
      this.props.fetchReports();
    }
  }

  renderHeaderFields() {

    const {
      fields = ['name', 'country', 'city', 'email'],
      actionButtons = ['approve', 'reject', 'view'],
    } = this.props;
    fields.push('actions');
    const displayedFields = allFields.filter(f => {
      return !!fields.find(n => n === f.name);
    });

    return displayedFields.map((field, index) => {
      return (
        <TableCell
          header bold key={index}
          className={styles[field.name === 'actions' ? ('actions' + actionButtons.length) : field.name]}>
          <div className="flex full-width">{field.label}
            <div className="vertical-center">
              {field.sortable && <SortingIcons
              />}
            </div>
          </div>
        </TableCell>
      );
    });
  }

  renderManagers() {
    const {
      managers,
      actionButtons = ['approve', 'reject', 'view'],
      openApprove,
      openReject,
      openView,
      fields = ['name', 'country', 'city', 'email'],
    } = this.props;

    const buttons = {
      'approve': (<Button
        className="blue small"
        style={{ width: 80 }}
        onClick={() => openApprove()}>
        APPROVE
      </Button>),
      'reject': (<Button
        className="red small"
        style={{ width: 80 }}
        onClick={() => openReject()}>
        REJECT
      </Button>),
      'view': (<Button
        className="white small"
        style={{ width: 100 }}
        onClick={() => openView()}>
        VIEW REPORT
      </Button>),
    };

    return managers.map((m, i) => {
      const values = _.pick(m, fields);
      return (
        <div key={m.id}>
          <TableRow>
            {values.hasOwnProperty('picture') && <TableCell>{values.picture}</TableCell>}
            {values.hasOwnProperty('name') && <TableCell>{values.name}</TableCell>}
            {values.hasOwnProperty('country') && <TableCell>{values.country}</TableCell>}
            {values.hasOwnProperty('city') && <TableCell>{values.city}</TableCell>}
            {values.hasOwnProperty('email') && <TableCell>{values.email}</TableCell>}
            {values.hasOwnProperty('rating') && <TableCell><Rating rate={3} nReviews={3333}></Rating></TableCell>}
            {values.hasOwnProperty('total_profit_made') && <TableCell>{values.total_profit_made}</TableCell>}
            <TableCell className={styles['actions' + actionButtons.length]}>
              {actionButtons.map((b, j) => {
                return <div key={i + ' ' + j} className={styles.btn}>{buttons[b]}</div>;
              })}
            </TableCell>
          </TableRow>
        </div>
      )
    });
  }

  renderReports() {
    const { reportsData } = this.props;
    return (
      <div className={styles.managerReports}>
        {reportsData.map(r => (
          <div key={r.id}>
            <div className={styles.question}>{r.question}</div>
            <div className={styles.answerWrapper}>
              <div className={styles.answer}>{r.answer}</div>
              <div>{r.correct ? (
                <span className={styles.correct}>Correct</span>
              ) : (
                <span className={styles.wrong}>Wrong</span>
              )}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      managersStatus,
      viewStatus,
      reportsStatus,
      confirmApprove,
      cancelApprove,
      reportsData,
    } = this.props;
    const $fields = this.renderHeaderFields();
    const $managers = this.renderManagers();
    const $reports = this.renderReports();
    const $scrollableTable = $managers.length > 5 ? (
      <ReactIScroll
        iScroll={iScroll}
        options={iScrollOptions}
      >
        <div>
          {$managers}
        </div>
      </ReactIScroll>
    ) : (
      <div className={styles.noScrollbar}>
        {$managers}
      </div>
    );

    const reportHasScrollbar = reportsData.length > 3;
    const $reportScrollableTable = reportHasScrollbar ? (
      <div className={styles.managerReportsWrapper}>
        <ReactIScroll
          iScroll={iScroll}
          options={iScrollOptions}
        >
          {$reports}
        </ReactIScroll>
      </div>
    ) : (
      <div className={styles.noScrollbar}>
        {$reports}
      </div>
    );

    return (
      <div className={styles.table}>
        <Table>
          <TableRow>{$fields}</TableRow>
          <div className={styles.scrollableTable}>
            {$scrollableTable}
            <Loader isOpen={managersStatus.loading}></Loader>
          </div>
        </Table>
        <Modal
          isOpen={viewStatus.progressing}
          loading={reportsStatus.loading}
          noFooterBorder
          title='Manager Report'
          confirmButtonText='APPROVE'
          cancelButtonText='REJECT'
          onConfirm={confirmApprove}
          onCancel={cancelApprove}
          buttonStyle={{ width: 90 }}
          buttonClassName="small blue"
          buttonLoading={viewStatus.loading}
        >
          {$reportScrollableTable}
        </Modal>
        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  managers: state.managersList.managers.data,
  managersStatus: state.managersList.managers.status,
  approveStatus: state.managersList.approve.status,
  reject: state.managersList.reject.status,
  viewStatus: state.managersList.view.status,
  reportsStatus: state.managersList.reports.status,
  reportsData: state.managersList.reports.data,
  ...ownProps,
});

const mapDispatchToProps = {
  fetchManagersList,
  openApprove,
  openReject,
  openView,
  confirmApprove,
  cancelApprove,
  fetchReports,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagersList);


