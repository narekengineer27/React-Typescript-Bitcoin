import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Rating from "Elements/Rating";
import Loader from "Elements/Loader";
import SelectField from "Elements/SelectField";
import Button from "Elements/Button";
import Modal from "Elements/Modal";
import {
  fetchManagers,
  cancelContact,
  confirmContact,
  openContact,
  openAssign,
  cancelAssign,
  confirmAssign,
  confirmSend,
  mobileShowFilter,
  mobileShowSort,
} from "./actions";

const styles = require('./assign-manager.css');

class AssignManager extends React.Component<any> {
  componentDidMount() {
    this.props.fetchManagers();
  }

  renderForm() {
    return (
      <form>
        <div className="flex">
          <div className={'flex ' + styles.filters}>
            <SelectField
              name="rating"
              hideLabel={true}
              options={[{
                label: 'Rating',
                value: '',
              }, {
                label: 'AAAA',
                value: 'aaa',
              }, {
                label: 'BBBB',
                value: 'bbbb',
              }]}
              tabIndex={1}
            />&nbsp;&nbsp;
            <SelectField
              name="country"
              hideLabel={true}
              options={[{
                label: 'Country',
                value: '',
              }, {
                label: 'AAAA',
                value: 'aaa',
              }, {
                label: 'BBBB',
                value: 'bbbb',
              }]}
              tabIndex={1}
            />
          </div>

        </div>
      </form>
    );
  }

  renderManagers() {
    const { managers, openAssign, managersStatus } = this.props;
    return managers.map((m, index) => {
      return (
        <div className="record" key={index}>
          <div className="field">
            <div className="field-name">Picture</div>
            <div className="field-value">{m.picture}</div>
          </div>
          <div className="field">
            <div className="field-name">Name</div>
            <div className="field-value">{m.name}</div>
          </div>
          <div className="field">
            <div className="field-name">Country</div>
            <div className="field-value">{m.country}</div>
          </div>
          <div className="field">
            <div className="field-name">City</div>
            <div className="field-value">{m.city}</div>
          </div>
          <div className="field">
            <div className="field-name">Rating</div>
            <div className="field-value"><Rating rate={3} nReviews={3333}></Rating></div>
          </div>
          <div className="field">
            <div className="field-name">Total Profit made</div>
            <div className="field-value">{m.totalProfitMade}</div>
          </div>
          <div className="field">
            <div className="field-name">Actions</div>
            <div className="field-value">
              <Button
                className="blue small"
                style={{ width: 90 }}
                onClick={() => openAssign(m)}>
                ASSIGN
              </Button>
            </div>
            <Loader topShift={37} isOpen={managersStatus.loading}></Loader>
          </div>
        </div>
      )
    });
  }

  renderManagerInfo() {
    const { selectedManager } = this.props;
    return (
      <div className={styles.assignForm}>
        <div className={styles.assignFormFlex}>
          <div className={styles.assignFormFlexChild}>
            <div className={styles.assignRowFlexChild}>
              <span className={styles.fieldName}>Name</span>
              <span className={styles.fieldValue}>{selectedManager.name}</span>
            </div>
            <div className={styles.assignFormFlex}>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>Country</span>
                <span className={styles.fieldValue}>{selectedManager.country}</span>
              </div>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>City</span>
                <span className={styles.fieldValue}>{selectedManager.city}</span>
              </div>
            </div>
            <div className={styles.assignFormFlex}>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>Total Profit made</span>
                <span className={styles.fieldValue}>{selectedManager.totalProfitMade}</span>
              </div>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>Rating</span>
                <Rating rate={selectedManager.rating} nReviews={selectedManager.nReviews}></Rating>
              </div>
            </div>
          </div>
          <div className={styles.AssignFormFlexChild}>
          </div>
        </div>
      </div>
    );
  }

  renderAssign() {
    const { assignStatus, cancelAssign, confirmAssign } = this.props;
    const $managerInfo = this.renderManagerInfo();
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
        {$managerInfo}
      </Modal>
    );
  }

  renderHelp() {
    const { openContact, contactStatus, cancelContact, confirmSend } = this.props;
    return (
      <div className={styles.help}>
        <h3 className={styles.helpTitle}>Contact Recruiter</h3>
        <p className={styles.paragraph}>
          If you are not sure which manager to assign for your trading strategy, you can reach out to our
          recruiters.
        </p>
        <p className={styles.paragraph}>
          We will make sure to find the best match for you.
        </p>
        <p className={styles.paragraph}>
          If you are not happy with the manager we choose for you, you can always replace them by your own, or you
          can contact the recruiter until you find someone you’re happy with.
        </p>
        <Button
          style={{ width: '100%' }}
          className="large blue"
          onClick={openContact}
        >CONTACT RECRUITER</Button>
        <Modal
          isOpen={contactStatus.progressing}
          title='Contact Recruiter'
          confirmButtonText='SEND'
          cancelButtonText='Cancel'
          onConfirm={confirmSend}
          onCancel={cancelContact}
          buttonStyle={{ width: 'auto' }}
          buttonClassName="medium blue"
          buttonLoading={contactStatus.loading}
        >
          <div>
            <p>
              You can reach out to a recruiter who will find and assign a Manager to setup your trading strategy.
            </p>
            <p>
              If you need to specify something, please write a note and the recruiter will contact you as soon as
              possible.
            </p>
          </div>
          <div>
          </div>
        </Modal>
      </div>
    );
  }

  renderFilter() {
    const {
      mobileFilterVisible,
      mobileSortVisible,
      mobileShowFilter,
      mobileShowSort
    } = this.props;

    const ratingOptions = [{
      label: 'Rating',
      value: '',
    }, {
      label: 'AAAA',
      value: 'aaa',
    }, {
      label: 'BBBB',
      value: 'bbbb',
    }];
    const countryOptions = [{
      label: 'Country',
      value: '',
    }, {
      label: 'AAAA',
      value: 'aaa',
    }, {
      label: 'BBBB',
      value: 'bbbb',
    }];

    const $filters = (
      <div className={styles.filtersHolder}>
        <div>
          <div>
            <SelectField
              name="rating"
              hideLabel={true}
              options={ratingOptions}
              tabIndex={1}
            />
          </div>
          <div>
            <SelectField
              searchable
              name="country"
              hideLabel={true}
              options={countryOptions}
              tabIndex={1}
            />
          </div>
        </div>
      </div>
    );

    const $sort = (
      <div className={styles.mobileSort}>
        <SelectField
          name="mobileSort"
          hideLabel
          options={[{
            label: 'Sort by',
            value: '',
          }, {
            label: 'By Rating',
            value: 'rating',
          }, {
            label: 'By Total Profit made',
            value: 'total_profit_made',
          }]}
        />
      </div>
    );

    return (
      <div className={styles.mobileFilters}>
        <div className="flex">
          <Button
            onClick={mobileShowFilter}
            className={'medium white gray-text ' + (mobileFilterVisible ? 'dark' : '')}
            style={{ width: '48%' }}>
            <i className="fa fa-filter" aria-hidden="true"></i> Filter
          </Button>
          <Button
            onClick={mobileShowSort}
            className={'medium white gray-text ' + (mobileSortVisible ? 'dark' : '')}
            style={{ width: '48%' }}>
            <i className="fa fa-sort" aria-hidden="true"></i> Sort
          </Button>
        </div>
        {mobileFilterVisible && $filters}
        {mobileSortVisible && $sort}
      </div>
    )
  }

  render() {
    const { managersStatus } = this.props;
    const $help = this.renderHelp();
    const $filter = this.renderFilter();
    const $managers = this.renderManagers();

    return (
      <div>
        <div className={styles.content}>
          <div className={styles.table}>
            {$help}
            {$filter}
            <div className="mobile-table border-top">
              {$managers}
              <Loader topShift={37} isOpen={managersStatus.loading}></Loader>
            </div>
          </div>
        </div>
        {this.renderAssign()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  managers: state.assignManager.managers.data,
  managersStatus: state.assignManager.managers.status,
  contactStatus: state.assignManager.contact.status,
  assignStatus: state.assignManager.assign.status,
  selectedManager: state.assignManager.selectedManager,
  mobileFilterVisible: state.assignManager.mobileFilterVisible,
  mobileSortVisible: state.assignManager.mobileSortVisible,
});

const mapDispatchToProps = {
  fetchManagers,
  cancelContact,
  confirmContact,
  openContact,
  cancelAssign,
  confirmAssign,
  openAssign,
  confirmSend,
  mobileShowFilter,
  mobileShowSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'assignManagerFilter',
})(AssignManager));
