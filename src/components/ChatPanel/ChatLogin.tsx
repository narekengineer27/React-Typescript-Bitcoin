import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import PanelLayout from 'Partials/PanelLayout';
import LoginForm from 'Components/ChatPanel/LoginForm';
import PublicPageLayout from 'Partials/PublicPageLayout/PublicPageLayout';

interface LoginProps extends RouteComponentProps<{}> {
}

class Login extends React.Component<LoginProps> {

  render() {
    return (
      <PublicPageLayout footerHidden>
        <PanelLayout title="Login">
          <LoginForm/>
        </PanelLayout>
      </PublicPageLayout>
    );
  }
}

export default Login;
