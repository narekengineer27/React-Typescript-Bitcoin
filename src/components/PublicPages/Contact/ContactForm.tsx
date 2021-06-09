import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { sendContact } from './actions';
import { isProvided, isEmail } from 'Utils/validators';
import * as auth from 'Utils/auth';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import TextAreaField from 'Elements/TextAreaField';
import Button from 'Elements/Button';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';

const styles = require('./contact.css');

class ContactForm extends React.Component<Props, {}> {
  render() {
    const { handleSubmit, status, } = this.props;

    const subjectOptions = [
      'General Question',
      'Billing Issues',
      'Exchange Issues',
      'Manual Trading',
      'Mentor',
      'Robot',
      'Plan Change',
      'Watch List',
    ]
      .map(item => ({ value: item, label: item }));

    return (
      <form
        onSubmit={handleSubmit((values) => this.onSubmit(values))}
      >
        <div className="row">
          <div className={'col-md-6 ' + styles.field}>
            <TextField label="Your name" name="name" leftSideError tabIndex={1}/>
          </div>
          <div className={'col-md-6 ' + styles.field}>
            <TextField label="Your email" name="email" tabIndex={2}/>
          </div>
        </div>
        <div className="row">
          <div className={'col-md-6 ' + styles.field}>
            <SelectField label="Message subject" name="subject" options={subjectOptions} tabIndex={3}/>
          </div>
          <div className="col-md-6"/>
        </div>
        <div className="row">
          <div className={'col ' + styles.field}>
            <TextAreaField label="Your message" name="message" tabIndex={4}/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Button submit className="large blue" disabled={status.loading} tabIndex={5}>Send message</Button>
          </div>
        </div>

      </form>
    );
  }

  onSubmit(values: Values) {
    this.props.sendContact(values);
  }
}

type Values = { name: string; email: string; subject: string; message: string; };

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.name)) {
    errors.name = 'Please provide your name.';
  }

  if (!isProvided(values.email)) {
    errors.email = 'Please provide your e-mail address.';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid e-mail address.';
  }

  if (!isProvided(values.subject)) {
    errors.subject = 'Please select a subject.';
  }

  if (!isProvided(values.message)) {
    errors.message = 'Please fill in the message.';
  }

  return errors;
};

const mapStateToProps = (state) => {
  let name: string;
  let email: string;
  if (auth.isAuthenticated()) {
    const user = auth.getCurrentUser();
    name = user.name;
    email = user.email;
  }

  return ({
    initialValues: {
      name,
      email,
    },
    status: state.contact.status,
  });
};

const mapDispatchToProps = {
  sendContact
};
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps;

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'contact', validate })(ContactForm));
