import * as React from 'react';
import PublicPageLayout from 'Partials/PublicPageLayout';
import Card from 'Components/PublicPages/Pricing/Card';
import { IState } from 'Components/PublicPages/Pricing/types';
import { loadPackages } from 'Components/PublicPages/Pricing/actions';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';

const styles = require('./pricing.css');

class Pricing extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.loadPackages();
  }

  render() {
    const { status, data } = this.props.packages;
    let cards: JSX.Element;
    if (status.success) {
      cards = (
        <div className={styles.cards}>
          {data.map(pack => {
            if (pack.is_feature) {
              return null;
            }

            let color = 'blue';
            let note: JSX.Element;
            let greenText: string;
            let orangeText: string;
            if (pack.type === 'one-exchanges' || pack.type === 'all-exchanges') {
              if (pack.live_days > 1) {
                greenText = pack.live_days + ' days';
                color = 'green';
              } else {
                orangeText = 'per day';
                color = 'orange';
              }
            } else if (pack.type === 'education') {
              note = (
                <span>
                    <b>+ {pack.live_days} day</b> Active mode for Single exchange - For training purposes
                  </span>
              );
              greenText = pack.test_days + ' days';
            }

            return (
              <Card
                key={pack.id}
                cardColor={color}
                title={pack.description}
                greenText={greenText}
                orangeText={orangeText}
                price={+pack.price}
                note={note}
              />
            );
          })}
        </div>
      );
    }

    return (
      <PublicPageLayout>
        <h1 className={styles.title}>
          We offer you a variety of features integrated throughout our trading platform
        </h1>

        <div className={styles.exchanges}>
          <div className={styles.bitfinex}>
            <img src="/public/assets/images/pricing-bitfinex.png"/>
            <p>integration</p>
          </div>
          <div className={styles.bittrex}>
            <img src="/public/assets/images/pricing-bittrex.png"/>
            <p>integration</p>
          </div>
        </div>
        <hr/>
        <div className={styles.cardsWrapper}>
          {cards}
        </div>
      </PublicPageLayout>
    );
  }
}

const mapStateToProps = rootState => {
  const state = rootState.publicPricing as IState;
  return {
    packages: state.packages,
  };
};

const mapDispatchToProps = {
  loadPackages,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
