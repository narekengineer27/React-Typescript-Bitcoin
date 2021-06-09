import { Status } from 'Models/Status';

import {
  PUBLIC_BLOG_ARTICLE,
  PUBLIC_BLOG_ARTICLES,
  IState, PUBLIC_BLOG_RECENT_ARTICLES,
} from './types';
import { Meta } from 'Models/Meta';

const initialState: IState = {
  article: { status: new Status(), data: {} },
  articles: { status: new Status(), data: [], meta: new Meta() },
  recentArticles: { status: new Status(), data: [] },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case PUBLIC_BLOG_ARTICLE:
      return {
        ...state, article: { ...state.article, ...action.payload },
      };
    case PUBLIC_BLOG_ARTICLES:
      return {
        ...state, articles: { ...state.articles, ...action.payload },
      };
    case PUBLIC_BLOG_RECENT_ARTICLES:
      return {
        ...state, recentArticles: { ...state.recentArticles, ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
