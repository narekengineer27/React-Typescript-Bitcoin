import * as _ from 'lodash';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { showMessage, hideAllMessages } from 'Components/GlobalMessage/actions';

const MSG_SEND_SUCCESS = {};

import {
  MESSAGE_CENTER_MESSAGES,
  MESSAGE_CENTER_MESSAGES_STATUS,
  MESSAGE_CENTER_OPEN_EMAIL_STATUS,
  MESSAGE_CENTER_OPEN_SMS_STATUS,
  MESSAGE_CENTER_MESSAGE_SELECT,
  MESSAGE_CENTER_ALL_SELECT,
} from './types';

export const fetchMessages = () => {
  return (dispatch) => {
    dispatch(createAction(MESSAGE_CENTER_MESSAGES_STATUS, Status.createLoading()));
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const mock = [{
          id: 1,
          name: 'AAA',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }, {
          id: 2,
          name: 'B',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }, {
          id: 3,
          name: 'C',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }, {
          id: 4,
          name: 'D',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }, {
          id: 5,
          name: 'E',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }, {
          id: 6,
          name: 'F',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }, {
          id: 7,
          name: 'G',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }, {
          id: 8,
          name: 'H',
          country: 'xlslsl',
          city: 'zhanga',
          account_type: 'A',
          email_address: '123@gmail.com',
          phone_number: 1234567,
        }];
        dispatch(createAction(MESSAGE_CENTER_MESSAGES, mock));
        dispatch(createAction(MESSAGE_CENTER_MESSAGES_STATUS, Status.createSuccess()));
        resolve(mock);
      }, 1000);
    });
  };
};


export const openSendEmail = () => {
  return (dispatch) => {
    dispatch(createAction(MESSAGE_CENTER_OPEN_EMAIL_STATUS, Status.createProgressing()));
  };
};

export const openSendSMS = () => {
  return (dispatch) => {
    dispatch(createAction(MESSAGE_CENTER_OPEN_SMS_STATUS, Status.createProgressing()));
  };
};

export const confirmSendEmail = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(MESSAGE_CENTER_OPEN_EMAIL_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(MESSAGE_CENTER_OPEN_EMAIL_STATUS, new Status()));
      dispatch(showMessage('You have sent the email successfully!', 'success', MSG_SEND_SUCCESS));
    }, 1000);
  };
};

export const cancelSendEmail = () => {
  return (dispatch) => {
    dispatch(createAction(MESSAGE_CENTER_OPEN_EMAIL_STATUS, new Status()));
  };
};

export const confirmSendSMS = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(MESSAGE_CENTER_OPEN_SMS_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(MESSAGE_CENTER_OPEN_SMS_STATUS, new Status()));
      dispatch(showMessage('You have sent SMS successfully!', 'success', MSG_SEND_SUCCESS));
    }, 1000);
  };
};

export const cancelSendSMS = () => {
  return (dispatch) => {
    dispatch(createAction(MESSAGE_CENTER_OPEN_SMS_STATUS, new Status()));
  };
};

export const select = (selected, message, selectedMessages) => {
  return (dispatch) => {
    console.log('selected', selected);
    console.log('message', message);
    console.log('selectedMessages', selectedMessages);
    if (selected) {
      selectedMessages.push(message);
    } else {
      _.remove(selectedMessages, (r) => {
        return r.id === message.id;
      });
    }
    dispatch(createAction(MESSAGE_CENTER_MESSAGE_SELECT, selectedMessages));
  };
};

export const toggleSelectAll = (selected, allMessages) => {
  return (dispatch) => {
    dispatch(createAction(MESSAGE_CENTER_MESSAGE_SELECT, selected ? allMessages : []));
    dispatch(createAction(MESSAGE_CENTER_ALL_SELECT, selected));
  };
};
