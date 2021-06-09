import * as React from 'react';
import { connect } from 'react-redux';
import { offset } from 'Utils/dom';
import { updateTooltipWidth, hoverTooltip, toggleTooltip } from "Components/GlobalTooltip/actions";

class GlobalTooltipWrapper extends React.Component<any, { timer: any }> {

  private target: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }

  enter() {
    this.props.hoverTooltip(true, this.props.text);
    // In case the user moves mouse very fast, do not show the tooltip at all.
    this.setState({
      timer: setTimeout((() => {
        const { toggleTooltip, text } = this.props;
        var pos = offset(this.target);
        toggleTooltip(text, pos.left, pos.top, this.target ? this.target.offsetWidth : 0);
      }).bind(this), 50),
    });
  }

  leave() {
    clearTimeout(this.state.timer);
    this.props.hoverTooltip(false, '');
    this.setState({
      timer: null,
    });
  }

  render() {
    const { className = '' } = this.props;
    return (
      <div
        className={`inline-block ${className}`}
        ref={input => {
          this.target = input;
        }}
        onMouseEnter={this.enter.bind(this)}
        onMouseLeave={this.leave.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = {
  updateTooltipWidth,
  hoverTooltip,
  toggleTooltip,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalTooltipWrapper);
