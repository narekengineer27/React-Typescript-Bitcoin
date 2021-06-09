import { Status } from 'Models/Status';

export const QUESTIONNAIRE_STATUS = 'QUESTIONNAIRE_STATUS';
export const QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS = 'QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS';

export type IState = {
  status: Status,
  add: {
    status: Status,
  },
};
