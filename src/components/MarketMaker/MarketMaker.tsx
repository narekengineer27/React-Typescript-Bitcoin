import * as React from 'react';
import 'Styles/table.less';
import Button from 'Elements/Button';
import ContentLayout from 'Partials/ContentLayout';
import TextField from 'Elements/TextField';
import SelectField from 'Elements/SelectField';
import CustomModal from 'Components/CustomModal';
import TokenBalenceFailedModal from 'Components/Modals/TokenBalenceFailedModal';
import TokenBalenceCheckModal from 'Components/Modals/TokenBalenceCheckModal';
import { confirm, getMarketMakerOffers } from 'Components/SetupDetails/actions';
import { connect } from 'react-redux';
import { Status } from 'Models/Status';
import { RouteComponentProps } from 'react-router';

const styles = require('./market-maker.css');
const modalFormItemStyles = require('../SetupDetails/setup-details.css');
const modalStyles = require('Components/CustomModal/custom-modal.css');

interface TokenConfirmParams {
    id?: string;
}

interface SetupDetailsProps extends RouteComponentProps<TokenConfirmParams> {
    status?: Status;
    confirm?: (id: string) => void;
    getMarketMakerOffers?: () => void;
}

class MarketMaker extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    const { confirm, offers, getMarketMakerOffers } = this.props;
    confirm("1");
    if(!offers || offers.status.error){
        setTimeout(()=>{
            getMarketMakerOffers();
        }, 500);
    }
  }

  onConfirm(values: object) {
    this.setState({
        isOpen: false
    })
  }

  onCancel() {
    this.setState({
        isOpen: false
    })
  }

  openModal() {
    this.setState({
        isOpen: true
    })
  }

  render() {
    const { status, exchanges, base_coin, offers } = this.props;
    const options = [
        {value: '1', label: 'Exchanges1'}
    ];
    const exchange_options = [];
    const base_coin_options = [];

    if(exchanges && exchanges.data){
      exchanges.data.map((m,index) => {
        exchange_options.push({
          value: m.id,
          label: m.name
        });
      });
    }

    if(base_coin && base_coin.data){
      base_coin.data.map((m,index) => {
        base_coin_options.push({
          value: index,
          label: m.coin
        });
      });
    }

    return (
        <ContentLayout>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <img src="/public/assets/images/landing1/icon1Asset.png"/>
                    <span>Market Maker</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.tableDescWrapper}>
                        <div className={styles.tableDescLeftItemWrapper}>
                            <span>
                                WALLET ADDRESS:
                            </span>
                        </div>
                        <div className={styles.tableDescTitleItemWrapper}>
                            <span>
                                Eligible Offers
                            </span>
                        </div>
                        <div className={styles.tableDescRightItemWrapper}>
                            <span>
                                XRR BALANCE: {20000}
                            </span>
                        </div>

                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Market Maker</th>
                                <th>Base Coin</th>
                                <th>Offer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody key="1">
                        {
                            offers && offers.offers.data.eligibleOffers.map((m, index) => {
                                return (
                                <tr>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>Exchanges</span>
                                            <span className={styles.tdBlueText}>Exchange 24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.base_coin}</span>
                                            <span className={styles.tdBlueText}>24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.charge + ' ' + m.coin_name + '/' + m.quantity + ' ' + m.qty_coin_name + '/' + m.time + ' ' + m.time_duration}</span>
                                            <Button className={styles.tdBtn + " small green"} onClick={this.openModal.bind(this)}>Counter Offer</Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <Button className={styles.tdBtn + " small orange"}>Send Offer</Button>
                                            <span className={styles.tdNormalText}>Awaiting Response</span>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>

                    <div className={styles.tableDescWrapper}>
                        <div className={styles.tableTitleItemWrapper}>
                            <span>
                                Incoming Offers
                            </span>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Market Maker</th>
                                <th>Base Coin</th>
                                <th>Offer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody key="1">
                        {
                            offers && offers.offers.data.incomingOffers.map((m, index) => {
                                return (
                                <tr>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>Exchanges</span>
                                            <span className={styles.tdBlueText}>Exchange 24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.base_coin}</span>
                                            <span className={styles.tdBlueText}>24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.charge + ' ' + m.coin_name + '/' + m.quantity + ' ' + m.qty_coin_name + '/' + m.time + ' ' + m.time_duration}</span>
                                            <Button className={styles.tdBtn + " small green"}>Counter Offer</Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <Button className={styles.tdBtn + " small orange"}>Send Offer</Button>
                                            <Button className={styles.tdBtn1 + " small blue"}>Accept</Button>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        
                        </tbody>
                    </table>

                    <div className={styles.tableDescWrapper}>
                        <div className={styles.tableTitleItemWrapper}>
                            <span>
                                Awaiting Response Offers
                            </span>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Market Maker</th>
                                <th>Base Coin</th>
                                <th>Offer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody key="1">
                        {
                            offers && offers.offers.data.awaitingOffers.map((m, index) => {
                                return (
                                <tr>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>Exchanges</span>
                                            <span className={styles.tdBlueText}>Exchange 24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.base_coin}</span>
                                            <span className={styles.tdBlueText}>24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.charge + ' ' + m.coin_name + '/' + m.quantity + ' ' + m.qty_coin_name + '/' + m.time + ' ' + m.time_duration}</span>
                                            <Button className={styles.tdBtn + " small green"}>Counter Offer</Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <Button className={styles.tdBtn + " small red"}>Revoke</Button>
                                            <span className={styles.tdNormalText}>Awaiting Response</span>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        
                        </tbody>
                    </table>

                    <div className={styles.tableDescWrapper}>
                        <div className={styles.tableTitleItemWrapper}>
                            <span>
                                Running Offers
                            </span>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Market Maker</th>
                                <th>Base Coin</th>
                                <th>Offer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody key="1">
                        {
                            offers && offers.offers.data.runningOffers.map((m, index) => {
                                return (
                                <tr>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>Exchanges</span>
                                            <span className={styles.tdBlueText}>Exchange 24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.base_coin}</span>
                                            <span className={styles.tdBlueText}>24 hrs Volume</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <span className={styles.tdNormalText}>{m.charge + ' ' + m.coin_name + '/' + m.quantity + ' ' + m.qty_coin_name + '/' + m.time + ' ' + m.time_duration}</span>
                                            <Button className={styles.tdBtn + " small green"}>Counter Offer</Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tdItem}>
                                            <Button className={styles.tdBtn + " small blue"}>View Account</Button>
                                        </div>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        
                        </tbody>
                    </table>
                </div>

            </div>
            <CustomModal isOpen={this.state.isOpen} onConfirm={this.onConfirm.bind(this)} onCancel={this.onCancel.bind(this)} width={700}>
                <div>
                    <h2 className={modalStyles.modalTitle}>Counter Offer</h2>
                    <div className={modalStyles.modalDesc}>
                        <span>Your offer is the amount you are willing to charge a token owner or exchange for</span>
                    </div>
                    <div>
                        <div className={modalFormItemStyles.offerItemWrapper}>
                            <span className={modalFormItemStyles.offerItemTitle}>Charge</span>
                            <div className={modalFormItemStyles.offerItemText}>
                                <TextField label="Charge" name="charge" border={true}/>
                            </div>
                            <div className={modalFormItemStyles.offerItemSelect}>
                                <SelectField options={options} name="charge"/>
                            </div>
                        </div>
                        <div className={modalFormItemStyles.offerItemWrapper}>
                            <span className={modalFormItemStyles.offerItemTitle}>Quantity</span>
                            <div className={modalFormItemStyles.offerItemText}>
                                <TextField label="Quantity" name="quantity" border={true}/>
                            </div>
                            <div className={modalFormItemStyles.offerItemSelect}>
                                <SelectField options={options} name="quantity"/>
                            </div>
                        </div>
                        <div className={modalFormItemStyles.offerItemWrapper}>
                            <span className={modalFormItemStyles.offerItemTitle}>Time</span>
                            <div className={modalFormItemStyles.offerItemText}>
                                <TextField label="Time" name="time" border={true}/>
                            </div>
                            <div className={modalFormItemStyles.offerItemSelect}>
                                <SelectField options={options} name="time"/>
                            </div>
                        </div>
                    </div>
                    <div className={modalStyles.modalBtnWrapper}>
                        <Button className={modalStyles.modalBtn + ' small blue'} submit={true}>Counter Offer</Button>
                        <Button className={modalStyles.modalBtn + ' small red'} onClick={this.onCancel.bind(this)}>Delete</Button>
                    </div>
                </div>
            </CustomModal>
            <TokenBalenceCheckModal isOpen={status.success}/>
            <TokenBalenceFailedModal isOpen={status.error}/>
        </ContentLayout>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    status: state.setupDetails.status as Status,
    exchanges: state.setupDetails.exchanges,
    base_coin: state.setupDetails.base_coin,
    offers: state.setupDetails.marketMakerOffers
});

const mapDispatchToProps = {
    confirm,
    getMarketMakerOffers
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketMaker);
