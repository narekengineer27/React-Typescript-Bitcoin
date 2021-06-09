import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Select from 'react-select';
import * as moment from 'moment';
import { CSVLink, CSVDownload } from 'react-csv';
import { Status } from 'Models/Status';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import Toggle from 'react-toggle';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import SelectField from 'Elements/SelectField';
import { fetchFilteredHistory } from './actions';
import { TableCell, Table, TableRow } from 'Elements/Table';
import SortingIcons from 'Elements/SortingIcons';
import ReactIScroll from 'react-iscroll';
import * as iScroll from 'iscroll';
import Price from 'Elements/Price';
import DatePicker from 'Elements/DatePicker';
import { exchanges } from '../SetupDetails/actions';

const iScrollOptions = require('Constants/options.json').iScroll;

const styles = require('./autobot-history-modal.css');


const fields = [{
    name: 'date',
    label: (
        <div className={styles.tableHeaderItem}>
            <div>Entry Date & </div>
            <div>Time</div>
        </div>
    ),
    sortable: false,
  }, {
    name: 'preset',
    label: 'Preset',
    sortable: false,
  }, {
    name: 'suggestions',
    label: (
    <div className={styles.tableHeaderItem}>
        <div>Suggestions</div>
        <div>Coin/Exchanges</div>
    </div>
    ),
    sortable: false,
  }, {
    name: 'entry_price',
    label: 'Entry Price',
    sortable: false,
  }, {
    name: 'performance',
    label: (
        <div className={styles.tableHeaderItem}>
            <div>Performance</div>
            <div>[Highest Price Attained]</div>
            <div>Time (Time difference)</div>
        </div>
    ),
    sortable: false,
  }];

const presetoptions = [
    {value: "none", label: "None"},
    {value: "Low Ply 1", label: "Low Ply 1"},
    {value: "Mid Ply 1", label: "Mid Ply 1"},
    {value: "Pacer 2 Ply", label: "Pacer 2 Ply"},
    {value: "High Low Ply 2", label: "High Low Ply 2"},
    {value: "Combo Full Ply", label: "Combo Full Ply"}
];

var exchangeOptions = [];
  
class AutobotHistoryModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAccess: false,
            presetSelectedValue: "none",
            exchangeSelectedValue: '',
            fromTs: 0,
            toTs: moment().valueOf() / 1000
        };
        this.timer = this.timer.bind(this);
        this.getFilteredHistoryData = this.getFilteredHistoryData.bind(this);
    }

    componentDidMount() {
        var intervalId = setInterval(this.timer, 10000);
        // store intervalId in the state so it can be accessed later:
        this.setState({
            intervalId: intervalId
        });
    }

    componentWillMount() {
        const { historyData, fetchFilteredHistory, exchanges } = this.props;
        if(!historyData || !historyData.filteredHistory) {
            fetchFilteredHistory('none');
            exchanges();
        }
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    timer() {
        const { fetchFilteredHistory } = this.props;
        // setState method is used to update the state
        fetchFilteredHistory(this.state.presetSelectedValue);
    }

    handleChange() {

    }

    handlePresetChange(e) {
        const { fetchFilteredHistory } = this.props;

        fetchFilteredHistory(e.value);

        this.setState({
            presetSelectedValue: e.value
        });

    }

    handleExchangeChange(e) {
        // const { fetchFilteredHistory } = this.props;

        // fetchFilteredHistory(e.value);

        this.setState({
            exchangeSelectedValue: e.value
        });

    }

    changeSettingMode() {

    }

    onSubmit(values) {

    }

    onChangeFromDate(date: Date) {
        var ts = moment(date).valueOf() / 1000;
        this.setState({
            fromDate: date,
            fromTs: ts
        });
    }
    
    onChangeToDate(date: Date) {
        var ts = moment(date).valueOf() / 1000;
        this.setState({
            toDate: date,
            toTs: ts + 86400
        });

        var ts = moment(date).valueOf() / 1000;
        console.log(ts);
    }
    
    sort(field: string, decreasing: boolean = false) {
        return () => {
          
          // this.refresh(this.props.meta);
        };
    }

    getFilteredHistoryData(data) {

        exchangeOptions = [];
        var filteredHistoryData = [];
        var todayscount = 0;
        var failedCount = 0;
        var exchanges = {};
        data.map((m, index) => {
            if(!this.state.exchangeSelectedValue) {
                filteredHistoryData.push(m);
            } else {
                if(this.state.exchangeSelectedValue == m.exchange) {
                    filteredHistoryData.push(m);
                }
            }
            todayscount ++;
            if((m.highest_bid - m.ticker_ask) < 0) {
                failedCount++;
            }

            exchanges[m.exchange] = m.exchange;
        });

        var exchangeCount = Object.keys(exchanges).length;
        var aggregatePercent = Math.floor((todayscount - failedCount) / todayscount * 100);

        Object.keys(exchanges).map((m, index) => {
            exchangeOptions.push({
                value: exchanges[m],
                label: exchanges[m]
            })
        });

        return {
            filteredData: filteredHistoryData,
            exchangeCount: exchangeCount,
            aggregatePercent: aggregatePercent,
            todaysCount: todayscount
        };
    }

    render() {

        const { isOpen, onCancel, width, handleSubmit, exchanges_data, historyData } = this.props;

        const exchange_options = [];
        exchange_options.push({
            value: 'all',
            label: 'All'
        });

        if(exchanges_data && exchanges_data.data){
            exchanges_data.data.map((m,index) => {
                exchange_options.push({
                    value: m.name,
                    label: m.name
                });
            });
        }

        var filteredData = (historyData && historyData.filteredHistory) ? this.getFilteredHistoryData(historyData.filteredHistory) : {};
        
        var filteredHistoryData = filteredData['filteredData'] ? filteredData['filteredData'] : [];
        
        const onIncreasing = ((field: string) => {
            return this.sort(field);
        }).bind(this);

        const onDecreasing = ((field: string) => {
            return this.sort(field, true);
        }).bind(this);
      
        const $fields = fields.map(field => {
            return (
                <TableCell header key={field.name} className={styles.tableHeader + ' ' + styles[field.name]}>
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
        
        const $tradesList = filteredHistoryData.length > 0 ?
            filteredHistoryData.map((s, index) => {
                return (
                <TableRow key={'row' + index}>
                    <TableCell className={styles.date}>
                        <div className={styles.datetime}>
                            <div className={styles.td}>
                                {/* {moment.unix(s.ts).format("DD MMM YY")} */}
                                {moment.utc(moment(s.created_at, "YYYY-MM-DD HH:mm:ss")).format("DD MMM YY")}
                            </div>
                            <div className={styles.td}>
                                {/* {moment.unix(s.ts).format("HH:mm:ss")} */}
                                {moment.utc(moment(s.created_at, "YYYY-MM-DD HH:mm:ss")).format("HH:mm:ss")}
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className={styles.preset}>
                        <div className={styles.td}>
                            {s.query_id}
                            {/* <div className="blue">{s.exchange.toUpperCase()}</div> */}
                        </div>
                    </TableCell>
                    <TableCell className={styles.suggestions}>
                        <div className={styles.td}>
                            {s.coin + ': ' + s.exchange}
                        </div>
                    </TableCell>
                    <TableCell className={styles.entry_price}>
                        <div className={styles.td}>
                            <div className={((s.highest_bid - s.ticker_ask)/s.highest_bid * 100) > 0 ? styles.green : styles.red}><Price diff={(s.highest_bid - s.ticker_ask)/s.highest_bid * 100}>{s.ticker_ask}</Price></div>
                        </div>
                    </TableCell>
                    <TableCell className={styles.performance}>
                        <div className={styles.td}>
                            <div className={((s.highest_bid - s.ticker_ask)/s.highest_bid * 100) > 0 ? styles.green : styles.red}><Price diff={(s.highest_bid - s.ticker_ask)/s.highest_bid * 100} nDigitsAfterDot={2}>{s.highest_bid && (s.highest_bid - s.ticker_ask)/s.highest_bid * 100} %</Price></div>
                            <div className={((s.highest_bid - s.ticker_ask)/s.highest_bid * 100) > 0 ? styles.green : styles.red}><Price diff={(s.highest_bid - s.ticker_ask)/s.highest_bid * 100}>{s.highest_bid}</Price></div>
                            <div>
                                {moment.utc(moment(s.updated_at, "YYYY-MM-DD HH:mm:ss")).format('HH:mm') + '( ' + moment.utc(moment(s.updated_at, "YYYY-MM-DD HH:mm:ss").diff(moment(s.created_at, "YYYY-MM-DD HH:mm:ss"))).format("HH:mm:ss") + ' )'}
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
                );
            }) : (
            <div className={'no-data ' + styles.noDataWrapper}>
                There is currently no data here
            </div>
            );

            const hasScrollbar = filteredHistoryData.length > 3;
            const $scrollableTable = hasScrollbar ? (
            <ReactIScroll
                iScroll={iScroll}
                options={iScrollOptions}
            >
                <div>
                {$tradesList}
                </div>
            </ReactIScroll>
        ) : <div>{$tradesList}</div>;

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
                <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                <div className={styles.title}>
                    <span>24hour Bot Activity</span>
                </div>
                <div className={styles.topContent}>
                    <div className={styles.spanWrapper}>
                        <span>Preset</span>
                    </div>
                    <div className={styles.selectWrapper}>
                        <Select
                            value={this.state.presetSelectedValue}
                            onChange={this.handlePresetChange.bind(this)}
                            options={presetoptions}
                            placeholder="Preset"
                        />
                    </div>
                    <div className={styles.selectWrapper}>
                        <Select
                            value={this.state.exchangeSelectedValue}
                            onChange={this.handleExchangeChange.bind(this)}
                            options={exchangeOptions}
                            placeholder="Exchange"
                        />
                    </div>
                </div>
                <div className={styles.descriptionSection}>
                    <div className={styles.descriptionItem}>
                        <div className={styles.descriptionLeft}>
                            <span className={styles.normalDesc}>24hours Aggregate Performance = </span>    
                        </div>
                        <div className={styles.descriptionRight}>
                            <span className={styles.blue}>{(filteredData['aggregatePercent'] ? filteredData['aggregatePercent'] : 0)  + '%'}</span>    
                        </div>
                    </div>
                    <div className={styles.descriptionItem}>
                        <div className={styles.descriptionLeft}>
                            <span className={styles.normalDesc}>Number of Exchanges Represented = </span>
                        </div>
                        <div className={styles.descriptionRight}>
                            <span className={styles.blue}>{filteredData['exchangeCount']}</span>
                        </div>
                    </div>
                    <div className={styles.descriptionItem}>
                        <div className={styles.descriptionLeft}>
                            <span className={styles.normalDesc}>		     Number of position today = </span>
                        </div>
                        <div className={styles.descriptionRight}>
                            <span className={styles.blue}>{filteredData['todaysCount']}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tableSection}>
                    <Table id={styles.tradesTable}>
                        <TableRow>
                            {$fields}
                        </TableRow>
                        <div className={(filteredHistoryData.length ? styles.tbody : styles.noDataBody) + ' ' + (hasScrollbar ? '' : styles.noScrollbar)}>
                            {$scrollableTable}
                        </div>
                    </Table>
                </div>
                <div>
                    <CSVLink data={filteredHistoryData} ><Button className={styles.button + ' medium blue'}>CONVERT TO CSV FILE</Button></CSVLink>
                </div>
            </Modal>
        );
    }
}

const form = reduxForm({
    form: 'autobot-history-form',
    enableReinitialize:true,
    keepDirtyOnReinitialize: true
})(AutobotHistoryModal);

const mapStateToProps = (state, ownProps) => ({
    historyData: state.autobotHistoryData.historyData,
    exchanges_data: state.setupDetails.exchanges
});

const mapDispatchToProps = {
    fetchFilteredHistory,
    exchanges
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
