import * as React from 'react';

const styles = require('./contact.css');

const Address: React.SFC<{ address: string, email: string }> = props =>
  (
    <dl>
      <dt>A:</dt>
      <dd>{props.address}</dd>
      <dt>E:</dt>
      <dd><a href={'mailto:' + props.email}>{props.email}</a></dd>
    </dl>
  );

export default class ContactAddresses extends React.Component<{}, {}> {
  render() {
    return (
      <div className={styles.addresses}>
        <Address
          address="4th Floor, Nassima Towers Sheikh Zayeed Road, Dubai, United Arab Emirates"
          email="support@xchangerate.io"
        />
      </div>
    );
  }
}
