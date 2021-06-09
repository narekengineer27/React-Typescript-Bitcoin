import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import Button from 'Elements/Button';
import RadioField from 'Elements/RadioField';
import SelectField from 'Elements/SelectField';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';

const styles = require('../PaidFeatures/paid-features.css');

const daysInMonth = (year, month) => {
  const date = !isNaN(year) ? new Date(year, month, 1) : new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);

  return date.getDate();
};

const yearsCovered = () => {
  const date = new Date();
  const years = [date.getFullYear()];
  date.setDate(date.getDate() + 30);
  if (date.getFullYear() !== years[0]) {
    years.push(date.getFullYear());
  }

  return years;
};

class TestModeScheduleForm extends React.Component<Props, {}> {

  render() {
    const { handleSubmit, onSubmit, onCancel, month, year, scheduled } = this.props;

    const maxDay = daysInMonth(year, month);
    const days = [];
    for (let d = 1; d <= maxDay; d++) {
      days.push({ label: d + '', value: d + '' });
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
      .map((value, index) => ({ label: value, value: index + '' }));

    const years = yearsCovered().map(y => ({ label: y + '', value: y + '' }));

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContent}>
          <h3><img src="/public/assets/images/test-mode.png"/>Test Mode</h3>

          <p>During the period of test mode, you can choose to be able to test
            all exchange accounts for a period of 24 hours. You can activate
            this option now, or schedule in advance.</p>

          <RadioField
            label=""
            name="scheduled"
            options={[
              { label: 'Activate now', value: 'false' },
              { label: 'Schedule', value: 'true' },
            ]}
          />

          <div>
            <div className={styles.day}>
              <SelectField
                name="day"
                options={days}
                hideLabel
                disabled={!scheduled}
              />
            </div>
            <div className={styles.month}>
              <SelectField
                name="month"
                options={months}
                hideLabel
                disabled={!scheduled}
              />
            </div>
            <div className={styles.year}>
              <SelectField
                name="year"
                options={years}
                hideLabel
                disabled={!scheduled}
              />
            </div>
          </div>

        </div>
        <div className="customModalFooter">
          <a className="customModalCancel" onClick={onCancel}>Cancel</a>
          <Button className="medium blue" submit>Confirm</Button>
        </div>
      </form>
    );
  }

  componentWillUpdate(nextProps: Props) {
    // Check if the new date is valid
    const date = new Date(nextProps.year, nextProps.month, nextProps.day);
    if (date.getFullYear() !== nextProps.year ||
      date.getMonth() !== nextProps.month ||
      date.getDate() !== nextProps.day) {
      this.props.change('day', daysInMonth(nextProps.year, nextProps.month) + '');
    }
  }
}

export type Values = { scheduled: string; day: string; month: string; year: string; };

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};
  const now = new Date();
  const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);

  const selectedDate = new Date(+values.year, +values.month, +values.day);
  if (selectedDate < minDate || selectedDate > maxDate) {
    errors.year = `Select a date between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`;
  }

  return errors;
};

const selector = formValueSelector('testModeSchedule');
const mapStateToProps = (rootState, props: OwnProps) => {
  const now = new Date();

  return {
    initialValues: {
      day: now.getDate() + '',
      month: now.getMonth() + '',
      year: now.getFullYear() + ''
    },
    day: +selector(rootState, 'day'),
    month: +selector(rootState, 'month'),
    year: +selector(rootState, 'year'),
    scheduled: selector(rootState, 'scheduled') === 'true',
  };
};

interface OwnProps {
  onCancel: () => void;
  onSubmit: (values: Values) => void;
}

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & FormProps & OwnProps;

export default connect(mapStateToProps)(reduxForm({ form: 'testModeSchedule', validate })(TestModeScheduleForm));
