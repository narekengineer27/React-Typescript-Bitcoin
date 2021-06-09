import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import PanelLayout from 'Partials/PanelLayout';
import PublicPageLayout from 'Partials/PublicPageLayout/PublicPageLayout';
import TwoFactorForm from './TwoFactorForm';

interface TwoFactorProps extends RouteComponentProps<{}> {
}

class TwoFactor extends React.Component<TwoFactorProps> {

  render() {
    return (
      <PublicPageLayout footerHidden>
        <PanelLayout title="Two Factor Authentication">
          <TwoFactorForm/>
        </PanelLayout>
      </PublicPageLayout>
    );
  }
}

export default TwoFactor;
