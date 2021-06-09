import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { WatchCoin } from 'Models/WatchCoin';
import { showMessage } from 'Components/GlobalMessage/actions';
import { openExitStrategy } from 'Components/ExitStrategy/actions';
import { updateCoins } from './Buying/actions';
import { exitStrategySet } from 'Utils/auth';
import {
  WATCH_LIST_ADD,
  WATCH_LIST_ADD_CANCEL,
  WATCH_LIST_ADD_STATUS,
  WATCH_LIST_ADD_SWITCH_TAB,
  WATCH_LIST_UPDATE_COIN,
  WATCH_LIST_UPDATE_STATUS,
  WATCH_LIST_UPDATE_CANCEL,
} from './types';

const MSG_WATCH_COIN = {};
const MSG_UPDATE_COIN = {};

export const addCoin2WatchList = (coin: string) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_ADD, coin));
  };
};

export const cancelWatch = () => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_ADD_CANCEL));
    dispatch(createAction(WATCH_LIST_UPDATE_CANCEL));
  };
};

export const updateCoin = (coin: WatchCoin) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_UPDATE_COIN, coin));
    dispatch(createAction(WATCH_LIST_UPDATE_STATUS, Status.createProgressing()));
  };
};

export const watch = (values, coin, activeExchangeAccount) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_ADD_STATUS, {
      loading: true,
      progressing: true,
    }));
    api.watchCoin({
      ...values,
      coin: coin.coin,
      exchange: activeExchangeAccount.exchange_id,
      exchange_account_id: activeExchangeAccount.id,
    }).then((response) => {
      dispatch(showMessage(`You have watched the coin ${coin.coin} successfully.`, 'success', MSG_WATCH_COIN));
      dispatch(createAction(WATCH_LIST_ADD_STATUS, Status.createSuccess()));
      dispatch(createAction(WATCH_LIST_ADD_CANCEL));
      if (!exitStrategySet()) {
        dispatch(openExitStrategy({}, 'WatchCoin'));
      }
    }).catch(message => {
      dispatch(showMessage(message, 'error', MSG_WATCH_COIN));
      dispatch(createAction(WATCH_LIST_ADD_STATUS, Status.createProgressing()));
    });
  };
};

export const confirmUpdate = (coin, values, coins = []) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_UPDATE_STATUS, {
      loading: true,
      progressing: true,
    }));
    api.updateWatchCoin(coin.id, values)
      .then(() => {
        dispatch(showMessage(`You have updated the rules successfully.`, 'success', MSG_UPDATE_COIN));
        dispatch(createAction(WATCH_LIST_UPDATE_STATUS, Status.createSuccess()));
        dispatch(createAction(WATCH_LIST_UPDATE_CANCEL));
        coin.interval = values.interval;
        coin.email = values.send_email;
        coin.sms = values.send_sms;
        coin.execute = values.execute_buy;
        coin.rule = values;
        dispatch(updateCoins(coins));
      })
      .catch((message) => {
        dispatch(showMessage(message, 'error', MSG_UPDATE_COIN));
        dispatch(createAction(WATCH_LIST_UPDATE_STATUS, Status.createProgressing()));
      });
  };
};

export const switchTab = (tab) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_ADD_SWITCH_TAB, tab));
  };
};
