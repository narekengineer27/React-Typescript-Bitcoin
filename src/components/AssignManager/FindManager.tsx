import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import ReactIScroll from "react-iscroll";
import * as iScroll from "iscroll";
import Rating from "Elements/Rating";
import Loader from "Elements/Loader";
import Button from "Elements/Button";
import SortingIcons from "Elements/SortingIcons";
import { Table, TableRow, TableCell } from "Elements/Table";
import Modal from "Elements/Modal";
import ManagerInfo from "Partials/ManagerInfo";
import ManagerFiltersForm from "./ManagerFiltersForm";
import {
  fetchManagers,
  openAssign,
  cancelAssign,
  confirmAssign,
  openDetails,
  cancelDetails,
} from "./actions";

const styles = require('./assign-manager.css');
const iScrollOptions = require('Constants/options.json').iScroll;

const fields = [{
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
  name: 'actions',
  label: 'Actions',
  sortable: false,
}];

class FindManager extends React.Component<any> {
  componentDidMount() {
    this.props.fetchManagers();
  }

  renderHeaderFields() {
    return fields.map((field, index) => {
      return (
        <TableCell header bold key={index} className={styles[field.name]}>
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
      openAssign,
      openDetails,
      actionButtons = ['assign']
    } = this.props;

    const buttons = (targetManager) => ({
      'assign': (<Button
        className="blue small"
        style={{ width: 90 }}
        onClick={() => openAssign(targetManager)}>
        ASSIGN
      </Button>),
      'details': (<Button
        className="blue small"
        style={{ width: 90 }}
        onClick={() => openDetails(targetManager)}>
        DETAILS
      </Button>),
    });

    return managers.map((m, i) => {
      return (
        <div key={m.id}>
          <TableRow>
            <TableCell>{m.picture}</TableCell>
            <TableCell>{m.name}</TableCell>
            <TableCell>{m.country}</TableCell>
            <TableCell>{m.city}</TableCell>
            <TableCell><Rating rate={3} nReviews={3333}></Rating></TableCell>
            <TableCell>{m.totalProfitMade}</TableCell>
            <TableCell>{actionButtons.map((b, j) => {
              return <div key={i + ' ' + j}>{buttons(m)[b]}</div>;
            })}</TableCell>
          </TableRow>
        </div>
      )
    });
  }


  renderAssign() {
    const { selectedManager, assignStatus, cancelAssign, confirmAssign } = this.props;
    return (
      <Modal
        isOpen={assignStatus.progressing}
        noFooterBorder
        title='Assign Manager'
        confirmButtonText='ASSIGN'
        cancelButtonText='Cancel'
        onConfirm={confirmAssign}
        onCancel={cancelAssign}
        buttonStyle={{ width: 'auto' }}
        buttonClassName="medium blue"
        buttonLoading={assignStatus.loading}
      >
        <div>
          <p className={styles.headerTitle}>
            Are you sure you want to assign this Manager to handle your trading strategy?
          </p>
        </div>
        <ManagerInfo manager={selectedManager}></ManagerInfo>
      </Modal>
    );
  }

  renderDetails() {
    const { selectedManager, detailsStatus, cancelDetails } = this.props;
    return (
      <Modal
        isOpen={detailsStatus.progressing}
        noFooter
        noFooterBorder
        title='Manager Details'
        onCancel={cancelDetails}
        buttonStyle={{ width: 'auto' }}
        buttonClassName="medium blue"
      >
        <ManagerInfo manager={selectedManager}></ManagerInfo>
      </Modal>
    );
  }

  render() {
    const { managersStatus } = this.props;
    const $fields = this.renderHeaderFields();
    const $managers = this.renderManagers();
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

    return (
      <div className={styles.table}>
        <ManagerFiltersForm></ManagerFiltersForm>
        <Table>
          <TableRow>{$fields}</TableRow>
          <div className={styles.scrollableTable}>
            {$scrollableTable}
            <Loader isOpen={managersStatus.loading}></Loader>
          </div>
        </Table>
        {this.renderAssign()}
        {this.renderDetails()}
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  managers: state.assignManager.managers.data,
  managersStatus: state.assignManager.managers.status,
  assignStatus: state.assignManager.assign.status,
  selectedManager: state.assignManager.selectedManager,
  detailsStatus: state.assignManager.details.status,
  ...ownProps,
});

const mapDispatchToProps = {
  fetchManagers,
  openAssign,
  cancelAssign,
  confirmAssign,
  openDetails,
  cancelDetails,
};

const form = reduxForm({
  form: 'findManagerForm',
})(FindManager);

export default connect(mapStateToProps, mapDispatchToProps)(form);
