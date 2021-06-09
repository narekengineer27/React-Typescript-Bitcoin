import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./content-layout.css');
let cx = classNames.bind(styles);

class ContentLayout extends React.Component<any> {
  render() {

    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default ContentLayout;
