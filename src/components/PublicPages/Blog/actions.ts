import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  PUBLIC_BLOG_ARTICLES,
  PUBLIC_BLOG_ARTICLE, PUBLIC_BLOG_RECENT_ARTICLES, IState,
} from './types';
import * as api from 'Utils/api';
import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';

const MSG_ARTICLES = {};

export const loadArticles = (page: number = 1) => {
  return (dispatch, getState) => {
    const articles = (getState().publicBlog as IState).articles;
    if (articles.status.success && +articles.meta.page.offset === page - 1) {
      // No need to reload
      return;
    }

    dispatch(createAction(PUBLIC_BLOG_ARTICLES, { status: Status.createLoading() }));

    api.blogArticles(page)
      .then(result => {
        dispatch(createAction(
          PUBLIC_BLOG_ARTICLES,
          {
            status: Status.createSuccess(),
            data: result.data,
            meta: result.meta
          }
        ));
        dispatch(hideMessage(MSG_ARTICLES));
      })
      .catch(err => {
        dispatch(createAction(PUBLIC_BLOG_ARTICLES, { status: Status.createError() }));
        dispatch(showMessage(err, 'error', MSG_ARTICLES));
      });
  };
};

export const loadRecentArticles = () => {
  return (dispatch, getState) => {
    const state = getState().publicBlog as IState;
    if (state.recentArticles.status.success) {
      // No need to reload
      return;
    }

    dispatch(createAction(PUBLIC_BLOG_RECENT_ARTICLES, { status: Status.createLoading() }));

    // Can we retrieve them from the articles list?
    const articles = state.articles;
    if (articles.status.success && +articles.meta.page.offset === 0) {
      dispatch(createAction(
        PUBLIC_BLOG_RECENT_ARTICLES, { status: Status.createSuccess(), data: articles.data }
      ));

      return;
    }

    api.blogArticles(1)
      .then(result => {
        dispatch(createAction(
          PUBLIC_BLOG_RECENT_ARTICLES, { status: Status.createSuccess(), data: result.data }
        ));
        dispatch(hideMessage(MSG_ARTICLES));
      })
      .catch(err => {
        dispatch(createAction(PUBLIC_BLOG_ARTICLES, { status: Status.createError() }));
        dispatch(showMessage(err, 'error', MSG_ARTICLES));
      });
  };
};

export const loadArticle = (slug: string) => {
  return (dispatch, getState) => {
    dispatch(createAction(PUBLIC_BLOG_ARTICLE, { status: Status.createLoading() }));

    // Can we retrieve it from the articles list?
    const articles = (getState().publicBlog as IState).articles;
    if (articles.status.success) {
      const article = articles.data.find(item => item.slug === slug);
      if (article) {
        dispatch(createAction(
          PUBLIC_BLOG_ARTICLE, { status: Status.createSuccess(), data: article }
        ));

        return;
      }
    }

    api.blogArticle(slug)
      .then(result => {
        dispatch(createAction(
          PUBLIC_BLOG_ARTICLE, { status: Status.createSuccess(), data: result.data }
        ));
        dispatch(hideMessage(MSG_ARTICLES));
      })
      .catch(err => {
        dispatch(createAction(PUBLIC_BLOG_ARTICLE, { status: Status.createError() }));
        dispatch(showMessage(err, 'error', MSG_ARTICLES));
      });
  };
};
