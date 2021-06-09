import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import root from './root';
import loginReducers from 'Components/PublicPages/Login/reducers';
import signupReducers from 'Components/PublicPages/Signup/reducers';
import publicBlogReducers from 'Components/PublicPages/Blog/reducers';
import publicPricingReducers from 'Components/PublicPages/Pricing/reducers';
import globalMessageReducers from 'Components/GlobalMessage/reducers';
import globalTooltipReducers from 'Components/GlobalTooltip/reducers';
import verifyEmailReducers from 'Components/PublicPages/VerifyEmail/reducers';
import forgotPasswordReducers from 'Components/PublicPages/ForgotPassword/reducers';
import twoFactorReducers from 'Components/PublicPages/Login/TwoFactor/reducers';
import setupDetailsReducers from 'Components/SetupDetails/reducers';
import marketMakerSettingReducers from 'Components/MarketMakerSetting/reducers';
import marketMakerReducers from 'Components/MarketMaker/reducers';
import exchangesReducers from 'Components/Exchanges/reducers';
import tokenOwnersReducers from 'Components/TokenOwners/reducers';
import shareReducers from 'Components/Share/reducers';
import processReducers from 'Components/Admin/Settings/reducers';
import historyReducers from 'Components/AutobotHistoryModal/reducers';
import manualTradingRobotReducers from 'Components/ManualTradingRobot/reducers';
import buySellReducers from 'Components/ManualTradingRobot/BuySell/reducers';
import suggestionsTableReducers from 'Components/ManualTradingRobot/SuggestionsTable/reducers';
import tradesTableReducers from 'Components/ManualTradingRobot/TradesTable/reducers';
import WatchListReducers from 'Components/ManualTradingRobot/WatchList/reducers';
import watchListSellingReducers from 'Components/ManualTradingRobot/WatchList/Selling/reducers';
import watchListBuyingReducers from 'Components/ManualTradingRobot/WatchList/Buying/reducers';
import autobotSettingReducers from 'Components/AutobotSettingModal/reducers';
import autobotTradesReducers from 'Components/AutobotTradingModal/reducers';
import autobotBillingReducers from 'Components/AutobotBillingModal/reducers';
// -- Revert --//
import contactReducers from 'Components/PublicPages/Contact/reducers';
import helpReducers from 'Components/Help/reducers';
import mainHeaderReducers from 'Components/MainHeader/reducers';
import exchangeAccountSettingsReducers from 'Partials/ManageExchangeAccounts/reducers';
import AccountInformationReducers from 'Components/MyAccount/AccountInformation/reducers';
import CMBSettingReducers from 'Components/MyAccount/CMBSettings/reducers';
import robotSettingsReducers from 'Components/MyAccount/RobotSettings/reducers';
import SubscribeReducers from 'Components/Subscribe/reducers';
import AssignManagerReducers from 'Components/AssignManager/reducers';
import initTradesReducers from 'Components/ManualTrading/InitTrades/reducers';
import walletIdReducers from 'Components/WalletId/reducers';
import ActivateRobot from 'Components/Manager/StrategySetup/ActivateRobot/reducers';
import billingHistoryReducers from 'Components/MyAccount/BillingHistory/reducers';
import platformFeaturesReducers from 'Components/MyAccount/PlatformFeatures/reducers';
import mentorProgramReducers from 'Components/MyAccount/MentorProgram/reducers';
import importFromExchangeReducers from 'Components/ManualTrading/InitTrades/ImportFromExchange/reducers';
import importManuallyReducers from 'Components/ManualTrading/InitTrades/ImportManually/reducers';
import importFromSheetReducers from 'Components/ManualTrading/InitTrades/ImportFromSheet/reducers';
import heartbeatReducers from 'Components/Heartbeat/reducers';
// import dashboardReducers from 'Components/Dashboard/reducers';
// import tradesReducers from 'Components/Dashboard/Trades/reducers';
import exitStrategyReducers from 'Components/ExitStrategy/reducers';
import dataListTableReducers from 'Components/Admin/DataManagement/DataListTable/reducers';
import adminBlogFormReducers from 'Components/Admin/DataManagement/Blog/BlogForm/reducers';
import adminArticleFormReducers from 'Components/Admin/DataManagement/Article/ArticleForm/reducers';
import adminFaqFormReducers from 'Components/Admin/DataManagement/Faq/FaqForm/reducers';
import globalStrategyReducers from 'Components/Admin/Settings/GlobalStrategy/reducers';
import questionnaireReducers from 'Components/Admin/Settings/Questionnaire/reducers';
import exchangeAccountsReducers from 'Components/Admin/Settings/ExchangeAccounts/reducers';
import messageCenterReducers from 'Components/Admin/MessageCenter/reducers';
import adminBillingReducers from 'Components/Admin/Settings/Billing/reducers';
import adminReferralBonusesReducers from 'Components/Admin/Settings/ReferralBonuses/reducers';
// import subscribersBaseReducers from 'Components/Admin/Subscribers/reducers';
import managersListReducers from 'Components/Admin/ManagersBase/ManagersList/reducers';
import adminExecutionReducers from 'Components/Admin/Execution/reducers';
import executionReducers from 'Components/Execution/reducers';
import exchangeAccountsDropdownReducers from 'Partials/ExchangeAccountsDropdown/reducers';
import adminVotingReducers from 'Components/Admin/VotingSetup/reducers';
import roleListReducers from 'Components/Dashboard/RoleChangeModal/reducers';
//-- end --//


export default combineReducers({
  root,
  routing: routerReducer,
  form: formReducer,
  login: loginReducers,
  twoFactor: twoFactorReducers,
  globalMessage: globalMessageReducers,
  globalTooltip: globalTooltipReducers,
  verifyEmail: verifyEmailReducers,
  setupDetails: setupDetailsReducers,
  forgotPassword: forgotPasswordReducers,
  signup: signupReducers,
  publicBlog: publicBlogReducers,
  publicPricing: publicPricingReducers,
  marketMakerSetting: marketMakerSettingReducers,
  marketMaker: marketMakerReducers,
  tokenOwners: tokenOwnersReducers,
  exchanges: exchangesReducers,
  shareData: shareReducers,
  adminVote: adminVotingReducers,
  adminProcessData: processReducers,
  autobotHistoryData: historyReducers,
  manualTradingRobot: manualTradingRobotReducers,
  buySell: buySellReducers,
  suggestionsTable: suggestionsTableReducers,
  tradesTable: tradesTableReducers,
  watchList: WatchListReducers,
  watchListSelling: watchListSellingReducers,
  watchListBuying: watchListBuyingReducers,
  roleList: roleListReducers,

  //-- Revert --//
  contact: contactReducers,
  help: helpReducers,
  mainHeader: mainHeaderReducers,
  exchangeAccountSettings: exchangeAccountSettingsReducers,
  accountInformation: AccountInformationReducers,
  cmbSetting: CMBSettingReducers,
  subscribe: SubscribeReducers,
  assignManager: AssignManagerReducers,
  walletId: walletIdReducers,
  activateRobot: ActivateRobot,
  initTrades: initTradesReducers,
  importFromExchange: importFromExchangeReducers,
  importManually: importManuallyReducers,
  importFromSheet: importFromSheetReducers,
  billingHistory: billingHistoryReducers,
  platformFeatures: platformFeaturesReducers,
  mentorProgram: mentorProgramReducers,
  heartbeat: heartbeatReducers,
  // dashboard: dashboardReducers,
  // trades: tradesReducers,
  exitStrategy: exitStrategyReducers,
  dataListTable: dataListTableReducers,
  adminBlogForm: adminBlogFormReducers,
  adminFaqForm: adminFaqFormReducers,
  adminArticleForm: adminArticleFormReducers,
  globalStrategy: globalStrategyReducers,
  questionnaire: questionnaireReducers,
  exchangeAccounts: exchangeAccountsReducers,
  messageCenter: messageCenterReducers,
  adminBilling: adminBillingReducers,
  adminReferralBonuses: adminReferralBonusesReducers,
  // subscribersBase: subscribersBaseReducers,
  managersList: managersListReducers,
  adminExecution: adminExecutionReducers,
  execution: executionReducers,
  robotSettings: robotSettingsReducers,
  exchangeAccountsDropdown: exchangeAccountsDropdownReducers,

  autobotSetting: autobotSettingReducers,
  autobotTrades: autobotTradesReducers,
  autobotBilling: autobotBillingReducers
});
