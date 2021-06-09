import { Status } from 'Models/Status';
import { User } from 'Models/User';
import { Meta } from 'Models/Meta';

export const DATA_LIST_TABLE_DATA = 'DATA_LIST_TABLE_DATA';
export const DATA_LIST_TABLE_ALL_SELECT = 'DATA_LIST_TABLE_ALL_SELECT';
export const DATA_LIST_TABLE_META = 'DATA_LIST_TABLE_META';
export const DATA_LIST_TABLE_DATA_STATUS = 'DATA_LIST_TABLE_DATA_STATUS';
export const DATA_LIST_TABLE_DELETE_STATUS = 'DATA_LIST_TABLE_DELETE_STATUS';
export const DATA_LIST_TABLE_SINGLE_DELETE_STATUS = 'DATA_LIST_TABLE_SINGLE_DELETE_STATUS';
export const DATA_LIST_TABLE_RECORD_SELECT = 'DATA_LIST_TABLE_RECORD_SELECT';
export const DATA_LIST_TABLE_DELETE_RECORDS = 'DATA_LIST_TABLE_DELETE_RECORDS';
export const DATA_LIST_TABLE_SINGLE_DELETE_RECORD = 'DATA_LIST_TABLE_SINGLE_DELETE_RECORD';

export type IState = {
  data: User[],
  status: Status,
  meta: Meta,
  delete: {
    status: Status,
    records: object[],
  },
  singleDelete: {
    status: Status,
    record: object,
  },
  selectedRecords: object[],
  allSelected: boolean,
};
