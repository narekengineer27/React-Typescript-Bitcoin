import { Status } from 'Models/Status';
import {
  HELP_ARTICLES,
  HELP_ARTICLES_STATUS,
  IState,
} from './types';

const initialState: IState = {
  articles: {
    data: [],
    status: new Status(),
  }
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case HELP_ARTICLES:
      return {
        ...state,
        articles: {...state.articles, data: action.payload, }
      };
    case HELP_ARTICLES_STATUS:
      return {
        ...state,
        articles: {...state.articles, status: action.payload, }
      };
    default:
      return {
        ...state,
      };
  }
};
