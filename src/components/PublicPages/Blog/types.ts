import { Status } from 'Models/Status';
import { BlogArticle } from 'Models/BlogArticle';
import { Meta } from 'Models/Meta';

export const PUBLIC_BLOG_ARTICLE = 'PUBLIC_BLOG_ARTICLE';
export const PUBLIC_BLOG_ARTICLES = 'PUBLIC_BLOG_ARTICLES';
export const PUBLIC_BLOG_RECENT_ARTICLES = 'PUBLIC_BLOG_RECENT_ARTICLES';

export type IState = {
  article: {
    status: Status;
    data: BlogArticle;
  };

  articles: {
    status: Status;
    data: BlogArticle[];
    meta: Meta;
  };

  recentArticles: {
    status: Status;
    data: BlogArticle[];
  }
};
