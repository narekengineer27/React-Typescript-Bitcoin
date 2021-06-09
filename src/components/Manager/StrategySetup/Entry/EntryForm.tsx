import * as React from 'react';
import FrugalityRatio from './FrugalityRatio';
import PriceRelativity from './PriceRelativity';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ButtonGroup from 'Elements/ButtonGroup';
import Button from 'Elements/Button';
const strategyStyles = require('../strategy-setup.css');
const styles = require('./entry.css');

class EntryForm extends  React.Component<any, any> {

  constructor(props){
    super(props);
    this.state = {
      activeEntryIndex: 'FrugalityRatio',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
  }

  onChange(button: any) {
    this.setState({
      activeEntryIndex: button.value,
    });
  }

  onSubmit(values: object) {
    // this.props.saveProfile(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const { activeEntryIndex } = this.state;
    return (
      <div>
        <div className={strategyStyles.rightPanelSub}>
          <div className="row">
            <div className="col-lg-12">
              <span className={styles.subTitle}>Entry Setting</span>
            </div>
          </div>
          <div className={styles.description}>
            Entry defines the condition at which the robot decides to purchase the coins.
          </div>
          <ButtonGroup
            className="medium"
            buttons={[
              { label: 'Frugality Ratio', value: 'FrugalityRatio' },
              { label: 'Price Relativity', value: 'PriceRelativity' },
            ]}
            onChange={this.onChange.bind(this)}
          />
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          {(activeEntryIndex == 'FrugalityRatio') ? <FrugalityRatio {...this.props}/> : (activeEntryIndex == 'PriceRelativity') ? <PriceRelativity {...this.props}/> : true}
        </form>
        <div className={strategyStyles.bottomPanel}>
          <div className={strategyStyles.rightPanelSub + ' row'}>
            <Button submit tabIndex={6}
                    className={"large blue pull-left "+ strategyStyles.submitButton}>
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
};

const form = reduxForm({
  form: 'entry-setup',
  enableReinitialize:true,
})(EntryForm);

const mapStateToProps = state => {
  return ({});
};

export default connect(mapStateToProps, mapDispatchToProps)(form);

