import * as React from 'react';

const styles = require('./modal.css');

export default class NoScrollHelper extends React.Component<{}, {}> {
  componentWillMount() {
    document.getElementsByTagName('html')[0].classList.add(styles.noScroll);
  }

  componentWillUnmount() {
    document.getElementsByTagName('html')[0].classList.remove(styles.noScroll);
  }

  render() {
    return <div></div>;
  }
}
