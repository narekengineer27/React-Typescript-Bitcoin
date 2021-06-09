import * as React from "react";
import { connect } from "react-redux";
import Modal from "Elements/Modal";
import { importFromSheet, upload, cancelImport } from "./actions";
import ImportFromSheetForm from './ImportFromSheetForm';
import { importTrades } from '../actions';


class ImportFromSheet extends React.Component<any> {

  render() {
    const { status, upload, cancelImport, importTrades } = this.props;
    return (
      <Modal
        isOpen={status.progressing}
        title="Import Trades"
        confirmButtonText='IMPORT'
        cancelButtonText='Cancel'
        onConfirm={upload}
        onCancel={() => { cancelImport(); importTrades(); }}
        buttonStyle={{width: 140}}
        noFooterBorder
        buttonLoading={status.loading}
      >
        <ImportFromSheetForm/>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  status: state.importFromSheet.status,
});

const mapDispatchToProps = {
  importFromSheet,
  upload,
  cancelImport,
  importTrades,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportFromSheet);
