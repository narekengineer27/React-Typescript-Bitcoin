import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { isProvided, isStrictlyPositiveNumber } from 'Utils/validators';
import SelectField from 'Elements/SelectField';
import TextField from 'Elements/TextField';
import { importManually, cancelImport, importTradesManually } from './actions';

const styles = require('./import-manually.css');

class ImportManuallyForm extends React.Component<any> {

  onSubmit(values) {
    this.props.importTrades(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className = {styles.importForm}
      >
        <p className = {styles.description}>Please fill in this form to import your trades manually.</p>
        <div>
          <SelectField
            name="coin"
            hideLabel={true}
            options={[{
                    label: 'Coin',
                    value: '',
                  }, {
                    label: 's',
                    value: 's',
                  }, {
                    label: '1',
                    value: '1',
                  }, {
                    label: '2',
                    value: '2',
                  }, {
                    label: 't',
                    value: 't',
                  }]}
            tabIndex={3}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField label="Purchase price" name="price" type="number" leftSideError/>
          </div>
          <div className="col-md-6">
            <TextField label="Quantity" name="quantity" type="number"/>
          </div>
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors: any = {};
  if (!isProvided(values.coin)) {
    errors.coin = 'Please choose your trading currency.';
  }
  if (!isProvided(values.price)) {
    errors.price = 'Please enter your purchase price.';
  } else if (!isStrictlyPositiveNumber(values.price)) {
    errors.price = 'Please enter a valid number, greater than zero.';
  }

  if (!isProvided(values.quantity)) {
    errors.quantity = 'Please enter your purchase quantity.';
  } else if (!isStrictlyPositiveNumber(values.quantity)) {
    errors.quantity = 'Please enter a valid number, greater than zero.';
  }

  return errors;
};

const mapStateToProps = state => ({
  status: state.importManually.status,
});

const mapDispatchToProps = {
  importManually,
  cancelImport,
  importTradesManually,
};

const form = reduxForm({
  form: 'importTradesManually',
  validate,
})(ImportManuallyForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
