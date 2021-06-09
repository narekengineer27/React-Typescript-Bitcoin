import * as React from 'react';

const styles = require('./tooltip.css');

interface TooltipProps {
  text?: any;
  position?: string;
  className?: string;
  width?: any;
}

class Tooltip extends React.Component<TooltipProps, { active: boolean, targetWidth: number, tooltipWidth: number }> {
  public static defaultProps: TooltipProps = {
    text: '',
    position: 'top',
    className: '',
    width: 'auto',
  };
  private target: HTMLDivElement;
  private tooltipDiv: HTMLDivElement;

  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      active: false,
      targetWidth: 0,
      tooltipWidth: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.active !== this.state.active) {
      this.setState({
        targetWidth: this.target.offsetWidth,
        tooltipWidth: this.tooltipDiv ? this.tooltipDiv.offsetWidth : 0,
      });
    }
  }

  render() {
    const { text, position, className, width } = this.props;
    const { active, targetWidth, tooltipWidth } = this.state;
    let classNames = styles.wrapper + ' ' + styles[className] + ' ' + styles[position];

    return (
      <div
        className={classNames} role="tooltip"
        onMouseEnter={() => this.setState({ active: true })}
        onMouseLeave={() => this.setState({ active: false })}
      >
        <div
          ref={input => {
            this.target = input;
          }}>
          {this.props.children}
        </div>
        {active && (
          <div
            ref={input => {
              this.tooltipDiv = input;
            }}
            style={{
              left: (targetWidth - tooltipWidth) / 2,
              width,
            }} className={styles.tooltip}>
            {text}
          </div>
        )}
      </div>
    );

  }
}

export default Tooltip;
