import { Status } from 'Models/Status';


export const FAQ_FORM_ADD_STATUS = 'FAQ_FORM_ADD_STATUS';
export const FAQ_FORM_ADD_SAVE = 'FAQ_FORM_ADD_SAVE';
export const FAQ_FORM_ADD_SUCCESS = 'FAQ_FORM_ADD_SUCCESS';
export const FAQ_FORM_EDIT_STATUS = 'FAQ_FORM_EDIT_STATUS';
export const FAQ_FORM_EDIT_RECORD = 'FAQ_FORM_EDIT_RECORD';


export type IState = {
  status: Status,
  record: {},
  edit: {
    record: object,
    status: Status,
  },
};
