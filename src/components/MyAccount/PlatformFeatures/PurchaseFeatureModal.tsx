import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import Modal from 'Elements/Modal';
import { closePurchaseFeatureModal, submitPurchaseFeatureModal } from './actions';
import { fetchExchanges } from 'Partials/ExchangeAccountsDropdown/actions';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import { IState } from './types';
import { IState as MTRState } from 'Partials/ExchangeAccountsDropdown/types';
import SelectField from 'Elements/SelectField';
import { isProvided, isStrictlyPositiveNumber } from 'Utils/validators';
import Button from 'Elements/Button';
import CoinPaymentsForm from './CoinPaymentsForm';
import { round } from 'Utils/math';
import ErrorTip from 'Elements/ErrorTip';

const styles = require('./platform-features.css');

const PlainTextField = props => {
  const { input, type, disabled, label, meta: { touched, error } } = props;
  return (
    <div className={styles.plainInput}>
      <div className={styles.label}>{label}</div>
      <input {...input} type={type} disabled={disabled}/>
      {touched && error && <ErrorTip text="Valid amount required" leftSide/>}
    </div>
  );
};

class PurchaseFeatureModal extends React.Component<Props, {}> {

  componentWillMount() {
    // Make sure the exchanges have been loaded
    const { fetchExchanges, exchanges } = this.props;
    if (!exchanges.status.success) {
      fetchExchanges();
    }
  }

  render() {
    const {
      visible, quantity, exchange, pack, exchanges, buy, packages,
      invalid = true, handleSubmit,
      closePurchaseFeatureModal, submitPurchaseFeatureModal,
    } = this.props;

    if (!visible || !exchanges.status.success) {
      return null;
    }

    let { type, emails, sms, price, description } = this.props.pack;
    const isExchange = type === 'one-exchanges' || type === 'all-exchanges' || type === 'education';
    const isNotifications = type === 'notifications';
    const isEducation = type === 'education';
    const isAllExchanges = type === 'all-exchanges';
    const isOneExchange = type === 'one-exchanges';

    const exchangesOptions = exchanges.data.map(item => ({ label: item.name, value: item.id }));
    let totalPrice = +price;
    const validQuantity = !isNaN(Number(quantity));
    let days = this.props.pack.live_days;
    let testDays = this.props.pack.test_days || days;
    let headerDays = days;
    if (isEducation) {
      headerDays = testDays;
    }

    if (validQuantity) {
      totalPrice = +quantity * +price;
      days *= +quantity;
      testDays *= +quantity;
      sms *= +quantity;
      emails *= +quantity;
    }

    let bullets: JSX.Element;
    let duration: JSX.Element;
    let color = 'blue';

    if (isExchange) {
      color = headerDays > 1 ? 'green' : 'orange';
      duration = (
        <div className={styles.duration}>
          <div className={styles.days}>{headerDays}</div>
          day{headerDays > 1 ? 's' : ''}
        </div>
      );

      bullets = (
        <ul className={styles.packageCardList}>
          <li>Trade on {isAllExchanges ? 'all exchanges' : 'one exchange'} for {days} day{days > 1 ? 's' : ''}</li>
          <li>Test mode for {testDays} day{testDays > 1 ? 's' : ''}</li>
          <li>{emails} emails and {sms} sms</li>
        </ul>
      );

    } else if (isNotifications) {
      duration = (
        <div className={styles.duration}>
          <img src="/public/assets/images/icon-bell-white.svg" alt=""/>
        </div>
      );

      bullets = (
        <ul className={styles.packageCardList}>
          <li>{emails} email notifications</li>
          <li>{sms} sms notifications</li>
        </ul>
      );
    }

    return (
      <Modal
        title="Feature Activation"
        isOpen={visible}
        onCancel={closePurchaseFeatureModal}
        noFooter={true}
      >
        <div className={styles.purchaseFeatureModalContent}>
          <div className={styles.purchaseCard + ' ' + styles[color]}>
            <div className={styles.packageCardHeader}>
              {duration}
              <div>
                <div className={styles.title}>{description}</div>
                <div className={styles.price}>
                  {round(+pack.price)} BTC
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit(() => submitPurchaseFeatureModal(quantity, exchange, pack.id))}>
            <div className={styles.inputs}>
              <Field name="quantity" label="Quantity" component={PlainTextField} type="text"/>
              {pack.type === 'one-exchanges' &&
              <SelectField name="exchange" label="Exchange" options={exchangesOptions}/>}
            </div>

            {bullets}

            <div className={styles.footer}>
              <div className={styles.price}>
                <div className={styles.label}>Total Price</div>
                {round(totalPrice)} BTC
              </div>

              <Button
                className={'large green ' + styles.buyButton}
                submit
                loading={!!buy}
                disabled={invalid || (isOneExchange && !exchange)}
              >
                Buy
              </Button>
            </div>
          </form>

        </div>

        {buy && (
          <CoinPaymentsForm
            merchant={packages.data.merchant_id}
            name={pack.description}
            customInfo={`user_id=${packages.data.user_id}&package_id=${pack.id}&exchange=${exchange || ''}`}
            amount={+price}
            quantity={+quantity}
            onReady={form => this.onFormReady(form)}
          />
        )}
      </Modal>
    );
  }

  onFormReady(form: CoinPaymentsForm) {
    form.submit();

    // Wait a bit to allow the form to be submitted
    setTimeout(
      () => {
        this.props.closePurchaseFeatureModal();
      });
  }
}

const selector = formValueSelector('purchaseFeatureForm');

const mapStateToProps = rootState => {
  const state = (rootState.platformFeatures as IState);
  const exchanges = (rootState.exchangeAccountsDropdown as MTRState).exchanges;
  return {
    ...state.purchaseFeatureModal,
    packages: state.packages,
    quantity: selector(rootState, 'quantity'),
    exchange: selector(rootState, 'exchange'),
    exchanges,
    initialValues: {
      quantity: '1',
    }
  };
};

const mapDispatchToProps = {
  closePurchaseFeatureModal,
  submitPurchaseFeatureModal,
  fetchExchanges,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps;

type Values = { quantity: string; exchange: string; };

const validate = (values: Values, props: any) => {
  const errors: FormErrors<Values> = {};
  if (!isProvided(values.quantity) && !isStrictlyPositiveNumber(values.quantity)) {
    errors.quantity = 'Please provide a valid quantity.';
  }

  if (props.pack && props.pack.type === 'one-exchanges') {
    if (!isProvided(values.exchange)) {
      errors.exchange = 'Please select an exchange.';
    }
  }

  return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: 'purchaseFeatureForm', validate })(PurchaseFeatureModal));
