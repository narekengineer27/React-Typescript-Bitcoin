import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';
import Modal from 'Elements/Modal';
import ButtonGroup from 'Elements/ButtonGroup';
import RadioField from 'Elements/RadioField';
import CheckboxField from 'Elements/CheckboxField';
import SelectField from 'Elements/SelectField';
import TextField from 'Elements/TextField';
import Dropdown from 'Elements/Dropdown';
import ToggleField from 'Elements/ToggleField';
import { WatchCoinTabs } from '../types';
import { cancelWatch, watch, switchTab, confirmUpdate } from '../actions';

const styles = require('./watch-coin.css');

const ruleOptions = [{
  label: 'Becomes Greater Than',
  value: 1,
}, {
  label: 'Becomes Less Than',
  value: 2,
}, {
  label: 'Becomes Greater Than (progressively)',
  value: 3,
}, {
  label: 'Becomes Less Than (progressively)',
  value: 4,
}];

const fieldsWithRule = [{
  name: 'market_cap',
  label: 'Market Cap',
}, {
  name: 'liquidity',
  label: 'Liquidity',
}, {
  name: 'gap',
  label: 'GAP',
}, {
  name: 'cpp',
  label: 'CPP',
}, {
  name: 'prr',
  label: 'PRR',
}];

const validate = (values: any) => {
  const errors: any = {};
  [
    'number_of_intervals',
    'cpp',
    'prr',
    'gap',
    'marget_cap',
    'liquidity',
    'buy_amount_btc',
  ].forEach(field => {
    if (!_.isNumber(+values[field]) || (+values[field] < 0) ) {
      errors[field] = 'Please provide a valid number, greater than zero.';
    }
  });

  return errors;
};

const initialCoin = {
  interval: '5',
  number_of_intervals: 5,
  follow_cpp: false,
  cpp_rule: 1,
  cpp: 0,
  follow_prr: false,
  prr_rule: 1,
  prr: 0,
  follow_gap: false,
  gap_rule: 1,
  gap: 0,
  follow_market_cap: false,
  market_cap_rule: 1,
  market_cap: 0,
  follow_liquidity: false,
  liquidity_rule: 1,
  liquidity: 0,
  execute_buy: false,
  send_sms: false,
  send_email: false,
  buy_amount_btc: 0,
};

@reduxForm({
  form: 'watchCoinForm',
  validate,
})
class WatchCoinForm extends React.Component<any, any> {

  renderCondition(field: string) {
    const { formValues } = this.props;
    const showOrHide = formValues[`follow_${field}`] ? '' : 'hidden';
    return (
      <div className={'row ' + showOrHide}>
        <div className="col-md-8">
          <SelectField
            options={ruleOptions}
            label="Condition" name={`${field}_rule`}
          >
          </SelectField>
        </div>
        <div className={'col-md-4 ' + styles.target}>
          <TextField
            label="Target %"
            name={field}
            type="number"
          />
        </div>
      </div>
    );
  }

  renderConditionFields() {
    const { formValues } = this.props;
    const conditions = {
      1: 'greater than',
      2: 'less than',
      3: 'progressively greater than',
      4: 'progressively less than',
    };
    return fieldsWithRule.map((field, index) => {
      return (
        <div key={index} className={styles.conditionField}>
          <CheckboxField name={`follow_${field.name}`} tabIndex={index + 1} className="small">
            {field.label}
            {!!formValues[`follow_${field.name}`] === true && (
              <div className={styles.fieldDescription}>
                Activated when value is {conditions[formValues[`${field.name}_rule`]]} {formValues[field.name]} %
              </div>
            )}
          </CheckboxField>
          {this.renderCondition(field.name)}
        </div>
      );
    });
  }

  render() {
    const { handleSubmit, onSubmit, tab, coin, formValues } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={tab === WatchCoinTabs.TradingParameters ? 'block' : 'hidden'}>
          <p className={styles.parametersDescription}>
            Please input parameters based on which you will have an option to get an alert when values are changed, or
            execute the trade.
          </p>
          <div className={styles.conditionFieldsHolder}>
            {this.renderConditionFields()}
          </div>
          <div className={styles.valueAchievedWrapper}>
            <div className={styles.valueAchieved}>
              <ToggleField
                label="Send an Email when values achieved"
                name="send_email"
                isFormField
              />
            </div>
            <div className={styles.valueAchieved}>
              <ToggleField
                label="Send SMS when values achieved"
                name="send_sms"
                isFormField
              />
            </div>
            <div className={styles.valueAchieved}>
              <ToggleField
                label="Trade coins when values achieved"
                name="execute_buy"
                isFormField
              />
            </div>
            {formValues.execute_buy && (
              <div className={styles.amount}>
                <TextField
                  label="Amount to be spent"
                  name="buy_amount_btc"
                  type="number"
                />
                <div className={styles.currency}>
                  <Dropdown
                    minWidth={0}
                    className="tiny"
                    menus={[{ label: 'BTC', value: 'btc' }]}
                  />
                </div>
              </div>
            )}
          </div>
          <p className={styles.alert}>
            All selected parameters must be satisfied to get an alert.
          </p>
        </div>
        <div className={tab === WatchCoinTabs.MonitoringInterval ? 'block' : 'hidden'}>
          <p className={styles.description}>
            You want to watch {coin.coin} coin, please choose the monitoring interval for this coin
          </p>
          <RadioField
            label=""
            name="interval"
            options={[
              { label: '5 min', value: '5' },
              { label: '10 min', value: '10' },
              { label: '30 min', value: '30' },
              { label: '1 hour', value: '60' },
              { label: '2 hours', value: '120' },
            ]}
          />
          <div className="row">
            <div className="col-md-6">
              <TextField
                name="number_of_intervals"
                label="Number of intervals"
                type="number"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

class WatchCoin extends React.Component<any, any> {

  submit(values: object) {
    const { dispatch, coinToWatch, coinToUpdate, activeExchangeAccount, mode, watchlistBuyingCoins } = this.props;
    const toWatch = !!coinToWatch.coin;
    const coin = toWatch ? coinToWatch : coinToUpdate;
    const clonedValues = _.cloneDeep(values);

    Object.keys(clonedValues).forEach((key) => {
      const num = +clonedValues[key];
      if (!_.isBoolean(clonedValues[key]) && _.isNumber(num)) {
        clonedValues[key] = num;
      }
    });
    if (toWatch) {
      dispatch(watch({ ...clonedValues, mode }, coin, activeExchangeAccount));
    } else {
      dispatch(confirmUpdate(coin, clonedValues, watchlistBuyingCoins));
    }
  }

  render() {
    const {
      addStatus,
      updateStatus,
      cancelWatch,
      coinToWatch,
      coinToUpdate,
      dispatch,
      tab,
      switchTab,
      values,
    } = this.props;

    const toWatch = !!coinToWatch.coin;
    const coin = toWatch ? coinToWatch : {
      ...coinToUpdate.rule,
      id: coinToUpdate.id,
      coin: coinToUpdate.coin,
      interval: coinToUpdate.interval + '',
      send_email: !!coinToUpdate.email,
      send_sms: !!coinToUpdate.sms,
      execute_buy: !!coinToUpdate.execute,
    };
    const progressing = addStatus.progressing || updateStatus.progressing;
    const loading = addStatus.loading || updateStatus.loading;

    const $form = (
      <div className={styles.forms}>
        <WatchCoinForm
          initialValues={toWatch ? initialCoin : coin}
          formValues={values}
          coin={coin}
          tab={tab}
          onSubmit={this.submit.bind(this)}/>
      </div>
    );

    const tabFn = (button) => {
      button && dispatch(switchTab(button.value));
    };

    return (
      <div>
        <Modal
          confirmButtonText={toWatch ? 'ADD TO WATCHLIST' : 'SAVE SETTINGS'}
          isOpen={progressing}
          title={toWatch ? 'Watch Coin' : 'Coin Settings'}
          onCancel={() => dispatch(cancelWatch())}
          onConfirm={() => dispatch(submit('watchCoinForm'))}
          buttonStyle={{ width: 'auto' }}
          buttonLoading={loading}
        >
          <div className={styles.wrapper}>
            <ButtonGroup
              activeIndex={tab}
              onChange={tabFn}
              className="medium"
              buttons={[{
                label: 'Trading parameters',
                value: WatchCoinTabs.TradingParameters,
              }, {
                label: 'Monitoring interval',
                value: WatchCoinTabs.MonitoringInterval,
              }]}>
            </ButtonGroup>
            {$form}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addStatus: state.watchList.add.status,
  coinToWatch: state.watchList.add.coin,
  updateStatus: state.watchList.update.status,
  coinToUpdate: state.watchList.update.coin,
  tab: state.watchList.add.tab,
  activeExchangeAccount: state.exchangeAccountsDropdown.activeExchangeAccount.data,
  values: _.get(state, 'form.watchCoinForm.values', {}),
  mode: state.manualTradingRobot.mode,
  watchlistBuyingCoins: state.watchListBuying.data,
  exitStrategyStatus: state.exitStrategy.status,
});

const mapDispatchToProps = (dispatch) => ({
  cancelWatch,
  dispatch,
  watch,
  switchTab,
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchCoin);
