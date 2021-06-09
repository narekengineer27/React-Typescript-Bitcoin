import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { showMessage, hideAllMessages } from 'Components/GlobalMessage/actions';

const MSG_SUCCESS = {};

import {
  EXECUTION_TRADES_DATA,
  EXECUTION_TRADES_STATUS,
  EXECUTION_DEACTIVATE_ROBOT_STATUS,
} from './types';

export const fetchTrades = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_TRADES_STATUS, Status.createLoading()));
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const mock = [{
          coin_sold: 'Ethereum(ETH)',
          price_bought: '0.0008996',
          time: '12:46',
          frugility_ratio: '75%',
        }, {
          coin_bought: 'BitCoin(BTC)',
          price_bought: '0.0002',
          time: '15:46',
          frugility_ratio: '85%',
        }, {
          coin_sold: 'Ethereum(ETH)',
          price_bought: '0.0008996',
          time: '12:46',
          frugility_ratio: '75%',
        }, {
          coin_bought: 'BitCoin(BTC)',
          price_bought: '0.0002',
          time: '15:46',
          frugility_ratio: '85%',
        }, {
          coin_sold: 'Ethereum(ETH)',
          price_bought: '0.0008996',
          time: '12:46',
          frugility_ratio: '75%',
        }, {
          coin_sold: 'Ethereum(ETH)',
          price_bought: '0.0008996',
          time: '12:46',
          frugility_ratio: '75%',
        }, {
          coin_bought: 'BitCoin(BTC)',
          price_bought: '0.0002',
          time: '15:46',
          frugility_ratio: '85%',
        }];
        dispatch(createAction(EXECUTION_TRADES_DATA, mock));
        dispatch(createAction(EXECUTION_TRADES_STATUS, Status.createSuccess()));
        resolve(mock);
      }, 1000);
    });
  };
};

export const openDeactivateRobot = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_DEACTIVATE_ROBOT_STATUS, Status.createProgressing()));
  };
};

export const cancelDeactivate = () => {
  return (dispatch) => {
    dispatch(createAction(EXECUTION_DEACTIVATE_ROBOT_STATUS, new Status()));
  };
};

export const confirmDeactivate = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(EXECUTION_DEACTIVATE_ROBOT_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(EXECUTION_DEACTIVATE_ROBOT_STATUS, new Status()));
      dispatch(showMessage('Successfully!', 'success', MSG_SUCCESS));
    }, 1000);
  };
};
