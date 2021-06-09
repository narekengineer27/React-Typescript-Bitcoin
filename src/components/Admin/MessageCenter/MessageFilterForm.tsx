import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import TextField from 'Elements/TextField';
import SelectField from "Elements/SelectField";

const styles = require('./message-center.css');

class MessageFilterForm extends React.Component<any> {

  render() {
    return (
      <form>
        <div className={styles.searchWrapper}>
          <div className={styles.filters}>
            <SelectField
              name="account_type"
              hideLabel={true}
              options={[{
                label: 'Account Type',
                value: '',
              }, {
                label: 'AAAA',
                value: 'aaa',
              }, {
                label: 'BBBB',
                value: 'bbbb',
              }]}
              tabIndex={1}
            />
          </div>
          <div className={styles.searchWrapper}>
            <div className={styles.search}>
              <TextField
                name="name"
                label="Search Names"
              />
              <i className={"fa fa-search " + styles.searchIcon} aria-hidden="true"></i>
            </div>
            <div className={styles.countrySelect}>
              <SelectField
                name="country"
                hideLabel={true}
                options={[{
                label: 'Country',
                value: '',
              }, {
                label: 'AAAA',
                value: 'aaa',
              }, {
                label: 'BBBB',
                value: 'bbbb',
              }]}
                tabIndex={1}
              />
            </div>
            <div className={styles.citySelect}>
              <SelectField
                name="city"
                hideLabel={true}
                options={[{
                label: 'City',
                value: '',
              }, {
                label: 'AAAA',
                value: 'aaa',
              }, {
                label: 'BBBB',
                value: 'bbbb',
              }]}
                tabIndex={1}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

const form = reduxForm({
  form: 'messageFilterForm',
})(MessageFilterForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
