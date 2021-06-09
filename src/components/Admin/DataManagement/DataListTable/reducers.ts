import { Status } from "Models/Status";
import { Meta } from "Models/Meta";
import {
  DATA_LIST_TABLE_DATA,
  DATA_LIST_TABLE_ALL_SELECT,
  DATA_LIST_TABLE_META,
  DATA_LIST_TABLE_DATA_STATUS,
  DATA_LIST_TABLE_DELETE_STATUS,
  DATA_LIST_TABLE_SINGLE_DELETE_STATUS,
  DATA_LIST_TABLE_RECORD_SELECT,
  DATA_LIST_TABLE_DELETE_RECORDS,
  DATA_LIST_TABLE_SINGLE_DELETE_RECORD,
  IState,
} from "./types";

const initialState: IState = {
  data: [],
  status: new Status(),
  meta: new Meta(),
  delete: {
    status: new Status(),
    records: [],
  },
  singleDelete: {
    record: {},
    status: new Status(),
  },
  selectedRecords: [],
  allSelected: false,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case DATA_LIST_TABLE_DATA:
      return {
        ...state,
        data: [...action.payload],
      };
    case DATA_LIST_TABLE_ALL_SELECT:
      return {
        ...state,
        allSelected: action.payload,
      };
    case DATA_LIST_TABLE_META:
      return {
        ...state,
        meta: {...action.payload},
      };
    case DATA_LIST_TABLE_DATA_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case DATA_LIST_TABLE_DELETE_STATUS:
      return {
        ...state,
        delete: {
          ...state.delete,
          status: action.payload,
        },
      };
    case DATA_LIST_TABLE_SINGLE_DELETE_STATUS:
      return {
        ...state,
        singleDelete: {
          ...state.singleDelete,
          status: action.payload,
        },
      };
    case DATA_LIST_TABLE_RECORD_SELECT:
      return {
        ...state,
        selectedRecords: [...action.payload],
      };
    case DATA_LIST_TABLE_SINGLE_DELETE_RECORD:
      return {
        ...state,
        singleDelete: {
          ...state.singleDelete,
          record: action.payload,
        },
      };
    case DATA_LIST_TABLE_DELETE_RECORDS:
      return {
        ...state,
        delete: {
          ...state.delete,
          records: [...action.payload],
        },
      };
    default:
      return {
        ...state,
      };
  }
};
