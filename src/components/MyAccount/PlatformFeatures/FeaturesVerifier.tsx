import * as React from 'react';
import { loadUserPackage } from './actions';
import { connect } from 'react-redux';

// Periodically check for expiration of features
class FeaturesVerifier extends React.Component<Props, {}> {
  handle: number;

  componentDidMount() {
    const { loadUserPackage } = this.props;

    // Initial load
    loadUserPackage();

    // Recheck features every 10 minutes
    this.handle = window.setInterval(() => loadUserPackage(), 10 * 60 * 10000);
  }

  componentWillUnmount() {
    window.clearInterval(this.handle);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  loadUserPackage,
};

type Props = typeof mapDispatchToProps;
export default connect(null, mapDispatchToProps)(FeaturesVerifier);
