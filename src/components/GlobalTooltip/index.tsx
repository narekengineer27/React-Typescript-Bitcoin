import * as React from 'react';
import { connect } from 'react-redux';
import { updateTooltipWidth } from './actions';

const styles = require('./global-tooltip.css');

class GlobalTooltip extends React.Component<any, { tooltipDiv: HTMLDivElement }> {
  private tooltipDiv: HTMLDivElement;

  componentWillUpdate(nextProps) {
    const { updateTooltipWidth, hover, text, tooltipWidth } = nextProps;
    if (text && hover && this.tooltipDiv && (tooltipWidth === 0)) {
      this.tooltipDiv.style.visibility = 'hidden';
      // wait for some time to get the width of tooltip
      setTimeout(() => {
        this.tooltipDiv.style.visibility = 'visible';
        updateTooltipWidth(this.tooltipDiv.offsetWidth);
      }, 50);
    }
  }

  render() {
    const { text, left, top, tooltipWidth, targetWidth } = this.props;
    const classNames = styles.wrapper;
    const tooltipHeight = this.tooltipDiv ? this.tooltipDiv.offsetHeight : 0;

    return (
      <div
        id="tooltip"
        role="tooltip"
        className={classNames}
        ref={input => {
          this.tooltipDiv = input;
        }}
        style={{
          left: left + targetWidth / 2 - tooltipWidth / 2,
          top: top - tooltipHeight - 7,
          display: (text ? 'block' : 'none'),
        }}
      >
        <div className={styles.tooltip}>
          {text}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.globalTooltip.text,
  left: state.globalTooltip.left,
  top: state.globalTooltip.top,
  tooltipWidth: state.globalTooltip.tooltipWidth,
  targetWidth: state.globalTooltip.targetWidth,
  hover: state.globalTooltip.hover,
});

const mapDispatchToProps = {
  updateTooltipWidth,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTooltip);
