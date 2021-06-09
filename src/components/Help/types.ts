import { Status } from 'Models/Status';
import { HelpArticle } from 'Models/HelpArticle';

export const HELP_ARTICLES = 'HELP_ARTICLES';
export const HELP_ARTICLES_STATUS = 'HELP_ARTICLES_STATUS';

export type IState = {
  articles: {
    data: HelpArticle[],
    status: Status,
  }
};
