import * as React from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';
import '../../../node_modules/react-select/less/select.less';
import '../../styles/select-field.less';

const styles = require('./select-field.css');

import ErrorTip from '../ErrorTip';
import { CSSProperties } from 'react';

const selectFieldComponent = (props: Props & { input: any, meta: any }) => {
  const {
    input, options, meta: { touched, error }, label, hideLabel = false, style = {},
    searchable, clearable, loadOptions, disabled, leftSideError, tabIndex, wrapperCustomClass,
    placeholder, isMulti
  } = props;

  const handleInputChange = ({ value }) => {
    input.onChange(value);
  };

  const handleInputBlur = () => {
    input.onBlur(input.value);
  };

  let wrapperClasses = styles.wrapper;
  let errorTip;
  if (touched && error) {
    wrapperClasses += ' ' + styles.hasError;
    errorTip = <ErrorTip text={error} leftSide={leftSideError}/>;
  }
  const SelectTag = loadOptions ? Select.Async : Select;

  return (
    <div className={wrapperClasses + ' ' + wrapperCustomClass} style={style}>
      <SelectTag
        clearable={!!clearable}
        searchable={!!searchable}
        options={options}
        loadOptions={loadOptions}
        {...input}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={disabled}
        tabIndex={tabIndex ? ('' + tabIndex) : undefined}
        inputProps={{ autoComplete: 'off' }}
        placeholder={placeholder}
        isMulti={isMulti}
      />
      {!hideLabel && <label className={styles.label}>{label}</label>}
      {errorTip}
    </div>
  );
};

export type Option = { label: string, value: string | number };
export type LoadOptionsResult = Promise<{ options: Option[]; cache?: boolean }>;

interface Props {
  name: string;
  options?: Option[];
  label?: string;
  hideLabel?: boolean;
  style?: CSSProperties;
  searchable?: boolean;
  clearable?: boolean;
  loadOptions?: (input: string) => LoadOptionsResult;
  disabled?: boolean;
  leftSideError?: boolean;
  tabIndex?: number;
  wrapperCustomClass?: string;
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  isMulti?: boolean; 
}

class SelectField extends React.Component<Props, {}> {
  render() {
    return (
      <Field component={selectFieldComponent} {...this.props}>
        {this.props.children}
      </Field>
    );
  }
}

export default SelectField;
