import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { showMessage, hideAllMessages } from 'Components/GlobalMessage/actions';

const MSG_SUCCESS = {};

import {
  MANAGERS_LIST_MANAGERS,
  MANAGERS_LIST_MANAGERS_STATUS,
  MANAGERS_LIST_APPROVE_STATUS,
  MANAGERS_LIST_REJECT_STATUS,
  MANAGERS_LIST_VIEW_STATUS,
  MANAGERS_LIST_REPORTS,
  MANAGERS_LIST_REPORTS_STATUS,
} from './types';

export const fetchManagersList = () => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_MANAGERS_STATUS, Status.createLoading()));
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const mock = [{
          id: '0',
          picture: '1',
          name: 'AAA',
          country: 'xlslsl',
          city: 'zhanga',
          rating: 4,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '1',
          picture: '',
          name: 'BBB',
          country: 'wwwww',
          city: 'sxxwww',
          rating: 4,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '2',
          picture: '',
          name: 'CCC',
          country: 'swwwji',
          city: 'nhbvfdcd',
          rating: 5,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '3',
          picture: '',
          name: 'AAA',
          country: 'dddddddddddd',
          city: 'wweerr',
          rating: 4,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '4',
          picture: 'gbb bb',
          name: 'BBB',
          country: 'bggfdc',
          city: '',
          rating: 4,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '5',
          picture: '',
          name: 'CCC',
          country: 'ccdddd',
          city: 'ddddd',
          rating: 5,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '6',
          picture: '',
          name: 'AAA',
          country: '',
          city: '',
          rating: 4,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '7',
          picture: '',
          name: 'BBB',
          country: '',
          city: '',
          rating: 4,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }, {
          id: '8',
          picture: '',
          name: 'CCC',
          country: '',
          city: '',
          rating: 5,
          total_profit_made: 333,
          nReviews: 123,
          email: '1458@gmail.com',
        }];
        dispatch(createAction(MANAGERS_LIST_MANAGERS, mock));
        dispatch(createAction(MANAGERS_LIST_MANAGERS_STATUS, Status.createSuccess()));
        resolve(mock);
      }, 1000);
    });
  };
};

export const openApprove = () => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_APPROVE_STATUS, Status.createProgressing()));
  };
};

export const openReject = () => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_REJECT_STATUS, Status.createProgressing()));
  };
};

export const openView = () => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_VIEW_STATUS, Status.createProgressing()));
  };
};

export const confirmApprove = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(MANAGERS_LIST_VIEW_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(MANAGERS_LIST_VIEW_STATUS, new Status()));
      dispatch(showMessage('You have approved successfully!', 'success', MSG_SUCCESS));
    }, 1000);
  };
};

export const cancelApprove = () => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_VIEW_STATUS, new Status()));
  };
};

export const fetchReports = () => {
  return (dispatch) => {
    dispatch(createAction(MANAGERS_LIST_REPORTS_STATUS, Status.createLoading()));
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const mock = [{
          id: '0',
          question: 'Lorem ipsum dolor sit amet?',
          answer: 'Option 2',
          correct: true,
        }, {
          id: '1',
          question: 'Another question?',
          answer: 'Option 6',
          correct: false,
        }, {
          id: '2',
          question: 'Lorem ipsum dolor sit amet?',
          answer: 'Option 2',
          correct: true,
        }];
        dispatch(createAction(MANAGERS_LIST_REPORTS, mock));
        dispatch(createAction(MANAGERS_LIST_REPORTS_STATUS, Status.createSuccess()));
        resolve(mock);
      }, 1000);
    });
  };
};
