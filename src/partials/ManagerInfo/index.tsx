import * as React from "react";
import Rating from "Elements/Rating";

const styles = require('./manager-info.css');

class ManagerInfo extends React.Component<any> {

  renderManagerInfo() {
    const { manager } = this.props;
    return (
      <div className={styles.assignForm}>
        <div className={styles.assignFormFlex}>
          <div className={styles.assignFormFlexChild}>
            <div className={styles.assignRowFlexChild}>
              <span className={styles.fieldName}>Name</span><br/>
              <span>{manager.name}</span>
            </div>
            <div className={styles.assignFormFlex}>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>Country</span><br/>
                <span>{manager.country}</span>
              </div>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>City</span><br/>
                <span>{manager.city}</span>
              </div>
            </div>
            <div className={styles.assignFormFlex}>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>Total Profit made</span><br/>
                <span>{manager.totalProfitMade}</span>
              </div>
              <div className={styles.assignRowFlexChild}>
                <span className={styles.fieldName}>Rating</span><br/>
                <Rating rate={manager.rating} nReviews={manager.nReviews}></Rating>
              </div>
            </div>
          </div>
          <div className={styles.AssignFormFlexChild}>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const $managerInfo = this.renderManagerInfo();
    return (
      <div>
        {$managerInfo}
      </div>
    );
  }
}

export default ManagerInfo;
