import * as React from 'react';
import 'snapsvg-cjs';
import { fadeIn, scale, translate } from './animation';

declare let Snap: any;
const styles = require('./landing.css');

export default class Slide3 extends React.Component<{}, {}> {
  svg: HTMLDivElement;

  loadSvg() {
    let element = Snap(this.svg);
    Snap.load('/public/assets/images/landing/slide-3.svg', (root: any) => {

      const groupGreen = root.select('#groupGreen');
      const groupYellow = root.select('#groupYellow');

      fadeIn(groupGreen, 0, 200);
      translate(groupGreen, 0, 200, 0, -60, 0, 0);
      fadeIn(groupYellow, 0, 200);
      translate(groupYellow, 0, 200, 0, 60, 0, 0);

      fadeIn(root.select('#groupWhite'), 1000, 500);

      scale(root.select('#all'), 1700, 100, 0.8, 1, 618 / 2, 612 / 2);
      fadeIn(root.select('#groupBlue'), 1700, 100);

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
