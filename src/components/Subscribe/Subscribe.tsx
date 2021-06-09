import * as React from "react";
import { connect } from "react-redux";
import SubscriptionPlans from "Partials/SubscriptionPlans";
import SectionHeader from "Partials/SectionHeader";
import Modal from "Elements/Modal";
import { subscriptionPlanDetails, cancelPayment, confirmPayment } from "./actions";

const styles = require('./subscribe.css');

class Subscribe extends React.Component<any> {
  render() {
    const { subscriptionPlanDetails, status, cancelPayment, confirmPayment, selectedPlan } = this.props;
    return (
      <div>
        <SectionHeader
          goBack="/welcome"
          title="Please choose your subscription plan">
        </SectionHeader>
        <div className={styles.content}>
          <SubscriptionPlans onChange={subscriptionPlanDetails}></SubscriptionPlans>
        </div>
        <Modal
          isOpen={status.progressing}
          title={selectedPlan.name}
          confirmButtonText={`PAY (${selectedPlan.amount})`}
          cancelButtonText='Cancel'
          onConfirm={confirmPayment}
          onCancel={cancelPayment}
          buttonStyle={{width: 'auto'}}
        >
          <div className="flex">
            <div className={styles.totalAmount}>Total amount:</div>
            <div className={styles.amount}>{selectedPlan.amount}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.subscribe.status,
  selectedPlan: state.subscribe.selectedPlan,
});

const mapDispatchToProps = {
  subscriptionPlanDetails,
  cancelPayment,
  confirmPayment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
