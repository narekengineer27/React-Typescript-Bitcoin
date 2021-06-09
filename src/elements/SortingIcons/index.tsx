import * as React from 'react';
import { voidFunction } from '../../utils/functions';

const styles = require('./sorting-icons.css');

interface SortingIconsProps {
  increasing?: boolean;
  decreasing?: boolean;
  primary?: boolean;

  onIncreasing?(): void;

  onDecreasing?(): void;
}

class SortingIcons extends React.Component<SortingIconsProps, any> {

  public static defaultProps: SortingIconsProps = {
    increasing: false,
    decreasing: false,
    primary: false,
    onIncreasing: voidFunction,
    onDecreasing: voidFunction,
  };

  constructor(props: SortingIconsProps) {
    super(props);
    this.state = {
      increasing: props.increasing,
      decreasing: props.decreasing,
      primary: props.primary,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.primary !== this.props.primary) {
      this.setState({
        primary: nextProps.primary,
      });
    }
  }

  onIncreasing() {
    const { increasing } = this.state;
    const { primary } = this.props;
    if (increasing && primary) {
      return;
    }
    this.props.onIncreasing();
    this.setState({
      increasing: true,
      decreasing: false,
    });
  }

  onDecreasing() {
    const { decreasing } = this.state;
    const { primary } = this.props;
    if (decreasing && primary) {
      return;
    }
    this.props.onDecreasing();
    this.setState({
      increasing: false,
      decreasing: true,
    });
  }

  render() {
    const { increasing, decreasing, primary } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.icons}>
          <i
            title={'Sort increasingly'}
            onClick={this.onIncreasing.bind(this)}
            className={'fa fa-caret-up ' + ((increasing && primary) ? styles.active : '')}
            aria-hidden="true"></i>
          <i
            title={'Sort decreasingly'}
            onClick={this.onDecreasing.bind(this)}
            className={'fa fa-caret-down ' + ((decreasing && primary) ? styles.active : '')}
            aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default SortingIcons;
