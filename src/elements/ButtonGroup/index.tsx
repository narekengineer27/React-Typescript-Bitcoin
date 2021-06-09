import * as React from "react";
import { Link } from "react-router-dom";
import * as classNames from "classnames/bind";

const styles = require('./button-group.css');
let cx = classNames.bind(styles);

interface ButtonGroupProps {
  activeIndex?: number;
  buttons?: { label: string, value: any, href?: string, control?: any }[];
  className?: string;

  onChange?(button: { label: string, value: any }): void;
}

class ButtonGroup extends React.Component<ButtonGroupProps, any> {

  public static defaultProps: ButtonGroupProps = {
    activeIndex: 0,
    buttons: [],
    className: 'large',
    onChange: () => {
      return;
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  onChange(activeIndex: number) {
    return () => {
      this.setState({
        activeIndex,
      });
      this.props.onChange(this.props.buttons[activeIndex]);
    };
  }

  render() {
    const { className, buttons } = this.props;
    const { activeIndex } = this.state;
    const baseStyles = cx('button-group', className);

    return (
      <div className={styles.wrapper}>
        <div className={baseStyles}>
          {buttons.map((button, index) => {
            const btnClasses = styles.button + ' ' + ((activeIndex === index) ? styles.active : '');
            return button.href ? (
              <Link
                key={button.label}
                to={button.href}
                className={btnClasses}
              >
                {button.label}
              </Link>
            ) : (
              <div
                key={button.label}
                onClick={this.onChange(index).bind(this)}
                className={btnClasses}
              >
                {button.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ButtonGroup;
