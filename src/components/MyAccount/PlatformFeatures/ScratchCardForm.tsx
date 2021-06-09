import * as React from 'react';
import { reduxForm } from 'redux-form';
import { isProvided } from 'Utils/validators';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { FormErrors, FormProps } from 'Utils/type';

const styles = require('./platform-features.css');

class ScratchCardForm extends React.Component<Props, {}> {

  render() {
    const { handleSubmit, onSubmit, onCancel } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContent}>
          <TextField name="code" label="Card Code"/>
        </div>
        <div className="customModalFooter">
          <a className="customModalCancel" onClick={onCancel}>Cancel</a>
          <Button className="large blue" submit>Confirm</Button>
        </div>
      </form>
    );
  }
}

export type Values = { code: string; };

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.code)) {
    errors.code = 'Please provide a valid code.';
  }

  return errors;
};

interface OwnProps {
  onCancel: () => void;
}

type Props = OwnProps & FormProps;

export default reduxForm({ form: 'scratchCard', validate })(ScratchCardForm);
