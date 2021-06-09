import * as React from 'react';
import { Tab, Tabs,  TabList, TabPanel } from 'react-tabs';
import { history } from 'Components/Routes';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import { Link } from 'react-router-dom';

const styles = require('./modal.css');

class MenuModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { isOpen, onCancel, width, defaultTab } = this.props;

        return (
                <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>
                    
                    <div className={styles.content}>
                        <Tabs defaultIndex={defaultTab}>
                            <TabList className={styles.tabList}>
                                <Tab className={styles.tabItem + ' ' + styles.tabFirstItem}>Community</Tab>
                                <Tab className={styles.tabItem}>Trader</Tab>
                                <Tab className={styles.tabItem}>Market Maker</Tab>
                                <Tab className={styles.tabItem}>Token Owner</Tab>
                                <Tab className={styles.tabItem}>Exchanges</Tab>
                            </TabList>

                            <TabPanel className={styles.relative}>
                                <div className={styles.panel}>
                                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                                    <div className={styles.panel_head}>
                                        <img className="" src="/public/assets/images/landing/communityIcon.png" />
                                        <span>Community</span>
                                    </div>
                                    <div className={styles.panel_text}>
                                        <p>XchangeRate platform is primarily community driven. The community decides what exchanges are integrated. The community votes using XRR Tokens. Integrating an exchange would require 50,000 Votes from the exchange’s community. XchangeRate decides voting sessions based on registration made by exchanges or their representatives. At the end of a voting session the exchange with the votes starts integration process.</p>
                                        <p>The process involves due diligence and other enquiries necessary for a beneficial partnership.</p>
                                        <p>The voting integration gives users the access to use xchangerate platform as a trading platform through its coin monitoring board and autobot but the Market Maker App requires additional consultations with the exchanges’ management teams</p>
                                        {/* <p className={styles.footer_head}>Sign Up Here to Join the XchangeRate Community</p> */}
                                    </div>
                                    <div className={styles.panel_footer}>
                                        <img src="/public/assets/images/landing/menu_community.png" />
                                        {/* <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>SIGN UP</Button> */}
                                    </div> 
                                </div>                                
                            </TabPanel>
                            <TabPanel className={styles.relative}>
                                <div className={styles.panel}>
                                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                                    <div className={styles.panel_head}>
                                        <img className="" src="/public/assets/images/landing/traderIcon.png" />
                                        <span>Trader</span>
                                    </div>
                                    <div className={styles.panel_text}>
                                        <p>XchangeRate platform is a leader in the execution of reliable safe trading algorithms.</p>
                                        <p>XchangeRate platform can be used either as a Do-It-Yourself Coin Monitoring Board (CMB) with our intelligent XchangeRate indicators, or as a totally dependable smart algorithm designed for all user levels of traders (Autobot). XchangeRate algorithms run in test or active modes using preset indicators so that user inputs are not required. Each preset has a performance history that traders can refer to and use to determine buy/sell attitudes for different market conditions</p>
                                        <p>Traders are required to hold a minimum of 10000XRR on a designated wallet to access the traders dashboard (CMB). Using the autobot requires further XRR subscription determined by duration of use.</p>
                                        <p>The XchangeRate Trader also has the privilege to vote their desired Exchanges for integration.</p>
                                        {/* <p className={styles.footer_head}>Cick Here to Sign up as an XchangeRate Trader</p> */}
                                    </div>
                                    <div className={styles.panel_footer}>
                                        <img src="/public/assets/images/landing/menu_trader.png" />
                                        {/* <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>SIGN UP</Button> */}
                                    </div> 
                                </div>                         
                            </TabPanel>
                            <TabPanel className={styles.relative}>
                                <div className={styles.panel}>
                                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                                    <div className={styles.panel_head}>
                                        <img className="" src="/public/assets/images/landing/marketmakerIcon.png" />
                                        <span>Market Makers</span>
                                    </div>
                                    <div className={styles.panel_text}>
                                        <p>XchangeRate provides safe and dependable tools for providing token liquidity on Exchanges. It uses high end, smart algorithms to position trades on the Exchange order books. It is a platform where Token owners and Exchanges come to find Market Makers. Market Makers offer to provide liquidity for a token for an agreed length of time and for a fee.</p>
                                        <p>XchangeRate offers a 2-way chat platform that makes it convenient to conclude deals quickly and stay in touch with clients. The modules are easy to use and can host multiple tokens as well as multiple accounts. With a very affordable fee structure the Market Maker is getting so much for less. XchangeRate platform makes it easy to report activities between Market Maker and their clients in addition to recording all Exchange volumes for the token.</p>
                                        <p>An XchangeRate Market Maker is required to hold 100,000XRR in a designated wallet to be able to access the Market Maker dashboard of the XchangeRate platform. The Dashboard has an array of tools to Make & Take the market and report Market Maker volume, view Token owners and Exchanges offers and counter offers as well as a 2-way chatting tool to engage Token Owners and Exchanges.</p>
                                        {/* <p className={styles.footer_head}>Cick Here to Sign up as a Market Maker</p> */}
                                    </div>
                                    <div className={styles.panel_footer + " " + styles.modal_market}>
                                        <img src="/public/assets/images/landing/menu_market.png" />
                                        {/* <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>SIGN UP</Button> */}
                                    </div> 
                                </div>                   
                            </TabPanel>
                            <TabPanel className={styles.relative}>
                                <div className={styles.panel}>
                                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                                    <div className={styles.panel_head}>
                                        <img className="" src="/public/assets/images/landing1/tokenAsset.png" />
                                        <span>Token Owners</span>
                                    </div>
                                    <div className={styles.panel_text}>
                                        <p>XchangeRate is designed to immensely benefit token owners. Even tokens with good use cases suffer liquidity problems especially at the early stages after the ICO. The best time to get a Market Maker on your team is during the presale. The work of the Market Maker at this time would be to create the roadmap for token distribution and draw a pricing structure; vertical and horizontal spread for post ICO token liquidity. Market Makers ensure price stability when they are brought to the team early enough. The XchangeRate platform has an array of Market Makers that Token Owners can engage at competitive contractual terms. All the tools necessary for Market Making is hosted on the XchangeRate platform; it is popularly known as XchangeRate MaTa</p>
                                        <p>An XchangeRate Token Owner is required to hold 100,000XRR in a designated wallet to be able to access the Token Owner dashboard of the XchangeRate platform. The Dashboard has an array of tools to report Market Maker volume, view Market Maker offers and counter offers as well as a 2-way chatting tool to engage Marker Makers and Exchanges.</p>
                                        {/* <p className={styles.footer_head}>Click Here to Sign Up as a Token Owner</p> */}
                                    </div>
                                    <div className={styles.panel_footer + " " + styles.modal_token}>
                                        <img src="/public/assets/images/landing/menu_token.png" />
                                        {/* <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>SIGN UP</Button> */}
                                    </div> 
                                </div> 
                            </TabPanel>
                            <TabPanel className={styles.relative}>
                                <div className={styles.panel}>
                                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                                    <div className={styles.panel_head}>
                                        <img className="" src="/public/assets/images/landing/exchangeIcon.png" />
                                        <span>Exchanges</span>
                                    </div>
                                    <div className={styles.panel_text}>
                                        <p>XchangeRate platform is a liquidity solution for exchanges. It is a must have integration for exchanges because it hosts traders, token owners and market makers in one convenient place.</p>
                                        <p>The popularity of Exchanges among these liquidity facilitators should not be ignored. XchangeRate API integration is safe and light weight for Exchanges because our platform is built for huge load and traffic. Our integrations are fast and come in different options.</p>
                                        <p>To qualify for integration, there is a voting process where Exchanges garner votes from their community – the community votes give the winning Exchange free integration to our Autobot and CMB (coin monitoring board).Our Market Maker integration would be subject to further conditions by the integration team.</p>
                                        <p>For paid integration, a sum of 3 BTC equivalents in XRR tokens is required for full integration. Full integration gives access to Autobot, Market Maker and cross promotion/ announcement.</p>
                                        {/* <p className={styles.footer_head}>Cick Here to Sign up as an Exchange</p> */}
                                    </div>
                                    <div className={styles.panel_footer + " " + styles.modal_exchanges}>
                                        <img src="/public/assets/images/landing/menu_exchange.png" />
                                        {/* <div className={styles.forthSectionItemDescButton + " " + styles.btnGroup}>
                                            <Button className="medium blue" onClick={() => history.push('/login')}>SIGN UP</Button>
                                            <Link to="/public-exchanges"><Button className={"medium white " + styles.ml_10}>SUPPORTED EXCHANGES</Button></Link>
                                        </div>                                         */}
                                    </div> 
                                </div> 
                            </TabPanel>
                        </Tabs>
                    </div>
                </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal);
