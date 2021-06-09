import * as React from 'react';

const styles = require('./arrow.css');

interface TradeStatusProps {
  className?: string;
  height?: number;
  width?: number; 
}

class Arrow extends React.Component<TradeStatusProps> {

  public static defaultProps: TradeStatusProps = {
    className: '',
    height: 40,
    width: 40,
  };

  render() {
    const { className, height, width } = this.props;
    return (
      <div className={className + ' ' + styles.link + ' ' + styles['link--arrowed']}>
        <svg
          className={styles['arrow-icon']}
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox="0 0 32 32"
        >
          <g fill="none" stroke="#2175FF" strokeWidth="1.5" strokeLinejoin="round" strokeMiterlimit="10">
            <circle className={styles['arrow-icon--circle']} cx="16" cy="16" r="15.12"></circle>
            <path className={styles['arrow-icon--arrow']} d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"></path>
          </g>
        </svg>
      </div>
    );
  }
}

export default Arrow;
