import * as React from 'react';
import 'snapsvg-cjs';
import { fadeIn } from './animation';

declare let Snap: any;
const styles = require('./landing.css');

export default class Slide1 extends React.Component<{}, {}> {
  svg: HTMLDivElement;

  loadSvg() {
    let element = Snap(this.svg);
    Snap.load('/public/assets/images/landing/slide-1.svg', (root: any) => {
      fadeIn(root.select('#groupBack'), 0, 1000);
      fadeIn(root.select('#groupWhiteScreen'), 200, 500);
      fadeIn(root.select('#groupWhiteBars'), 750, 500);
      fadeIn(root.select('#groupGreenLine'), 750, 500);

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
