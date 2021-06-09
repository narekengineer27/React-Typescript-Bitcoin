import * as React from 'react';
import * as _ from 'lodash';
import * as api from 'Utils/api';
import { Field } from 'redux-form';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ErrorTip from '../ErrorTip';
import 'Styles/react-draft-wysiwyg.less';

const styles = require('./rich-text-field.css');

class RichTextFieldComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImages: [],
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    this.updateContent();
  }

  // @see https://github.com/jpuri/react-draft-wysiwyg/blob/8b8a4c20daeb88a5b5b4ddc070a5a9686ea813b6/docs/src/components/Demo/EditorConvertToHTML/index.js
  // @see Demo: https://jpuri.github.io/react-draft-wysiwyg/#/demo
  updateContent(props = this.props) {
    const contentBlock = htmlToDraft(props.input.value);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      editorState,
    });
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.input.value !== nextProps.input.value && _.isString(nextProps.input.value)) {
      this.updateContent(nextProps);
    }
  }

  _uploadImageCallBack(file) {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    let uploadedImages = this.state.uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    uploadedImages.push(imageObject);

    this.setState({
      uploadedImages,
    });

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return api.uploadFile(file).then(response => {
      response.data.link = response.data.file_full_path;
      return response;
    });
  }

  render() {
    const {
      input,
      input: { onChange },
      meta: { touched, error, active },
      label,
      tabIndex,
      leftSideError,
      maxLength,
      placeholder,
      className = '',
    } = this.props;
    const { editorState } = this.state;

    let groupClasses = styles.group;
    let errorTip;
    if (touched && error) {
      groupClasses += ' ' + styles.hasError;
      errorTip = <ErrorTip text={error} leftSide={leftSideError}/>
    }

    if (active) {
      groupClasses += ' ' + styles.isActive;
    }

    return (
      <div className={groupClasses + ' ' + className}>
        <label className={styles.label}>{label}</label>
        <Editor
          {...input}
          editorState={editorState}
          defaultEditorState={editorState}
          wrapperClassName={styles.wrapper}
          editorClassName={styles.editor}
          toolbarClassName={styles.toolbar}
          toolbar={{
            image: {
            uploadCallback: this._uploadImageCallBack.bind(this),
            uploadEnabled: true,
            },
            options: [
              'inline', 'fontSize', 'colorPicker',
              'link', 'image', 'embedded', 'list', 'textAlign'
            ],
            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
              bold: { className: 'bordered-option-classname' },
              italic: { className: 'bordered-option-classname' },
              underline: { className: 'bordered-option-classname' },
              strikethrough: { className: 'bordered-option-classname' },
              code: { className: 'bordered-option-classname' },
            },
            list: {
              inDropdown: false,
              options: ['unordered', 'ordered', 'indent', 'outdent'],
            },
            textAlign: {
              inDropdown: false,
              options: ['left', 'center', 'right', 'justify'],
            },
          }}
          tabIndex={tabIndex}
          maxLength={maxLength}
          placeholder={placeholder}
          onEditorStateChange={this.onEditorStateChange.bind(this)}
          onChange={(v) => (onChange(draftToHtml(convertToRaw(editorState.getCurrentContent()))))}
        />
        {/*
         <textarea
         disabled
         value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
         />
         */}
        {errorTip}
      </div>
    );
  }
}

class RichTextField extends React.Component<any> {
  render() {
    return <Field component={RichTextFieldComponent} {...this.props} />;
  }
}

export default RichTextField;
