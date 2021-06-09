import * as React from "react";
import { connect } from "react-redux";
import Modal from "Elements/Modal";
import { importFromExchange, confirmSignIn, cancelSignIn } from "./actions";
import ImportFromExchangeForm from "./ImportFromExchangeForm";
import { importTrades } from "../actions";

class ImportFromExchange extends React.Component<any> {

  render() {
    const { status, confirmSignIn, cancelSignIn, importTrades } = this.props;
    return (
      <Modal
        isOpen={status.progressing}
        title="Import Trades"
        confirmButtonText='SIGN IN'
        cancelButtonText='Cancel'
        onConfirm={confirmSignIn}
        onCancel={() => { cancelSignIn(); importTrades(); }}
        noFooterBorder
        buttonStyle={{width: 140}}
        buttonLoading={status.loading}
      >
        <ImportFromExchangeForm/>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  status: state.importFromExchange.status,
});

const mapDispatchToProps = {
  importFromExchange,
  confirmSignIn,
  cancelSignIn,
  importTrades,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportFromExchange);
