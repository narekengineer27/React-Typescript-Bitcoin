import { Status } from 'Models/Status';
import { User } from 'Models/User';

export const ASSIGN_MANAGER_MANAGERS = 'ASSIGN_MANAGER_MANAGERS';
export const ASSIGN_MANAGER_MANAGERS_STATUS = 'ASSIGN_MANAGER_MANAGERS_STATUS';
export const ASSIGN_MANAGER_CONTACT_STATUS = 'ASSIGN_MANAGER_CONTACT_STATUS';
export const ASSIGN_MANAGER_ASSIGN_STATUS = 'ASSIGN_MANAGER_ASSIGN_STATUS';
export const ASSIGN_MANAGER_MANAGER_SELECT = 'ASSIGN_MANAGER_MANAGER_SELECT';
export const ASSIGN_MANAGER_MOBILE_FILTER = 'ASSIGN_MANAGER_MOBILE_FILTER';
export const ASSIGN_MANAGER_MOBILE_SORT = 'ASSIGN_MANAGER_MOBILE_SORT';
export const MANAGERS_LIST_DETAILS_STATUS = 'MANAGERS_LIST_DETAILS_STATUS';

export type IState = {
  managers: {
    data: User[],
    status: Status,
  };
  contact: {
    status: Status,
  };
  assign: {
    status: Status,
  };
  selectedManager: User;
  mobileFilterVisible: boolean;
  mobileSortVisible: boolean;
  details: {
    status: Status,
  };
};

