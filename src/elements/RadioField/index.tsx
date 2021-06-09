import * as React from "react";
import { Field } from "redux-form";
import ErrorTip from '../ErrorTip';

const styles = require('./radio-field.css');

class RadioFieldComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  setFocused(focused: boolean) {
    return () => {
      this.setState({ focused });
    };
  }

  render() {
    const {
      label, tabIndex, leftSideError, meta = { touched: false, error: '' },
      input = {
        value: '',
        onChange: () => {
        }
      },
      options,
      horizontal = false,
      optionClassName = styles.defaultOption,
    } = this.props;
    const { touched, error } = meta;
    const { value, onChange } = input;
    const { focused } = this.state;

    let wrapperClasses = styles.wrapper;
    let errorTip;
    if (touched && error) {
      wrapperClasses += ' ' + styles.hasError;
      errorTip = <ErrorTip text={error} leftSide={leftSideError}/>
    }

    return (
      <div className={wrapperClasses}>
        {
          options.map((option, index) => {
            const checked = value ? (option.value === value) : (index === 0 ? true : false);
            const styleClasses = styles.option + ' full-width ' + (checked ? styles.checked : '');
            return (
              <div key={option.value} className={`${optionClassName} ${horizontal ? 'inline-block' : ''}`}>
                <label className={styleClasses}>
                  <input
                    value={option.value}
                    checked={checked}
                    className={styles.input}
                    type="radio"
                    onChange={onChange}
                    onFocus={this.setFocused(true).bind(this)}
                    onBlur={this.setFocused(false).bind(this)}
                    tabIndex={tabIndex}
                  />
                  {option.label}
                </label>
              </div>
            );
          })
        }
        <label className={styles.label + ' ' + (focused ? styles.focused : '')}>
          {label || this.props.children}
        </label>
        {errorTip}
      </div>
    );
  }
}

class RadioField extends React.Component<any> {
  render() {
    return <Field component={RadioFieldComponent} {...this.props} />;
  }
}

export default RadioField;
