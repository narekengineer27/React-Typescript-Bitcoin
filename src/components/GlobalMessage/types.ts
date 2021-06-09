export const GLOBAL_MESSAGE_SHOW = 'GLOBAL_MESSAGE_SHOW';
export const GLOBAL_MESSAGE_HIDE = 'GLOBAL_MESSAGE_HIDE';
export const GLOBAL_MESSAGE_HIDE_ALL = 'GLOBAL_MESSAGE_HIDE_ALL';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

export type IState = {
  messages: {
    id: any;
    message?: string;
    type?: MessageType;
  }[];
};
