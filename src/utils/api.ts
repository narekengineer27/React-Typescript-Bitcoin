import axios from 'axios';
import * as _ from 'lodash';
import { User } from 'Models/User';
import { Country } from 'Models/Country';
import { City } from 'Models/City';
import { Currency } from 'Models/Currency';
import { CurrencyRate } from 'Models/CurrencyRate';
import { Meta } from 'Models/Meta';
import { Exchange } from 'Models/Exchange';
import { ExchangeAccount } from 'Models/ExchangeAccount';
import { CMBSettings } from 'Models/CMBSettings';
import { Trade } from 'Models/Trade';
import { ContactMessage } from 'Models/ContactMessage';
import { HelpArticle } from 'Models/HelpArticle';
import { BillingHistoryEntry } from 'Models/BillingHistoryEntry';
import { ReferralsData } from 'Models/ReferralsData';
import { BlogArticle } from 'Models/BlogArticle';
import { PackageData } from 'Models/PackageData';
import { UserPackage } from 'Models/UserPackage';
import { Package } from 'Models/Package';
import { LiveActivation } from 'Models/LiveActivation';
import { TestActivation } from 'Models/TestActivation';
import { RobotSettings } from 'Models/RobotSettings';
import { SetupDetails } from 'Models/SetupDetails';
import { Offer } from 'Models/Offer';
import { ReferralBonusPaid, ReferralBonusUnpaid } from 'Models/ReferralBonus';

type DataPromise<T> = Promise<{ data: T; meta?: Meta }>;

const env = require('Root/env.json');
const messages = require('Constants/messages.json');

// For APIs without authorization.
const xapi = axios.create({
  baseURL: env.apiHost,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

const getSingleErrorMessage = (error) => {
  const singleMessage = error;
  if (_.isObject(error)) {
    const errorMessage = _.values(error);
    let flatten = [];
    errorMessage.forEach(m => {
      flatten = flatten.concat(m);
    });
    return flatten.join(', ');
  }
  return singleMessage;
};

export const signOutLocal = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('user');
  localStorage.removeItem('api_key');
  localStorage.removeItem('version');
};

const onFulfilled = (response) => {
  const status = _.get(response, 'data.status', '');
  if (!status) {
    return Promise.reject(messages.invalidAPIResponse);
  }
  if (status === 'failed') {
    let error = _.get(response, 'data.error', messages.generalErrorMessage);
    return Promise.reject(getSingleErrorMessage(error));
  }
  return _.get(response, 'data', {});
};

const onError = (err) => {
  const error = _.get(err, 'response.data.error', messages.generalErrorMessage);
  const errorMessage = getSingleErrorMessage(error);
  if (errorMessage.toLowerCase() === 'unauthorized') {
    signOutLocal();
    window.location.href = '#/login';
  }
  return Promise.reject(errorMessage);
};
// Verify the response format
xapi.interceptors.response.use(onFulfilled, onError);

export const heartbeat = () => {
  return xapi.get('/heartbeat?polling');
};

export const login = (email: string, password: string) => {
  return xapi.post('/auth/user-login', { email, password });
};

export const getRoles = () => {
  return xapi.get(`/role-list`);
};

export const verifyEmail = (emailToken: string) => {
  return xapi.get(`/userverify/${emailToken}`);
};

export const getProcesses = () => {
  return authXapi().get(`/admin/get-processes`);
};

export const saveProcess = (name: string) => {
  return authXapi().post('/admin/save-process', {name});
};

export const getProcessSettings = () => {
  return authXapi().get(`/admin/get-process-settings`);
};

export const saveProcessSetting = (id:string, data) => {
  return authXapi().post(`/admin/save-process-setting/${id}`, data);
};

export const tokenConfirm = (id: string) => {
  return authXapi().get(`/token-confirm/${id}`);
};

export const setupDetails = (data: SetupDetails) => {
  return authXapi().post(`/user-setup`, data);
};

export const updateSetupDetails = (id:string, data: SetupDetails) => {
  return authXapi().post(`/user-setup/${id}`, data);
};

export const getSetupDetails = (id: string) => {
  return authXapi().get(`/user-setup/${id}`);
};
// HISTORY
export const getFilteredHistory = (filter: string) => {
  return authXapi().post(`history/get-filtered-history`, {filter: filter});
};

// Token Credit
export const saveTokenWalletAddress = (wallet) => {
  return authXapi().post(`/referrals/wallet-id`, {wallet_id: wallet});
};

export const getTokenCredit = () => {
  return authXapi().get(`/token-balance`);
};

export const getExchangeBalance = () => {
  return authXapi().get(`/exchange-balance`);
};

// Voting

export const getVoteList = () => {
  // return authXapi().get(`/voting/list`);
  return authXapi().get(`/exchange-voting-list`); 
};

export const generateVote = (data) => {
  return authXapi().post(`/user-voting`, data);
};

export const adminVotingSetup = (data) => {
  return authXapi().post(`/admin/voting-setup`, data);
};

export const adminVotingSetupUpdate = (id, data) => {
  return authXapi().post(`/admin/voting-setup/${id}`, data);
};

export const adminVoteList = () => {
  return authXapi().get(`/admin/voting-setup-list`);
};

// AUTOBOT SETTING START
export const setAutobotSetting = (data) => {
  return authXapi().post(`/autobot-setting`, data);
};
// AUTOBOT SETTING END

// BILLING
export const getXrrPrice = () => {
  return authXapi().get(`billing/get-xrr-price`);
};

// ACTIVE EXCHANGE AUTOBOT ACCOUNT
export const activateAutobotAccount = (data) => {
  return authXapi().post(`user-exchange/activate-account`, data);
};

// MM SECTION
export const marketMakerExchangeCoinList = (exchange: string) => {
  return authXapi().get(`/market-maker/coin-list/${exchange}`);
};

export const marketMakerCoinList = () => {
  return authXapi().get(`/market-maker/coin`);
};

export const marketmakerexchanges = () => {
  return authXapi().get(`/market-maker/exchange-list`);
};

export const marketmakerMarketMakerList = () => {
  return authXapi().get(`/market-maker/market-maker-list`);
};

export const marketmakerTradeList = (id: string) => {
  return authXapi().get(`/market-maker/trade-list/${id}`);
};

export const addMarketMaker = (data: any) => {
  return authXapi().post(`/market-maker`, data);
};

export const addMarketMakerTradeSetting = (data: any) => {
  return authXapi().post(`/market-maker/trade-setting`, data);
};

export const updateMarketMakerTradeSetting = (id: string, data: any) => {
  return authXapi().post(`/market-maker/trade-setting/${id}`, data);
};

export const getMarketMakerBalance = (data: any) => {
  return authXapi().post(`/market-maker/get-balance`, data);
};

export const startLoop = (id: string, data: any) => {
  return authXapi().post(`/market-maker/start-loop/${id}`, data);
};

export const userPhotoChange = (data: any) => {
  return authXapi().post('/users/photostore', data);
}


// MM SECTION

//Role Change
export const roleList = () => {
  return authXapi().get(`/roleList`);
};

export const roleChange = (data:any) => {
  return authXapi().post(`/roleChange`, data);
};


//
export const getAllOffer = (id: string) => {
  return authXapi().get(`/all-offer/${id}`);
};

export const baseCoin = () => {
  return authXapi().get(`/base-coin`);
};

export const incomingOffer = (id: string, status: boolean) => {
  return authXapi().post(`/incoming-offer/${id}`, {status: status});
};

export const counterOffer = (data: Offer) => {
  return authXapi().post(`/counter-offer`, data);
};

export const addTradeSetting = (data: any) => {
  return authXapi().post(`/trade-settings`, data);
}

export const sendResetPasswordEmail = (email: string) => {
  return xapi.post('/auth/reset-password', { email });
};

export const resetPassword = (token: string, password: string) => {
  return xapi.post('/auth/confirm-reset-password', { token, password, password_confirm: password });
};

export const signup = (user: User) => {
  return xapi.post('/auth/user-signup', { ...user, role_id: user.referral });
};

export const saveAccountSettings = (user: User) => {
  return authXapi().put('/users/current', { ...user });
};

export const getAccountSettings = () => {
  return authXapi().get('/users/current');
};

export const saveTwoFactor = (enabled_2fa: number) => {
  return authXapi().post('/users/2fa', { enabled_2fa });
};

export const verify2faCode = (data) => {
  return authXapi().post('/auth/2fa', data);
};

export const countries = () => {
  return xapi.get('/countries') as DataPromise<Country[]>;
};

// Cache the very last request
let citiesCache = { country: '', city: '', data: [] as City[] };

export const cities = (country, city) => {
  if (citiesCache.country === country && citiesCache.city === city) {
    return Promise.resolve({ data: citiesCache.data });
  }

  const meta = new Meta();
  meta.page.limit = 20;
  meta.filter = { country, city };
  return xapi.get(decorateApi('/cities', meta))
    .then(response => {
      citiesCache = { country, city, data: response.data };
      return response;
    }) as DataPromise<City[]>;
};

export const currencies = () => {
  return xapi.get('/currencies') as DataPromise<Currency[]>;
};

export const contactUs = (message: ContactMessage) => {
  message.phone = '-';
  return xapi.post('/contact-us', message);
};

export const help = (search?: string): DataPromise<HelpArticle[]> => {
  const meta = new Meta();
  meta.filter = { search };
  return xapi.get(decorateApi('/faq', meta));
};

export const blogArticles = (page: number): DataPromise<BlogArticle[]> => {
  const meta = new Meta();
  meta.setActivePage(page);
  meta.page.limit = 6;
  meta.sort = '-date_posted';

  return xapi.get(decorateApi('/blog', meta)) as any;
};

export const blogArticle = (slug: string): DataPromise<BlogArticle[]> => {
  const meta = new Meta();
  meta.filter = { slug };
  meta.page.limit = 1;

  return xapi.get(decorateApi('/blog', meta))
    .then(response => {
      if (!response.data || response.data.length === 0) {
        throw new Error('The article was not found');
      } else {
        return { data: response.data[0] };
      }
    });
};

/**
 * These APIs below require authorization.
 */

// For APIs with authorization.
const authXapi = (() => {
  let xapi = null;
  return () => {
    if (!xapi || xapi.defaults.headers.Authorization !== `Bearer ${localStorage.getItem('api_key')}`) {
      xapi = axios.create({
        baseURL: env.apiHost,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('api_key')}`,
        },
      });
      xapi.interceptors.response.use(onFulfilled, onError);
    }
    return xapi;
  };
})();

// For APIs with page/sort/filter.
const decorateApi = (api: string, meta = new Meta()) => {
  const parameters = [];
  const pageKeys = Object.keys(meta.page);
  for (const field of pageKeys) {
    parameters.push(`page[${field}]=${meta.page[field]}`);
  }
  parameters.push(`sort=${meta.sort}`);
  const filterKeys = Object.keys(meta.filter);
  for (const field of filterKeys) {
    parameters.push(`filter[${field}]=${meta.filter[field]}`);
  }
  parameters.push(`mode=${meta.mode || 'active'}`);
  return `${api}?${parameters.join('&')}`;
};

export const signOut = () => {
  return authXapi().post('/auth/logout');
};

export const suggestions = (meta = new Meta()) => {
  return authXapi().get(decorateApi('/suggestions', meta));
};

export const singleTrades = (id) => {
  return authXapi().get(`/single-trades/${id}`);
};

export const multiTrades = (ids) => {
  return authXapi().post(`/multi-trades`, {'ids': ids});
};

export const trades = (meta = new Meta()) => {
  return authXapi().get(decorateApi('/trades', meta) + '&polling');
};

export const updateTrade = (trade: Trade) => {
  return authXapi().patch(`/trades/${trade.id}`, {
    target_price: trade.target_price,
    current_shrink_differential: trade.current_shrink_differential,
    target_shrink_differential: trade.target_shrink_differential
  });
};

export const updateTradeTarget = (id: number, target: number) => {
  return authXapi().patch(`/trades/${id}`, {
    target_price: target,
  });
};

export const deleteTrade = (tradeId: number) => {
  return authXapi().delete(`/trades/${tradeId}`);
};

export const currencyRates = () => {
  const meta = new Meta();
  meta.page.limit = 1000;
  return authXapi().get(decorateApi('/currency-rates', meta)) as DataPromise<CurrencyRate[]>;
};

export const sellOrder = (data) => {
  return authXapi().post('sell-order', {...data});
}

export const buyOrder = (data) => {
  return authXapi().post('buy-order', {...data});
}
// export const buy = (data, mode: string) => {
//   return authXapi().post(`/buy?mode=${mode}`, { ...data });
// };

// export const sell = (data: {
//                        exchange_account_id: number; trade_id: number;
//                        target_coin_id: string; base_coin_id: string; quantity: number; rate: number
//                      },
//                      mode: string) => {

//   return authXapi().post(`/sell?mode=${mode}`, { ...data });
// };

export const cancelOrder = (data: { exchange_account_id: number; trade_id: number; }, mode: string) => {
  return authXapi().post(`/cancel?mode=${mode}`, { ...data });
};

export const exchanges = () => {
  return authXapi().get('/exchanges') as DataPromise<Exchange[]>;
};

export const exchangeAccounts = () => {
  return authXapi().get('/exchange-accounts') as DataPromise<ExchangeAccount[]>;
};

export const deleteExchangeAccount = (accountId: number) => {
  return authXapi().delete(`/exchange-accounts/${accountId}`) as Promise<{}>;
};

export const createExchangeAccount = (account: ExchangeAccount) => {
  return authXapi().post('/exchange-accounts', account) as DataPromise<ExchangeAccount>;
};

export const updateExchangeAccount = (account: ExchangeAccount) => {
  return authXapi().patch(`/exchange-accounts/${account.id}`, account) as DataPromise<ExchangeAccount>;
};

export const total = (exchangeId, mode) => {
  return authXapi().get(`/trades/total/${exchangeId}?mode=${mode}`);
};

export const btc2usd = () => {
  return authXapi().get('/coins/convert/BTC/USD');
};

export const saveCMBSettings = (setting: CMBSettings) => {
  return authXapi().patch(`/users/current/settings`, setting) as DataPromise<CMBSettings>;
};

export const saveRobotSettings = (exchangeAccountId, settings: RobotSettings) => {
  return authXapi().patch(`/exchange-accounts/${exchangeAccountId}`, settings) as DataPromise<RobotSettings>;
};

export const getCoins = (symbol) => {
  const meta = new Meta();
  meta.page.limit = 20;
  if (symbol && symbol[0] && !_.isEmpty(symbol)) {
    meta.filter = { symbol };
  }
  return authXapi().get(decorateApi('/coins', meta)) as DataPromise<object[]>;
};

export const getCMBSettings = () => {
  return authXapi().get('/users/current/settings') as DataPromise<CMBSettings>;
};

export const getRobotSettings = () => {
  return authXapi().get('/users/current/settings') as DataPromise<RobotSettings>;
};

/**
 * Billing
 */

export const pricing = () => {
  return authXapi().get('/pricing') as DataPromise<Package[]>;
};

export const billingPackageData = () => {
  return authXapi().get('/billing/package-data') as DataPromise<PackageData>;
};

export const billingScratchCode = (code: string) => {
  return authXapi().post('/billing/scratch-code', { code });
};

export const billingUserPackage = () => {
  return authXapi().get('/billing/user-package') as DataPromise<UserPackage>;
};

export const billingCheckTestActivation = () => {
  return authXapi().get('/billing/check-test-activation') as DataPromise<TestActivation>;
};

export const billingActivateLiveMode = (exchange: string) => {
  return authXapi().post('/billing/activate-live-mode', { exchange }) as DataPromise<{}>;
};

export const billingCheckLiveActivation = () => {
  return authXapi().get('/billing/check-live-activation') as DataPromise<LiveActivation>;
};

export const billingTestPurchase = (package_id: number, quantity: number, exchange?: string) => {
  return authXapi().post('/billing/test-purchase',
    { package_id, quantity, exchange }) as DataPromise<{}>;
};

export const billingHistory = () => {
  return authXapi().get('/billing/history') as DataPromise<BillingHistoryEntry[]>;
};

export const adminPackages = () => {
  return authXapi().get('/admin/package/list') as DataPromise<Package[]>;
};

export const adminUpdatePackage = (pack: Package) => {
  return authXapi().put(`/admin/package/${pack.id}`, { price: pack.price, enabled: pack.enabled });
};

export const adminUpdateFeature = (pack: Package) => {
  return authXapi().put('/admin/package/feature', { emails: pack.emails, sms: pack.sms });
};

/* Referrals */

export const referrals = () => {
  return authXapi().get('referrals/list') as DataPromise<ReferralsData>;
};

export const setReferralsWalletId = (walletId: string) => {
  return authXapi().post('/referrals/wallet-id', { wallet_id: walletId });
};

export const referralUrl = () => {
  return authXapi().get('/referrals/url') as DataPromise<{ url: string }>;
};

export const token_balance = () => {
  return authXapi().get('/token-balance') as DataPromise<{ url: string }>;
};

export const adminReferralsUsers = (meta = new Meta()) => {
  return authXapi().get(decorateApi('admin/referrals/users', meta)) as DataPromise<ReferralBonusUnpaid[]>;
};

export const adminReferralsUsersPaid = (meta = new Meta()) => {
  return authXapi().get(decorateApi('admin/referrals/users/paid', meta)) as DataPromise<ReferralBonusPaid[]>;
};

export const adminReferralsUsersSetPaid = (user_id: number, last_date: string) => {
  return authXapi().post('admin/referrals/users', { user_id, last_date });
};

/**
 * Wrapped APIs of exchanges.
 */

export const getLowestAsk = (exchange: string, coin: string) => {
  return authXapi().get(`/market-order/${exchange}/${coin}`)
    .then(response => {
      if (!response.data || response.data.length === 0) {
        throw Error('The coin is not available for trading.');
      }
      const item = response.data[0];
      return { quantity: Number(item.amount), rate: Number(item.price) };
    });
};

export const getHighestBid = (exchange: string, coin: string) => {
  return authXapi().get(`/market-order/sell/${exchange}/${coin}`)
    .then(response => {
      if (!response.data || response.data.length === 0) {
        throw Error('The coin is not available for trading.');
      }
      const item = response.data[0];
      return { quantity: Number(item.amount), rate: Number(item.price) };
    });
};

export const walletId = (walletId: string) => {
  return authXapi().post('/walletId', { walletId });
};

export const fetchWatchList = (exchangeId, meta = new Meta(), type = null) => {
  return authXapi().get(decorateApi(`/watchlist/${exchangeId}`, meta) + (type ? `&type=${type}` : ''));
};

/**
 * WatchList APIs
 */

export const watchCoin = (data: { interval: string, coin: string, exchange: string }) => {
  return authXapi().post(`/watchlist`, { ...data });
};

export const updateWatchCoin = (id, data) => {
  return authXapi().put(`/watchlist/${id}/rule`, data);
};

export const updateWatchList = (id, data) => {
  return authXapi().put(`/watchlist/${id}`, data);
};

export const fetchWatchListHistory = (id) => {
  return authXapi().get(`/watchlist/${id}/history`);
};

export const importTradesCredential = (credential: object) => {
  return Promise.resolve();
};

export const removeCoin = (watchlistId: number) => {
  return authXapi().delete(`/watchlist/${watchlistId}`) as Promise<{}>;
};

export const saveStrategy = (id: number, mode: string, values: object) => {
  return authXapi().post(`/watchlist/sell?mode=${mode}`, { trade_id: id, ...values });
};

export const updateStrategy = (id: number, values: object) => {
  return authXapi().put(`/watchlist/${id}/sell`, values);
};

export const fetchSellingWatchListRule = (id) => {
  return authXapi().get(`watchlist/${id}/sell/rule`);
};

export const getGlobalStrategy = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve({ data: {} });
      },
      1000);
  });
};

export const saveGlobalStrategy = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve();
      },
      1000);
  });
};

export const saveQuestionnaire = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        resolve();
      },
      1000);
  });
};

export const getRichDataRecords = (meta, type: string) => {
  return authXapi().get(decorateApi(`/admin/${type}`, meta));
};

export const removeRichDataRecord = (id: number, type: string) => {
  return authXapi().delete(`/admin/${type}/${id}`);
};

export const addRichDataRecord = (values, type: string) => {
  return authXapi().post(`/admin/${type}`, values);
};

export const getRichDataRecord = (id, type: string) => {
  return authXapi().get(`/admin/${type}/${id}`);
};

export const publishRichDataRecord = (id: number, type: string) => {
  return authXapi().put(`/admin/${type}/${id}/publish`);
};

export const unpublishRichDataRecord = (id: number, type: string) => {
  return authXapi().put(`/admin/${type}/${id}/unpublish`);
};

export const addFaq = (values) => {
  return authXapi().post('/admin/faq', values);
};

export const getCycles = (exchangeAccountId) => {
  return authXapi().get(`/round/${exchangeAccountId}`);
};

export const activateRobot = (exchangeAccountId) => {
  return authXapi().post(`/round/start`, { exchange_account_id: exchangeAccountId });
};

export const stopRobot = (exchangeAccountId) => {
  return authXapi().post('/round/stop', { exchange_account_id: exchangeAccountId });
};

export const getRobotTrades = (exchangeAccountId, meta = new Meta()) => {
  return authXapi().get(decorateApi('/trades', meta) + `&exchange_account_id=${exchangeAccountId}&robot=true`);
};

export const updateRecord = (id: number, values, type) => {
  return authXapi().put(`/admin/${type}/${id}`, values);
};

export const uploadFile = (fileObj) => {
  const data = new FormData();
  data.append(`file`, fileObj);
  return authXapi().post('/admin/file', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getGaQr = () => {
  return authXapi().get('/users/qr');
};

export const verifyGoogleAuthenticationConfirmCode = (code: number, secret) => {
  return authXapi().post('/users/qr', {
    code,
    secret,
  });
};
