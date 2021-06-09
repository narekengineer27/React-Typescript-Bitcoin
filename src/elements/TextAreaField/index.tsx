import * as React from 'react';
import { Field } from 'redux-form';

import ErrorTip from '../ErrorTip';

const styles = require('./text-area-field.css');

const textAreaFieldComponent = (props) => {
  const { meta: { touched, error, active }, label, tabIndex, leftSideError, maxLength, placeholder, rows = 5, className = '' } = props;

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
      <textarea className={styles.textarea} {...props.input} tabIndex={tabIndex} maxLength={maxLength} rows={rows}
                placeholder={placeholder}/>
      <label className={styles.label}>{label}</label>
      {errorTip}
    </div>
  );
};

class TextAreaField extends React.Component<any> {
  render() {
    return <Field component={textAreaFieldComponent} {...this.props} />;
  }
}

export default TextAreaField;
