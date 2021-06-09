import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ButtonGroup from 'Elements/ButtonGroup';
import Features from 'Components/MyAccount/PlatformFeatures/Features';
import Packages from 'Components/MyAccount/PlatformFeatures/Packages';

const styles = require('./platform-features.css');

class PlatformFeatures extends React.Component<Props, {}> {
  render() {
    const tabs = [
      {
        label: 'Packages',
        value: null,
        href: '/my-account/platform-features/packages'
      },
      {
        label: 'Features',
        value: null,
        href: '/my-account/platform-features/features'
      }
    ];

    const showFeatures = this.props.match.params.cmbForm === 'features';

    return (
      <div className={styles.topWrapper}>
        <div className={styles.tabs}>
          <ButtonGroup activeIndex={showFeatures ? 1 : 0} className="medium" buttons={tabs}/>
        </div>
        <div className={styles.topContent}>
          {showFeatures ? <Features/> : <Packages/>}
        </div>
      </div>
    );
  }
}

type Props = RouteComponentProps<{ tab: string; cmbForm: string }>;

export default withRouter(PlatformFeatures);
