import * as React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import { saveSetting } from './actions';

const styles = require('./global-strategy.css');

class ApproachForm extends React.Component<any, any> {

  constructor(props) {
    super();
    this.state = {
      options: []
    };
  }

  onSubmit(values: object) {
    this.props.saveSetting(values);
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className={styles.formWrapper}>
          <p>Lorem ipsum dolot sit amet</p>
          <div className='row'>
            <div className="col-lg-6">
              <SelectField
                searchable
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
                label="Label"
                name="label"
                tabIndex={3}
                leftSideError
              />
            </div>
            <div className="col-lg-6">
              <SelectField
                searchable
                label="Label"
                name="label"
                tabIndex={4}
                options={[{
                    label: 't',
                    value: 't',
                  }, {
                    label: '1',
                    value: '1',
                  }, {
                    label: '2',
                    value: '2',
                  }]}
              />
            </div>
          </div>
          <p>Here you define what are the global trading strategy parameters.</p>
          <div className="row">
            <div className="col-lg-6">
              <SelectField
                searchable
                options={[{
                    label: '2',
                    value: '2',
                  }, {
                    label: 't',
                    value: 't',
                  }]}
                label="Label"
                name="label"
                tabIndex={3}
                leftSideError
              />
            </div>
            <div className={"col-lg-6 " + styles.input}>
              <TextField label="Input Field" name="input" tabIndex={2}/>
            </div>
          </div>
          <p>Here you define what are the global trading strategy parameters.</p>
          <div className="row">
            <div className="col-lg-6">
              <SelectField
                searchable
                options={[{
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
                label="Label"
                name="label"
                tabIndex={3}
                leftSideError
              />
            </div>
            <div className={"col-lg-6 " + styles.input}>
              <TextField label="Input Field" name="input" tabIndex={2}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <SelectField
                searchable
                options={[{
                    label: '1',
                    value: '1',
                  }, {
                    label: '2',
                    value: '2',
                  }, {
                    label: 't',
                    value: 't',
                  }]}
                label="Label"
                name="label"
                tabIndex={3}
                leftSideError
              />
            </div>
            <div className={"col-lg-6 " + styles.input}>
              <TextField label="Input Field" name="input" tabIndex={2}/>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => ({
  saveSetting,
});

const form = reduxForm({
  form: 'approach',
  enableReinitialize: true,
})(ApproachForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);
