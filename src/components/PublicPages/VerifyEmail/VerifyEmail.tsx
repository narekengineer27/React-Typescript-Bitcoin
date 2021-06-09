import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import VerifyEmailForm from './VerifyEmailForm';
import TextField from 'Elements/TextField';
import PanelLayout from 'Partials/PanelLayout';
import Button from 'Elements/Button';
import { verify } from './actions';
import { Status } from 'Models/Status';
import PublicPageLayout from 'Partials/PublicPageLayout/PublicPageLayout';

const styles = require('./verify-email.css');

interface VerifyEmailParams {
  emailToken?: string;
}

interface VerifyEmailProps extends RouteComponentProps<VerifyEmailParams> {
  status?: Status;
  verify?: (emailToken: string) => void;
}

class VerifyEmail extends React.Component<VerifyEmailProps> {

  componentDidMount() {
    // this.props.verify(this.props.match.params.emailToken);
  }

  render() {
    return (
      <PublicPageLayout footerHidden>
        <PanelLayout title="E-mail Verification" colSize="col-md-10 col-lg-8">
          <span>Your verification code has been sent to the email you provided during sign up. Please enter your verification code in the space provided.</span>
          <VerifyEmailForm/>
        </PanelLayout>
      </PublicPageLayout>
    );
  }

  onGoToSigninClick() {
    this.props.history.push('/login');
  }
}

const mapStateToProps = (state, ownProps) => ({
  status: state.verifyEmail.status as Status,
});

const mapDispatchToProps = {
  verify,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
