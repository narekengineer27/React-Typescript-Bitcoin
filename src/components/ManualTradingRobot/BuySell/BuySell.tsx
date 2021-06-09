import * as React from 'react';
import { connect } from 'react-redux';

import BuySellModal from './BuySellModal';
import { returntypeof } from 'Utils/type';

class BuySell extends React.Component<Props, {}> {
  render() {
    const { visible, buySuccess, sellMode } = this.props;
    if (!visible) {
      return null;
    }

    return (!sellMode && buySuccess) ? null : <BuySellModal/>;
  }
}

const mapStateToProps = state => ({
  visible: state.buySell.visible,
  buySuccess: state.buySell.buyResult.status.success,
  sellMode: state.buySell.sellMode,
});

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps;

export default connect(mapStateToProps)(BuySell);
