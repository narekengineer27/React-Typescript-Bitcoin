import * as React from 'react';
import { connect } from 'react-redux';
import RadioField from 'Elements/RadioField';
import TextField from 'Elements/TextField';
import CheckboxField from 'Elements/CheckboxField';
import { saveSettings } from './actions';

const styles = require('./robot-settings.css');

const optionPositions = [{
  value: 'move',
  label: 'Move to next round',
}, {
  value: 'sell',
  label: 'Sell',
}];

class ExitForm extends React.Component<any> {

  onSubmit(values:any) {
    this.props.saveSettings(values);
  }

  renderExitForm() {
    return (
      <div>
        <div className={styles.neverSell}>
          <CheckboxField name="auto_exit_no_loss" tabIndex={9}>
            Never Sell at loss
          </CheckboxField>
        </div>
        <div className={styles.exitFlex}>
          <div className={styles.openPositions}>
            <p className={styles.openPositionsTitile}>Open positions at the end of round</p>
            <div>
              <RadioField
                optionClassName={styles.option}
                name="auto_exit_action" options={optionPositions}
                tabIndex={7}/>
            </div>
          </div>
          <div className={styles.intervals}>
            <div>
              <TextField
                label="Suitability index drop allowed"
                name="auto_exit_drops"
                tabIndex={9}
                smallLabel
                leftSideError
                type="number"/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const $exit = this.renderExitForm();
    return (
      <div>
        {$exit}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  status: state.robotSettings.status,
  ...ownProps,
});

const mapDispatchToProps = ({
  saveSettings,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExitForm);
