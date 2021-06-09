import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import { Tab, Tabs,  TabList, TabPanel } from 'react-tabs';
import { Table, TableRow, TableCell } from 'Elements/Table';
import ReactIScroll from 'react-iscroll';
import * as iScroll from 'iscroll';
import SortingIcons from 'Elements/SortingIcons';
import Price from 'Elements/Price';
import { fetchExchangeBalance } from 'Components/AutobotSettingModal/actions';
import { getMultiTrades } from 'Components/AutobotTradingModal/actions';
import { history } from 'Components/Routes';

const styles = require('./autobot.css');

const iScrollOptions = require('Constants/options.json').iScroll;

const fields = [{
    name: 'coin',
    label: 'Coin',
    sortable: false,
  }, {
    name: 'qty',
    label: 'Quantity',
    sortable: false,
  }, {
    name: 'price',
    label: 'Price',
    sortable: false,
  }, {
    name: 'current_price',
    label: 'Current Price',
    sortable: false,
  }, {
    name: 'margin',
    label: 'Margin',
    sortable: false,
  }, {
    name: 'status',
    label: 'Status',
    sortable: false,
  }, {
    name: 'action',
    label: 'Action',
    sortable: false,
  }];

class ExchangePoolModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
        this.timer = this.timer.bind(this);
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 20000);
        // store intervalId in the state so it can be accessed later:
        this.setState({
            intervalId: intervalId
        });
    }

    componentWillMount() {
        const { getSingleTrades, trades, exchangeId, traderSetupData, fetchExchangeBalance } = this.props;

        fetchExchangeBalance();
        var setupdetails = traderSetupData.setupDetails.data.setupDetails[0];
        var exchangeIds = traderSetupData.setupDetails.data.setupDetails[0].autobot_exchange_account_ids;
        getMultiTrades(exchangeIds);
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    getAutobotSetting(setupdetails) {
        var values = {};

        if(setupdetails.number_of_trades != 0) {
            values['autobot_entry_type'] = 'Basic';
            values['autobot_entry_value'] = Math.floor(setupdetails.number_of_trades*100)/100;
        }

        if(setupdetails.entry_position_max_percentage != 0) {
            values['autobot_entry_type'] = 'Position Max';
            values['autobot_entry_value'] = Math.floor(setupdetails.entry_position_max_percentage*100)/100;
        }

        if(setupdetails.entry_multiexch_max_percentage != 0) {
            values['autobot_entry_type'] = 'Multi Exchange Max';
            values['autobot_entry_value'] = Math.floor(setupdetails.entry_multiexch_max_percentage*100)/100;
        }


        if(setupdetails.exit_fixed_percentage != 0) {
            values['autobot_exit_type'] = 'Fixed';
            values['autobot_exit_value'] = Math.floor(setupdetails.exit_fixed_percentage*100)/100;
        }

        if(setupdetails.exit_trailing_percentage != 0) {
            values['autobot_exit_type'] = 'Trailing';
            values['autobot_exit_value'] = Math.floor(setupdetails.exit_trailing_percentage*100)/100;
        }

        if(setupdetails.exit_smart_percentage != 0) {
            values['autobot_exit_type'] = 'Smart Floating';
            values['autobot_exit_value'] = Math.floor(setupdetails.exit_smart_percentage*100)/100;
        }

        
        if(setupdetails.stop_fixed_percentage != 0) {
            values['autobot_stoploss_type'] = 'Fixed';
            values['autobot_stoploss_value'] = Math.floor(setupdetails.stop_fixed_percentage*100)/100;
        }

        if(setupdetails.stop_trailing_percentage != 0) {
            values['autobot_stoploss_type'] = 'Trailing';
            values['autobot_stoploss_value'] = Math.floor(setupdetails.stop_trailing_percentage*100)/100;
        }

        if(setupdetails.stop_weakmax_percentage != 0) {
            values['autobot_stoploss_type'] = 'Weak Max';
            values['autobot_stoploss_value'] = Math.floor(setupdetails.stop_weakmax_percentage*100)/100;
        }

        if(setupdetails.stop_nostoploss_percentage != 0) {
            values['autobot_stoploss_type'] = 'No Stop Loss';
            values['autobot_stoploss_value'] = Math.floor(setupdetails.stop_nostoploss_percentage*100)/100;
        }
        
        values['autobot_amount_per_trade'] = Math.floor(setupdetails.autobot_amount_per_trade*1000000)/1000000;
        values['autobot_basecoin'] = setupdetails.autobot_basecoin;
        values['autobot_time'] = setupdetails.autobot_time;
        values['autobot_billing']= Math.floor(setupdetails.autobot_billing*100)/100;

        return values;
    }
    
    timer() {
        const { getMultiTrades, exchangeId, traderSetupData } = this.props;
        var setupdetails = traderSetupData.setupDetails.data.setupDetails[0];
        var exchangeIds = traderSetupData.setupDetails.data.setupDetails[0].autobot_exchange_account_ids;
        getMultiTrades(exchangeIds);
    }

    sort(field: string, decreasing: boolean = false) {
        return () => {
          
          // this.refresh(this.props.meta);
        };
    }
    
    render() {
        const { isOpen, onCancel, width, trades, exchangeAccounts, traderSetupData } = this.props;

        var setupdetails = traderSetupData.setupDetails.data.setupDetails[0];
        var exchangeIds = traderSetupData.setupDetails.data.setupDetails[0].autobot_exchange_account_ids;

        var autobotSetting = this.getAutobotSetting(setupdetails);
        
        const onIncreasing = ((field: string) => {
            return this.sort(field);
        }).bind(this);

        const onDecreasing = ((field: string) => {
            return this.sort(field, true);
        }).bind(this);
      
        var autobotExchanges = [];

        if(exchangeAccounts && exchangeAccounts.data && exchangeAccounts.data.exchangeDetails) {
            exchangeAccounts.data.exchangeDetails.map((m, index) => {
                exchangeIds.map((k, index) => {
                    if(m.id == k) {
                        autobotExchanges.push(m);
                    }
                })
            })
        } else {
            if(isOpen && exchangeAccounts && exchangeAccounts.status && (exchangeAccounts.status.success || exchangeAccounts.status.error)) {
                history.push('/setup-details/traders');
            }
        }

        var $trades = trades && trades.data && trades.data.trades ? trades.data.trades: [];
        var $usd = trades && trades.data && trades.data.usd_price && trades.data.usd_price.price ? trades.data.usd_price.price : 0;
      
        const $fields = fields.map(field => {
            return (
                <TableCell header key={field.name} className={styles[field.name]}>
                    <div className="full-width">{field.label}
                        <div className="vertical-center">
                        {field.sortable && <SortingIcons
                            primary={false}
                            onIncreasing={onIncreasing(field.name)}
                            onDecreasing={onDecreasing(field.name)}
                        />}
                        </div>
                    </div>
                </TableCell>
            );
        });
        const $tradesIn24hoursList = $trades && $trades[0] && $trades[0].length > 0 ?
            $trades[0].map((s, index) => {
                return (
                <TableRow key={'row' + index}>
                    <TableCell className={styles.created_at + ' ' + styles.created_at_content}>
                        <div>
                            {s.target_coin_id}
                        </div>
                    </TableCell>
                    <TableCell className={styles.pair}>
                        <div>
                            {s.quantity}
                            {/* <div className="blue">{s.exchange.toUpperCase()}</div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.price_bought + ' ' + (((s.current_price-s.price)/s.current_price > 0) ? styles.green : styles.red)}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price}</Price></div>
                            {/* <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price*$usd} $</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + (((s.current_price-s.price)/s.current_price > 0) ? styles.green : styles.red)}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price}</Price></div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price*$usd} $</Price></div>
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red)}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{(s.current_price-s.price)/s.current_price*100} %</Price></div>
                            {/* <div><Price diff={0.003}>{0.000003}</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit}>
                    {
                        s.order_type=='buy' ? (s.is_open ? (<div className={styles.blue}>
                            Buy Order
                        </div>) : (<div className={styles.green}>
                            Bought
                        </div>)) : (s.is_open ? (<div className={styles.orange}>
                            Sell Order
                        </div>) : (<div className={styles.red}>
                            Sold
                        </div>))
                    }
                    </TableCell>
                    <TableCell className={styles.profit}>
                        <div>
                            {
                                s.order_type=='buy' ? (s.is_open ? (<Button className={styles.btn + " medium blue"}>Buy</Button>) : (<Button className={styles.btn + " medium red"}>Sell</Button>)) : ''
                            }
                        </div>
                    </TableCell>
                </TableRow>
                );
            }) : (
            <div className={'no-data ' + styles.noDataWrapper}>
                There is currently no data here
            </div>
            );

            const hasIn24hoursScrollbar = $trades && $trades[0] && $trades[0].length > 3;
            const $scrollableIn24hoursTable = hasIn24hoursScrollbar ? (
            <ReactIScroll
                iScroll={iScroll}
                options={iScrollOptions}
            >
                <div>
                {$tradesIn24hoursList}
                </div>
            </ReactIScroll>
            ) : <div>{$tradesIn24hoursList}</div>;


        const $tradesOut24hoursList = $trades && $trades[1] && $trades[1].length > 0 ?
            $trades[1].map((s, index) => {
                return (
                <TableRow key={'row' + index}>
                    <TableCell className={styles.created_at + ' ' + styles.created_at_content}>
                        <div>
                            {s.target_coin_id}
                        </div>
                    </TableCell>
                    <TableCell className={styles.pair}>
                        <div>
                            {s.quantity}
                            {/* <div className="blue">{s.exchange.toUpperCase()}</div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.price_bought + ' ' + (((s.current_price-s.price)/s.current_price > 0) ? styles.green : styles.red)}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price}</Price></div>
                            {/* <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price*$usd} $</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + (((s.current_price-s.price)/s.current_price > 0) ? styles.green : styles.red)}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price}</Price></div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price*$usd} $</Price></div>
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red)}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{(s.current_price-s.price)/s.current_price*100} %</Price></div>
                            {/* <div><Price diff={0.003}>{0.000003}</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit}>
                    {
                        s.order_type=='buy' && s.is_open && (<div className={styles.blue}>
                            Buy Order
                        </div>)
                    }
                    {
                        s.order_type=='buy' && !s.is_open && (<div className={styles.green}>
                            Bought
                        </div>)
                    }
                    {
                        s.order_type=='sell' && s.is_open && (<div className={styles.orange}>
                            Sell Order
                        </div>)
                    }
                    {
                        s.order_type=='sell' && !s.is_open && (<div className={styles.red}>
                            Sold
                        </div>)
                    }
                    </TableCell>
                    <TableCell className={styles.profit}>
                        <div>
                            {
                                s.order_type=='buy' && s.is_open && (<Button className={styles.btn + " medium blue"}>Buy</Button>)
                            }
                            {
                                s.order_type=='buy' && !s.is_open && (<Button className={styles.btn + " medium red"}>Sell</Button>)
                            }
                        </div>
                    </TableCell>
                </TableRow>
                );
            }) : (
            <div className={'no-data ' + styles.noDataWrapper}>
                There is currently no data here
            </div>
            );

        const hasOut24hoursScrollbar = $trades && $trades[1] && $trades[1].length > 3;
        const $scrollableOut24hoursTable = hasOut24hoursScrollbar ? (
            <ReactIScroll
                iScroll={iScroll}
                options={iScrollOptions}
            >
                <div>
                {$tradesOut24hoursList}
                </div>
            </ReactIScroll>
        ) : <div>{$tradesOut24hoursList}</div>;


        return (
                <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>
                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                    <div className={styles.text}>Exchange Pool AutoBot</div>
                    <div className={styles.stateWrapper}>
                        <div className={styles.state}>
                            <div className={styles.row}>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/red-circle.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.down}></div>
                                            <div className={styles.red}>100%</div>
                                            <div className={styles.btc+ ' '+ styles.red}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                                <div className={styles.state_item}>
                                    <div className={styles.state_spinImagePercent}>
                                        <img src="/public/assets/images/landing/blue-circle1.png" className={styles.spinImage} />
                                        <div className={styles.spinImagePercent}>
                                            <div className={styles.up}></div>
                                            <div className={styles.green}>100%</div>
                                            <div className={styles.btc}>0.000000015 Btc</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>Exchange Name</div>
                                </div>
                            </div>
                        </div>
                    </div>               
                    
                    <div className={styles.divide}></div>
                        <div className={styles.content}>
                            <div className={styles.leftdescription}>
                            <div className={styles.firstText}>
                                5 of 12 Max Positions
                            </div>
                            <div className={styles.secondText}>
                                24hour profit : 0.1BTC( $601)
                            </div>                                
                        </div>
                        <div className={styles.exchange}>
                            <img src="/public/assets/images/landing/blue-circle.png" className={styles.spinImage} />
                            <div className={styles.spinImagePercent}>
                                <div className={styles.exchangeText}>EXCHANGE NAME</div>
                                <div>5%</div>
                                <div className={styles.exchangeText}>0.000000015 Btc</div>
                            </div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.row}>
                                <div className={styles.rightText}>
                                    <p>Exit :</p>
                                    <p>Stopless :</p>
                                    <p>Amount Per Trade :</p>
                                    <p>Basecoin :</p>
                                </div>
                                <div className={styles.leftText}>
                                    <p>5% Trailing Profit</p>
                                    <p>5% Trailing Stop Loss</p>
                                    <p>0.1 btc</p>
                                    <p>Btc</p>
                                </div>                                
                            </div>                            
                        </div>
                        <div className={styles.tableSection}>
                            <Tabs>
                                <TabList className="tradeTabList">
                                    <Tab className="tradeTabItem first">24Hour Trades</Tab>
                                    <Tab className="tradeTabItem">
                                        {false ? <i className={`fa fa-caret-up ${styles.green} ${styles.icon}`} aria-hidden="true"></i> :
                                        <i className={`fa fa-caret-down ${styles.red} ${styles.icon}`} aria-hidden="true"></i>}
                                        7 Days
                                    </Tab>
                                    <Tab className="tradeTabItem">
                                        {true ? <i className={`fa fa-caret-up ${styles.green} ${styles.icon}`} aria-hidden="true"></i> :
                                        <i className={`fa fa-caret-down ${styles.red} ${styles.icon}`} aria-hidden="true"></i>}
                                        14 Days
                                    </Tab>
                                    <Tab className="tradeTabItem">
                                        {true ? <i className={`fa fa-caret-up ${styles.green} ${styles.icon}`} aria-hidden="true"></i> :
                                        <i className={`fa fa-caret-down ${styles.red} ${styles.icon}`} aria-hidden="true"></i>}
                                        30 Days
                                    </Tab>
                                    <Tab className="tradeTabItem">
                                        {false ? <i className={`fa fa-caret-up ${styles.green} ${styles.icon}`} aria-hidden="true"></i> :
                                        <i className={`fa fa-caret-down ${styles.red} ${styles.icon}`} aria-hidden="true"></i>}
                                        60 Days
                                    </Tab>
                                    <Tab className="tradeTabItem">
                                        {true ? <i className={`fa fa-caret-up ${styles.green} ${styles.icon}`} aria-hidden="true"></i> :
                                        <i className={`fa fa-caret-down ${styles.red} ${styles.icon}`} aria-hidden="true"></i>}
                                        90 Days
                                    </Tab>
                                    <Tab className="tradeTabItem">
                                        {false ? <i className={`fa fa-caret-up ${styles.green} ${styles.icon}`} aria-hidden="true"></i> :
                                        <i className={`fa fa-caret-down ${styles.red} ${styles.icon}`} aria-hidden="true"></i>}
                                        120 Days
                                    </Tab>
                                    <Tab className="tradeTabItem">
                                        {true ? <i className={`fa fa-caret-up ${styles.green} ${styles.icon}`} aria-hidden="true"></i> :
                                        <i className={`fa fa-caret-down ${styles.red} ${styles.icon}`} aria-hidden="true"></i>}
                                        1 Year
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasIn24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableIn24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasOut24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableOut24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasOut24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableOut24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasOut24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableOut24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasOut24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableOut24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasOut24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableOut24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasOut24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableOut24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                                <TabPanel>
                                    <Table id={styles.tradesTable}>
                                        <TableRow>
                                            {$fields}
                                        </TableRow>
                                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasOut24hoursScrollbar ? '' : styles.noScrollbar)}>
                                            {$scrollableOut24hoursTable}
                                        </div>
                                    </Table>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    trades: state.autobotTrades.singleTrades,
    traderSetupData: state.setupDetails.tradersSetupDetails,
    exchangeAccounts: state.autobotSetting.exchangeAccounts
});

const mapDispatchToProps = {
    getMultiTrades,
    fetchExchangeBalance
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePoolModal);
