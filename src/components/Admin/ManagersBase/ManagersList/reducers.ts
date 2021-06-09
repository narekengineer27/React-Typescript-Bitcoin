import { Status } from "Models/Status";
import {
  MANAGERS_LIST_MANAGERS,
  MANAGERS_LIST_MANAGERS_STATUS,
  MANAGERS_LIST_APPROVE_STATUS,
  MANAGERS_LIST_REJECT_STATUS,
  MANAGERS_LIST_VIEW_STATUS,
  MANAGERS_LIST_REPORTS,
  MANAGERS_LIST_REPORTS_STATUS,
  IState,
} from "./types";

const initialState: IState = {
  managers: {
    data: [],
    status: new Status(),
  },
  approve: {
    status: new Status(),
  },
  reject: {
    status: new Status(),
  },
  view: {
    status: new Status(),
  },
  reports: {
    data: [],
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case MANAGERS_LIST_MANAGERS:
      return {
        ...state,
        managers: {
          data: action.payload,
          status: Status.createSuccess(),
        },
      };
    case MANAGERS_LIST_MANAGERS_STATUS:
      return {
        ...state,
        managers: {
          ...state.managers,
          status: action.payload,
        },
      };
    case MANAGERS_LIST_APPROVE_STATUS:
      return {
        ...state,
        approve: {
          ...state.approve,
          status: action.payload,
        },
      };
    case MANAGERS_LIST_REJECT_STATUS:
      return {
        ...state,
        reject: {
          ...state.reject,
          status: action.payload,
        },
      };
    case MANAGERS_LIST_VIEW_STATUS:
      return {
        ...state,
        view: {
          ...state.view,
          status: action.payload,
        },
      };
    case MANAGERS_LIST_REPORTS:
      return {
        ...state,
        reports: {
          data: action.payload,
          status: Status.createSuccess(),
        },
      };
    case MANAGERS_LIST_REPORTS_STATUS:
      return {
        ...state,
        reports: {
          ...state.reports,
          status: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

