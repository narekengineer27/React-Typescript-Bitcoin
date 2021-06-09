import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import GlobalMessage from 'Components/GlobalMessage';
import GlobalTooltip from 'Components/GlobalTooltip';
import ResetPassword from 'Components/PublicPages/ForgotPassword/ResetPassword';
import Signup from 'Components/PublicPages/Signup';
import SignupSuccess from 'Components/PublicPages/Signup/SignupSuccess';
import VerifyEmail from 'Components/PublicPages/VerifyEmail';
import SetupDetails from 'Components/SetupDetails';
// import Welcome from 'Components/Welcome';
import { isAuthenticated, isAdmin } from 'Utils/auth';
import Landing from 'Components/PublicPages/Landing';
import Pricing from 'Components/PublicPages/Pricing/Pricing';
import Blog from 'Components/PublicPages/Blog';
import BlogArticle from 'Components/PublicPages/Blog/Article';
import TwoFactor from 'Components/PublicPages/Login/TwoFactor';
import PublicExchanges from 'Components/PublicPages/Exchanges';
import { getUserField } from 'Utils/auth';
import ManualTradingRobot from 'Components/ManualTradingRobot';
import { createHashHistory } from 'history';
import ForgotPassword from 'Components/PublicPages/ForgotPassword';
import Login from 'Components/PublicPages/Login';
import Exchanges from 'Components/Exchanges';
import MainHeader from 'Partials/MainHeader';
import MarketMaker from 'Components/MarketMaker';
import TokenOwners from 'Components/TokenOwners';
import DataDashboard from 'Components/Admin/DataDashboard';
import AdminExchanges from 'Components/Admin/Exchanges';
import MarketMakerSetting from 'Components/MarketMakerSetting';
import Chart from 'Components/PublicPages/Chart';
import ComingSoon from 'Components/ComingSoon';
import TokenOwnerDashboard from 'Components/Dashboard/TokenOwner';
import MarketMakerDashboard from 'Components/Dashboard/MarketMaker';
import ExchangesDashboard from 'Components/Dashboard/Exchanges';
import TraderDashboard from 'Components/Dashboard/Trader';
import CommunityDashboard from 'Components/Dashboard/Community';
import ChatLogin from 'Components/ChatPanel/ChatLogin';
import Authentication from 'Components/Authentication';
import AdminSettings from 'Components/Admin/Settings';
import PreSignup from 'Components/PublicPages/Signup/PreSignup';
import VotingSetup from 'Components/Admin/VotingSetup';
// import BuyBackEvent from 'Components/BuyBackEvent';

//-- Revert --//
import Heartbeat from 'Components/Heartbeat';
import Help from 'Components/Help';
import MyAccount from 'Components/MyAccount';
import FeaturesVerifier from 'Components/MyAccount/PlatformFeatures/FeaturesVerifier';
import Welcome from 'Components/Welcome';
import SubscriptionPlan from 'Components/Subscribe';
import AssignManager from 'Components/AssignManager';
import StrategySetup from 'Components/Manager/StrategySetup';
import WalletId from 'Components/WalletId';
import InitExchangeAccounts from 'Components/InitExchangeAccounts';
import InitTrades from 'Components/ManualTrading/InitTrades';
import PublicContact from 'Components/PublicPages/Contact';
import PublicHelp from 'Components/PublicPages/Help';
import DataManagement from 'Components/Admin/DataManagement';
import Settings from 'Components/Admin/Settings';
import MessageCenter from 'Components/Admin/MessageCenter';
// import Subscribers from 'Components/Admin/Subscribers';
import ManagersBase from 'Components/Admin/ManagersBase';
import AdminExecution from 'Components/Admin/Execution';
import Execution from 'Components/Execution';
import VerifyEmailResult from 'Components/PublicPages/VerifyEmail/VerifyEmailResult';
//-- end --//
const env = require('Root/env.json');
(window as any).Intercom("boot", {
  app_id: env.intercomChatKey,
  name: getUserField('name'),
  email: getUserField('email'),
  city: getUserField('city'),
  country: getUserField('country'),
  phone: getUserField('phone'),
});

export const history = createHashHistory();


const Layout = (props) => (
  <div>
    <MainHeader {...props}/>
    {props.children}
  </div>
);

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Layout path={path}>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}
  />
);

const ContentRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
          <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}
  />
);

const AdminRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Layout path={path}>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}
  />
);

const SetupRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
      )
    )}
  />
);

let userJson = localStorage.getItem('user');

let id = 5;

if(isAuthenticated()) {
  id = JSON.parse(userJson)['role_id'];
}

var dashboardUrls = [
  'exchanges',
  'token-owner',
  'market-maker',
  'trader',
  'community'
];

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated() ? (
        <Redirect to={{ pathname: '/dashboard/' + dashboardUrls[id-1], state: { from: props.location } }}/>
      ) : (
        <Component {...props} />
      )
    )}
  />
);

export default () => (
  <div>
    <Switch>
      {/* Routes that are available only to logged-out users */}
      <PublicRoute path="/login" exact component={Login}/>
      <PublicRoute path="/chatlogin" exact component={ChatLogin}/>
      <PublicRoute path="/pre-signup" exact component={PreSignup}/>
      <PublicRoute path="/signup/:referral?" exact component={Signup}/>
      <PublicRoute path="/signup-success" exact component={SignupSuccess}/>
      <PublicRoute path="/forgot-password" exact component={ForgotPassword}/>
      <PublicRoute path="/reset-password/:emailToken" exact component={ResetPassword}/>
      <PublicRoute path="/verify-email" exact component={VerifyEmail}/>
      <PublicRoute path="/verify-email/:emailToken?" exact component={VerifyEmailResult}/>
      <PublicRoute path="/two-factor" exact component={TwoFactor}/>
      <PublicRoute path="/public-exchanges" exact component={PublicExchanges}/>
      <PublicRoute path="/chart" exact component={Chart}/>
      <PublicRoute path="/coming-soon" exact component={ComingSoon}/>
      <PrivateRoute path="/setup-details/:tab?" exact component={SetupDetails}/>
      <PrivateRoute path="/exchanges" exact component={Exchanges}/>
      <PrivateRoute path="/market-maker" exact component={MarketMaker}/>
      <PrivateRoute path="/token-owners" exact component={TokenOwners}/>
      <PrivateRoute path="/market-maker-setting" exact component={MarketMakerSetting}/>
      <PrivateRoute path="/dashboard/token-owner" exact component={TokenOwnerDashboard}/>
      <PrivateRoute path="/dashboard/market-maker" exact component={MarketMakerDashboard}/>
      <PrivateRoute path="/dashboard/exchanges" exact component={ExchangesDashboard}/>
      <PrivateRoute path="/dashboard/trader" exact component={TraderDashboard}/>
      <PrivateRoute path="/dashboard/community" exact component={CommunityDashboard}/>      
      <ContentRoute path="/authentication" exact component={Authentication}/>
      {/* <ContentRoute path="/buy-back-event" exact component={BuyBackEvent}/> */}
      
      {/* Routes that are available only to logged-in users */}
      <PrivateRoute path="/mtr/:board?/:type?" exact component={ManualTradingRobot}/>
      <PrivateRoute path="/my-account/:tab?/:cmbForm?" exact component={MyAccount}/>
      <PrivateRoute path="/help" exact component={Help}/>
      <PrivateRoute path="/welcome" exact component={Welcome}/>
      <PrivateRoute path="/subscribe" exact component={SubscriptionPlan}/>
      <PrivateRoute path="/assign-manager" exact component={AssignManager}/>
      <PrivateRoute path="/wallet-id" exact component={WalletId}/>
      <PrivateRoute path="/init-exchange-accounts" exact component={InitExchangeAccounts}/>
      <PrivateRoute path="/init-trades" exact component={InitTrades}/>
      <PrivateRoute path="/strategy-setup/:tab?" exact component={StrategySetup}/>
      <PrivateRoute path="/execution" exact component={Execution}/>
      
      {/* Routes that are available only to admin users */}
      <AdminRoute path="/admin/data-dashboard" exact component={DataDashboard}/>
      <AdminRoute path="/admin/exchanges" exact component={AdminExchanges}/>
      <AdminRoute path="/admin/settings" exact component={AdminSettings}/>
      <AdminRoute path="/admin/data-management/:modelType?/:actionType?/:id?" exact component={DataManagement}/>
      <AdminRoute path="/admin/settings/:tab?/:section?" exact component={Settings}/>
      <AdminRoute path="/admin/message-center" exact component={MessageCenter}/>
      {/* <AdminRoute path="/admin/subscribers" exact component={Subscribers}/> */}
      <AdminRoute path="/admin/managers-base/:tab?" exact component={ManagersBase}/>
      <AdminRoute path="/admin/execution" exact component={AdminExecution}/>

      {/* Routes that are available for all */}
      <Route path="/admin/voting-setup" exact component={VotingSetup}/>
      <Route path="/:referral?" exact component={Landing}/>
      <Route path="/public/pricing" exact component={Pricing}/>
      <Route path="/public/help" exact component={PublicHelp}/>
      <Route path="/public/contact" exact component={PublicContact}/> 
      {/* <Route path="/public/blog" exact component={Blog}/> */}
      <Route path="/public/blog/page/:page" exact component={Blog}/>
      <Route path="/public/blog/article/:slug" exact component={BlogArticle}/>
    </Switch>
    <Route component={GlobalMessage}/>
    <GlobalTooltip/>
  </div>
);
