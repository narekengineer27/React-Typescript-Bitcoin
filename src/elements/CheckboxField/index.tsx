import * as React from "react";
import { Field } from "redux-form";
import { voidFunction } from "Utils/functions";
import * as classNames from 'classnames/bind';

const styles = require('./checkbox-field.css');
let cx = classNames.bind(styles);

interface CheckboxProps {
  label?: string;
  tabIndex?: number;
  checked?: boolean;
  className?: string;
  noMargin?: boolean;
  disabled?: boolean;

  onChange?(boolean): void;
}

class CheckboxComponent extends React.Component<CheckboxProps, { checked: boolean }> {

  public static defaultProps: CheckboxProps = {
    label: '',
    tabIndex: 0,
    checked: false,
    className: '',
    noMargin: false,
    disabled: false,
    onChange: voidFunction,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  onChange() {
    this.props.onChange(!this.state.checked);
    this.setState({
      checked: !this.state.checked,
    });
  }

  render() {
    const {
      label = '',
      tabIndex,
      className = '',
      noMargin = false,
      disabled = false,
    } = this.props;
    const { checked } = this.state;

    const groupClasses = cx('group', className, {
      noMargin,
      groupChecked: checked,
      disabled,
    });
    return (
      <div className={groupClasses}>
        <label
          className="cursor-pointer vertical-center"
          tabIndex={tabIndex}
        >
          <input
            disabled={disabled}
            checked={!!checked}
            className={styles.input}
            type="checkbox"
            onChange={this.onChange.bind(this)}
          />
          {label || this.props.children}
        </label>
      </div>
    );
  }
}

class CheckboxField extends React.Component<any> {
  renderFormField(props) {
    const { label, tabIndex, input: { value, onChange }, className = '' } = props;
    let groupClasses = styles.group + ' ' + styles[className];
    if (!!value) {
      groupClasses += ' ' + styles.groupChecked;
    }

    return (
      <div className={groupClasses}>
        <label
          className="cursor-pointer"
          tabIndex={tabIndex}
          onKeyPress={ev => {
            if (ev.key === ' ') {
              onChange(!value);
            }
          }}
        >
          <input
            checked={!!value}
            className={styles.input}
            type="checkbox"
            {...props.input}
          />
          {label || props.children}
        </label>
      </div>
    );

  }

  render() {
    const { isFormField = true } = this.props;
    return isFormField ?
      <Field component={this.renderFormField} {...this.props} type="checkbox"/>
      : <CheckboxComponent {...this.props}/>;
  }
}

export default CheckboxField;
