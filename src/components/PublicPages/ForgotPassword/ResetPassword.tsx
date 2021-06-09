import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PanelLayout from 'Partials/PanelLayout/PanelLayout';
import PublicPageLayout from 'Partials/PublicPageLayout/PublicPageLayout';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import TextField from 'Elements/TextField';
import Button from 'Elements/Button';
import { IState } from 'Components/PublicPages/ForgotPassword/types';
import { resetPassword } from 'Components/PublicPages/ForgotPassword/actions';
import { isProvided } from 'Utils/validators';

const styles = require('./forgot-password.css');

class ResetPassword extends React.Component<Props, {}> {
  render() {
    const { handleSubmit, status } = this.props;
    return (
      <PublicPageLayout footerHidden>
        <PanelLayout title="Reset Password">
          <form onSubmit={handleSubmit(values => this.onFormSubmit(values))}>
            <TextField name="password" type="password" label="New password"/>

            <div className={styles.paddedRow}>
              <TextField name="passwordConfirm" type="password" label="Confirm new password"/>
            </div>

            <Button className="large blue full" submit loading={status.loading || status.success}>
              Reset password
            </Button>
          </form>
        </PanelLayout>
      </PublicPageLayout>
    );
  }

  onFormSubmit(values: Values) {
    this.props.resetPassword(this.props.match.params.emailToken, values.password);
  }
}

type Values = { password: string; passwordConfirm: string; };

const validate = (values: Values) => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.password)) {
    errors.password = 'Please provide the new password';
  }

  if (!isProvided(values.passwordConfirm)) {
    errors.passwordConfirm = 'Please confirm the password';
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match';
  }

  return errors;
};

const mapStateToProps = (rootState, ownProps: OwnProps) => {
  const state = rootState.forgotPassword as IState;
  return {
    status: state.status,
  };
};

const mapDispatchToProps = {
  resetPassword
};

type Params = { emailToken?: string; };

interface OwnProps extends RouteComponentProps<Params> {
}

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & OwnProps & FormProps;

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'resetPassword',
  validate
})(ResetPassword));
