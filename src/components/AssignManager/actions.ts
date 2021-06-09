import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { showMessage, hideAllMessages } from 'Components/GlobalMessage/actions';

const MSG_ASSIGN_SUCCESS = {};
const MSG_SEND_SUCCESS = {};

import {
  ASSIGN_MANAGER_MANAGERS,
  ASSIGN_MANAGER_MANAGERS_STATUS,
  ASSIGN_MANAGER_CONTACT_STATUS,
  ASSIGN_MANAGER_ASSIGN_STATUS,
  ASSIGN_MANAGER_MANAGER_SELECT,
  ASSIGN_MANAGER_MOBILE_FILTER,
  ASSIGN_MANAGER_MOBILE_SORT,
  MANAGERS_LIST_DETAILS_STATUS,
} from './types';

export const fetchManagers = () => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_MANAGERS_STATUS, Status.createLoading()));
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const mock = [{
          id: '0',
          picture: '1',
          name: 'AAA',
          country: 'xlslsl',
          city: 'zhanga',
          rating: 4,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '1',
          picture: '',
          name: 'BBB',
          country: 'wwwww',
          city: 'sxxwww',
          rating: 4,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '2',
          picture: '',
          name: 'CCC',
          country: 'swwwji',
          city: 'nhbvfdcd',
          rating: 5,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '3',
          picture: '',
          name: 'AAA',
          country: 'dddddddddddd',
          city: 'wweerr',
          rating: 4,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '4',
          picture: 'gbb bb',
          name: 'BBB',
          country: 'bggfdc',
          city: '',
          rating: 4,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '5',
          picture: '',
          name: 'CCC',
          country: 'ccdddd',
          city: 'ddddd',
          rating: 5,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '6',
          picture: '',
          name: 'AAA',
          country: '',
          city: '',
          rating: 4,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '7',
          picture: '',
          name: 'BBB',
          country: '',
          city: '',
          rating: 4,
          totalProfitMade: 333,
          nReviews: 123,
        }, {
          id: '8',
          picture: '',
          name: 'CCC',
          country: '',
          city: '',
          rating: 5,
          totalProfitMade: 333,
          nReviews: 123,
        }];
        dispatch(createAction(ASSIGN_MANAGER_MANAGERS, mock));
        dispatch(createAction(ASSIGN_MANAGER_MANAGERS_STATUS, Status.createSuccess()));
        resolve(mock);
      }, 1000);
    });
  };
};
export const cancelContact = () => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_CONTACT_STATUS, new Status()));
  };
};

export const confirmContact = () => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_CONTACT_STATUS, new Status()));
  };
};

export const openContact = () => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_CONTACT_STATUS, Status.createProgressing()));
  };
};

export const openAssign = (selectedManager) => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_ASSIGN_STATUS, Status.createProgressing()));
    dispatch(createAction(ASSIGN_MANAGER_MANAGER_SELECT, selectedManager));
  };
};

export const cancelAssign = () => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_ASSIGN_STATUS, new Status()));
  };
};

export const confirmAssign = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(ASSIGN_MANAGER_ASSIGN_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(ASSIGN_MANAGER_ASSIGN_STATUS, new Status()));
      dispatch(showMessage('You have assigned the manager successfully!', 'success', MSG_ASSIGN_SUCCESS));
    }, 1000);
  };
};

export const confirmSend = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(ASSIGN_MANAGER_CONTACT_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(ASSIGN_MANAGER_CONTACT_STATUS, new Status()));
      dispatch(showMessage('You have sent the message to the recruiter successfully!', 'success', MSG_SEND_SUCCESS));
    }, 1000);
  };
};

export const mobileShowFilter = () => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_MOBILE_FILTER, true));
    dispatch(createAction(ASSIGN_MANAGER_MOBILE_SORT, false));
  };
};

export const mobileShowSort = () => {
  return (dispatch) => {
    dispatch(createAction(ASSIGN_MANAGER_MOBILE_FILTER, false));
    dispatch(createAction(ASSIGN_MANAGER_MOBILE_SORT, true));
  };
};

export const openDetails = (selectedManager) => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_DETAILS_STATUS, Status.createProgressing()));
    dispatch(createAction(ASSIGN_MANAGER_MANAGER_SELECT, selectedManager));
  };
};

export const cancelDetails = () => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_DETAILS_STATUS, new Status()));
  };
};
