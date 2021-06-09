import * as React from 'react';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';

const styles = require('./currency-input.css');

interface Props {
  label: string;
  leftSideError?: boolean;
  field: string;
  disabled?: boolean;
  currencyField: string;
  currencyOptions: { value: string; label: string; }[];
  currencyDisabled?: boolean;
}

const CurrencyInput: React.SFC<Props> = props => {
  return (
    <div className={styles.comboRow}>
      <div className={styles.comboText}>
        <TextField
          type="number"
          label={props.label}
          name={props.field}
          leftSideError={props.leftSideError}
          disabled={props.disabled}
        />
      </div>
      <div className={styles.comboSelect}>
        <SelectField
          name={props.currencyField}
          hideLabel
          disabled={props.currencyDisabled || props.disabled}
          options={props.currencyOptions}/>
      </div>
    </div>
  );
};

export default CurrencyInput;
