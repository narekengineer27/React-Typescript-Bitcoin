import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./loader.css');
let cx = classNames.bind(styles);

interface LoaderProps {
  isOpen?: boolean;
  className?: string;
  topShift?: number;
}

class Loader extends React.Component<LoaderProps> {

  public static defaultProps: LoaderProps = {
    isOpen: false,
    className: 'large',
    topShift: 0,
  };

  render() {
    const { isOpen, className, topShift } = this.props;

    return isOpen ? (
      <div
        style={{
          height: `calc(100% - ${topShift + 1}px)`,
          top: `${topShift + 1}px`,
        }}
        className={cx('wrapper', (className || '').split(' '))}>
        <i className="fa fa-circle-o-notch fa-spin fa-fw"/>
      </div>
    ) : null;
  }
}

export default Loader;
