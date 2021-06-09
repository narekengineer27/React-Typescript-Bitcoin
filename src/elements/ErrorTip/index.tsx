import * as React from 'react';

const styles = require('./error-tip.css');

interface ErrorTipProps {
  text?: string;
  leftSide?: boolean;
}

class ErrorTip extends React.Component<ErrorTipProps> {
  render() {
    const { text, leftSide } = this.props;

    let classNames = 'tooltip ' + styles.errorTooltip;
    if (leftSide) {
      classNames += ' ' + styles.leftSide;
    }

    return (
      <div className={classNames} role="tooltip">
        <div className={styles.arrow}></div>
        <div className={styles.tooltipInner}>
          {text}
        </div>
      </div>
    );

  }
}

export default ErrorTip;
