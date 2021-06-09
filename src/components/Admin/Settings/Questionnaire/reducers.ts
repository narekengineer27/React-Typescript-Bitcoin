import { Status } from 'Models/Status';
import {
  QUESTIONNAIRE_STATUS,
  QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  add: {
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case QUESTIONNAIRE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS:
      return {
        ...state,
        add: {
          ...state.add,
          status: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
