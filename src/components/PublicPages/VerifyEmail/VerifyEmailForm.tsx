import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { Redirect } from 'react-router';
import { verify } from './actions';
import { Status } from 'Models/Status';
import { isProvided, isEmail, isMobilePhone } from 'Utils/validators';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { history } from 'Components/Routes';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import XrrtokenModal from 'Components/PublicPages/XrrtokenModal';
import RegisterModal from 'Components/PublicPages/RegisterModal';

const styles = require('./verify-email.css');

class VerifyEmailForm extends React.Component<Props, { options?: any[] , isOpenXRRTokenModal?: boolean , check?: boolean}> {

  constructor(props: Props) {
    super();
    this.state = {
      options: [],
      isOpenXRRTokenModal: false,
      check: true
    };
  }

  componentDidMount() {

  }

  componentWillUpdate(nextProps: Props) {
    // if (this.props.country !== nextProps.country) {
    //   this.props.change('city', '');
    //   this.props.untouch('city');
    // }
  }

  onSubmit(values: object) {
    history.push('/verify-email/' + values.code);
    // this.props.verify(values.code);
  }

  
  openXRRTokenModal() {
    this.setState({
        isOpenXRRTokenModal: true
    })
  }

  cancelXRRTokenModal() {
      this.setState({
          isOpenXRRTokenModal: false
      })
  }

  render() {
    const {
      handleSubmit, status = new Status()
    } = this.props;
    const { options, check } = this.state;
    if (status.success && check) {
      this.setState({
        check: false,
        isOpenXRRTokenModal: true
      })
      // return (
      //   // <Redirect to={{ pathname: '/setup-details/market-maker', state: { from: location }, }}/>
      // );
    }
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className={styles.panel}>
                <div className={styles.verifyInput}>
                  <TextField type="text" label="Code" name="code" autoComplete border={true} leftSideError={false}/>
                </div>
                <Button className={styles.verifyBtn + " blue small"} submit loading={status.loading}>Verify</Button>
            </div>
            <RegisterModal isOpen={this.state.isOpenXRRTokenModal} onCancel={this.cancelXRRTokenModal.bind(this)} width="600"/>
        </form>
    );
  }
}

type Values = {
  code: string;
};

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};
  
  if (!isProvided(values.code)) {
    errors.code = 'Please provide your code.';
  }

  return errors;
};


const form = reduxForm({
  form: 'verifyemail',
  validate,
})(VerifyEmailForm);

const selector = formValueSelector('verifyemail');

const mapStateToProps = (state, ownProps: OwnProps) => {

  return ({
    status: state.verifyEmail.status
  });
};

const mapDispatchToProps = {
  verify,
};

type OwnProps = { referral?: string; };
const stateProps = returntypeof(mapStateToProps);
type Props = OwnProps & typeof stateProps & typeof mapDispatchToProps & FormProps;

export default connect(mapStateToProps, mapDispatchToProps)(form);
