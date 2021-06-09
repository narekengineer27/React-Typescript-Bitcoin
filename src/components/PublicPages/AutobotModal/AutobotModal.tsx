import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';

const styles = require('./autobot.css');

class AutobotModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { isOpen, onCancel, width } = this.props;
        return (
                <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>
                    <div className={styles.content}>
                        <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                        <div className={styles.text}>AUTOBOT TRADING</div>
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
                        <table>
                            <thead>
                                <tr>
                                    <th className={styles.w1}>Coin</th>
                                    <th className={styles.w1}>Quantity</th>
                                    <th className={styles.w1}>Price Bought</th>
                                    <th className={styles.w2}>Current Price</th>
                                    <th className={styles.w2}>Margin</th>
                                    <th className={styles.w2}>Status</th>
                                    <th className={styles.w2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>XRR</td>
                                    <td>34900</td>
                                    <td className={styles.green}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.green}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.green}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>5%</span>
                                            </div>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.0000012</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.status_buy}>
                                        Buy Order
                                    </td>
                                    <td>
                                        <Button className={styles.btn + " medium red"}>Exit</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>XRR</td>
                                    <td>34900</td>
                                    <td className={styles.red}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.red}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.red}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.status_bought}>
                                        Bought
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>XRR</td>
                                    <td>34900</td>
                                    <td className={styles.green}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.green}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.green}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.up}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.status_sell}>
                                        Sell Order
                                    </td>
                                    <td>
                                        <Button className={styles.btn + " medium red"}>Exit</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>XRR</td>
                                    <td>34900</td>
                                    <td className={styles.red}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.red}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.0000057</span>
                                            </div>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.003$</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.red}>
                                        <div className={styles.value}>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>5%</span>
                                            </div>
                                            <div>
                                                <span className={styles.down}></span>
                                                <span>0.0000012</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.status_sold}>
                                        Sold
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AutobotModal);
