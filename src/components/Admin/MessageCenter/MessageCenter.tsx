import * as React from "react";
import { connect } from "react-redux";
import ReactIScroll from "react-iscroll";
import * as iScroll from "iscroll";
import Loader from "Elements/Loader";
import Button from "Elements/Button";
import CheckboxField from "Elements/CheckboxField";
import SortingIcons from "Elements/SortingIcons";
import { Table, TableRow, TableCell } from "Elements/Table";
import SectionHeader from "Partials/SectionHeader";
import Responsive from "Partials/Responsive";
import Modal from "Elements/Modal";
import MessageFilterForm from "Components/Admin/MessageCenter/MessageFilterForm";
import EmailForm from "Components/Admin/MessageCenter/EmailForm";
import SMSForm from "Components/Admin/MessageCenter/SMSForm";
import NoData from "./NoData";
import {
  fetchMessages,
  openSendEmail,
  openSendSMS,
  confirmSendEmail,
  cancelSendEmail,
  confirmSendSMS,
  cancelSendSMS,
  toggleSelectAll,
  select,
} from "./actions";

const styles = require('./message-center.css');
const iScrollOptions = require('Constants/options.json').iScroll;

const fields = [{
  name: 'selectAll',
  label: '',
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
  name: 'account_type',
  label: 'Account Type',
  sortable: false,
}, {
  name: 'email_address',
  label: 'Email_Address',
  sortable: false,
}, {
  name: 'phone_number',
  label: 'Phone Number',
  sortable: false,
}, {
  name: 'actions',
  label: 'Actions',
  sortable: false,
}];

class MessageCenter extends React.Component<any> {
  componentDidMount() {
    this.props.fetchMessages();
  }

  renderHeaderFields() {

    const { toggleSelectAll, allSelected, messages } = this.props;
    return fields.map((field, index) => {
      return (
        <TableCell header bold key={index} className={styles[field.name]}>
          {field.name === 'selectAll' ? (
            (<CheckboxField
              checked={allSelected}
              onChange={() => {
                toggleSelectAll(!allSelected, messages)
              }}
              noMargin
              isFormField={false}
              label=" "
              name="checkbox"/>)
          ) : (
            <div className="flex full-width">{field.label}
              <div className="vertical-center">
                {field.sortable && <SortingIcons
                />}
              </div>
            </div>
          )}
        </TableCell>
      );
    });
  }

  selectRow(e, message, checked) {
    const { selectedMessages, select } = this.props;
    e.stopPropagation();
    e.preventDefault();
    select(!checked, message, selectedMessages);
  }

  renderMessages() {
    const {
      messages,
      openSendEmail,
      openSendSMS,
      select,
      selectedMessages,
    } = this.props;
    return messages.map((m, index) => {
      const checked = !!selectedMessages.find(r => m.id === r.id);
      console.log(index, checked);
      return (
        <div onClick={(e) => this.selectRow(e, m, checked)} key={index}>
          <TableRow>
            <TableCell className={styles.selectAll}>
              <CheckboxField
                checked={checked}
                onChange={(selected) => select(selected, m, selectedMessages)}
                noMargin
                isFormField={false}
                label=""
                name="checkbox"
              />
            </TableCell>
            <TableCell>{m.name}</TableCell>
            <TableCell>{m.country}</TableCell>
            <TableCell>{m.city}</TableCell>
            <TableCell>{m.account_type}</TableCell>
            <TableCell>{m.email_address}</TableCell>
            <TableCell>{m.phone_number}</TableCell>
            <TableCell className={styles.actions}>
              <div>
                <Button
                  className="blue small"
                  style={{ width: 90 }}
                  onClick={() => openSendEmail(m)}>
                  SEND EMAIL
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  className="blue small"
                  style={{ width: 90 }}
                  onClick={() => openSendSMS(m)}>
                  SEND SMS
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </div>
      );
    });
  }

  renderSendEmail() {
    const { emailStatus, cancelSendEmail, confirmSendEmail } = this.props;
    return (
      <Modal
        isOpen={emailStatus.progressing}
        noFooterBorder
        title='Send Email'
        confirmButtonText='Send'
        cancelButtonText='Cancel'
        onConfirm={confirmSendEmail}
        onCancel={cancelSendEmail}
        buttonStyle={{ width: 'auto' }}
        buttonClassName="medium blue"
        buttonLoading={emailStatus.loading}
      >
        <EmailForm/>
      </Modal>
    );
  }

  renderSendSMS() {
    const { SMSStatus, cancelSendSMS, confirmSendSMS } = this.props;
    return (
      <Modal
        isOpen={SMSStatus.progressing}
        noFooterBorder
        title='Send SMS'
        confirmButtonText='Send'
        cancelButtonText='Cancel'
        onConfirm={confirmSendSMS}
        onCancel={cancelSendSMS}
        buttonStyle={{ width: 'auto' }}
        buttonClassName="medium blue"
        buttonLoading={SMSStatus.loading}
      >
       <SMSForm/>
      </Modal>
    );
  }

  render() {
    const { messagesStatus, messages } = this.props;
    const $fields = this.renderHeaderFields();
    const $messages = this.renderMessages();
    const $scrollableTable = $messages.length > 5 ? (
      <ReactIScroll
        iScroll={iScroll}
        options={iScrollOptions}
      >
        <div>
          {$messages}
        </div>
      </ReactIScroll>
    ) : (
      <div className={styles.noScrollbar}>
        {$messages}
      </div>
    );

    return (
      <div>
        <Responsive name="desktop">
          <SectionHeader hasBorder={false} title="Message Center"/>
          <div className={styles.content}>

            <div className={styles.table}>
              <MessageFilterForm/>
              <Table className="relative">
                <TableRow>{$fields}</TableRow>
                {messages.length > 0 ? (
                  <div className={styles.scrollableTable}>
                    {$scrollableTable}
                  </div>
                ) : (<NoData></NoData>)}
                <Loader topShift={37} isOpen={messagesStatus.loading}></Loader>
              </Table>
            </div>
          </div>
          {this.renderSendEmail()}
          {this.renderSendSMS()}
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messageCenter.messages.data,
  messagesStatus: state.messageCenter.messages.status,
  emailStatus: state.messageCenter.email.status,
  SMSStatus: state.messageCenter.SMS.status,
  allSelected: state.messageCenter.allSelected,
  selectedMessages: state.messageCenter.selectedMessages,
});

const mapDispatchToProps = {
  fetchMessages,
  openSendEmail,
  openSendSMS,
  confirmSendEmail,
  cancelSendEmail,
  confirmSendSMS,
  cancelSendSMS,
  toggleSelectAll,
  select,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageCenter);

