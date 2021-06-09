import * as React from 'react';
import { Link } from 'react-router-dom';
import ButtonGroup from 'Elements/ButtonGroup';
import { WatchListTabs } from './types';
import Responsive from 'Partials/Responsive';
import Buying from './Buying';
import CoinsMobile from './Buying/BuyingMobile';
import SellingMobile from './Selling/SellingMobile';
import Selling from './Selling';

const styles = require('./watch-list.css');

export default class WatchList extends React.Component<any, any> {

  render() {
    const { type } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.listTabs}>
          <ButtonGroup
            className="medium"
            activeIndex={type === WatchListTabs.Buying ? 0 : 1}
            buttons={[{
              label: 'Buying',
              value: WatchListTabs.Buying,
              href: `/mtr/watchlist/${WatchListTabs.Buying}`,
            }, {
              label: 'Selling',
              value: WatchListTabs.Selling,
              href: `/mtr/watchlist/${WatchListTabs.Selling}`,
            }]}
          />
        </div>
        {type === WatchListTabs.Selling && (
          <Link to="/my-account/cmb-settings/exit">
            <div className={styles.sellingSettings}>
              Selling settings
            </div>
          </Link>
        )}
        <Responsive name="desktop">
          {type === WatchListTabs.Buying && (
            <Buying/>
          )}
          {type === WatchListTabs.Selling && (
            <Selling/>
          )}
        </Responsive>
        <Responsive name="phone">
          {type === WatchListTabs.Buying && <CoinsMobile/>}
          {type === WatchListTabs.Selling && <SellingMobile/>}
        </Responsive>
      </div>
    );
  }
}
