import * as React from "react";
import SectionHeader from "Partials/SectionHeader";
import Button from "Elements/Button";
//import { connect } from "react-redux";

const styles = require('./init-exchange-accounts.css');

class InitExchangeAccounts extends React.Component<any> {

  render() {
    //const { status } = this.props;
    return (
      <div>
        <SectionHeader
          title="Please add your Exchange Account">
        </SectionHeader>
        <div className={styles.wrapper}>
          <div>
            <p className={styles.addAccountDescription}>There are no Exchange Accounts right now.</p>
            <p className={styles.addAccountDescription}>Please add new account to continue.</p>
          </div>
          <div className={styles.btnWrapper}>
            <Button className="large blue">
              ADD ACCOUNT
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default InitExchangeAccounts;

/*const mapStateToProps = state => ({
 status: state.subscriptionPlan.status,
 selectedPlan: state.subscriptionPlan.selectedPlan,
 });

 const mapDispatchToProps = {
 subscriptionPlanDetails,
 cancelPayment,
 confirmPayment,
 };

 export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPlan);*/
