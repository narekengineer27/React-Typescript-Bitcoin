import * as React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import SelectField from "Elements/SelectField";
import TextField from "Elements/TextField";

const styles = require('./assign-manager.css');

class ManagerFiltersForm extends React.Component<any> {
  render() {
    return (
      <form>
        <div className="flex">
          <div className={'flex ' + styles.filters}>
            <SelectField
              name="rating"
              hideLabel={true}
              options={[{
                label: 'Rating',
                value: '',
              }, {
                label: 'AAAA',
                value: 'aaa',
              }, {
                label: 'BBBB',
                value: 'bbbb',
              }]}
              tabIndex={1}
            />&nbsp;&nbsp;
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
          <div className={styles.nameFilter}>
            <TextField
              name="name"
              label="Search Names"
            />
            <i className={"fa fa-search " + styles.searchIcon} aria-hidden="true"></i>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

const form = reduxForm({
  form: 'managerFiltersForm',
})(ManagerFiltersForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
