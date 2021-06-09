import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import SmallToggle from 'Elements/SmallToggle';
import MarketMakerOneRow from './MarketMakerOneRow';
import { getExchangeList, getCoinList, getMarketMakerList, addMarketMaker, getMarketMakerTradeList } from './actions';
import { baseCoins } from 'Components/SetupDetails/actions';
import Toggle from 'react-toggle';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';

var FontAwesome = require('react-fontawesome');

const styles = require('./market-maker.css');

class MarketMakerSetting extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
          mode: false,
          exchangeValue: '',
          basecoinValue: '',
          coinValue: '',
          marketName: '',
          currentMarketMaker: {}
        };

        this.getTradeList = this.getTradeList.bind(this);
    }

    componentDidMount() {
      const { getExchangeList, getMarketMakerList, baseCoins, marketMakerSettingData, setupDetailsData } = this.props;
      if(!marketMakerSettingData || !marketMakerSettingData.exchangeList || marketMakerSettingData.exchangeList.status.error) {
        getExchangeList();
      }
      if(!marketMakerSettingData || !marketMakerSettingData.marketmakerList || marketMakerSettingData.marketmakerList.status.error) {
        getMarketMakerList();
      }
      if(!setupDetailsData || !setupDetailsData.base_coin) {
        baseCoins();
      }
    }

    componentWillUpdate(nextProps) {
    }

    changeMode() {
        var mode = this.state.mode;
        this.setState(
            {
                mode: !mode
            }
        );
    }

    changeState(ev) {
      const { getCoinList } = this.props;
      var obj = {};
      obj[ev.target.name] = ev.target.value;
      this.setState(obj);
      getCoinList(ev.target.value);
    }

    saveMarketMaker() {

      const { addMarketMaker } = this.props;

      var data = {
        market_name: this.state.marketName,
        exchange: this.state.exchangeValue,
        base_coin:this.state.basecoinValue,
        coin:this.state.coinValue ? this.state.coinValue : 'ZER'
      }

      addMarketMaker(data);
    }

    getTradeList(data) {
      const { getMarketMakerTradeList } = this.props;

      getMarketMakerTradeList(data.id);
      this.setState({
        currentMarketMaker: data
      });
    }

  render() {

    const { marketMakerSettingData, setupDetailsData } = this.props;

    var $marketMakerTable = (
      <div>
        <table cellPadding="0">
          <thead>
            <tr>
              <th colSpan="4" scope="colgroup" className={styles.tableTopHeader}>BUY</th>
              <th colSpan="2" scope="colgroup" className={styles.tableTopHeader}>SELL</th>
              <th rowSpan="2">
                <div className={styles.toggleWrapper}>
                    <span>Summary</span>
                    <div className={styles.thToggle}>
                        <Toggle
                            disabled={false}
                            checked={this.state.mode}
                            icons={false}
                            className='react-toggle-mr'
                            onChange={this.changeMode.bind(this)}/>
                        {/* <SmallToggle
                            onClick={this.changeMode.bind(this)}
                            checked={this.state.mode}/> */}
                    </div>
                    <span>Details</span>
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col">Account</th>
              <th scope="col">Quantity Range</th>
              <th scope="col">Buy Price</th>
              <th scope="col">Spread</th>
              <th scope="col">Quantity Range</th>
              <th scope="col">Sell Price</th>
            </tr>
          </thead>
          <MarketMakerOneRow mode={!this.state.mode} trademode="buying" isparent={false} marketmaker={this.state.currentMarketMaker} trade={{}}/>
          <MarketMakerOneRow mode={!this.state.mode} trademode="buying" isparent={false} marketmaker={this.state.currentMarketMaker} trade={{}}/>
          {/* {$tableOneRow} */}
        </table>
      </div>
    );

    var $tableContent = (
      <div>

      </div>
    );

     
     var $marketMakerList = marketMakerSettingData && marketMakerSettingData.marketmakerList && marketMakerSettingData.marketmakerList.marketmakers && marketMakerSettingData.marketmakerList.marketmakers.data;

     $marketMakerList = $marketMakerList ? $marketMakerList : {};
    return (
      <div className={styles.marketMaker}>
        <div className={styles.contentWrapper}>
          <div className={styles.sideContentWrapper}>
            <span className={styles.sideContentTitle}>Settings</span>
            <input className={styles.input + ' ' + styles.searchInput} placeholder="Search"/>
            <div className={styles.sideContentBtnWrapper}>
              <Button className={styles.sideContentBtn + " small blue"} style={{width: 200 + 'px'}}>Save</Button>
              <Button className={styles.sideContentBtn + " small red"}  style={{width: 200 + 'px'}}>Delete</Button>
            </div>
            <div className={styles.sideContentTableWrapper}>
              <table>
                <thead>
                  <th className={styles.sideTableTh}>Header</th>
                </thead>
                {
                    Object.keys($marketMakerList).map((key, index) => {
                      return (
                      <tr onClick={() => this.getTradeList($marketMakerList[key])}>
                        <td>
                          {$marketMakerList[key].market_name}
                        </td>
                      </tr>
                      )
                    })
                }
              </table>
            </div>
          </div>

          <div className={styles.tableContentWrapper}>
            <div className={styles.tableContentTitle}>
              <span className={styles.tableContentWrapperTitle}>Setting 1</span>
            </div>
            <div className={styles.tableContentHeaderSection}>
                <div className={styles.tableContentLogoWrapper}>
                    <img src={`/public/assets/images/plaak.png`} className={styles.tableContentHeaderLogo}/>
                </div>
                <div className={styles.tableContentHeaderSelectGroup}>
                    <select value={this.state.exchangeValue} name="exchangeValue" onChange={this.changeState.bind(this)}>
                      <option value="" disabled selected>Exchange</option>
                      {marketMakerSettingData && marketMakerSettingData.exchangeList && marketMakerSettingData.exchangeList.exchanges && marketMakerSettingData.exchangeList.exchanges.data && marketMakerSettingData.exchangeList.exchanges.data.map((m, index) => {
                        return (
                          <option value={m.exchange}>{m.exchange}</option>
                        )
                      })}
                    </select>
                    <select value={this.state.basecoinValue} name="basecoinValue" onChange={this.changeState.bind(this)}>
                      <option value="" disabled selected>Basecoin</option>
                      {setupDetailsData && setupDetailsData.base_coin &&  setupDetailsData.base_coin.data &&  setupDetailsData.base_coin.data.map((m, index) => {
                        return (
                          <option value={m.coin}>{m.coin}</option>
                        )
                      })}
                    </select>
                    <select value={this.state.coinValue} name="coinValue" onChange={this.changeState.bind(this)}>
                      <option value="" disabled selected>Coin</option>
                      {marketMakerSettingData && marketMakerSettingData.coinList && marketMakerSettingData.coinList.coins && marketMakerSettingData.coinList.coins.data && marketMakerSettingData.coinList.coins.data.map((m, index) => {
                        return (
                          <option value={m.coin}>{m.coin}</option>
                        )
                      })}
                    </select>
                </div>
                <div className={styles.tableContentHeaderMarketName}>
                    <span>Market Name</span>
                    <input className={styles.input + ' ' + styles.marketNameInput} name="marketName" value={this.state.marketName} onChange={this.changeState.bind(this)}/>
                </div>
                <Button className={styles.tableContentHeaderSaveBtn + " small blue"} style={{width: 100 + 'px'}} onClick={this.saveMarketMaker.bind(this)}>Save</Button>
            </div>
            <div>
              {$marketMakerTable}
              {/* <Table>
                {$tableHead}
                {$tableOneRow}
              </Table> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  marketMakerSettingData: state.marketMakerSetting,
  setupDetailsData: state.setupDetails
});

const mapDispatchToProps = {
  getExchangeList,
  getCoinList,
  baseCoins,
  getMarketMakerList,
  addMarketMaker,
  getMarketMakerTradeList
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketMakerSetting);
