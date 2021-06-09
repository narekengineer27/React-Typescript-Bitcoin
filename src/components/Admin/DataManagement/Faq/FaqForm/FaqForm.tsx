import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from 'redux-form';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import RichTextField from 'Elements/RichTextField';
import FileField from 'Elements/FileField';
import { isProvided } from 'Utils/validators';
import { removeHtmlTags } from 'Utils/dom';
import { Status } from 'Models/Status';
import { saveRecord, loadRecord, updateRecord } from "./actions";

import 'Styles/react-draft-wysiwyg.less';

const styles = require('../../form.css');

class FaqForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImages: [],
    };
  }

  componentDidMount() {
    if (this.props.id >= 0) {
      this.props.loadRecord(this.props.id);
    }
  }

  onSubmit(values:any) {
    if (this.props.id >= 0) {
      this.props.updateRecord(this.props.id, values, 'faq');
    } else {
      this.props.saveRecord(values, 'faq');
    }
  }

  render() {
    const { handleSubmit, status = new Status(), modelType, editStatus } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3 className={styles.title}>
          {this.props.id >= 0 ? ("Edit ") : ("Add a new ")}
          {modelType}
        </h3>
        <div className={styles.wrapper}>
          <div>
            <TextField label="Question" name="question" leftSideError/>
          </div>
          <div>
            <FileField name="image" label="Image"/>
          </div>
          <div>
            <RichTextField name="answer" label="Answer"/>
          </div>
          <div className={styles.saveBtn}>
            <Button className="large blue" submit loading={status.loading || editStatus.loading}>SAVE</Button>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors: any = {};

  if (!isProvided(values.question)) {
    errors.question = 'Please type in the question.';
  }

  if (!isProvided(removeHtmlTags(values.answer))) {
    errors.answer = 'Please type in the answer.';
  }

  return errors;
};

const mapStateToProps = state => ({
  record: state.adminFaqForm.record,
  status: state.adminFaqForm.status,
  editStatus: state.adminFaqForm.edit.status,
  initialValues: state.adminFaqForm.edit.record,
});

const mapDispatchToProps = {
  saveRecord,
  loadRecord,
  updateRecord,
};

const form = reduxForm({
  form: 'adminFaqForm',
  validate,
  enableReinitialize: true,
})(FaqForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
