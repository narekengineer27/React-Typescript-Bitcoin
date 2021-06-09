import * as React from 'react';

const styles = require('./rating.css');

interface RatingProps {
  rate?: number;
  nReviews?: number;
  onChange?(): void;
}

class Rating extends React.Component<RatingProps> {

  public static defaultProps: RatingProps = {
    rate: 0,
    nReviews: 0,
    onChange: () => {},
  };

  render() {
    const { rate, nReviews } = this.props;

    const limitedRate = Math.max(0, Math.min(rate, 5));
    const flooredRate = Math.floor(limitedRate);
    const stars = [];

    for (let i = 1; i <= flooredRate; i++) {
      stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
    }
    if (limitedRate > flooredRate) {
      stars.push(<i key={limitedRate} className="fa fa-star-half-o" aria-hidden="true"></i>);
    }
    for (let i = Math.ceil(limitedRate) + 1; i <= 5; i++) {
      stars.push(<i key={limitedRate + i} className={'fa fa-star-o ' + styles.emptyStar} aria-hidden="true"></i>);
    }

    return (
      <div className={styles.wrapper}>
        <div className="flex">
          <div className={styles.stars}>
            {stars}
          </div>
          <div className={styles.reviews}>
            ({nReviews})
          </div>
        </div>
      </div>
    );
  }
}

export default Rating;
