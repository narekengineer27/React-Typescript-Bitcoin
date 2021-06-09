import * as React from 'react';
import { round } from 'Utils/math';
import Button from 'Elements/Button';
import { history } from 'Components/Routes';

const styles = require('./pricing.css');

interface Props {
  cardColor: 'green' | 'blue' | 'orange' | string;
  title: string;
  greenText?: string;
  orangeText?: string;
  note?: JSX.Element;
  price: number;
}

export default class Card extends React.Component<Props, {}> {
  render() {
    const { cardColor, title, greenText, orangeText, note, price } = this.props;
    return (
      <div className={styles.card + ' ' + styles[cardColor]}>
        <img src={`/public/assets/images/hexa-${cardColor}.svg`} alt=""/>
        <div className={styles.title}>{title}</div>
        {greenText && <div className={styles.green}>{greenText}</div>}
        {orangeText && <div className={styles.orange}>{orangeText}</div>}
        {note && <div className={styles.note}>{note}</div>}
        <div className={styles.price}>{round(price)} BTC</div>
        <Button className={'large blue ' + styles.button} onClick={() => history.push('/signup')}>Activate</Button>
      </div>
    );
  }
}
