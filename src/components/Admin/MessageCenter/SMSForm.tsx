import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import TextAreaField from 'Elements/TextAreaField';

const styles = require('./message-center.css');

class SMSForm extends React.Component<any> {

  render() {
    return (
      <form>
        <p className={styles.headerTitle}>
          You're sending SMS to these accounts: 1234567; 2584396; 147852.
        </p>
        <div>
          <TextAreaField label="" name="content" rows={5} placeholder="Write your message here"/>
        </div>
      </form>
    );
  }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const form = reduxForm({
  form: 'smsForm',
})(SMSForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
