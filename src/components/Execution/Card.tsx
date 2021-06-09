import * as React from 'react';

interface Props {
  title: string;
  color: 'blue' | 'green' | 'orange' | 'red' | 'gray';
  value: string;
  unit: string;
  noSpin?: boolean;
}

const styles = require('./execution.css');

export default class Card extends React.Component<Props, {}> {
  render() {
    const { color, title, value, unit, noSpin } = this.props;

    return (
      <div className={styles.card + ' ' + styles[color]}>
        <img
          src={`/public/assets/images/execution/${color}-circle.svg`}
          className={noSpin ? styles.noSpin : ''}
        />
        <div className={styles.title}>{title}</div>
        <div className={styles.textBox}>
          <div className={styles.value}>{value}</div>
          <div className={styles.unit}>{unit}</div>
        </div>
      </div>
    );
  }
}
