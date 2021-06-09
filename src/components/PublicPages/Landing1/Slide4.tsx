import * as React from 'react';
import 'snapsvg-cjs';
import { fadeIn, scale } from './animation';

declare let Snap: any;
const styles = require('./landing.css');

export default class Slide4 extends React.Component<{}, {}> {
  svg: HTMLDivElement;

  loadSvg() {
    let element = Snap(this.svg);
    Snap.load('/public/assets/images/landing/slide-4.svg', (root: any) => {
      fadeIn(root.select('#groupBrown'), 0, 1000);
      fadeIn(root.select('#groupLeafs1'), 800, 700);
      fadeIn(root.select('#groupLeafs2'), 900, 700);

      const groupCircle = root.select('#groupCircle');

      fadeIn(groupCircle, 1500, 700);
      const groupCircleBox = groupCircle.getBBox();
      scale(groupCircle, 1500, 700, 0.2, 1, groupCircleBox.cx, groupCircleBox.cy);

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
