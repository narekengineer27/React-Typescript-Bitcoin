import * as React from 'react';
import { Field } from 'redux-form';

import ErrorTip from '../ErrorTip';

const styles = require('./text-field.css');
const isIEorEdge = navigator.appName === 'Netscape' &&
  (navigator.appVersion.indexOf('Edge') >= 0 || navigator.appVersion.indexOf('Trident') >= 0);
const isWebkit = 'WebkitAppearance' in document.documentElement.style;
const isFF = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;

export class TextFieldComponent extends React.Component<
  Props & { input: any; meta: any; }, { webkitAutoFilled?: boolean }> {

  input: HTMLInputElement;
  webkitCheckCount: number;

  constructor(props: any) {
    super(props);
    this.state = { webkitAutoFilled: false };
  }

  render() {
    const {
      input: { value }, meta: { touched, error }, label, tabIndex,
      leftSideError, maxLength, className = '', disabled, smallLabel = false,
      noMargin = false, autoComplete = false, border = false, file = false
    } = this.props;

    let { type } = this.props;

    // Hack for IE/Edge & Firefox - valid numbers may still trigger validation errors,
    // so we fallback to normal text input
    if ((isIEorEdge || isFF) && type === 'number') {
      type = 'text';
    }

    let inputClasses = styles.input;
    let borderedInputClasses = styles.borderedInput;
    if (this.state.webkitAutoFilled || (value !== null && value !== undefined && value !== '')) {
      inputClasses += ' ' + styles.inputFull;
    }

    let groupClasses = styles.group + ' ' + (noMargin ? styles.noMargin : '');
    let errorTip;
    if (touched && error) {
      groupClasses += ' ' + styles.hasError;
      errorTip = <ErrorTip text={error} leftSide={leftSideError}/>;
    }

    const $filefields = (
        <input
          type='file'
          placeholder='Upload'
          ref={r => this.input = r}
        />
    );
    

    const $fields = (
        <div className={groupClasses}>
          {
            border ? (
              <input
                className={border ? borderedInputClasses : inputClasses + ' ' + styles[className]}
                type={type || 'text'}
                {...this.props.input}
                tabIndex={tabIndex}
                maxLength={maxLength}
                disabled={disabled}
                autoComplete={autoComplete ? 'on' : 'off'}
                ref={r => this.input = r}
                placeholder={label}
              />
            ) : (
              <input
                className={border ? borderedInputClasses : inputClasses + ' ' + styles[className]}
                type={type || 'text'}
                {...this.props.input}
                tabIndex={tabIndex}
                maxLength={maxLength}
                disabled={disabled}
                autoComplete={autoComplete ? 'on' : 'off'}
                ref={r => this.input = r}
              />
            )
          }
          
          <span className={styles.bar}/>
          {
            border ? '' : (
              <label
                className={styles.label + ' ' + styles[className] + ' ' + (smallLabel ? styles.small : '')}
              > 
                {label}
              </label>
            )
          }
          {errorTip}
        </div>
      );
    

    return (
        file ? (
          <div>
          {$filefields}
          </div>
        ) : (
          <div>
          {$fields}
          </div>
        )
    );
  }

  // Hack for Webkit browsers
  // When auto-fill kicks in for password fields, there is no change event and also
  // input.value returns '' even after it clearly has an auto-fill value. This is a
  // security feature, sort of.

  componentDidMount() {
    if (this.props.type === 'password' && isWebkit) {

      // 5 seconds max
      this.webkitCheckCount = 100;

      const checkAutoFill = () => {
        if (this.webkitCheckCount <= 0) {
          return;
        }

        const autoFilledItems = this.input.parentElement.querySelectorAll('input:-webkit-autofill');
        if (autoFilledItems.length > 0) {
          // Our input has been auto-filled
          this.setState({ webkitAutoFilled: true });
          return;
        }

        this.webkitCheckCount--;
        setTimeout(checkAutoFill, 50);
      };

      checkAutoFill();
    }
  }

  componentWillUnmount() {
    this.webkitCheckCount = 0;
  }

}

interface Props {
  name: string;
  label?: string;
  tabIndex?: number;
  leftSideError?: boolean;
  type?: 'text' | 'password' | 'number';
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  smallLabel?: boolean;
  noMargin?: boolean;
  autoComplete?: boolean;
  border?: boolean;
  file?: boolean;
}

class TextField extends React.Component<Props, {}> {
  field: Field;

  render() {
    return <Field component={TextFieldComponent} {...this.props} withRef ref={r => this.field = r}/>;
  }

}

export default TextField;
