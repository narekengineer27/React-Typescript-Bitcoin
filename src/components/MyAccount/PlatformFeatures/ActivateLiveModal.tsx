import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, } from 'redux-form';
import Modal from 'Elements/Modal';
import { closeActivateLiveModal, submitActivateLiveModal } from './actions';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import { IState } from './types';
import { IState as MTRState } from 'Partials/ExchangeAccountsDropdown/types';
import SelectField from 'Elements/SelectField';
import { isProvided } from 'Utils/validators';
import Button from 'Elements/Button';

const styles = require('./platform-features.css');

class ActivateLiveModal extends React.Component<Props, {}> {

  render() {
    const {
      visible, exchanges, invalid = true, handleSubmit,
      closeActivateLiveModal, submitActivateLiveModal,
    } = this.props;

    if (!visible || !exchanges.status.success) {
      return null;
    }
    const exchangesOptions = exchanges.data.map(item => ({ label: item.name, value: item.id }));

    return (
      <Modal
        title="Activate Live Mode"
        isOpen={visible}
        onCancel={closeActivateLiveModal}
        noFooter={true}
      >
        <div className={styles.activateLiveModalContent}>

          <p>Please select the exchange you want to activate for one day, starting now.</p>

          <form onSubmit={handleSubmit((values: Values) => submitActivateLiveModal(values.exchange))}>
            <div className={styles.selectExchange}>
              <SelectField name="exchange" label="Exchange" options={exchangesOptions}/>
            </div>

            <div className="customModalFooter">
              <a className="customModalCancel" onClick={closeActivateLiveModal}>Cancel</a>
              <Button className={'large green ' + styles.buyButton} submit disabled={invalid}>
                Activate
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = rootState => {
  const state = (rootState.platformFeatures as IState);
  const exchanges = (rootState.exchangeAccountsDropdown as MTRState).exchanges;
  return {
    ...state.activateLiveModal,
    exchanges,
  };
};

const mapDispatchToProps = {
  closeActivateLiveModal,
  submitActivateLiveModal,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps;

type Values = { exchange: string; };

const validate = (values: Values, props: any) => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.exchange)) {
    errors.exchange = 'Please select an exchange.';
  }

  return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'activateLiveForm', validate })(ActivateLiveModal));
