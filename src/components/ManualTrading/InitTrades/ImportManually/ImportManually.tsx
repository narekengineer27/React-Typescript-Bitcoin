import * as React from "react";
import { connect } from "react-redux";
import Modal from "Elements/Modal";
import { importManually, importTradesManually, cancelImport } from "./actions";
import ImportManuallyForm from './ImportManuallyForm';
import { importTrades } from '../actions';


class ImportManually extends React.Component<any> {

  render() {
    const { status,  cancelImport, importTrades, importTradesManually } = this.props;
    return (
      <Modal
        isOpen={status.progressing}
        title="Import Trades"
        confirmButtonText='IMPORT'
        cancelButtonText='Cancel'
        onConfirm={importTradesManually}
        onCancel={() => { cancelImport(); importTrades(); }}
        buttonStyle={{width: 140}}
        buttonLoading={status.loading}
      >
        <ImportManuallyForm/>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  status: state.importManually.status,
});

const mapDispatchToProps = {
  importManually,
  cancelImport,
  importTrades,
  importTradesManually,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportManually);
