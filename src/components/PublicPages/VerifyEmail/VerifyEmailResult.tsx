import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

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
    this.props.verify(this.props.match.params.emailToken);
  }

  render() {
    let { status: { success, error } } = this.props;

    let imageUrl = '/public/assets/images/validate-email-success.svg';
    let message = 'Loading...';

    if (success) {
      message = 'Your e-mail address has been verified. You can now sign in to your account.';
    } else if (error) {
      imageUrl = '/public/assets/images/validate-email-error.svg';
      message = 'Your e-mail address could not be verified. The link could be incorrect, ' +
        'expired, or you might have validated this e-mail already.';
    }

    return (
      <PublicPageLayout footerHidden>
        <PanelLayout title="Sign In" colSize="col-md-10 col-lg-8">
          <div className={styles.resultPanel}>
            <img className={styles.image} src={imageUrl}/>
            <p className={styles.message}>
              {message}
            </p>
            {success && <Button className="blue large" onClick={() => this.onGoToSigninClick()}>Go to sign in</Button>}
          </div>
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
