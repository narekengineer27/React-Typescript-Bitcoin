import * as React from 'react';
import { loadPackages, openPurchaseFeatureModal, openScratchCardModal } from './actions';
import { IState } from './types';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import PackageCard from './PackageCard';
import PurchaseFeatureModal from './PurchaseFeatureModal';
import Loader from 'Elements/Loader';
import ScratchCardModal from 'Components/MyAccount/PlatformFeatures/ScratchCardModal';

const styles = require('./platform-features.css');

class Packages extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.loadPackages();
  }

  render() {
    const { packages: { data, status }, openPurchaseFeatureModal, openScratchCardModal, } = this.props;
    if (!status.success) {
      return <Loader isOpen className="large transparent"/>;
    }

    return (
      <div className={styles.packageCards}>
        {data.packages.map(item => (
          <PackageCard
            key={item.id}
            pack={item}
            onActivate={() => openPurchaseFeatureModal(item)}
            onScratch={() => openScratchCardModal()}
          />
        ))}

        <PurchaseFeatureModal/>
        <ScratchCardModal/>
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  const state = rootState.platformFeatures as IState;
  return {
    packages: state.packages,
  };
};

const mapDispatchToProps = {
  loadPackages,
  openPurchaseFeatureModal,
  openScratchCardModal,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
