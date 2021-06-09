import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Button from "Elements/Button";
import SectionHeader from "Partials/SectionHeader";
import Responsive from "Partials/Responsive";
import AssignManagerMobile from "./AssignManagerMobile";
import Modal from "Elements/Modal";
import FindManager from "./FindManager";
import {
  cancelContact,
  confirmContact,
  openContact,
  confirmSend,
} from "./actions";

const styles = require('./assign-manager.css');


class AssignManager extends React.Component<any> {

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
        <Button onClick={openContact}>CONTACT RECRUITER</Button>
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

  render() {
    const $help = this.renderHelp();

    return (
      <div>
        <Responsive name="desktop">
          <SectionHeader hasBorder={false} title="Please assign Manager for your Trading Strategy"/>
          <div className={styles.content}>
            <FindManager></FindManager>
            {$help}
          </div>
        </Responsive>
        <Responsive name="phone">
          <SectionHeader hasBorder={true} title="Please assign Manager for your Trading Strategy"/>
          <AssignManagerMobile></AssignManagerMobile>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contactStatus: state.assignManager.contact.status,
});

const mapDispatchToProps = {
  cancelContact,
  confirmContact,
  openContact,
  confirmSend,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'assignManagerFilter',
})(AssignManager));
