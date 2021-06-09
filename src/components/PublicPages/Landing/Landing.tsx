import * as React from 'react';
import { Tab, Tabs,  TabList, TabPanel } from 'react-tabs';
import { history } from 'Components/Routes';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import Button from 'Elements/Button';
import PublicHeaderMobile from 'Partials/PublicPageLayout/PublicHeaderMobile';
import PolicyModal from 'Partials/PolicyModal';
import BuyBackEventHeader from 'Partials/BuyBackEventHeader';
import DeploymentCountdown from 'Components/DeploymentCountdown';
import MenuModal from './MenuModal';
import RegisterModal from 'Components/PublicPages/RegisterModal';
import XrrtokenModal from 'Components/PublicPages/XrrtokenModal';
import ShareModal from 'Components/Share';
import LoginModal from 'Components/PublicPages/Login/LoginModal';
import AutobotModal from 'Components/PublicPages/AutobotModal';
import AutobotSettingModal from 'Components/AutobotSettingModal';
import ChatPanel from 'Components/ChatPanel';
import Modal from 'Elements/Modal1';
import ExchangePoolModal from 'Components/ExchangePoolModal';

const styles = require('./landing.css');

export default class Landing extends React.Component<any, any> {
    mobileHeader: PublicHeaderMobile;

    constructor(props: any) {
        super(props);
        this.state = {
            isOpenPolicyModal: false,
            isOpenChatloginModal : false,
            isMenuModalOpen: false,
            isOpenDeploymentCountdown: false,
            isOpenRegisterThankyouModal: false,
            isOpenXRRTokenModal: false,
            isShareModalOpen: true,
            isOnLoginModal: false,
            defaultTab: 0,
            isComingSoonModal: false
        };
    }

    componentDidMount() {
    }

    openPolicyModal() {
        this.setState({
            isOpenPolicyModal: true
        });
    }

    onMenuModalCancel() {
        this.setState({
            isMenuModalOpen: false
        })
    }

    onCancelShare() {
        this.setState({
          isShareModalOpen: false
        })
    }

    onConfirmPolicy() {
        history.push('/signup')
        this.setState({
            isOpenPolicyModal: false
        });
    }

    onCancelPolicy() {
        this.setState({
            isOpenPolicyModal: false
        });
    }

    showLoginModal() {
      this.setState({
        isOpenChatloginModal: true
      });
    }

    // Cancel chat login Modal
    onCancelChatLoginModal () {
      this.setState({
        isOpenChatloginModal: false
      });
    }

    onCancelDeploymentCountdown() {

    }

    menuClick(item, e) {
        this.setState({
            isMenuModalOpen: true,
            defaultTab: item
        })
    }

    openXRRTokenModal() {
        this.setState({
            isOpenXRRTokenModal: true
        })
    }

    cancelXRRTokenModal() {
        this.setState({
            isOpenXRRTokenModal: false
        })
    }

    openRegisterThankyouModal() {
        this.setState({
            isOpenRegisterThankyouModal: true
        })
    }

    cancelRegisterThankyouModal() {
        this.setState({
            isOpenRegisterThankyouModal: false
        })
    }

    openLoginModal(){
        this.setState({
            isShareModalOpen: false,
            isOnLoginModal: true
        })
    }

    onCancelLogin(){
        this.setState({
            isOnLoginModal: false
        })
    }
    // coming soon modal
    ComingSoonModal(){
        this.setState({
            isComingSoonModal: true
        })
    }
    onComingModalCancel(){
        this.setState({
            isComingSoonModal: false
        })
    }

    onCancelExchangePoolModal() {

    }
    // coming soon modal end
    render() {
        const { match, history } = this.props;

        var settings = {
            dots: false,
            arrows:false,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        const Hearder = (
            <header className={styles.header}>
                <img className={styles.logo} src="/public/assets/images/landing/landingLogo.png" alt="Logo"/>

                <ul className={styles.menu}>
                    <li><Link to="/">Vote</Link></li>
                    <li><Link to="/" onClick={(e) => this.menuClick(0, e)}>Community</Link></li>
                    <li><Link to="/" onClick={(e) => this.menuClick(1, e)}>Traders</Link></li>
                    <li><Link to="/" onClick={(e) => this.menuClick(2, e)}>Market Maker</Link></li>
                    <li><Link to="/" onClick={(e) => this.menuClick(3, e)}>Token Owners</Link></li>
                    <li><Link to="/" onClick={(e) => this.menuClick(4, e)}>Exchanges</Link></li>
                    <li><Link to="/" onClick={this.openXRRTokenModal.bind(this)}>Where to Buy</Link></li>
                </ul>

                <div className={styles.buttons}>
                    {/* <Button className="medium blue" onClick={() => history.push('/login')}>Login</Button> */}
                    <Button className="medium white" onClick={this.openPolicyModal.bind(this)}>Sign Up</Button>
                    <Button className="medium blue" onClick={() => history.push('/login')}>Sign In</Button>
                </div>
                <div className={styles.hamburger} onClick={() => this.mobileHeader.toggleMenu()}>
                <img src="/public/assets/images/icon-burger.svg"/>
                </div>
                <PublicHeaderMobile ref={r => this.mobileHeader = r}/>
                <PolicyModal isOpen={this.state.isOpenPolicyModal} onConfirm={this.onConfirmPolicy.bind(this)} onCancel={this.onCancelPolicy.bind(this)}/>
                <RegisterModal isOpen={this.state.isOpenRegisterThankyouModal} onCancel={this.cancelRegisterThankyouModal.bind(this)} width="600"/>
                <XrrtokenModal isOpen={this.state.isOpenXRRTokenModal} onCancel={this.cancelXRRTokenModal.bind(this)} width="600"/>
            </header>
        );

        return (
            <div className={styles.landingPage}>
                {/*<img className={styles.chatImage} src="/public/assets/images/Chat.png" />*/}
                {/* <DeploymentCountdown isOpen={true} onCancel={this.onCancelDeploymentCountdown.bind(this)} width="700"/> */}
                {/* <ExchangePoolModal isOpen={true} onCancel={this.onCancelExchangePoolModal.bind(this)} width="700" /> */}
                {/* <ShareModal isOpen={this.state.isShareModalOpen} onConfirm={this.openLoginModal.bind(this)} onCancel={this.onCancelShare.bind(this)} width="700"/> */}
                <LoginModal isOpen={this.state.isOnLoginModal} onCancel={this.onCancelLogin.bind(this)} width="700" />
                <BuyBackEventHeader />
                {Hearder}
                <div className={styles.zeroSection}>
                    <img className={styles.zeroSectionRightImage} src="/public/assets/images/landing/yellowHexa.png" />
                    <img className={styles.zeroSectionLeftImage} src="/public/assets/images/landing/blueLeftLines.png" />
                    <Slider {...settings}>
                        <div>
                            <div className={styles.zeroSectionContent}>
                                <div className={styles.textArea}>
                                    <span className={styles.zeroSectionTitle}>Traders :</span>
                                    <span className={styles.zeroSectionDesc}>
                                        Using advanced buy/sell attitudes algorithms
                                        traders can safely engage the markets for profitable
                                        trades.
                                    </span>
                                    <Button className={styles.zeroSectionButton + " medium blue"} onClick={() => history.push('/login')}>Sign In</Button>
                                </div>
                                <div className={styles.greenManWrapper}>
                                    <img className={styles.greenMan} src="/public/assets/images/landing/greenMan.png"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.zeroSectionContent}>
                                <div className={styles.textArea}>
                                    <span className={styles.zeroSectionTitle}>Exchanges :</span>
                                    <span className={styles.zeroSectionDesc}>
                                        We integrate Exchanges API to provide a reliable
                                        platform for Token Owners, Market Makers,
                                        Traders and community to provide liquidity.
                                    </span>
                                    <Button className={styles.zeroSectionButton + " medium blue"} onClick={() => history.push('/login')}>Sign In</Button>
                                </div>
                                <div className={styles.greenManWrapper}>
                                    <img className={styles.greenMan} src="/public/assets/images/landing/exchangeLanding.png"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.zeroSectionContent}>
                                <div className={styles.textArea}>
                                    <span className={styles.zeroSectionTitle}>Token Owners :</span>
                                    <span className={styles.zeroSectionDesc}>
                                        Why bother about volume/liquidity when
                                        you can engage a market maker for your
                                        tokens and focus on your project use case
                                        and community.
                                    </span>
                                    <Button className={styles.zeroSectionButton + " medium blue"} onClick={() => history.push('/login')}>Sign In</Button>
                                </div>
                                <div className={styles.greenManWrapper}>
                                    <img className={styles.greenMan} src="/public/assets/images/landing/token.png"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.zeroSectionContent}>
                                <div className={styles.textArea}>
                                    <span className={styles.zeroSectionTitle}>Market Makers :</span>
                                    <span className={styles.zeroSectionDesc}>
                                        Exchanges and Token Owners are on the
                                        look out to engage Market Makers for
                                        their liquidity needs.
                                    </span>
                                    <Button className={styles.zeroSectionButton + " medium blue"} onClick={() => history.push('/login')}>Sign In</Button>
                                </div>
                                <div className={styles.greenManWrapper}>
                                    <img className={styles.greenMan} src="/public/assets/images/landing/marketmaker.png"/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.zeroSectionContent}>
                                <div className={styles.textArea}>
                                    <span className={styles.zeroSectionTitle}>Community :</span>
                                    <span className={styles.zeroSectionDesc}>
                                        We listen to communities to determine
                                        what exchanges to integrate-for-free by
                                        voting..
                                    </span>
                                    <Button className={styles.zeroSectionButton + " medium blue"} onClick={() => history.push('/login')}>Sign In</Button>
                                </div>
                                <div className={styles.greenManWrapper}>
                                    <img className={styles.greenMan} src="/public/assets/images/landing/community.png"/>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className={styles.firstSection}>
                    <img className={styles.firstSectionRightImage} src="/public/assets/images/landing/whiteHexaRight2.png" />
                    <div className={styles.firstSectionContent}>
                        <div className={styles.videoWrapper}>
                            <iframe
                                src="https://www.youtube.com/embed/qhlWjbLDsgc?rel=0&amp;showinfo=0&amp;"
                                allowFullScreen
                                frameBorder={0}
                            />
                        </div>
                        <div className={styles.whitePaperWrapper}>
                            <img className={styles.whitePaperImage} src="/public/assets/images/landing/book.png"/>
                            <div className={styles.whitePaperDesc}>
                                <span className={styles.whitePaperDescTitle}>White Paper</span>
                                <span className={styles.whitePaperDescText}>Revised Edition Version 3.6</span>
                                <a href="/public/assets/pdf/White Paper.pdf" className={styles.pdfWrapper} download>
                                    <Button className={styles.whitePaperDescButton + " medium green"}>Download</Button>
                                </a>
                                {/* <Button className={styles.whitePaperDescButton + " medium green"} onClick={this.ComingSoonModal.bind(this)}>Download</Button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.secondSection}>
                    <img className={styles.secondSectionLeftImage} src="/public/assets/images/landing/whiteHexaLeft.png" />
                    <div className={styles.secondSectionContent}>
                        <div className={styles.secondSectionImageWrapper}>
                            <img className={styles.secondSectionImage} src="/public/assets/images/landing/exchange.png"/>
                        </div>
                        <div className={styles.secondSectionText}>
                            <span>
                                XchangeRate is a complete
                                ecosystem where exchanges,
                                token owners, market makers,
                                traders and their communities
                                engage to leverage advanced
                                algorithms to provide liquidity
                                and profitable trades.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.thirdSection}>
                    <img className={styles.thirdSectionRightImage} src="/public/assets/images/landing/whiteHexaRight.png" />
                    <img className={styles.thirdSectionLeftImage} src="/public/assets/images/landing/greyLeftLines.png" />
                    <div className={styles.thirdSectionContent}>
                        <div className={styles.thirdSectionItemWrapper}>
                            <div className={styles.thirdSectionItemImageWrapper}>
                                <img className={styles.thirdSectionItemImage} src="/public/assets/images/landing/communityIcon.png"/>
                            </div>
                            <div className={styles.thirdSectionItemDesc}>
                                <span className={styles.thirdSectionItemDescTitle}>Community</span>
                                <span className={styles.thirdSectionItemDescText}>Vote for your next exchange using XchangeRate Voting Credits</span>
                                <Button className={styles.thirdSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Login & SignUp</Button>
                            </div>
                        </div>
                        <div className={styles.thirdSectionItemWrapper}>
                            <div className={styles.thirdSectionItemDesc1}>
                                <span className={styles.thirdSectionItemDescTitle}>Traders</span>
                                <span className={styles.thirdSectionItemDescText}>Profitable Day Trading using powerful buy/sell attitude algorithms.</span>
                                <Button className={styles.thirdSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Login & SignUp</Button>
                            </div>
                            <div className={styles.thirdSectionItemImageWrapper}>
                                <img className={styles.thirdSectionItemImage} src="/public/assets/images/landing/traderIcon.png"/>
                            </div>
                        </div>
                        <div className={styles.thirdSectionItemWrapper}>
                            <div className={styles.thirdSectionItemImageWrapper}>
                                <img src="/public/assets/images/landing/marketmakerIcon.png"/>
                            </div>
                            <div className={styles.thirdSectionItemDesc}>
                                <span className={styles.thirdSectionItemDescTitle}>Market Makers</span>
                                <span className={styles.thirdSectionItemDescText}>Provide token liquidity to exchanges & token owners using powerful algorithms</span>
                                <Button className={styles.thirdSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Login & SignUp</Button>
                            </div>
                        </div>
                        <div className={styles.thirdSectionItemWrapper}>
                            <div className={styles.thirdSectionItemDesc1}>
                                <span className={styles.thirdSectionItemDescTitle}>Token owners</span>
                                <span className={styles.thirdSectionItemDescText}>Engage & Track your token liquidity providers uaing advanced reporting tools.</span>
                                <Button className={styles.thirdSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Login & SignUp</Button>
                            </div>
                            <div className={styles.thirdSectionItemImageWrapper}>
                                <img className={styles.thirdSectionItemImage} src="/public/assets/images/landing/tokenIcon.png"/>
                            </div>
                        </div>
                        <div className={styles.thirdSectionItemWrapper}>
                            <div className={styles.thirdSectionItemImageWrapper}>
                                <img src="/public/assets/images/landing/exchangeIcon.png"/>
                            </div>
                            <div className={styles.thirdSectionItemDesc}>
                                <span className={styles.thirdSectionItemDescTitle}>Exchanges</span>
                                <span className={styles.thirdSectionItemDescText}>Give your exchange the exposure to large crypto communities, traders, market makers, token owners all in one place by integrating into XchangeRate Platform</span>
                                <Button className={styles.thirdSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Login & SignUp</Button>
                            </div>
                        </div>
                        <div className={styles.thirdSectionBottomDesc}>
                            <span>
                                XchangeRate provides a platform where traders, market makers, token owners and exchanges collaborate for enhanced service delivery.
                            </span>
                        </div>
                        <div className={styles.thirdDivider}></div>
                    </div>
                </div>
                <div className={styles.forthSection}>
                    <img className={styles.forthSectionLeftImage} src="/public/assets/images/landing/blueHexa.png" />
                    <div className={styles.forthSectionContent}>
                    <Tabs>
                        <TabList className={styles.tabList}>
                            <Tab className={styles.tabItem + ' ' + styles.tabFirstItem}>Market Makers/ Traders</Tab>
                            <Tab className={styles.tabItem}>Market Makers/ Traders</Tab>
                            <Tab className={styles.tabItem}>Market Makers/ Traders</Tab>
                            <Tab className={styles.tabItem}>Market Makers/ Traders</Tab>
                            <Tab className={styles.tabItem}>Market Makers/ Traders</Tab>
                        </TabList>

                        <TabPanel>
                            <div className={styles.panelContent}>
                                <div className={styles.tabContent}>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallTrading1.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallTrading2.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Learn More</Button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={styles.panelContent}>
                                <div className={styles.tabContent}>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Learn More</Button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={styles.panelContent}>
                                <div className={styles.tabContent}>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Learn More</Button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={styles.panelContent}>
                                <div className={styles.tabContent}>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Learn More</Button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className={styles.panelContent}>
                                <div className={styles.tabContent}>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                    <div className={styles.tabContentItem}>
                                        <div className={styles.tabContentSubItem}>
                                            <img src="/public/assets/images/landing/smallLogin.png"/>
                                            <span>Sign up & Select an Offer</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className={styles.forthSectionItemDescButton + " medium blue"} onClick={() => history.push('/login')}>Learn More</Button>
                            </div>
                        </TabPanel>
                    </Tabs>
                    </div>
                </div>
                <div className={styles.fifthSection}>
                    <img className={styles.fifthSectionRightImage} src="/public/assets/images/landing/yellowRightLines.png" />
                    <div className={styles.fifthSectionContent}>
                        <div className={styles.fifthSectionContentTitle}>
                            <span>
                                Join the growing number of token liquidity expert worldwide
                            </span>
                        </div>
                        <div className={styles.fifthDivider}></div>
                        <div className={styles.fifthSectionContentItemWrapper}>
                            <div className={styles.fifthSectionContentItem}>
                                <div className={styles.fifthItemTitle}>
                                    Xchangerate.io
                                </div>
                                <div className={styles.fifthItemDesc}>
                                    started in February 2017 as an idea merely
                                        to assist traders monitor coins and other
                                        trading activities. Over the course of 15
                                        months, a group of small investors have
                                        contributed financial and sweat equity to
                                        build and upgrade the product from a mere
                                        coin monitoring board to a fully automated
                                        software that can both assist traders to buy
                                        and sell the best performing coins as well
                                        as perform those trades automatically. After
                                        a working prototype was built and tested by
                                        traders and developers for many months with
                                        consistent profits achieved in different
                                        market conditions, the core team decided
                                        it was time to share the product with the
                                        global market. To scale the product and
                                        expand it to many other commodities and
                                        derivatives, a crowdfunding process was
                                        initiated in the form of an Initial Coin
                                        Offering (ICO) where XRR tokens are exchanged
                                        for BTC or ETH. By the end of our crowdfunding
                                        event, we had forged strategic partnerships
                                        with some of the promising projects in the
                                        Blockchain/Crypto space with working prototypes.
                                        The notable partnerships include:
                                        ● Trade.io ● Plaak.com ● Pecun.io ● Viso.global
                                        ● Amon.tech ● Dice.money We believe that these
                                        partnerships will make us stronger and more set to
                                        impact the crypto space with a synergy of creative
                                        ideas and solutions implementation. Post TGE, we
                                        commenced a robust upgrade of our platform to
                                        bring in more players in the token economy,
                                        thus creating utility and demand for our token.
                                </div>
                                <div className={styles.fifthItemMore}>
                                    <span>More about</span>
                                </div>
                            </div>
                            <div className={styles.fifthSectionContentItem}>
                                <div className={styles.fifthItemTitle}>
                                    Understanding the stakeholders in our ecosystem
                                </div>
                                <div className={styles.fifthItemDesc}>
                                        Traders function like retailers in a traditional
                                        marketplace because they buy for the purpose of
                                        making profit. They use our augmented intelligence
                                        and auto-trading bots to scalp profits, even in
                                        bear markets  Traders At the early stage of a project
                                        where adoption is still in its infancy or when a
                                        token is newly listed on an exchange, the  role of
                                        the market maker seems indispensable. The market
                                        maker undertakes to buy or sell tokens to anyone that
                                        approaches the exchange at all times. This ensures
                                        liquidity and maintains the relationship between the
                                        token owner and the exchange in good standing.
                                        Market Makers They are project owners who need
                                        liquidity for their tokens  Token Owners Exchanges
                                        represent the market place. They provide the
                                        framework,  platform and conditions that govern
                                        and facilitate trading.
                                        Exchanges  (especially the new ones) require a
                                        lot of liquidity as well. Based on market demand, we
                                        leveraged and expanded some of our algorithms to create
                                        a solution that completes our ecosystem and creates profit
                                        for all our stakeholders.  Our XchangeRate Market Maker & Taker
                                        (MaTa) change a lot of things for crypto enthusiasts.
                                        It will bring liquidity and volume to token owners and
                                        exchanges, while rewarding our stakeholders too
                                </div>
                                <div className={styles.fifthItemMore}>
                                    <span>More about</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.fifthSectionContentTitle}>
                            <span>
                                Our Partners
                            </span>
                        </div>
                        <div className={styles.fifthDivider}></div>
                        <div className={styles.fifthSectionContentPartnerWrapper}>
                            <div className={styles.fifthSectionContentPartnerTop}>
                                <img className={styles.fifthPartnerImage} src="/public/assets/images/landing/pecunioLogo.png" />
                                <img className={styles.fifthPartnerImage} src="/public/assets/images/landing/diceLogo.png" />
                                <img className={styles.fifthPartnerImage} src="/public/assets/images/landing/plaakLogo.png" />
                            </div>
                            <div className={styles.fifthSectionContentPartnerBottom}>
                                <img className={styles.fifthPartnerImage} src="/public/assets/images/landing/amonLogo.png" />
                                <img className={styles.fifthPartnerImage} src="/public/assets/images/landing/tradeLogo.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    {/* <div className={styles.topFooterMenuWrapper}>
                        <div className={styles.topLeftMenuWrapper}>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">Help and Contact</Link></li>
                                <li><Link to="/">Fees</Link></li>
                                <li><Link to="/public/help">Security</Link></li>
                                <li><Link to="/public/help">Features</Link></li>
                                <li><Link to="/public/help">Shop</Link></li>
                            </ul>
                        </div>
                        <div className={styles.topRightMenuWrapper}>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">English</Link></li>
                                <li><Link to="/">Russian</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.secondFooterMenuWrapper}>
                        <div className={styles.secondLeftMenuWrapper}>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">About</Link></li>
                                <li><Link to="/">Blog</Link></li>
                                <li><Link to="/public/help">Jobs</Link></li>
                                <li><Link to="/public/help">Site Map</Link></li>
                                <li><Link to="/public/help">Developers</Link></li>
                                <li><Link to="/public/help">Partners</Link></li>
                            </ul>
                        </div>
                        <div className={styles.secondRightMenuWrapper}>
                            <span className={styles.copyright}>© 1999-2018</span>
                            <ul className={styles.footerMenu}>
                                <li><Link to="/">Privacy</Link></li>
                                <li><Link to="/">Legal</Link></li>
                                <li><Link to="/public/help">Feedback</Link></li>
                            </ul>
                        </div>
                    </div> */}
                    <div className={styles.footerDesc}>
                        {/* <span>
                            SMART CONTRACT ADDRESS
                        </span> */}
                        <span>
                            {/* 0x0e75235647330b5e13cad9115254c4b8e16272f8 */}
                        </span>
                        <span className={styles.disclaimer}>DISCLAIMER</span>
                        <span className={styles.disclaimerDesc}>
                            The information provided by Think Al Inc. (“we,” “us” or “our”)
                            on xchangerate.io (“the Site”) is for general informational
                            purposes only. While we certify that the highest level of
                            diligence and research were involved in the hints, suggestions
                            and algorithms provided by the Xchangerate robot, we make no
                            representation or warranty of any kind, express or implied,
                            regarding the accuracy, adequacy, validity, reliability,
                            availability or completeness of any information on the Site.
                            Under no circumstance shall we have any liability to any user
                            or subscriber on the Site for any loss or damage of any kind
                            incurred as a result of the use of or reliance on any information
                            provided on the Site. Your use of the Site and your reliance on
                            any information on the site is solely at your own risk.
                        </span>
                    </div>
                </div>
                <div id="message-panel-parent">
                   <ChatPanel />
                </div>
                <MenuModal isOpen={this.state.isMenuModalOpen} onCancel={this.onMenuModalCancel.bind(this)} width="800" defaultTab={this.state.defaultTab}/>
                {/* coming soon modal */}
                {/* <Modal isOpen={this.state.isComingSoonModal} noFooter={true} noHeader={true} onCancel={this.onComingModalCancel.bind(this)} width={700} transparent={5} >
                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={this.onComingModalCancel.bind(this)}/>
                    <div className={styles.comingsoon}>Coming Soon</div>
                </Modal> */}
            </div>

        );
    }
}
