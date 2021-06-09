import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import TextField from 'Elements/TextField';
import CheckboxField from 'Elements/CheckboxField';
import Button from 'Elements/Button';
import { isPositiveNumber, isProvided, isStrictlyPositiveNumber } from 'Utils/validators';
import { closeEditPackage, loadPackages, submitEditPackage } from 'Components/Admin/Settings/Billing/actions';
import { IState } from 'Components/Admin/Settings/Billing/types';
import Modal from 'Elements/Modal';

const styles = require('./billing.css');

class EditPackageModal extends React.Component<Props, {}> {
  render() {
    const {
      pack, visible, handleSubmit, status,
      closeEditPackage,
    } = this.props;

    const showNotifications = !!pack.is_feature;

    return (
      <Modal
        isOpen={visible}
        onCancel={closeEditPackage}
        noFooter
        title="Edit Package"
      >
        <div className="customModalContent">
          <div className={styles.packageName}>
            {pack.description}
          </div>
          <form onSubmit={handleSubmit(values => this.onFormSubmit(values))}>
            <CheckboxField name="enabled" label="Enabled"/>
            <TextField name="price" label="Price" type="number"/>
            {showNotifications && (
              <div>
                <TextField name="emails" label="Emails" type="number"/>
                <TextField name="sms" label="SMS" type="number"/>
              </div>
            )}
            <div className="customModalFooter">
              <a className="customModalCancel" onClick={closeEditPackage}>Cancel</a>
              <Button
                className={'medium blue ' + styles.saveChanges}
                submit
                loading={status.loading}
                disabled={status.loading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }

  onFormSubmit(values: Values) {
    const { pack, submitEditPackage } = this.props;
    submitEditPackage({
      id: pack.id,
      is_feature: pack.is_feature,
      enabled: values.enabled ? 1 : 0,
      price: values.price,
      sms: +values.sms,
      emails: +values.emails,
    });
  }
}

type Values = { price: string; enabled: boolean; sms: string; emails: string; };

const validate = (values: Values, props: Props) => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.price) || !isStrictlyPositiveNumber(values.price)) {
    errors.price = 'Please provide a valid amount';
  }

  if (props.pack.is_feature) {
    if (!isProvided(values.sms) || !isPositiveNumber(values.sms)) {
      errors.sms = 'Please provide a valid number of SMS';
    }

    if (!isProvided(values.emails) || !isPositiveNumber(values.emails)) {
      errors.emails = 'Please provide a valid number of emails';
    }
  }

  return errors;
};

const mapStateToProps = rootState => {
  const state = rootState.adminBilling as IState;
  const editedPack = state.editPackageModal.pack;
  return {
    ...state.editPackageModal,
    initialValues: {
      price: editedPack.price,
      enabled: !!editedPack.enabled,
      sms: editedPack.sms ? editedPack.sms + '' : null,
      emails: editedPack.emails ? editedPack.emails + '' : null,
    } as Values,
    enableReinitialize: true,
  };
};

const mapDispatchToProps = {
  loadPackages,
  submitEditPackage,
  closeEditPackage,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps;

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'adminEditPackage', validate })(EditPackageModal));
