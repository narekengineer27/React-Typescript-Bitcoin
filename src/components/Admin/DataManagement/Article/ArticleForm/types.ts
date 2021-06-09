import { Status } from 'Models/Status';


export const ARTICLE_FORM_ADD_STATUS = 'ARTICLE_FORM_ADD_STATUS';
export const ARTICLE_FORM_ADD_SAVE = 'ARTICLE_FORM_ADD_SAVE';
export const ARTICLE_FORM_ADD_SUCCESS = 'ARTICLE_FORM_ADD_SUCCESS';
export const ARTICLE_FORM_EDIT_STATUS = 'ARTICLE_FORM_EDIT_STATUS';
export const ARTICLE_FORM_EDIT_RECORD = 'ARTICLE_FORM_EDIT_RECORD';


export type IState = {
  status: Status,
  article: {},
  edit: {
    record: object,
    status: Status,
  },
};
