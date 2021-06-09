import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { SetupDetails } from 'Models/SetupDetails';
import {
  TOKEN_CONFIRM,
  TOKEN_CONFIRM_FAILURE,
  TOKEN_CONFIRM_SUCCESS,
  SETUP_DETAILS,
  SETUP_DETAILS_FAILURE,
  SETUP_DETAILS_SUCCESS,
  EXCHANGE_LIST,
  BASE_COIN_LIST,
  TOKEN_OWNERS_OFFERS,
  TOKEN_OWNERS_OFFERS_FAILURE,
  TOKEN_OWNERS_OFFERS_SUCCESS,
  MARKET_MAKER_OFFERS,
  MARKET_MAKER_OFFERS_FAILURE,
  MARKET_MAKER_OFFERS_SUCCESS,
  EXCHANGES_OFFERS,
  EXCHANGES_OFFERS_FAILURE,
  EXCHANGES_OFFERS_SUCCESS,
  MARKET_MAKER_SETUP_DETAILS,
  MARKET_MAKER_SETUP_DETAILS_SUCCESS,
  MARKET_MAKER_SETUP_DETAILS_FAILURE,
  EXCHANGES_SETUP_DETAILS,
  EXCHANGES_SETUP_DETAILS_SUCCESS,
  EXCHANGES_SETUP_DETAILS_FAILURE,
  TOKEN_OWNERS_SETUP_DETAILS_FAILURE,
  TOKEN_OWNERS_SETUP_DETAILS_SUCCESS,
  TOKEN_OWNERS_SETUP_DETAILS,
  FETCH_VOTE_LIST,
  FETCH_VOTE_LIST_SUCCESS,
  FETCH_VOTE_LIST_FAILED,
  OCCURE_VOTING,
  OCCURE_VOTING_SUCCESS,
  OCCURE_VOTING_FAILED,
  UPDATE_SETUPDETAILS,
  UPDATE_SETUPDETAILS_SUCCESS,
  UPDATE_SETUPDETAILS_FAILED,
  UPDATE_MARKET_MAKER_SETUP_DETAILS,
  UPDATE_MARKET_MAKER_SETUP_DETAILS_SUCCESS,
  UPDATE_MARKET_MAKER_SETUP_DETAILS_FAILURE,
  UPDATE_TOKEN_OWNERS_SETUP_DETAILS,
  UPDATE_TOKEN_OWNERS_SETUP_DETAILS_SUCCESS,
  UPDATE_TOKEN_OWNERS_SETUP_DETAILS_FAILURE,
  UPDATE_EXCHANGES_SETUP_DETAILS,
  UPDATE_EXCHANGES_SETUP_DETAILS_SUCCESS,
  UPDATE_EXCHANGES_SETUP_DETAILS_FAILURE,
  UPDATE_TRADERS_SETUP_DETAILS,
  UPDATE_TRADERS_SETUP_DETAILS_SUCCESS,
  UPDATE_TRADERS_SETUP_DETAILS_FAILURE,
  TRADERS_SETUP_DETAILS_SUCCESS,
  TRADERS_SETUP_DETAILS,
  TRADERS_SETUP_DETAILS_FAILURE,
  TRADERS_OFFERS,
  TRADERS_OFFERS_SUCCESS,
  TRADERS_OFFERS_FAILURE,
  SAVE_TOKEN_WALLET_ADDRESS,
  SAVE_TOKEN_WALLET_ADDRESS_FAILED,
  SAVE_TOKEN_WALLET_ADDRESS_SUCCESS,
  FETCH_TOKEN_CREDIT,
  FETCH_TOKEN_CREDIT_SUCCESS,
  FETCH_TOKEN_CREDIT_FAILED
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';

const MSG_FAILED = {};
const MSG_SUCCESS = {};

export const confirm = (id: string) => {
  return (dispatch) => {
    dispatch(createAction(TOKEN_CONFIRM, {}));
    api.tokenConfirm(id)
      .then(response => {
        dispatch(createAction(TOKEN_CONFIRM_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(TOKEN_CONFIRM_FAILURE, err));
      });
  };
};

export const setupDetails = (data: SetupDetails) => {
  return (dispatch) => {
    switch(data.role_id) {
      case 1:
        dispatch(createAction(UPDATE_EXCHANGES_SETUP_DETAILS, data));
        api.setupDetails(data)
        .then(response => {
          dispatch(createAction(UPDATE_EXCHANGES_SETUP_DETAILS_SUCCESS, response));
          dispatch(showMessage('Successfully Saved', 'info', MSG_SUCCESS));
        })
        .catch(err => {
          dispatch(createAction(UPDATE_EXCHANGES_SETUP_DETAILS_FAILURE, err));
          dispatch(showMessage('Save Setup data Failed', 'error', MSG_FAILED));
        });
        break;
      case 2:
        dispatch(createAction(UPDATE_TOKEN_OWNERS_SETUP_DETAILS, data));
        api.setupDetails(data)
        .then(response => {
          dispatch(createAction(UPDATE_TOKEN_OWNERS_SETUP_DETAILS_SUCCESS, response));
          dispatch(showMessage('Successfully Saved', 'info', MSG_SUCCESS));
        })
        .catch(err => {
          dispatch(createAction(UPDATE_TOKEN_OWNERS_SETUP_DETAILS_FAILURE, err));
          dispatch(showMessage('Save Setup data Failed', 'error', MSG_FAILED));
        });
        break;
      case 3:
        dispatch(createAction(UPDATE_MARKET_MAKER_SETUP_DETAILS, data));
        api.setupDetails(data)
        .then(response => {
          dispatch(createAction(UPDATE_MARKET_MAKER_SETUP_DETAILS_SUCCESS, response));
          dispatch(showMessage('Successfully Saved', 'info', MSG_SUCCESS));
        })
        .catch(err => {
          dispatch(createAction(UPDATE_MARKET_MAKER_SETUP_DETAILS_FAILURE, err));
          dispatch(showMessage('Save Setup data Failed', 'error', MSG_FAILED));
        });
        break;
      case 4:
        dispatch(createAction(UPDATE_TRADERS_SETUP_DETAILS, data));
        api.setupDetails(data)
        .then(response => {
          dispatch(createAction(UPDATE_TRADERS_SETUP_DETAILS_SUCCESS, response));
          dispatch(showMessage('Successfully Saved', 'info', MSG_SUCCESS));
        })
        .catch(err => {
          dispatch(createAction(UPDATE_TRADERS_SETUP_DETAILS_FAILURE, err));
          dispatch(showMessage('Save Setup data Failed', 'error', MSG_FAILED));
        });
        break;
      default:
        break;
    }
  };
};

export const getMarketMakerSetupDetails = () => {
  return (dispatch) => {
    dispatch(createAction(MARKET_MAKER_SETUP_DETAILS, {}));
    api.getSetupDetails("3")
      .then(response => {
        dispatch(createAction(MARKET_MAKER_SETUP_DETAILS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(MARKET_MAKER_SETUP_DETAILS_FAILURE, err));
      });
  }
};

export const updateSetupData = (id, data, type) => {
  return (dispatch) => {
    switch(type) {
      case 1:
        dispatch(createAction(UPDATE_EXCHANGES_SETUP_DETAILS, data));
        api.updateSetupDetails(id, data)
          .then(response => {
            dispatch(createAction(UPDATE_EXCHANGES_SETUP_DETAILS_SUCCESS, response));
            dispatch(showMessage('Successfully Updated', 'info', MSG_SUCCESS));
          })
          .catch(err => {
            dispatch(createAction(UPDATE_EXCHANGES_SETUP_DETAILS_FAILURE, err));
            dispatch(showMessage('Update Failed', 'error', MSG_FAILED));
          });
        break;
      case 2:
        dispatch(createAction(UPDATE_TOKEN_OWNERS_SETUP_DETAILS, data));
        api.updateSetupDetails(id, data)
          .then(response => {
            dispatch(createAction(UPDATE_TOKEN_OWNERS_SETUP_DETAILS_SUCCESS, response));
            dispatch(showMessage('Successfully Updated', 'info', MSG_SUCCESS));
          })
          .catch(err => {
            dispatch(createAction(UPDATE_TOKEN_OWNERS_SETUP_DETAILS_FAILURE, err));
            dispatch(showMessage('Update Failed', 'error', MSG_FAILED));
          });
        break;
      case 3:
        dispatch(createAction(UPDATE_MARKET_MAKER_SETUP_DETAILS, data));
        api.updateSetupDetails(id, data)
          .then(response => {
            dispatch(createAction(UPDATE_MARKET_MAKER_SETUP_DETAILS_SUCCESS, response));
            dispatch(showMessage('Successfully Updated', 'info', MSG_SUCCESS));
          })
          .catch(err => {
            dispatch(createAction(UPDATE_MARKET_MAKER_SETUP_DETAILS_FAILURE, err));
            dispatch(showMessage('Update Failed', 'error', MSG_FAILED));
          });
        break;
      case 4:
        dispatch(createAction(UPDATE_TRADERS_SETUP_DETAILS, data));
        api.updateSetupDetails(id, data)
          .then(response => {
            dispatch(createAction(UPDATE_TRADERS_SETUP_DETAILS_SUCCESS, response));
            dispatch(showMessage('Successfully Updated', 'info', MSG_SUCCESS));
          })
          .catch(err => {
            dispatch(createAction(UPDATE_TRADERS_SETUP_DETAILS_FAILURE, err));
            dispatch(showMessage('Update Failed', 'error', MSG_FAILED));
          });
        break;
      default:
        break;
    }
    
  };
}

export const getTokenOwnersSetupDetails = () => {
  return (dispatch) => {
    dispatch(createAction(TOKEN_OWNERS_SETUP_DETAILS, {}));
    api.getSetupDetails("2")
      .then(response => {
        dispatch(createAction(TOKEN_OWNERS_SETUP_DETAILS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(TOKEN_OWNERS_SETUP_DETAILS_FAILURE, err));
      });
  }
};

export const getExchangesSetupDetails = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGES_SETUP_DETAILS, {}));
    api.getSetupDetails("1")
      .then(response => {
        dispatch(createAction(EXCHANGES_SETUP_DETAILS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(EXCHANGES_SETUP_DETAILS_FAILURE, err));
      });
  }
};

export const getTradersSetupDetails = () => {
  return (dispatch) => {
    dispatch(createAction(TRADERS_SETUP_DETAILS, {}));
    api.getSetupDetails("4")
      .then(response => {
        dispatch(createAction(TRADERS_SETUP_DETAILS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(TRADERS_SETUP_DETAILS_FAILURE, err));
      });
  }
};

export const exchanges = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGE_LIST, {}));
    api.exchanges()
      .then(response => {
        dispatch(createAction(EXCHANGE_LIST, response));
      })
      .catch(err => {
        dispatch(createAction(EXCHANGE_LIST, err));
      });
  };
};

export const baseCoins = () => {
  return (dispatch) => {
    dispatch(createAction(BASE_COIN_LIST, {}));
    api.baseCoin()
      .then(response => {
        dispatch(createAction(BASE_COIN_LIST, response));
      })
      .catch(err => {
        dispatch(createAction(BASE_COIN_LIST, err));
      });
  };
};

export const getTokenOwnersOffers = () => {
  return (dispatch) => {
    dispatch(createAction(TOKEN_OWNERS_OFFERS, {}));
    api.getAllOffer("2")
      .then(response => {
        dispatch(createAction(TOKEN_OWNERS_OFFERS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(TOKEN_OWNERS_OFFERS_FAILURE, err));
      });
  };
};

export const getMarketMakerOffers = () => {
  return (dispatch) => {
    dispatch(createAction(MARKET_MAKER_OFFERS, {}));
    api.getAllOffer("1")
      .then(response => {
        dispatch(createAction(MARKET_MAKER_OFFERS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(MARKET_MAKER_OFFERS_FAILURE, err));
      });
  };
};

export const getExchangesOffers = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGES_OFFERS, {}));
    api.getAllOffer("3")
      .then(response => {
        dispatch(createAction(EXCHANGES_OFFERS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(EXCHANGES_OFFERS_FAILURE, err));
      });
  };
};

export const getTradersOffers = () => {
  return (dispatch) => {
    dispatch(createAction(TRADERS_OFFERS, {}));
    api.getAllOffer("4")
      .then(response => {
        dispatch(createAction(TRADERS_OFFERS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(TRADERS_OFFERS_FAILURE, err));
      });
  };
};

export const fetchVoteList = () => {
  return (dispatch) => {
    dispatch(createAction(FETCH_VOTE_LIST, {}));
    api.getVoteList()
      .then(response => {
        dispatch(createAction(FETCH_VOTE_LIST_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(FETCH_VOTE_LIST_FAILED, err));
      });
  }
}

export const voting = (data) => {
  return (dispatch) => {
    dispatch(createAction(OCCURE_VOTING, {}));
    api.generateVote(data)
      .then(response => {
        dispatch(createAction(OCCURE_VOTING_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(OCCURE_VOTING_FAILED, err));
      });
  }
}


export const saveWalletAddress = (wallet) => {
  return (dispatch) => {
    dispatch(createAction(SAVE_TOKEN_WALLET_ADDRESS, {}));
    api.saveTokenWalletAddress(wallet)
      .then(response => {
        dispatch(createAction(SAVE_TOKEN_WALLET_ADDRESS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(SAVE_TOKEN_WALLET_ADDRESS_FAILED, err));
      });
  }
}


export const fetchTokenCredit = () => {
  return (dispatch) => {
    dispatch(createAction(FETCH_TOKEN_CREDIT, {}));
    api.getTokenCredit()
      .then(response => {
        dispatch(createAction(FETCH_TOKEN_CREDIT_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(FETCH_TOKEN_CREDIT_FAILED, err));
      });
  }
}
