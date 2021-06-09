import * as api from 'Utils/api';
import * as _ from 'lodash';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { Meta } from 'Models/Meta';
import { round } from 'Utils/math';
import {
  EXECUTION_ACTIVITY_STATUS,
  EXECUTION_ACTIVITY_STATUS_LOADING,
  EXECUTION_ACTIVITY_LAST_SYNC_TIME,
  EXECUTION_STOP_STATUS,
  EXECUTION_ACTIVITY_TRADES,
  EXECUTION_ACTIVITY_PROFIT,
  EXECUTION_CYCLES_STATUS,
  EXECUTION_CYCLES_DATA,
  EXECUTION_CYCLES_ROBOT_ACTIVE,
  EXECUTION_CYCLES_ROBOT_STATUS,
  EXECUTION_CYCLES_LAST_SYNC_TIME,
  EXECUTION_CONFIGURATION_STATUS,
  EXECUTION_CONFIGURATION_DATA,
  EXECUTION_SHARE_STATUS,
  EXECUTION_CLEAR,
} from './types';
import { showMessage } from 'Components/GlobalMessage/actions';

const MSG_FAILED = {};

export const updateLastSyncTime = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_ACTIVITY_LAST_SYNC_TIME));
  };
};

export const fetchTrades = (exchangeAccountId:number, meta:Meta = new Meta(), oldTrades = [], silent = false) => {
  return (dispatch) => {
    !silent && dispatch(createAction(EXECUTION_ACTIVITY_STATUS, {
      loading: true,
      progressing: true,
    }));
    meta.page.limit = 10000;
    api.getRobotTrades(exchangeAccountId, meta)
      .then(response => {
        const data = _.get(response, 'data', []);
        const maxCycle = data.length > 0 ? (_.maxBy(data, (t) => {
          return t.cycle;
        }).cycle + 1) : 0;
        const trades = _.range(maxCycle).map(cycle => ([]));
        data.forEach(t => (trades[t.cycle].push(t)));

        if (response.meta) {
          response.meta.mode = meta.mode;
        }

        const tradesHash = {};
        oldTrades.forEach(trade => {
          tradesHash[trade.id] = trade;
        });

        const newTrades = response.data || [];
        newTrades.forEach(newTrade => {
          const oldTrade = tradesHash[newTrade.id];
          if (tradesHash.hasOwnProperty(newTrade.id)) {
            ['profit'].forEach(field => {
              const oldValue = oldTrade[field] || 0;
              const newValue = newTrade[field] || 0;
              if (oldValue !== newValue) {
                newTrade[field + '_diff'] = newValue - oldValue;
              } else {
                newTrade[field + '_diff'] = oldTrade[field + '_diff'] || 0;
              }
            });
          }
        });

        let totalProfit = 0;
        let totalProfitInBtc = 0;
        data.filter(trade => trade.status.toLowerCase() === 'sold').forEach(trade => {
          totalProfit += +trade.cumulative_profit_local_currency;
          totalProfitInBtc += +trade.coin_profit_btc;
        });

        dispatch(createAction(EXECUTION_ACTIVITY_PROFIT, {
          totalProfit: round(totalProfit),
          totalProfitInBtc: round(totalProfitInBtc),
        }));
        silent && dispatch(createAction(EXECUTION_ACTIVITY_LAST_SYNC_TIME));
        dispatch(createAction(EXECUTION_ACTIVITY_TRADES, trades));
        !silent && dispatch(createAction(EXECUTION_ACTIVITY_STATUS_LOADING, false));
      });
  };
};

export const clearData = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_CLEAR));
  };
};

export const openActivity = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_ACTIVITY_STATUS, Status.createProgressing()));
  };
};

export const cancelActivity = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_ACTIVITY_STATUS, new Status()));
  };
};

export const openStop = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_STOP_STATUS, Status.createProgressing()));
  };
};

export const confirmStop = (exchangeAccountId:number) => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_STOP_STATUS, {
      loading: true,
      progressing: true,
    }));
    api.stopRobot(exchangeAccountId)
      .then(response => {
        dispatch(createAction(EXECUTION_STOP_STATUS, Status.createSuccess()));
        dispatch(fetchCycles(exchangeAccountId));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_FAILED));
        dispatch(createAction(EXECUTION_STOP_STATUS, new Status()));
      });

  };
};

export const cancelStop = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_STOP_STATUS, new Status()));
  };
};

export const fetchCycles = (exchangeAccountId:number, silent = false) => {
  return (dispatch) => {
    !silent && dispatch(createAction(EXECUTION_CYCLES_STATUS, {
      loading: true,
      progressing: true,
    }));
    api.getCycles(exchangeAccountId)
      .then(response => {
        const data = response.data || {};
        data.current_cycle = data.current_cycle === null ? data.cycle_count : data.current_cycle + 1;

        dispatch(createAction(EXECUTION_CYCLES_DATA, data));
        dispatch(createAction(EXECUTION_CYCLES_ROBOT_ACTIVE, data.active));
        silent && dispatch(createAction(EXECUTION_CYCLES_LAST_SYNC_TIME));
        !silent && dispatch(createAction(EXECUTION_CYCLES_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_FAILED));
        dispatch(createAction(EXECUTION_CYCLES_STATUS, new Status()));
      });
  };
};

export const openActivation = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_CYCLES_ROBOT_STATUS, Status.createProgressing()));
  };
};

export const cancelActivation = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_CYCLES_ROBOT_STATUS, new Status()));
  };
};

export const activateRobot = (exchangeAccountId) => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_CYCLES_ROBOT_STATUS, {
      loading: true,
      progressing: true,
    }));

    api.activateRobot(exchangeAccountId)
      .then(response => {
        dispatch(createAction(EXECUTION_CYCLES_ROBOT_ACTIVE, true));
        dispatch(createAction(EXECUTION_CYCLES_ROBOT_STATUS, Status.createSuccess()));
        dispatch(fetchCycles(exchangeAccountId));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_FAILED));
        dispatch(createAction(EXECUTION_CYCLES_ROBOT_STATUS, new Status()));
      });
  };
};

export const fetchConfigurationData = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_CONFIGURATION_STATUS, Status.createLoading()));
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const mock = {
          id: '0',
          percentage_profit: '12%',
          number_of_days: '25',
          number_of_coins: '520',
          frugality_ratio_threshold: '10%',
          target_score_threshold: 0.1651,
        };
        dispatch(createAction(EXECUTION_CONFIGURATION_DATA, mock));
        dispatch(createAction(EXECUTION_CONFIGURATION_STATUS, Status.createSuccess()));
        resolve(mock);
      }, 1000);
    });
  };
};

export const openConfiguration = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_CONFIGURATION_STATUS, Status.createProgressing()));
  };
};

export const cancelConfiguration = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_CONFIGURATION_STATUS, new Status()));
  };
};

export const openShare = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_SHARE_STATUS, Status.createProgressing()));
  };
};

export const cancelShare = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_SHARE_STATUS, new Status()));
  };
};
