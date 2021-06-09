import * as React from 'react';
import { round } from 'Utils/math';

const styles = require('./price.css');

interface PriceProps {
  diff?: number;
  zero?: boolean;
  arrowPosition?: string;
  prefix?: string;
  nDigitsAfterDot?: number;
  arrowDirection?: string;
}

class Price extends React.Component<PriceProps> {

  public static defaultProps: PriceProps = {
    diff: 0,
    zero: false,
    arrowPosition: 'right',
    prefix: '',
    nDigitsAfterDot: 8,
    arrowDirection: '',
  };

  decorateWithPrefix(original: string) {
    const { prefix } = this.props;
    return prefix ? `${prefix} ${original}` : original;
  }

  renderNumber() {
    const { children, diff = 0, arrowPosition, nDigitsAfterDot } = this.props;
    const n = parseFloat((children + '').replace(/[^\d\.^\-^e]*/g, ''));
    const updatedChildren = (children + '').replace('' + n, round(n, nDigitsAfterDot)).replace(/,/g, '');
    if (diff === 0) {
      return <div className={n === 0 ? styles.zero : ''}>{this.decorateWithPrefix(updatedChildren)}</div>;
    }
    const profit = diff > 0;
    const profitOrLoss = profit ? styles.profit : styles.loss;
    if (arrowPosition === 'top') {
      return (
        <div className={profitOrLoss}>
          <div>
            <div>
              <i className={`${styles.top} ${styles.icon} fa fa-caret-${profit ? 'up' : 'down'}`}></i>
            </div>
            {this.decorateWithPrefix(updatedChildren)}
          </div>
        </div>
      );
    }
    return (
      <div className={profitOrLoss + ' ' + styles[arrowPosition]}>
        {(arrowPosition === 'left') && (
          <div className="vertical-center">
            <i className={`${styles.icon} fa fa-caret-${profit ? 'up' : 'down'}`} aria-hidden="true"></i>
          </div>
        )}
        <div>{updatedChildren}</div>
        {(arrowPosition === 'right') && (
          <div className="vertical-center">
            <i className={`${styles.icon} fa fa-caret-${profit ? 'up' : 'down'}`} aria-hidden="true"></i>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { zero, children = 0, nDigitsAfterDot, arrowDirection, arrowPosition } = this.props;
    let ui = null;

    const profitOrLoss = (arrowDirection === 'up') ? styles.profit : styles.loss;
    const n = Number(children);

    if (arrowDirection) {
      ui = (
        <div className={profitOrLoss}>
          <i className={`fa fa-caret-${arrowDirection} ${styles.icon}`} aria-hidden="true"></i>
          <span className={n === 0 ? styles.zero : ''}>{this.decorateWithPrefix(round(n, nDigitsAfterDot))}</span>
        </div>
      );
    } else {
      ui = (zero || n === 0) ? (
        <div className={profitOrLoss}>
          <div className={n === 0 ? styles.zero : ''}>{this.decorateWithPrefix(round(n, nDigitsAfterDot))}</div>
        </div>
      ) : this.renderNumber();
    }

    return (
      <div className={styles.wrapper + ' ' + styles[arrowPosition]}>
        {ui}
      </div>
    );
  }
}

export default Price;
