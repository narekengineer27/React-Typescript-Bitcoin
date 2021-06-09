import { Status } from "Models/Status";
import {
  MESSAGE_CENTER_MESSAGES,
  MESSAGE_CENTER_MESSAGES_STATUS,
  MESSAGE_CENTER_OPEN_EMAIL_STATUS,
  MESSAGE_CENTER_OPEN_SMS_STATUS,
  MESSAGE_CENTER_MESSAGE_SELECT,
  MESSAGE_CENTER_ALL_SELECT,
  IState
} from "./types";

const initialState: IState = {
  messages: {
    data:  [],
    status: new Status(),
  },
  email: {
    status: new Status(),
  },
  SMS: {
    status: new Status(),
  },
  selectedMessages: [],
  allSelected: false,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case MESSAGE_CENTER_MESSAGES:
      return {
        ...state,
        messages: {
          data: action.payload,
          status: Status.createSuccess(),
        },
      };
    case MESSAGE_CENTER_MESSAGES_STATUS:
      return {
        ...state,
        messages: {
          ...state.messages,
          status: action.payload,
        },
      };
    case MESSAGE_CENTER_OPEN_EMAIL_STATUS:
      return {
        ...state,
        email: {
          ...state.email,
          status: action.payload,
        },
      };
    case MESSAGE_CENTER_OPEN_SMS_STATUS:
      return {
        ...state,
        SMS: {
          ...state.SMS,
          status: action.payload,
        },
      };
    case MESSAGE_CENTER_MESSAGE_SELECT:
      return {
        ...state,
        selectedMessages: [...action.payload],
      };
    case MESSAGE_CENTER_ALL_SELECT:
      return {
        ...state,
        allSelected: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

