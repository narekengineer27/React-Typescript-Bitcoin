import { Status } from "Models/Status";
import {
  ASSIGN_MANAGER_MANAGERS,
  ASSIGN_MANAGER_MANAGERS_STATUS,
  ASSIGN_MANAGER_CONTACT_STATUS,
  ASSIGN_MANAGER_ASSIGN_STATUS,
  ASSIGN_MANAGER_MANAGER_SELECT,
  ASSIGN_MANAGER_MOBILE_FILTER,
  ASSIGN_MANAGER_MOBILE_SORT,
  MANAGERS_LIST_DETAILS_STATUS,
  IState
} from "./types";

const initialState: IState = {
  managers: {
    data: [],
    status: new Status(),
  },
  contact: {
    status: new Status(),
  },
  assign: {
    status: new Status(),
  },
  selectedManager: {},
  mobileFilterVisible: false,
  mobileSortVisible: false,
  details: {
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case ASSIGN_MANAGER_MANAGERS:
      return {
        ...state,
        managers: {
          data: action.payload,
          status: Status.createSuccess(),
        },
      };
    case ASSIGN_MANAGER_MANAGERS_STATUS:
      return {
        ...state,
        managers: {
          ...state.managers,
          status: action.payload,
        },
      };
    case ASSIGN_MANAGER_CONTACT_STATUS:
      return {
        ...state,
        contact: {
          ...state.contact,
          status: action.payload,
        },
      };
    case ASSIGN_MANAGER_ASSIGN_STATUS:
      return {
        ...state,
        assign: {
          ...state.assign,
          status: action.payload,
        },
      };
    case ASSIGN_MANAGER_MANAGER_SELECT:
      return {
        ...state,
        selectedManager: action.payload,
      };
    case ASSIGN_MANAGER_MOBILE_FILTER:
      return {
        ...state,
        mobileFilterVisible: action.payload,
      };
    case ASSIGN_MANAGER_MOBILE_SORT:
      return {
        ...state,
        mobileSortVisible: action.payload,
      };
    case MANAGERS_LIST_DETAILS_STATUS:
      return {
        ...state,
        details: {
          ...state.details,
          status: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

