import * as React from 'react';
import 'Styles/table.less';
import { connect } from 'react-redux';
import Responsive from 'Partials/Responsive';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import Toggle from 'react-toggle';
import 'Styles/react-toggle.less';
import 'Styles/toggle.less';
import TextField from 'Elements/TextField';
import ToggleField from 'Elements/ToggleField';
import SelectField from 'Elements/SelectField';
import { fetchXrrPrice } from './actions';
import { TableCell, Table, TableRow } from 'Elements/Table';
import SortingIcons from 'Elements/SortingIcons';
import ReactIScroll from 'react-iscroll';
import * as iScroll from 'iscroll';
import Price from 'Elements/Price';
import DatePicker from 'Elements/DatePicker';
import { exchanges } from '../SetupDetails/actions';
import CustomText from 'Elements/CustomText';
import { activateAutobotAccount } from 'Components/AutobotSettingModal/actions';

const iScrollOptions = require('Constants/options.json').iScroll;

const styles = require('./autobot-billing-modal.css');


const fields = [{
    name: 'Item',
    label: 'Item',
    sortable: false,
  }, {
    name: 'unitXrr',
    label: 'XRR UNIT PRICE/$',
    sortable: false,
  }, {
    name: 'subTotalXrr',
    label: 'SUB TOTAL XRR',
    sortable: false,
  }];

const filteredHistoryData = [
    {
        name: 'Combo Full Ply - Weekly 20 USD ',
        xrrUnitPrice: '100',
        subTotalXrr: '2000'
    },
    {
        name: 'Combo Full Ply - Weekly 20 USD ',
        xrrUnitPrice: '100',
        subTotalXrr: '2000'
    },
    {
        name: 'Combo Full Ply - Weekly 20 USD ',
        xrrUnitPrice: '100',
        subTotalXrr: '2000'
    }
];

class AutobotBillingModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
       
    }

    componentWillMount() {
        const { fetchXrrPrice } = this.props;

        fetchXrrPrice();
    }

    componentWillUnmount() {
       
    }

    changeInputState(ev) {
        var returnObj = {};
        returnObj[ev.target.name] = ev.target.value;
    
        this.setState(returnObj);
    }

    onSubmit() {
        const { autobotSetting, xrrPrice, exchangeAccounts, activateAutobotAccount, isAdditional } = this.props;

        var exchangeIds = [];
        exchangeAccounts.map((m, index) => {
            if(isAdditional) {
                exchangeIds.push(m.id);
            } else {
                if(!m.is_paid) {
                    exchangeIds.push(m.id);
                }
            }
        });

        var data = {
            ids: exchangeIds,
            time: autobotSetting.autobot_time,
            types: [
                autobotSetting.autobot_entry_type != 'Fixed',
                autobotSetting.autobot_exit_type != 'Fixed',
                autobotSetting.autobot_stoploss_type != 'Fixed'
            ],
            is_additional: isAdditional
        }

        activateAutobotAccount(data);
    }

    makeTableData(data1, data2, isAdditional) {
        var tableData = [];
        var entryCount = 0;
        var exitCount = 0;
        var stopCount = 0;

        data2.map((m, index) => {
            if(isAdditional) {
                var item = {};
                item['price'] = data1.autobot_time == 'Weekly' ? 20 : 50;
                item['name'] = m.exchange + ' - ' + data1.autobot_time + ' ' + item['price'] + ' USD (' + m.api.substr(m.api.length - 4) + ')';
                tableData.push(item);
    
                entryCount ++;
                exitCount ++;
                stopCount ++;
            } else {
                if(!m.is_paid) {
                    var item = {};
                    item['price'] = data1.autobot_time == 'Weekly' ? 20 : 50;
                    item['name'] = m.exchange + ' - ' + data1.autobot_time + ' ' + item['price'] + ' USD (' + m.api.substr(m.api.length - 4) + ')';
                    tableData.push(item);
                }
    
                if(!m.is_entry_paid) {
                    entryCount ++;
                }
                
                if(!m.is_exit_paid) {
                    exitCount ++;
                }
                
                if(!m.is_stoploss_paid) {
                    stopCount ++;
                }
            }
            
        })

        if(data1.autobot_entry_type != 'Fixed' && entryCount) {
            var item2 = {};
            item2['price'] = data1.autobot_time == 'Weekly' ? 5 * entryCount : 10 * entryCount;
            item2['name'] = 'Entry - ' + data1.autobot_entry_type + ' - ' + data1.autobot_time + ' ' + item2['price'] + ' USD';
            tableData.push(item2);
        }

        if(data1.autobot_exit_type != 'Fixed' && exitCount) {
            var item3 = {};
            item3['price'] = data1.autobot_time == 'Weekly' ? 5 * exitCount : 10 * exitCount;
            item3['name'] = 'Exit - ' + data1.autobot_exit_type + ' - ' + data1.autobot_time + ' ' + item3['price'] + ' USD';
            tableData.push(item3);
        }
        
        if(data1.autobot_stoploss_type != 'Fixed' && stopCount) {
            var item4 = {};
            item4['price'] = data1.autobot_time == 'Weekly' ? 5 * stopCount : 10 * stopCount;
            item4['name'] = 'Stop Loss - ' + data1.autobot_stoploss_type + ' - ' + data1.autobot_time + ' ' + item3['price'] + ' USD';
            tableData.push(item4);
        }
        return tableData;
    }

    render() {

        const { isOpen, onCancel, width, autobotSetting, xrrPrice, exchangeAccounts, isAdditional } = this.props;

        var btc_price = xrrPrice && xrrPrice.data && xrrPrice.data.btc_price ? xrrPrice.data.btc_price : 0;
        var usd_price = xrrPrice && xrrPrice.data && xrrPrice.data.usd_price && xrrPrice.data.usd_price.price ? xrrPrice.data.usd_price.price : 0;
        var unit_price = 0;

        if(btc_price != 0 && usd_price != 0) {
            unit_price = 1 / (btc_price * usd_price);
        }

        const $fields = fields.map(field => {
            return (
                <TableCell header key={field.name} className={styles.tableHeader + ' ' + styles[field.name]}>
                    <div className="full-width">
                        {field.label}
                    </div>
                </TableCell>
            );
        });

        var tableData = this.makeTableData(autobotSetting, exchangeAccounts, isAdditional);
        var totalPrice = 0;
        
        const $tradesList = tableData.length > 0 ?
        tableData.map((s, index) => {
                totalPrice += unit_price * s.price;
                return (
                <TableRow key={'row' + index}>
                    <TableCell className={styles.Item}>
                        {s.name}
                    </TableCell>
                    <TableCell className={styles.unitXrr}>
                        {Math.round(unit_price)}
                    </TableCell>
                    <TableCell className={styles.subTotalXrr}>
                        {Math.round(unit_price * s.price)}
                    </TableCell>
                </TableRow>
                );
            }) : (
            <div className={'no-data ' + styles.noDataWrapper}>
                There is currently no data here
            </div>
            );

            const hasScrollbar = tableData.length > 3;
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
                <div className={styles.logo}>
                    <img className={styles.xrLogo} src="/public/assets/images/xrImage.png"/>
                </div>
                <div className={styles.title}>
                    <span>Autobot Billing</span>
                </div>
                <div className={styles.tableSection}>
                    <Table id={styles.tradesTable} className={styles.tradesTable}>
                        <TableRow>
                            {$fields}
                        </TableRow>
                        <div className={(filteredHistoryData.length ? styles.tbody : styles.noDataBody) + ' ' + (hasScrollbar ? '' : styles.noScrollbar)}>
                            {$scrollableTable}
                            <TableRow>
                                <TableCell className={styles.Item + ' ' + styles.noBorder}>
                                </TableCell>
                                <TableCell className={styles.unitXrr}>
                                    Total
                                </TableCell>
                                <TableCell className={styles.subTotalXrr}>
                                    {Math.round(totalPrice)}
                                </TableCell>
                            </TableRow>
                        </div>
                    </Table>
                </div>
                <div className={styles.textWrapper}>
                    <div className={styles.fromWalletAddress}>
                        <span>Enter Wallet Address XRR will be paid from</span>
                    </div>
                    <CustomText className="normal" value={this.state.fromWallet} onChange={this.changeInputState.bind(this)} name="fromWallet" label="Wallet Address"/>
                    <div className={styles.toWalletWrapper}>
                        <div className={styles.toWalletSpan}>
                            <span>{'Send ' + Math.round(totalPrice) + 'XRR to this Wallet Address'}</span>
                        </div>
                        <div className={styles.toWalletAddress}>
                            <span>0xlx98fshfjhfgdjfhdflsfhdsfsdfhsdfs</span>
                        </div>
                    </div>
                    <div>
                        <span>Once XRR is received in this wallet your session will be activated</span>
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button className={styles.button + " medium green"} onClick={this.onSubmit.bind(this)}>CHECK PAYMENT STATUS</Button>
                    <Button className={styles.button + " medium red"}>CANCEL</Button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    xrrPrice: state.autobotBilling.xrrPrice,
    exchanges_data: state.setupDetails.exchanges
});

const mapDispatchToProps = {
    fetchXrrPrice,
    exchanges,
    activateAutobotAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(AutobotBillingModal);
