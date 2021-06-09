import * as React from 'react';
import * as _ from 'lodash';
import * as api from 'Utils/api';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';
// import ErrorTip from '../ErrorTip';
import Button from 'Elements/Button';

const styles = require('./file-field.css');

class FileFieldComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadingResult: '',
    };
  }

  onChange(files) {
    const { input: { onChange } } = this.props;
    this.setState({
      files,
      uploadingResult: '',
    });
    onChange(files);
  }

  upload() {
    const { files } = this.state;
    const { input: { onChange } } = this.props;
    this.setState({
      uploading: true,
    });
    return Promise.all(files.map(f => {
      return api.uploadFile(f);
    })).then((response) => {
      const uploadedFiles = response.map(res => (_.get(res, 'data.file_full_path', '')));
      this.setState({
        uploading: false,
        files: uploadedFiles,
        uploadingResult: 'Success.',
      });
      onChange(uploadedFiles);
      console.log(response);
    }).catch(error => {
      this.setState({
        uploading: false,
        uploaded: false,
        uploadingResult: 'Failed.',
      });
    });
  }

  render() {
    const {
      input: { value },
      multiple = false,
      className = '',
    } = this.props;
    const { files, uploading, uploadingResult } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.uploader}>
          <Dropzone
            className={styles.dropzone + ' ' + className}
            multiple={multiple}
            onDrop={(filesToUpload, e) => this.onChange(filesToUpload)}
          >
            <Button>Select File</Button>
          </Dropzone>
          {value && (_.isArray(value) && (
            <div className={styles.files}>
              {uploadingResult ? uploadingResult : value.map((file, i) => <div key={i}>{file.name}, </div>)}
            </div>
          ))}
          {files && files.length > 0 && !uploadingResult && (
            <Button onClick={this.upload.bind(this)} loading={uploading}>Upload</Button>
          )}
        </div>
        <div className={styles.uploadedFiles}>
          {uploadingResult && (
            <div>
              Files Uploaded:
              {files.map((f, i) => <div key={i}>{f}, </div>)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

class FileField extends React.Component<any> {
  render() {
    return <Field component={FileFieldComponent} {...this.props} />;
  }
}

export default FileField;
