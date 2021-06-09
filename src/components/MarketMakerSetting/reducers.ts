import { User } from 'Models/User';
import { Status } from 'Models/Status';
import { 
    TOTAL_SUMMARY_CHECK, 
    MARKET_MAKER_EXCHANGE_LIST, 
    MARKET_MAKER_EXCHANGE_LIST_SUCCESS, 
    MARKET_MAKER_EXCHANGE_LIST_FAILED, 
    MARKET_MAKER_COIN_LIST, 
    MARKET_MAKER_COIN_LIST_FAILED, 
    MARKET_MAKER_COIN_LIST_SUCCESS,
    MARKET_MAKER_LIST,
    MARKET_MAKER_LIST_FAILED,
    MARKET_MAKER_LIST_SUCCESS,
    SAVE_MARKET_MAKER_LIST_FAILED,
    SAVE_MARKET_MAKER_LIST_SUCCESS,
    SAVE_MARKET_MAKER_LIST,
    MARKET_MAKER_TRADE_LIST,
    MARKET_MAKER_TRADE_LIST_SUCCESS,
    MARKET_MAKER_TRADE_LIST_FAILED,
    START_LOOP_FAILED,
    START_LOOP_SUCCESS,
    START_LOOP,
    GET_MARKET_MAKER_BALANCE_FAILED,
    GET_MARKET_MAKER_BALANCE_SUCCESS,
    GET_MARKET_MAKER_BALANCE,
    UPDATE_MARKET_MAKER_TRADE_FAILED,
    UPDATE_MARKET_MAKER_TRADE_SUCCESS,
    UPDATE_MARKET_MAKER_TRADE,
    ADD_MARKET_MAKER_TRADE_FAILED,
    ADD_MARKET_MAKER_TRADE_SUCCESS,
    ADD_MARKET_MAKER_TRADE
 } from 'Components/MarketMakerSetting/types';

export default (state, action) => {
  switch (action.type) {
    case TOTAL_SUMMARY_CHECK:
      return {
        ...state,
        totalSummaryCheck: action.payload
      };
    case MARKET_MAKER_EXCHANGE_LIST:
      return {
          ...state,
          exchangeList: {
              exchanges: [],
              status: {
                  loading: true
              }
            }
      }
    case MARKET_MAKER_EXCHANGE_LIST_SUCCESS:
        return {
            ...state,
            exchangeList: {
                exchanges: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case MARKET_MAKER_EXCHANGE_LIST_FAILED:
        return {
            ...state,
            exchangeList: {
                exchanges: [],
                status: {
                    loading: false, error: true
                }
            }
        }

    case MARKET_MAKER_COIN_LIST:
        return {
            ...state,
            coinList: {
                coins: [],
                status: {
                    loading: true
                }
                }
      }
    case MARKET_MAKER_COIN_LIST_SUCCESS:
        return {
            ...state,
            coinList: {
                coins: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case MARKET_MAKER_COIN_LIST_FAILED:
        return {
            ...state,
            coinList: {
                coins: [],
                status: {
                    loading: false, error: true
                }
            }
        }
    case MARKET_MAKER_LIST:
      return {
          ...state,
          marketmakerList: {
              marketmakers: [],
              status: {
                  loading: true
              }
            }
      }
    case MARKET_MAKER_LIST_SUCCESS:
        return {
            ...state,
            marketmakerList: {
                marketmakers: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case MARKET_MAKER_LIST_FAILED:
        return {
            ...state,
            marketmakerList: {
                marketmakers: [],
                status: {
                    loading: false, error: true
                }
            }
        }
    case SAVE_MARKET_MAKER_LIST:
      return {
          ...state,
          marketmakerList: {
              ...state,
              status: {
                  loading: true
              }
            }
      }
    case SAVE_MARKET_MAKER_LIST_SUCCESS:
        return {
            ...state,
            marketmakerList: {
                marketmakers: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case SAVE_MARKET_MAKER_LIST_FAILED:
        return {
            ...state,
            marketmakerList: {
                ...state,
                status: {
                    loading: false, error: true
                }
            }
        }
    case MARKET_MAKER_TRADE_LIST:
        return {
            ...state,
            marketmakerTradeList: {
                trades: [],
                status: {
                    loading: false, error: true
                }
            }
        } 
    case MARKET_MAKER_TRADE_LIST_SUCCESS:
        return {
            ...state,
            marketmakerTradeList: {
                trades: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case MARKET_MAKER_TRADE_LIST_FAILED:
        return {
            ...state,
            marketmakerTradeList: {
                trades: [],
                status: {
                    loading: false, error: true
                }
            }
        } 
    case ADD_MARKET_MAKER_TRADE:
        return {
            ...state,
            addMarketmakerTrade: {
                trades: [],
                status: {
                    loading: false, error: true
                }
            }
        } 
    case ADD_MARKET_MAKER_TRADE_SUCCESS:
        return {
            ...state,
            addMarketmakerTrade: {
                trades: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case ADD_MARKET_MAKER_TRADE_FAILED:
        return {
            ...state,
            addMarketmakerTrade: {
                trades: [],
                status: {
                    loading: false, error: true
                }
            }
        }
    case UPDATE_MARKET_MAKER_TRADE:
        return {
            ...state,
            updateMarketmakerTrade: {
                trades: [],
                status: {
                    loading: false, error: true
                }
            }
        } 
    case UPDATE_MARKET_MAKER_TRADE_SUCCESS:
        return {
            ...state,
            updateMarketmakerTrade: {
                trades: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case UPDATE_MARKET_MAKER_TRADE_FAILED:
        return {
            ...state,
            updateMarketmakerTrade: {
                trades: [],
                status: {
                    loading: false, error: true
                }
            }
        }
    case GET_MARKET_MAKER_BALANCE:
        return {
            ...state,
            marketmakerbalance: {
                balance: {},
                status: {
                    loading: false, error: true
                }
            }
        } 
    case GET_MARKET_MAKER_BALANCE_SUCCESS:
        return {
            ...state,
            marketmakerbalance: {
                balance: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case GET_MARKET_MAKER_BALANCE_FAILED:
        return {
            ...state,
            marketmakerbalance: {
                balance: {},
                status: {
                    loading: false, error: true
                }
            }
        }
    case START_LOOP:
        return {
            ...state,
            startLoop: {
                data: {},
                status: {
                    loading: false, error: true
                }
            }
        } 
    case START_LOOP_SUCCESS:
        return {
            ...state,
            startLoop: {
                data: action.payload,
                status: {
                    loading: false, success: true
                }
            }
        }
    case START_LOOP_FAILED:
        return {
            ...state,
            startLoop: {
                data: {},
                status: {
                    loading: false, error: true
                }
            }
        }
    default:
      return {
        ...state,
      };
  }
};
