import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./button.css');
let cx = classNames.bind(styles);

interface ButtonProps {
  submit?: boolean;
  tabIndex?: number;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  fixedWidth?: boolean;
  style?: object;

  onClick?(): void;
}

class Button extends React.Component<ButtonProps> {

  public static defaultProps: ButtonProps = {
    submit: false,
    tabIndex: -1,
    className: 'medium blue',
    loading: false,
    disabled: false,
    fixedWidth: false,
    style: {},
    onClick: () => {
    },
  };

  render() {
    const { submit, tabIndex, className = '', loading, disabled, fixedWidth, onClick, style } = this.props;

    let styleClasses = cx('base', className.split(' '), {
      disabled: disabled || loading,
      ['fixed-width']: fixedWidth
    });

    if (submit) {
      return loading ? (
        <div className={styleClasses} onClick={onClick} style={style}>
          <i className={'fa fa-circle-o-notch fa-spin fa-fw ' + styles.loader}/>
        </div>
      ) : (
        <input
          type="submit"
          style={style}
          value={('' + this.props.children)}
          disabled={disabled || loading}
          className={styleClasses}
          tabIndex={tabIndex}
        />
      );
    } else {
      return (
        <div className={styleClasses} onClick={onClick} style={style}>
          {loading ?
            <i className={'fa fa-circle-o-notch fa-spin fa-fw ' + styles.loader}/> :
            this.props.children
          }
        </div>
      );
    }
  }
}

export default Button;
