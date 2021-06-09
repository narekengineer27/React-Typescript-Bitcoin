import {
  GLOBAL_MESSAGE_SHOW,
  GLOBAL_MESSAGE_HIDE,
  GLOBAL_MESSAGE_HIDE_ALL,
  IState,
} from 'Components/GlobalMessage/types';

const initialState: IState = {
  messages: []
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case GLOBAL_MESSAGE_SHOW:
      // First remove any messages with the same id
      const message = action.payload;
      const newMessages = state.messages.filter(it => it.id !== action.payload.id);
      newMessages.push(message);

      return {
        ...state,
        messages: newMessages,
      };
    case GLOBAL_MESSAGE_HIDE:
      return {
        ...state,
        messages: state.messages.filter(it => it.id !== action.payload.id),
      };
    case GLOBAL_MESSAGE_HIDE_ALL:
      return {
        ...state,
        messages: [],
      };
    default:
      return {
        ...state,
      };
  }
};
