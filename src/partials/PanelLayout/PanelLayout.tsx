import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./panel-layout.css');
let cx = classNames.bind(styles);

interface PanelLayoutProps {
  title: string;
  colSize?: string;
  footer?: any;
  className?: 'public' | '';
  noBackground?: boolean;
}

class PanelLayout extends React.Component<PanelLayoutProps> {
  render() {
    const { title, colSize = 'col-lg-5 col-md-8', footer, className, noBackground } = this.props;

    return (
      <div className={'container ' + cx('wrapper', (className || '').split(' '))}>
        <div className="row justify-content-center">
          <div className="col">
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className={colSize}>
            <div className={styles.panel + ' ' + noBackground ? styles.noBackground : ''}>
              {this.props.children}
            </div>
          </div>
        </div>
        {footer && (<div className="row justify-content-center">
          <div className="col">
            {footer}
          </div>
        </div>)}
      </div>
    );
  }
}

export default PanelLayout;
