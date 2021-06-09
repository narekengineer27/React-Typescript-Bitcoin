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
import { saveArticle, loadRecord, updateRecord } from "./actions";

import 'Styles/react-draft-wysiwyg.less';

const styles = require('../../form.css');

class ArticleForm extends React.Component<any, any> {
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
      this.props.updateRecord(this.props.id, values, 'article');
    } else {
      this.props.saveArticle(values, 'article');
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
            <TextField label="Title" name="title" leftSideError/>
          </div>
          <div>
            <TextField label="Subtitle" name="subtitle" leftSideError/>
          </div>
          <div>
            <FileField name="image" label="Image"/>
          </div>
          <div>
            <RichTextField name="text" label="Content"/>
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

  if (!isProvided(values.title)) {
    errors.title = 'Please type in the title.';
  }

  if (!isProvided(removeHtmlTags(values.text))) {
    errors.content = 'Please type in the content.';
  }

  return errors;
};

const mapStateToProps = state => ({
  article: state.adminArticleForm.article,
  status: state.adminArticleForm.status,
  editStatus: state.adminArticleForm.edit.status,
  initialValues: state.adminArticleForm.edit.record,
});

const mapDispatchToProps = {
  saveArticle,
  loadRecord,
  updateRecord,
};

const form = reduxForm({
  form: 'adminArticleForm',
  validate,
  enableReinitialize: true,
})(ArticleForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
