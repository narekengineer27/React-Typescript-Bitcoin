import { Status } from 'Models/Status';
import { User } from 'Models/User';

export const MANAGERS_LIST_MANAGERS = 'MANAGERS_LIST_MANAGERS';
export const MANAGERS_LIST_MANAGERS_STATUS = 'MANAGERS_LIST_MANAGERS_STATUS';
export const MANAGERS_LIST_APPROVE_STATUS = 'MANAGERS_LIST_APPROVE_STATUS';
export const MANAGERS_LIST_REJECT_STATUS = 'MANAGERS_LIST_REJECT_STATUS';
export const MANAGERS_LIST_VIEW_STATUS = 'MANAGERS_LIST_VIEW_STATUS';
export const MANAGERS_LIST_REPORTS = 'MANAGERS_LIST_REPORTS';
export const MANAGERS_LIST_REPORTS_STATUS = 'MANAGERS_LIST_REPORTS_STATUS';

export type IState = {
  managers: {
    data: User[],
    status: Status,
  };
  approve: {
    status: Status,
  };
  reject: {
    status: Status,
  };
  view: {
    status: Status,
  };
  reports: {
    data: object[],
    status: Status,
  };
};

