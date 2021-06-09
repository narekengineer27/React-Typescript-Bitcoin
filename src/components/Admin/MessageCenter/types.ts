import { Status } from 'Models/Status';

export const MESSAGE_CENTER_MESSAGES = 'MESSAGE_CENTER_MESSAGES';
export const MESSAGE_CENTER_MESSAGES_STATUS = 'MESSAGE_CENTER_MESSAGES_STATUS';
export const MESSAGE_CENTER_OPEN_EMAIL_STATUS = 'MESSAGE_CENTER_OPEN_EMAIL_STATUS';
export const MESSAGE_CENTER_OPEN_SMS_STATUS = 'MESSAGE_CENTER_OPEN_SMS_STATUS';
export const MESSAGE_CENTER_MESSAGE_SELECT = 'MESSAGE_CENTER_MESSAGE_SELECT';
export const MESSAGE_CENTER_ALL_SELECT = 'MESSAGE_CENTER_ALL_SELECT';


export type IState = {
  messages: {
    data:  object[],
    status: Status,
  };
  email: {
    status: Status,
  };
  SMS: {
    status: Status,
  };
  selectedMessages: object[],
  allSelected: boolean,
};
