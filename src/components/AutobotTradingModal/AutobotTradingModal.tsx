import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Select from 'react-select';
import { Tab, Tabs,  TabList, TabPanel } from 'react-tabs';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Price from 'Elements/Price';
import Button from 'Elements/Button';
import Toggle from 'react-toggle';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import SelectField from 'Elements/SelectField';
import { TableCell, Table, TableRow } from 'Elements/Table';
import SortingIcons from 'Elements/SortingIcons';
import ReactIScroll from 'react-iscroll';
import * as iScroll from 'iscroll';
import { getSingleTrades, sellOrder, buyOrder } from 'Components/AutobotTradingModal/actions';
import { fetchExchangeBalance } from 'Components/AutobotSettingModal/actions';
import { history } from 'Components/Routes';

const styles = require('./autobot-trading-modal.css');

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
    label: 'Current / Sold Price',
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
  
class AutobotTradingModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false,
            presetSelectedValue: '',
            isInitCountdown: true
        };
        this.timer = this.timer.bind(this);
        this.timer1 = this.timer1.bind(this);
        this.initCountdown = this.initCountdown.bind(this);
        this.buyOrder = this.buyOrder.bind(this);
        this.sellOrder = this.sellOrder.bind(this);
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 20000);
        var intervalId1 = setInterval(this.timer1, 1000);
        // store intervalId in the state so it can be accessed later:
        this.setState({
            intervalId: intervalId,
            intervalId1: intervalId1
        });
    }

    componentWillMount() {
        const { getSingleTrades, trades, exchangeId, traderSetupData, fetchExchangeBalance } = this.props;

        fetchExchangeBalance();
        var setupdetails = traderSetupData.setupDetails.data.setupDetails[0];
        var exchangeIds = traderSetupData.setupDetails.data.setupDetails[0].autobot_exchange_account_ids;
        getSingleTrades(exchangeIds[0]);
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
        clearInterval(this.state.intervalId1);
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

    initCountdown(data) {
        this.setState({
            isInitCountdown: false,
            timestamp: data[0].timestamp
        });
    }

    timer() {
        const { getSingleTrades, exchangeId, traderSetupData } = this.props;
        var setupdetails = traderSetupData.setupDetails.data.setupDetails[0];
        var exchangeIds = traderSetupData.setupDetails.data.setupDetails[0].autobot_exchange_account_ids;
        getSingleTrades(exchangeIds[0]);
    }

    timer1() {
        if(this.state.timestamp > 0) {
            var timestamp = this.state.timestamp - 1;
            this.setState({
                timestamp: timestamp
            })
        } else {

        }
    }

    handleChange() {

    }

    changeSettingMode() {

    }

    onSubmit(values) {

    }

    sort(field: string, decreasing: boolean = false) {
        return () => {
          
          // this.refresh(this.props.meta);
        };
    }

    getTradeData(data) {
        var firstData = [];
        var secondData = [];

        var profit24hours = 0;
        var profit24hourspercent = 0;
        var boughtprice24hours = 0;
        var soldprice24hours = 0;
        var profitover24hours = 0;
        var boughtCount = 0;

        data[0].map((m, index1) => {
            if(m.order_type == "buy" && !m.is_open) {
                boughtCount ++;
                var sold_quantity = 0;
                data[0].map((n, index2) => {
                    if(n.parent_trade_id == m.id && n.order_type == "sell") {
                        sold_quantity += n.quantity;
                    }
                })

                if(m.quantity > sold_quantity) {
                    firstData.push(m);
                }
            } else {
                firstData.push(m);
            }
        })

        data[0].map((m, index1) => {
            if(m.order_type == "sell" && !m.is_open) {
                profit24hours += (m.current_price - m.price) * m.quantity;
                boughtprice24hours += m.price * m.quantity;
                soldprice24hours += m.current_price * m.quantity;
            }
        })

        profit24hourspercent = (soldprice24hours - boughtprice24hours) / boughtprice24hours * 100;
        data[1].map((m, index1) => {
            if(m.order_type == "buy" && !m.is_open) {
                var sold_quantity = 0;
                data[1].map((n, index2) => {
                    if(n.parent_trade_id == m.id && n.order_type == "sell") {
                        sold_quantity += n.quantity;
                    }
                })

                if(m.quantity > sold_quantity) {
                    secondData.push(m);
                }
            } else {
                secondData.push(m);
            }
        })

        data[1].map((m, index1) => {
            if(m.order_type == "sell" && !m.is_open) {
                profitover24hours += (m.current_price - m.price) * m.quantity;
            }
        })

        return [firstData, secondData, profit24hours, profitover24hours, profit24hourspercent, boughtCount];
    }

    getCountdown(timestamp) {
        var second = timestamp % 60 < 10 ? '0' + timestamp % 60 : timestamp % 60;
        var min = Math.floor(timestamp / 60) % 60 < 10 ? '0' + Math.floor(timestamp / 60) % 60 : Math.floor(timestamp / 60) % 60;
        var hours = Math.floor(timestamp / 3600) % 24 < 10 ? '0' + Math.floor(timestamp / 3600) % 24 : Math.floor(timestamp / 3600) % 24;
        var day = Math.floor(timestamp / 3600 / 24) < 10 ? '0' + Math.floor(timestamp / 3600 / 24) : Math.floor(timestamp / 3600 / 24);
        var countdown = day + ':' + hours + ':' + min + ':' + second;
        return countdown;
    }

    buyOrder(item) {
        const { buyOrder } = this.props;
        buyOrder(item);
    }

    sellOrder(item) {
        const { sellOrder } = this.props;
        sellOrder(item);
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

        if(autobotExchanges.length && this.state.isInitCountdown) {
            this.initCountdown(autobotExchanges);
        }

        var $trades = trades && trades.data && trades.data.trades ? this.getTradeData(trades.data.trades) : [];
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
                    <TableCell className={styles.price_bought + ' ' + ((s.order_type=='buy') ? styles.blue : ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red))}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price}</Price></div>
                            {/* <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price*$usd} $</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + ((s.order_type=='buy') ? styles.blue : ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red))}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price}</Price></div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price*$usd} $</Price></div>
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + ((s.order_type=='buy') ? styles.blue : ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red))}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{(s.current_price-s.price)/s.current_price*100} %</Price></div>
                            {/* <div><Price diff={0.003}>{0.000003}</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit}>
                    {
                        s.order_type=='buy' ? (s.is_open ? (<div className={styles.blue}>
                            Buy Order
                        </div>) : (<div className={styles.blue}>
                            Bought
                        </div>)) : (s.is_open ? (<div className={styles.orange}>
                            Sell Order
                        </div>) : (<div className={((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red)}>
                            Sold
                        </div>))
                    }
                    </TableCell>
                    <TableCell className={styles.profit}>
                        <div>
                            {
                                s.order_type=='buy' ? (s.is_open ? (<Button className={styles.btn + " medium blue"} onClick={() => this.buyOrder(s.id)}>Buy</Button>) : (<Button className={styles.btn + " medium red"} onClick={() => this.sellOrder(s.id)}>Sell</Button>)) : ''
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
                    <TableCell className={styles.price_bought + ' ' + ((s.order_type=='buy') ? styles.blue : ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red))}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price}</Price></div>
                            {/* <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.price*$usd} $</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + ((s.order_type=='buy') ? styles.blue : ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red))}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price}</Price></div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{s.current_price*$usd} $</Price></div>
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit + ' ' + ((s.order_type=='buy') ? styles.blue : ((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red))}>
                        <div>
                            <div><Price diff={(s.current_price-s.price)/s.current_price*100}>{(s.current_price-s.price)/s.current_price*100} %</Price></div>
                            {/* <div><Price diff={0.003}>{0.000003}</Price></div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.profit}>
                    {
                        s.order_type=='buy' ? (s.is_open ? (<div className={styles.blue}>
                            Buy Order
                        </div>) : (<div className={styles.blue}>
                            Bought
                        </div>)) : (s.is_open ? (<div className={styles.orange}>
                            Sell Order
                        </div>) : (<div className={((((s.current_price-s.price)/s.current_price) > 0) ? styles.green : styles.red)}>
                            Sold
                        </div>))
                    }
                    </TableCell>
                    <TableCell className={styles.profit}>
                        <div>
                            {
                                s.order_type=='buy' ? (s.is_open ? (<Button className={styles.btn + " medium blue"} onClick={() => this.buyOrder(s.id)}>Buy</Button>) : (<Button className={styles.btn + " medium red"} onClick={() => this.sellOrder(s.id)}>Sell</Button>)) : ''
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

        var options = [];

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
                <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                <div className={styles.title}>
                    <img className={styles.topImage} src="/public/assets/images/landing1/xrAsset.png"/>
                    <span>AUTOBOT TRADING</span>
                </div>
                <div className={styles.leftdescription}>
                    <div className={styles.firstText}>
                        {$trades && $trades[5] + ' of ' + autobotSetting['autobot_entry_value'] + ' Max Positions'}
                    </div>
                    <div className={styles.secondText}>
                        {'24hour profit : ' + $trades[2] + ' BTC ($' + $trades[2]*$usd + ')'}
                    </div>                                
                </div>
                <div className={styles.exchange}>
                    <img src="/public/assets/images/landing/blue-circle.png" className={styles.spinImage} />
                    <div className={styles.spinImagePercent}>
                        <div className={styles.exchangeText}>{autobotExchanges && autobotExchanges[0].exchange && autobotExchanges[0].exchange}</div>
                        <div>{$trades[4] && (Math.floor($trades[4] * 100) / 100 + '%')}</div>
                        {/* <div className={styles.exchangeText}>{(exchangeAccount && exchangeAccount.balance && exchangeAccount.balance.Balance && exchangeAccount.balance.Balance) + ' ' + (exchangeAccount && exchangeAccount.balance && exchangeAccount.balance.Currency && exchangeAccount.balance.Currency)}</div> */}
                        <div className={styles.countdownWrapper}>
                            <span>{this.getCountdown(this.state.timestamp)}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.row}>
                        <div className={styles.rightText}>
                            <p>Exit :</p>
                            <p>Stop Loss :</p>
                            <p>Amount Per Trade :</p>
                            <p>Basecoin :</p>
                        </div>
                        <div className={styles.leftText}>
                            <p>{Math.floor(autobotSetting['autobot_exit_value']*100)/100 + '% ' + autobotSetting['autobot_exit_type'] + 'Profit'}</p>
                            <p>{Math.floor(autobotSetting['autobot_stoploss_value']*100)/100 + '% ' + autobotSetting['autobot_stoploss_type'] + 'Stop Loss'}</p>
                            <p>{Math.floor(autobotSetting['autobot_amount_per_trade']*1000000)/1000000 + ' btc'}</p>
                            <p>{autobotSetting['autobot_basecoin']}</p>
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
                    {/* <Table id={styles.tradesTable}>
                        <TableRow>
                            {$fields}
                        </TableRow>
                        <div className={($trades && $trades.length ? styles.tbody : styles.noDataBody) + ' ' + (hasScrollbar ? '' : styles.noScrollbar)}>
                            {$scrollableTable}
                        </div>
                    </Table> */}
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
    getSingleTrades,
    fetchExchangeBalance,
    buyOrder,
    sellOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(AutobotTradingModal);
