import * as React from "react";
import Button from "Elements/Button";
import { connect } from "react-redux";
import Modal from "Elements/Modal";
// import ImportFromExchange from "./ImportFromExchange";
import { importTrades, cancelImport } from "./actions";
// import { importFromExchange } from "./ImportFromExchange/actions";
// import { importManually } from "./ImportManually/actions";
// import { importFromSheet } from "./ImportFromSheet/actions";
import Arrow from "Elements/Arrow";
// import ImportManually from "./ImportManually";
// import ImportFromSheet from "./ImportFromSheet";

const styles = require('./init-trades.css');

class InitTrades extends React.Component<any> {

  fromExchange() {
    const { cancelImport, importFromExchange } = this.props;
    cancelImport();
    importFromExchange();
  }

  fromManually() {
    const { cancelImport, importManually } = this.props;
    cancelImport();
    importManually();
  }

  fromsheet() {
    const { cancelImport, importFromSheet } = this.props;
    cancelImport();
    importFromSheet();
  }

  render() {
    const { status, importTrades, cancelImport } = this.props;
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>No recent trades</h1>
        <div className={styles.content}>
          <div>
            <p className={styles.description}>There are currently no trades imported.</p>
            <p className={styles.description}>
              Please import your  trades manually or request suggestions for your future trades.</p>
          </div>
          <div className={styles.btnWrapper}>
            <Button className="large white" style={{width: 220}}>
              REQUEST SUGGESTIONS
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              className="large blue"
              style={{width: 220}}
              onClick={importTrades}
            >
              IMPORT TRADES
            </Button>
          </div>
        </div>
        <Modal
          isOpen={status.progressing}
          title="Import Trades"
          onCancel={cancelImport}
          noFooter
        >
          <p className={styles.importDescription}>
            You can import trades done directly on POLONIEX or provide the details manually.
          </p>
          <div className={styles.importWays} onClick={this.fromExchange.bind(this)}>
            <p>
              Import from <a href="#" className={styles.poloniex}>POLONIEX</a>
            </p>
            <Arrow className={styles.arrow} width={34} height={34}/>
          </div>
          <div className={styles.importWays} onClick={this.fromManually.bind(this)}>
            <p>
              Enter trades manually
            </p>
            <Arrow className={styles.arrow} width={34} height={34}/>
          </div>
          <div className={styles.importWays} onClick={this.fromsheet.bind(this)}>
            <p>
              Import Excell table sheet
            </p>
            <Arrow className={styles.arrow} width={34} height={34}/>
          </div>
        </Modal>
        {
          //<ImportFromExchange></ImportFromExchange>
          //<ImportManually></ImportManually>
          //<ImportFromSheet></ImportFromSheet>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: state.initTrades.status,
});

const mapDispatchToProps = {
  importTrades,
  cancelImport,
  // importFromExchange,
  // importManually,
  // importFromSheet,
};

export default connect(mapStateToProps, mapDispatchToProps)(InitTrades);
