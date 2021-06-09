import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from "Elements/Button";
import { isProvided } from 'Utils/validators';
import { importFromSheet, cancelImport, upload } from './actions';

const styles = require('./import-from-sheet.css');

class ImportFromSheetForm extends React.Component<any> {

  onSubmit(values) {
    this.props.upload(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className = {styles.importForm}
      >
        <p className = {styles.description}>Please upload .xlsx file to import your trading data.</p>
        <Button className="large white" style={{width: 140}}>
          UPLOAD FILE
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>trading.xlsx</span>
      </form>
    );
  }
}

const validate = values => {
  const errors: any = {};
  if (!isProvided(values.uploadFile)) {
    errors.uploadFile = 'Please choose your file to upload.';
  }
  return errors;
};

const mapStateToProps = state => ({
  status: state.importFromSheet.status,
});

const mapDispatchToProps = {
  importFromSheet,
  cancelImport,
  upload,
};

const form = reduxForm({
  form: 'upload',
  validate,
})(ImportFromSheetForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
