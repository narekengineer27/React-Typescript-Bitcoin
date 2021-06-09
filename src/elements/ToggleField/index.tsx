import * as React from 'react';
import { Field } from 'redux-form';
import Toggle from 'react-toggle';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';

const styles = require('./toggle-field.css');

const ToggleFieldComponent = (props) => {
  const {
    label = '',
    onChange,
    checked,
    icons = false,
    topLabel = false,
    loading = false,
    labelClassName = '',
    disabled = false,
  } = props;

  const labelClasses = (label ? '' : styles.noLabel) + ' ' + labelClassName;
  return (
    <div className={styles.wrapper}>
      <label className={topLabel ? styles.topLabel : 'flex'}>
        {topLabel && (
          <div className={styles.topLabelText + ' ' + labelClasses}>{label}</div>
        )}
        <Toggle
          disabled={disabled}
          checked={checked}
          icons={icons}
          className={(label ? '' : 'react-toggle-mr')}
          onChange={onChange}/>
        {!topLabel && (
          <div className={styles.labelText + ' ' + labelClasses}>{label}</div>
        )}
        {loading && (<i
            className={`fa fa-pulse fa-spinner ${styles.loader} ${checked ? styles.checked : ''}`}/>
        )}
      </label>
    </div>
  );
};

class ToggleField extends React.Component<any> {

  renderToggleField(props) {
    const { name, icons = false, label, input: { value, onChange }, disabled = false,
      labelClassName = '', } = props;
    const labelClasses = (label ? '' : styles.noLabel) + ' ' + labelClassName;
    return (
      <label className={styles.wrapper}>
        <Toggle
          disabled={disabled}
          name={name}
          checked={!!value}
          icons={icons}
          className={(label ? '' : 'react-toggle-mr')}
          onChange={(event) => onChange(!!!value)}/>
        <div className={styles.labelText + ' ' + labelClasses}>{label}</div>
      </label>
    );
  }

  render() {
    const { isFormField = false } = this.props;
    return isFormField ?
      <Field component={this.renderToggleField} {...this.props} type="checkbox"/>
      : <ToggleFieldComponent {...this.props}/>;
  }
}

export default ToggleField;
