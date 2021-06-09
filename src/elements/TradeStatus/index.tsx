import * as React from 'react';

const styles = require('./trade-status.css');

interface TradeStatusProps {
  status?: string;
}

class TradeStatus extends React.Component<TradeStatusProps> {

  public static defaultProps: TradeStatusProps = {
    status: '',
  };

  render() {
    const { status = '' } = this.props;

    return (
      <div className={styles[status.toLowerCase()]}>
        {status}
      </div>
    );
  }
}

export default TradeStatus;
