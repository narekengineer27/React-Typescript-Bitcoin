import { Status } from 'Models/Status';


export const BLOG_FORM_ADD_STATUS = 'BLOG_FORM_ADD_STATUS';
export const BLOG_FORM_ADD_SAVE = 'BLOG_FORM_ADD_SAVE';
export const BLOG_FORM_ADD_SUCCESS = 'BLOG_FORM_ADD_SUCCESS';
export const BLOG_FORM_EDIT_STATUS = 'BLOG_FORM_EDIT_STATUS';
export const BLOG_FORM_EDIT_RECORD = 'BLOG_FORM_EDIT_RECORD';

export type IState = {
  status: Status,
  record: {},
  edit: {
    record: object,
    status: Status,
  },
};
