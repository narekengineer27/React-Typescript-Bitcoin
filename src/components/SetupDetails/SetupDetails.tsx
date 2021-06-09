import * as React from 'react';
import MarketMakerForm from 'Components/SetupDetails/MarketMaker/MarketMakerForm';
import TokenOwnersForm from 'Components/SetupDetails/TokenOwners/TokenOwnersForm';
import ExchangesForm from 'Components/SetupDetails/Exchanges/ExchangesForm';
import CommunityForm from 'Components/SetupDetails/Community/Community';
import TradersForm from 'Components/SetupDetails/Traders/Traders';
import SectionHeader from 'Partials/SectionHeader';
import 'Styles/table.less';
import Button from 'Elements/Button';
import SettingsPanel from 'Partials/SettingsPanel';
import { RouteComponentProps } from 'react-router';
import PublicPageLayout from 'Partials/PublicPageLayout';
import { confirm, exchanges, baseCoins } from './actions';
import { Status } from 'Models/Status';
import { connect } from 'react-redux';

const styles = require('./setup-details.css');

export enum MenuTabs {
  MarketMaker = 'market-maker',
  TokenOwners = 'token-owners',
  Exchanges = 'exchanges',
  Traders = 'traders',
  Community = 'community'
}




// const menus = [
// {
//   label: 'Community',
//   value: MenuTabs.Community,
//   title: 'Community',
//   control: CommunityForm,
// }, {
//   label: 'Traders',
//   value: MenuTabs.Traders,
//   title: 'Traders',
//   control: TradersForm,
// },{
//   label: 'Market Maker',
//   value: MenuTabs.MarketMaker,
//   title: 'Market Maker',
//   control: MarketMakerForm,
// }, {
//   label: 'Token Owners',
//   value: MenuTabs.TokenOwners,
//   title: 'Token Owners',
//   control: TokenOwnersForm,
// }, {
//   label: 'Exchanges',
//   value: MenuTabs.Exchanges,
//   title: 'Exchanges',
//   control: ExchangesForm,
// }];

interface TokenConfirmParams {
  id?: string;
  tab: string;
}

interface SetupDetailsProps extends RouteComponentProps<TokenConfirmParams> {
  status?: Status;
  confirm?: (id: string) => void;
  exchanges?: () => void;
  baseCoins?: () => void;
}

class SetupDetails extends React.Component<SetupDetailsProps, any> {

  constructor(props: SetupDetailsProps) {
    super(props);
    this.state = {
      activateRobotBlock: true,
      strategySetup: true,
      hasBorder: false,
      activateRobotIsOpen: false
    };
  }

  componentDidMount() {
    // this.props.confirm("3");
    this.props.exchanges();
    this.props.baseCoins();
  }

  render() {
    const { match, history } = this.props;
    let roleId = 5;

    if(localStorage.getItem('user')) {
      roleId = JSON.parse(localStorage.getItem('user')).role_id;
    }

    var menus = [];

    switch (roleId) {
      case 1:
        menus = [
          {
            label: 'Community',
            value: MenuTabs.Community,
            title: 'Community',
            control: CommunityForm,
          }, {
            label: 'Traders',
            value: MenuTabs.Traders,
            title: 'Traders',
            control: TradersForm,
          }, {
            label: 'Market Maker',
            value: MenuTabs.MarketMaker,
            title: 'Market Maker',
            control: MarketMakerForm,
          }, {
            label: 'Token Owners',
            value: MenuTabs.TokenOwners,
            title: 'Token Owners',
            control: TokenOwnersForm,
          }, {
            label: 'Exchanges',
            value: MenuTabs.Exchanges,
            title: 'Exchanges',
            control: ExchangesForm,
          }
        ];
        break;
      case 2:
        menus = [
          {
            label: 'Community',
            value: MenuTabs.Community,
            title: 'Community',
            control: CommunityForm,
          }, {
            label: 'Traders',
            value: MenuTabs.Traders,
            title: 'Traders',
            control: TradersForm,
          }, {
            label: 'Market Maker',
            value: MenuTabs.MarketMaker,
            title: 'Market Maker',
            control: MarketMakerForm,
          }, {
            label: 'Token Owners',
            value: MenuTabs.TokenOwners,
            title: 'Token Owners',
            control: TokenOwnersForm,
          }
        ];
        break;
      case 3:
        menus = [
          {
            label: 'Community',
            value: MenuTabs.Community,
            title: 'Community',
            control: CommunityForm,
          }, {
            label: 'Traders',
            value: MenuTabs.Traders,
            title: 'Traders',
            control: TradersForm,
          }, {
            label: 'Market Maker',
            value: MenuTabs.MarketMaker,
            title: 'Market Maker',
            control: MarketMakerForm,
          }
        ];
        break;
      case 4:
        menus = [
          {
            label: 'Community',
            value: MenuTabs.Community,
            title: 'Community',
            control: CommunityForm,
          }, {
            label: 'Traders',
            value: MenuTabs.Traders,
            title: 'Traders',
            control: TradersForm,
          }
        ];
        break;
      case 5:
        menus = [
          {
            label: 'Community',
            value: MenuTabs.Community,
            title: 'Community',
            control: CommunityForm,
          }
        ];
        break;
      default:
        menus = [
          {
            label: 'Community',
            value: MenuTabs.Community,
            title: 'Community',
            control: CommunityForm,
          }
        ];
        break;
    }
    
    let activeMenuIndex = menus.findIndex(menu => menu.value === match.params.tab);
    if (activeMenuIndex < 0) {
      activeMenuIndex = 0;
    }
    const activeMenu = menus[activeMenuIndex];
    const Control = activeMenu.control;

    return (
      // <PublicPageLayout footerHidden>
        <div className={`container-fluid ` + styles.wrapper}>
          <SectionHeader
            hasBorder={false}
            iconBackCustomClass={styles.iconBackCustomClass}
            headingTextCustomClass={styles.headingTextCustomClass}
            sectionHeaderCustomClass={styles.sectionHeaderCustomClass}
            title="Setup Details"
          />
          <div className={styles.content}>
            <SettingsPanel
              activeIndex={activeMenuIndex}
              menus={menus}
              onChange={(menu) => history.push('/setup-details/' + menu.value)}
            // configuration={robotConfiguration}
            >
              <div className={styles.page}>
                <Control />
              </div>
            </SettingsPanel>
          </div>
        </div>
      // </PublicPageLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  status: state.setupDetails.status as Status,
});

const mapDispatchToProps = {
  confirm,
  exchanges,
  baseCoins
};

type Props = RouteComponentProps<{ tab: string }>;

export default connect(mapStateToProps, mapDispatchToProps)(SetupDetails);
