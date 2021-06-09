import * as React from 'react';
import { Field } from 'redux-form';

import ErrorTip from '../ErrorTip';
import InputMask from 'react-input-mask';
const styles = require('./text-mask-field.css');

const textMaskFieldComponent = (props) => {
  const {
    input: {value}, meta: {touched, error}, label, type, mask, maskChar, formatChars, tabIndex,
    leftSideError, maxLength, className = '', disabled,
  } = props;

  let inputClasses = styles.input;
  if (value) {
    inputClasses += ' ' + styles.inputFull;
  }

  let groupClasses = styles.group;
  let errorTip;
  if (touched && error) {
    groupClasses += ' ' + styles.hasError;
    errorTip = <ErrorTip text={error} leftSide={leftSideError}/>;
  }

  return (
    <div className={groupClasses}>
      <InputMask className={inputClasses + ' ' + styles[className]} type={type || 'text'}
                 {...props.input} tabIndex={tabIndex} maxLength={maxLength} disabled={disabled} mask={mask}
                 maskChar={maskChar} formatChars={formatChars}/>
      <span className={styles.bar}/>
      <label className={styles.label + ' ' + styles[className]}>{label}</label>
      {errorTip}
    </div>
  );
};

class TextMaskField extends React.Component<any> {
  render() {
    return <Field component={textMaskFieldComponent} {...this.props} />;
  }
}

export default TextMaskField;
