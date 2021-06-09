import * as React from 'react';
import PublicPageLayout from 'Partials/PublicPageLayout';
import ContactForm from 'Components/PublicPages/Contact/ContactForm';
import PanelLayout from 'Partials/PanelLayout/PanelLayout';
import ContactAddresses from './ContactAddresses';

export default class Contact extends React.Component<{}, {}> {
  render() {
    return (
      <PublicPageLayout>
        <PanelLayout title="Contact Us" colSize="col-md-9 col-lg-8" className="public" footer={<ContactAddresses/>}>
          <ContactForm/>
        </PanelLayout>
      </PublicPageLayout>
    );
  }
}
