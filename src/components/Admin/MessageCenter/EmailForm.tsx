import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import TextAreaField from 'Elements/TextAreaField';

const styles = require('./message-center.css');

class EmailForm extends React.Component<any> {

  render() {
    return (
      <form>
        <p className={styles.headerTitle}>
          You're sending e-mail to these accounts: johndoe@gmail.com; janedoe@gmail.com; johndoe@gmail.com.
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
  form: 'emailForm',
})(EmailForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
