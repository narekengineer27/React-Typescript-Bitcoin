import * as React from 'react';
import { connect } from 'react-redux';
import { returntypeof } from 'Utils/type';
import EditPackageModal from 'Components/Admin/Settings/Billing/EditPackageModal';
import { IState } from 'Components/Admin/Settings/Billing/types';
import Button from 'Elements/Button';
import { loadPackages, openEditPackage } from 'Components/Admin/Settings/Billing/actions';
import Loader from 'Elements/Loader';

const styles = require('./billing.css');

class Billing extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.loadPackages();
  }

  render() {
    const { packages: { data, status }, openEditPackage, } = this.props;

    let content: JSX.Element;
    if (status.loading) {
      content = <Loader isOpen className="large transparent"/>;
    } else {
      content = (
        <div>
          <h4 className={styles.title}>Packages</h4>
          {data.map(item => (
            <div key={item.id} className={styles.package}>
              <div>{item.description}</div>
              <Button onClick={() => openEditPackage(item)} className={'medium blue ' + styles.editButton}>Edit</Button>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className={styles.wrapper}>
        {content}
        <EditPackageModal/>
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  const state = rootState.adminBilling as IState;
  return {
    packages: state.packages,
  };
};

const mapDispatchToProps = {
  loadPackages,
  openEditPackage,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
