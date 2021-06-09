import * as React from 'react';
import 'snapsvg-cjs';
import { fadeIn } from './animation';

declare let Snap: any;
const styles = require('./landing.css');

export default class Slide2 extends React.Component<{}, {}> {
  svg: HTMLDivElement;

  loadSvg() {
    let element = Snap(this.svg);
    Snap.load('/public/assets/images/landing/slide-2.svg', (root: any) => {
      fadeIn(root.select('#groupBlue1'), 0, 1000);
      fadeIn(root.select('#groupBlue2'), 150, 1000);
      fadeIn(root.select('#groupHexa'), 250, 1000, 0.3);
      fadeIn(root.select('#groupGreen'), 500, 1000);

      if (element) {
        element.append(root);
      }
    });
  }

  componentDidMount() {
    this.loadSvg();
  }

  render() {
    return (
      <div className={styles.slide} ref={r => this.svg = r}/>
    );
  }
}
