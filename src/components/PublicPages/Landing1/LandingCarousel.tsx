import * as React from 'react';
import Button from 'Elements/Button';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';

const styles = require('./landing.css');

interface State {
  currentIndex?: number;
  paused?: boolean;
}

interface Props {
  onButtonClick: () => void;
}

const INTERVAL = 5000;
const INTERVAL_STEPS = 10;
const SLIDES = 4;
const SLIDE_CONTROLS = [Slide1, Slide2, Slide3, Slide4];
const SLIDES_TEXTS = [
  'We bring you a unified interface to manage your trades across all major exchanges along ' +
  'with powerful metrics to increase profit.',
  'Leverage on cryptocurrencies to grow your local currency (FIAT)',
  'Xchange rate brings you the best of both Bitcoin & Altcoins worlds in one place.',
  'Cryptocurrency growth can now become the advantage that makes you live your dream.',
];

export default class LandingCarousel extends React.Component<Props, State> {
  timer: number;
  steps: number;

  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      paused: false,
    };

    this.steps = 0;
  }

  render() {
    const { currentIndex, paused } = this.state;
    const { onButtonClick } = this.props;

    const progressItems: JSX.Element[] = [];
    for (let i = 0; i < SLIDES; i++) {
      if (i === currentIndex) {
        progressItems.push(
          <div key={i} className={styles.progressItem}>
            <div className={styles.progressActive} style={{ animationPlayState: paused ? 'paused' : 'running' }}/>
          </div>
        );
      } else {
        progressItems.push(<div key={i} className={styles.progressItem}/>);
      }
    }

    const Slide = SLIDE_CONTROLS[currentIndex];
    const slideText = SLIDES_TEXTS[currentIndex];

    return (
      <div className={styles.carousel}>
        <div className={styles.carouselLeft}>
          <Slide/>
        </div>
        <div className={styles.carouselRight}>
          <div className={styles.videoWrapper}>
            <div className={styles.video}>
              <iframe
                src="https://www.youtube.com/embed/kp2osBC2MrM?rel=0&amp;showinfo=0&amp;"
                allowFullScreen
                frameBorder={0}
              />
            </div>
          </div>
          <div>
            {progressItems}
          </div>
          <span onMouseEnter={() => this.pause()} onMouseLeave={() => this.resume()}>
            <p className={styles.carouselFadeIn} key={currentIndex}>{slideText}</p>
            <Button className="large blue" onClick={onButtonClick}>Get started</Button>
          </span>
        </div>
      </div>
    );
  }

  nextStep() {
    if (this.state.paused) {
      return;
    }

    this.steps += 1;
    if (this.steps < INTERVAL_STEPS) {
      return;
    }

    this.steps = 0;

    let currentIndex = this.state.currentIndex + 1;
    if (currentIndex >= SLIDES) {
      currentIndex = 0;
    }

    this.setState({ currentIndex });
  }

  pause() {
    this.setState({ paused: true });
  }

  resume() {
    this.setState({ paused: false });
  }

  componentDidMount() {
    this.timer = window.setInterval(() => this.nextStep(), INTERVAL / INTERVAL_STEPS);

    // Preload all the SVG files
    for (let i = 1; i <= SLIDES; i++) {
      new Image().src = `/public/assets/images/landing/slide-${i}.svg`;
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
}
