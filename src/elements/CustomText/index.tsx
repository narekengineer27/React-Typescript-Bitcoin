import * as React from 'react';
import { Field } from 'redux-form';

import ErrorTip from '../ErrorTip';

const styles = require('./text-field.css');
const isIEorEdge = navigator.appName === 'Netscape' &&
  (navigator.appVersion.indexOf('Edge') >= 0 || navigator.appVersion.indexOf('Trident') >= 0);
const isWebkit = 'WebkitAppearance' in document.documentElement.style;
const isFF = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;

export default class CustomText extends React.Component<Props, { webkitAutoFilled?: boolean }> {

  input: HTMLInputElement;
  webkitCheckCount: number;

  constructor(props: any) {
    super(props);
    this.state = { webkitAutoFilled: false };
  }

  render() {
    const {
      value, label, name, onChange, 
      maxLength, className = '', disabled, smallLabel = false,
      noMargin = false
    } = this.props;

    let { type } = this.props;

    // Hack for IE/Edge & Firefox - valid numbers may still trigger validation errors,
    // so we fallback to normal text input
    if ((isIEorEdge || isFF) && type === 'number') {
      type = 'text';
    }

    let inputClasses = styles.input;
    if (this.state.webkitAutoFilled || (value !== null && value !== undefined && value !== '')) {
      inputClasses += ' ' + styles.inputFull;
    }

    let groupClasses = styles.group + ' ' + (noMargin ? styles.noMargin : '');
    return (
        <div className={groupClasses}>
          <input
            className={inputClasses + ' ' + styles[className]}
            type={type || 'text'}
            name={name}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            disabled={disabled}
            ref={r => this.input = r}
          />
          
          <span className={styles.bar}/>
            <label
              className={styles.label + ' ' + styles[className] + ' ' + (smallLabel ? styles.small : '')}
            > 
              {label}
            </label>
        </div>
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
  value: string;
  onChange: () => void;
  label?: string;
  // tabIndex?: number;
  // leftSideError?: boolean;
  type?: 'text' | 'password' | 'number';
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  smallLabel?: boolean;
  noMargin?: boolean;
  // autoComplete?: boolean;
  // border?: boolean;
}
