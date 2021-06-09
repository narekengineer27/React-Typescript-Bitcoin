import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import SmallToggle from 'Elements/SmallToggle';
import { startLoop, getMarketMakerBalance, updateMarketMakerTrade, addMarketMakerTrade } from 'Components/MarketMakerSetting/actions';
import Toggle from 'react-toggle';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';
import CustomText from 'Elements/CustomText';

var Line = require('rc-progress').Line;

// var FontAwesome = require('react-fontawesome');

const styles = require('./market-maker.css');

class MarketMakerOneRow extends React.Component<any, any> {


    constructor(props) {
        super(props);
        this.state = {
          mode: true,
          buysellmode: true,
          buyPriceMode: '',
          sellPriceMode: '',
          spreadMode: '',
          prevTotalMode: true,
          buyQuantityRangeTo: 200,
          buyQuantityRangeFrom: 0,
          buyQuantityRangeStatus: '',
          buyQuantityActive: '',
          buyPriceBelowLAsk: '',
          buyPriceSpecific: '',
          buyPriceActive: '',
          spread: '',
          horizontalSpreadPercentage: '',
          horizontalSpreadFixed: '',
          verticalSpreadPercentage: '',
          verticalSpreadFixed: '',
          sellQuantityRangeTo: 200,
          sellQuantityRangeFrom: 0,
          sellQuantityRangeStatus: '',
          sellQuantityActive: '',
          sellPriceBelowLAsk: '',
          sellPriceSpecific: '',
          sellPriceActive: '',
          loopCount: '',
          endofloop: ''
        };
        // this.changeInputState = this.changeInputState.bind(this);
    }

    componentDidMount() {
        // const { mode } = this.props;
        // this.setState({
        //     mode: mode
        // });
    }

    componentWillUpdate(nextProps) {
        const { mode } = this.props;

        if(mode != this.state.prevTotalMode){
            this.setState({
                mode: mode
            });
            this.setState({prevTotalMode: mode});
        }
    }

    changeMode() {
        var mode = this.state.mode;
        this.setState(
            {
                mode: !mode
            }
        );
    }

    changeBuySellMode() {
        var buysellmode = this.state.buysellmode;
        this.setState(
            {
                buysellmode: !buysellmode
            }
        );
    }

    changeBuyPriceMode(mode: any) {
        this.setState(
            {
                buyPriceMode: mode
            }
        );
    }

    changeSellPriceMode(mode: any) {
        this.setState(
            {
                sellPriceMode: mode
            }
        );
    }

    changeSpreadMode(mode: any) {
        this.setState(
            {
                spreadMode: mode
            }
        );
    }

    changeInputState(ev) {
        var returnObj = {};
        returnObj[ev.target.name] = ev.target.value;

        this.setState(returnObj);
    }

    deleteTrade() {

    }

    saveTrade() {
        const { trade, addMarketMakerTrade, updateMarketMakerTrade, marketmaker} = this.props;
        var data = {};
        if(Object.keys(trade).length < 1) {
            data = {
                buy_qty_from: 100,
                buy_qty_to: 50,
                buy_below_lowest_ask: 50,
                buy_specific_price: 50,
                buy_spread_per: 20,
                buy_spread_fixed: 100,
                sell_qty_from: 100,
                sell_qty_to: 200,
                sell_above_highest_bid: 12,
                sell_specific_price: 500,
                market_maker_id: marketmaker.id,
            };

            addMarketMakerTrade(data);
        } else {
            data = {
                buy_qty_from:200,
                buy_qty_to:500,
                buy_below_lowest_ask:500,
                buy_specific_price:500,
                buy_spread_per:200,
                buy_spread_fixed:1000,
                sell_qty_from:1000,
                sell_qty_to:2000,
                sell_above_highest_bid:2000,
                sell_specific_price:500
            };

            updateMarketMakerTrade(trade.id, data);
        }
    }

    startLoop() {
        const { startLoop, trade } = this.props;
        var data = {
            loop_count: 5,
            ptrade_id: trade && trade.id
        }
        startLoop(data);
    }

    renderParentItem() {
        var snapImage = "/public/assets/images/sellingSnap.png";
        var snapRelationImage = "/public/assets/images/parent.png";

        return (
            <tr className={styles.oneRowWrapper}>
                <td className={styles.headCell}>
                    <img className={styles.snapImage} src={snapImage} />
                    <div className={styles.firstItemWrapper}>
                        <div className={styles.toggleWrapper + ' ' + styles.divSpan1}>
                            <span>Summary</span>
                            <div className={styles.toggle}>
                                <Toggle
                                    disabled={false}
                                    checked={this.state.mode}
                                    icons={false}
                                    className='react-toggle-mr'
                                    onChange={this.changeMode.bind(this)}/>
                            </div>
                            <span>Details</span>
                        </div>

                        <div className={styles.divSpan1 + ' ' + styles.accountPane}>
                            <span>Account</span>
                            <span className={styles.plusIcon + " fa fa-plus fa-1x super-crazy-colors"} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}}></span>
                        </div>

                        <div className={styles.toggleWrapper + ' ' + styles.divSpan1}>
                            <span>Buy</span>
                            <div className={styles.toggle}>
                                <Toggle
                                    disabled={false}
                                    checked={this.state.buysellmode}
                                    icons={false}
                                    className='red-toggle'
                                    onChange={this.changeBuySellMode.bind(this)}/>
                            </div>
                            <span>Sell</span>
                        </div>
                        <div className={styles.coinBalace}>
                            <span className={styles.coinBalaceTitle}>Coin Balance</span>
                            <span>0123456789</span>
                        </div>
                    </div>
                    <img className={styles.snapRelationImage} src={snapRelationImage} />
                </td>
                <td className={styles.headCell}>
                    <div className={this.state.mode? '' : styles.summary}>
                        <div className={styles.divSpan}>
                            <CustomText className="medium" type="number" value={this.state.buyQuantityRangeFrom} onChange={this.changeInputState.bind(this)} name="buyQuantityRangeFrom" label="From"/>
                        </div>
                        <div className={styles.divSpan}>
                            <CustomText className="medium" type="number" value={this.state.buyQuantityRangeTo} onChange={this.changeInputState.bind(this)} name="buyQuantityRangeTo" label="To"/>
                        </div>
                        <div className={styles.divSpan}>
                            <span>Status: </span>
                            <span className={styles.checkedStatus + " fa fa-check fa-1x super-crazy-colors"} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}}></span>
                        </div>
                        <div className={styles.divSpan}>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} value={this.state.buyQuantityRangeStatus} onChange={this.changeInputState.bind(this)} name="buyQuantityRangeStatus"/>
                        </div>
                        <Line  className={styles.divSpan + ' ' + styles.progressBar} percent="60" strokeWidth="8" trailWidth="8" strokeColor="green" />
                        <div className={styles.divSpan}>
                            <label className={styles.activeSpan}>Active Quantity: </label>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} type="number" value={this.state.buyQuantityActive} onChange={this.changeInputState.bind(this)} name="buyQuantityActive"/>
                        </div>
                    </div>
                    <div className={this.state.mode? styles.summary: ''}>
                        <div className={styles.divSpan}>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} value={this.state.buyQuantityActive} onChange={this.changeInputState.bind(this)} name="buyQuantityActive" />
                        </div>
                        <Line  className={styles.divSpan + ' ' + styles.progressBar} percent="60" strokeWidth="8" trailWidth="8" strokeColor="green" />
                    </div>
                </td>
                <td className={styles.headCell + ' ' + styles.quantityCell}>
                    <div className={this.state.mode? '' : styles.summary}>
                        <div className={styles.divSpan}>
                            <span className={(this.state.buyPriceMode == 0) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeBuyPriceMode(0)}></span>
                            <span className={styles.fontSpan}>Lowest Ask</span>
                        </div>
                        <div className={styles.divSpan + ' ' + styles.optionsItem}>
                            <span className={(this.state.buyPriceMode == 1) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeBuyPriceMode(1)}></span>
                            {/* <span className={styles.fontSpan}>%below lowest ask</span> */}
                            <div className={styles.priceInputWrapper}>
                                <CustomText smallLabel value={this.state.buyPriceBelowLAsk} onChange={this.changeInputState.bind(this)} name="buyPriceBelowLAsk" label="%below lowest ask"/>
                            </div>
                        </div>
                        <div className={styles.divSpan + ' ' + styles.optionsItem}>
                            <span className={(this.state.buyPriceMode == 2) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeBuyPriceMode(2)}></span>
                            {/* <span className={styles.fontSpan}>Specific Price</span> */}
                            <div className={styles.priceInputWrapper}>
                                <CustomText smallLabel value={this.state.buyPriceSpecific} onChange={this.changeInputState.bind(this)} name="buyPriceSpecific" label="Specific Price"/>
                            </div>
                        </div>
                        <div className={styles.divSpan + ' ' + styles.pl10}>
                            {/* <span className={styles.fontSpan}>Active Price:</span> */}
                            <div className={styles.priceInputWrapper}>
                                <CustomText smallLabel value={this.state.buyPriceActive} onChange={this.changeInputState.bind(this)} name="buyPriceActive" label="Active Price"/>
                            </div>
                        </div>
                      </div>
                      <div className={this.state.mode? styles.summary: ''}>
                        <div className={styles.divSpan}>
                            <div className={styles.priceInputWrapper}>
                                <CustomText className="medium" value={this.state.buyPriceActive} onChange={this.changeInputState.bind(this)} name="buyPriceActive" label="Active Price"/>
                            </div>
                        </div>
                    </div>
                </td>
                <td className={styles.headCell}>
                    <div className={this.state.mode? '' : styles.summary}>
                        <div className={styles.divSpan + ' ' + styles.spreadPane}>
                            <div className={styles.spreadTxt}>
                                <span>Horizontal</span>
                            </div>
                            <div className={styles.optionsItem}>
                                <span className={(this.state.spreadMode == 0) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeSpreadMode(0)}></span>
                                {/* <span className={styles.fontSpan}>Percentage</span> */}
                                <CustomText smallLabel value={this.state.horizontalSpreadPercentage} onChange={this.changeInputState.bind(this)} name="horizontalSpreadPercentage" label="Percentage"/>
                            </div>
                            <div className={styles.optionsItem}>
                                <span className={(this.state.spreadMode == 1) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeSpreadMode(1)}></span>
                                {/* <span className={styles.fontSpan}>Fixed</span> */}
                                <CustomText smallLabel value={this.state.horizontalSpreadFixed} onChange={this.changeInputState.bind(this)} name="horizontalSpreadFixed" label="Fixed"/>
                            </div>
                        </div>
                        <div className={styles.divSpan + ' ' + styles.spreadPane}>
                            <div className={styles.spreadTxt}>
                                <span>Vertical</span>
                            </div>
                            <div className={styles.optionsItem}>
                                <span className={(this.state.spreadMode == 0) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeSpreadMode(0)}></span>
                                {/* <span className={styles.fontSpan}>Percentage</span> */}
                                <CustomText smallLabel value={this.state.verticalSpreadPercentage} onChange={this.changeInputState.bind(this)} name="verticalSpreadPercentage" label="Percentage"/>
                            </div>
                            <div className={styles.optionsItem}>
                                <span className={(this.state.spreadMode == 1) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeSpreadMode(1)}></span>
                                {/* <span className={styles.fontSpan}>Fixed</span> */}
                                <CustomText smallLabel value={this.state.verticalSpreadFixed} onChange={this.changeInputState.bind(this)} name="verticalSpreadFixed" label="Fixed"/>
                            </div>
                        </div>
                        
                    </div>
                    <div className={this.state.mode? styles.summary: ''}>
                        <div className={styles.divSpan}>
                            <div className={styles.priceInputWrapper}>
                                <CustomText className="medium" value={this.state.spread} onChange={this.changeInputState.bind(this)} name="spread" label="Fixed"/>
                            </div>
                        </div>
                    </div>
                </td>
                <td className={styles.headCell}>
                    <div className={this.state.mode? '' : styles.summary}>
                        <div className={styles.divSpan}>
                            {/* <label className={styles.rangeSpan}>From: </label> */}
                            <CustomText className="medium" type="number" value={this.state.sellQuantityRangeFrom} onChange={this.changeInputState.bind(this)} name="sellQuantityRangeFrom" label="From"/>
                        </div>
                        <div className={styles.divSpan}>
                            {/* <label className={styles.rangeSpan}>To: </label> */}
                            <CustomText className="medium" type="number" value={this.state.sellQuantityRangeTo} onChange={this.changeInputState.bind(this)} name="sellQuantityRangeTo" label="To"/>
                        </div>
                        <div className={styles.divSpan}>
                            <span>Status: </span>
                            <span className={styles.uncheckedStatus + " fa fa-times fa-1x super-crazy-colors"} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}}></span>
                        </div>
                        <div className={styles.divSpan}>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} value={this.state.sellQuantityRangeStatus} onChange={this.changeInputState.bind(this)} name="sellQuantityRangeStatus"/>
                        </div>
                        <Line className={styles.divSpan + ' ' + styles.progressBar} percent="60" strokeWidth="8" trailWidth="8" strokeColor="green" />
                        <div className={styles.divSpan}>
                            <label className={styles.activeSpan}>Active Quantity: </label>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} type="number" value={this.state.sellQuantityActive} onChange={this.changeInputState.bind(this)} name="sellQuantityActive"/>
                        </div>
                    </div>
                    <div className={this.state.mode? styles.summary: ''}>
                        <div className={styles.divSpan}>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} value={this.state.sellQuantityActive} onChange={this.changeInputState.bind(this)} name="sellQuantityActive"/>
                        </div>
                        <Line className={styles.divSpan + ' ' + styles.progressBar} percent="60" strokeWidth="8" trailWidth="8" strokeColor="green" />
                    </div>
                </td>
                <td className={styles.headCell + ' ' + styles.quantityCell}>
                    <div className={this.state.mode? '' : styles.summary}>
                        <div className={styles.divSpan}>
                            <span className={(this.state.sellPriceMode == 0) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeSellPriceMode(0)}></span>
                            <span className={styles.fontSpan}>Lowest Ask</span>
                        </div>
                        <div className={styles.divSpan + ' ' + styles.optionsItem}>
                            <span className={(this.state.sellPriceMode == 1) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeSellPriceMode(1)}></span>
                            {/* <span className={styles.fontSpan}>%below lowest ask</span> */}
                            <div className={styles.priceInputWrapper}>
                                <CustomText smallLabel value={this.state.sellPriceBelowLAsk} onChange={this.changeInputState.bind(this)} name="sellPriceBelowLAsk" label="%below lowest ask"/>
                            </div>
                        </div>
                        <div className={styles.divSpan + ' ' + styles.optionsItem}>
                            <span className={(this.state.sellPriceMode == 2) ? styles.activeRadio + " fa fa-circle-o fa-1x super-crazy-colors" : styles.radio + ' fa fa-circle-thin fa-1x super-crazy-colors'} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}} onClick={() => this.changeSellPriceMode(2)}></span>
                            {/* <span className={styles.fontSpan}>Specific Price</span> */}
                            <div className={styles.priceInputWrapper}>
                                <CustomText smallLabel value={this.state.sellPriceSpecific} onChange={this.changeInputState.bind(this)} name="sellPriceSpecific" label="Specific Price"/>
                            </div>
                        </div>
                        <div className={styles.divSpan + ' ' + styles.pl10}>
                            {/* <span className={styles.fontSpan}>Active Price:</span> */}
                            <div className={styles.priceInputWrapper}>
                                <CustomText smallLabel value={this.state.sellPriceActive} onChange={this.changeInputState.bind(this)} name="sellPriceActive" label="Active Price"/>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.mode? styles.summary: ''}>
                        <div className={styles.divSpan}>
                            <div className={styles.priceInputWrapper}>
                                <CustomText className="medium" value={this.state.sellPriceActive} onChange={this.changeInputState.bind(this)} name="sellPriceActive" label="Active Price"/>
                            </div>
                        </div>
                    </div>
                </td>
                <td className={styles.restCellCol}>
                    <div className={this.state.mode? '' : styles.summary}>
                        <Button className={styles.restCellBtn + " small blue"} style={{width: 120 + 'px'}} onClick={this.startLoop.bind(this)}>START LOOP</Button>
                        <div className={styles.restLoopCount + ' ' + styles.divSpan}>
                            <span>Loop Count</span>
                            <input className={styles.input + ' ' + styles.loopCountInput} value={this.state.loopCount} onChange={this.changeInputState.bind(this)} name="loopCount"/>
                        </div>
                        <div className={styles.divSpan}>
                            <select className={styles.restSelect} value={this.state.endofloop} onChange={this.changeInputState.bind(this)} name="endofloop">
                                <option value="" disabled selected>End of loop</option>
                                <option value="hurr">Durr</option>
                            </select>
                        </div>
                        <Button className={styles.restCellBtn + " small red"}  style={{width: 120 + 'px'}} onClick={this.deleteTrade.bind(this)}>Delete</Button>
                        {/* <Button className={styles.restCellBtn + " small blue"}  style={{width: 120 + 'px'}} onClick={this.saveTrade.bind(this)}>SAVE</Button> */}
                    </div>
                    <div className={this.state.mode? styles.summary: ''}>
                        <Button className={styles.restCellBtn + " small red"}  style={{width: 120 + 'px'}} onClick={this.deleteTrade.bind(this)}>Delete</Button>
                        <Line className={styles.divSpan + ' ' + styles.progressBar1} percent="60" strokeWidth="8" trailWidth="8" strokeColor="green" />
                    </div>
                </td>
            </tr>
        );
    }

    renderChildItem() {
        var snapImage = "/public/assets/images/buyingSnap.png";
        var snapRelationImage = "/public/assets/images/child.png";

        return (
            <tr className={styles.oneRowWrapper}>
                <td className={styles.headCell}>
                    <img className={styles.snapImage} src={snapImage} />
                    <div className={styles.firstItemWrapper}>
                        <div className={styles.divSpan1 + ' ' + styles.accountPane}>
                            <span>Account</span>
                            <span className={styles.plusIcon + " fa fa-plus fa-1x super-crazy-colors"} style={{textShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 0px;'}}></span>
                        </div>
                    </div>
                    <img className={styles.snapRelationImage} src={snapRelationImage} />
                </td>
                <td className={styles.headCell}>
                    <div>
                        <div className={styles.divSpan}>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} value={this.state.buyQuantityActive} onChange={this.changeInputState.bind(this)} name="buyQuantityActive" />
                        </div>
                        <Line  className={styles.divSpan + ' ' + styles.progressBar} percent="60" strokeWidth="8" trailWidth="8" strokeColor="green" />
                    </div>
                </td>
                <td className={styles.headCell + ' ' + styles.quantityCell}>
                    <div>
                        <div className={styles.divSpan}>
                            <div className={styles.priceInputWrapper}>
                                <CustomText className="medium" value={this.state.buyPriceActive} onChange={this.changeInputState.bind(this)} name="buyPriceActive" label="Active Price"/>
                            </div>
                        </div>
                    </div>
                </td>
                <td className={styles.headCell}>
                    <div>
                        <div className={styles.divSpan}>
                            <div className={styles.priceInputWrapper}>
                                <CustomText className="medium" value={this.state.spread} onChange={this.changeInputState.bind(this)} name="spread" label="Active Price"/>
                            </div>
                        </div>
                    </div>
                </td>
                <td className={styles.headCell}>
                    <div>
                        <div className={styles.divSpan}>
                            <input className={styles.rangeLargeInput + ' ' + styles.input} value={this.state.sellQuantityActive} onChange={this.changeInputState.bind(this)} name="sellQuantityActive"/>
                        </div>
                        <Line className={styles.divSpan + ' ' + styles.progressBar} percent="60" strokeWidth="8" trailWidth="8" strokeColor="green" />
                    </div>
                </td>
                <td className={styles.headCell + ' ' + styles.quantityCell}>
                    <div>
                        <div className={styles.divSpan}>
                            <div className={styles.priceInputWrapper}>
                                <CustomText className="medium" value={this.state.sellPriceActive} onChange={this.changeInputState.bind(this)} name="sellPriceActive" label="Active Price"/>
                            </div>
                        </div>
                    </div>
                </td>
                <td className={styles.restCellCol}>
                    <div>
                        <Button className={styles.restCellBtn + " small red"}  style={{width: 120 + 'px'}} onClick={this.deleteTrade.bind(this)}>Delete</Button>
                    </div>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <tbody>
                {
                    this.renderParentItem()
                }
                {
                    this.renderChildItem()
                }
                {
                    this.renderChildItem()
                }
                {
                    this.renderChildItem()
                }
                {
                    this.renderChildItem()
                }
                {
                    this.renderChildItem()
                }
                {
                    this.renderChildItem()
                }
                {
                    this.renderChildItem()
                }
                {
                    this.renderChildItem()
                }
            </tbody>
        );
    }
}


const mapStateToProps = state => ({
    marketMakerSettingData: state.marketMakerSetting,
    setupDetailsData: state.setupDetails
});

const mapDispatchToProps = {
    addMarketMakerTrade,
    updateMarketMakerTrade,
    getMarketMakerBalance,
    startLoop
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketMakerOneRow);
