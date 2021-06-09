import * as _ from "lodash";
import * as api from "Utils/api";
import { createAction } from "Models/Action";
import { Status } from "Models/Status";
import { Meta } from "Models/Meta";
import { showMessage, hideAllMessages, hideMessage } from "Components/GlobalMessage/actions";
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
} from "./types";

const MSG_DELETE_SUCCESS = {};
const MSG_REMOVE_ERROR = {};

export const updateBlogStatus = (blog, published, data, type: string = 'blog') => {
  return (dispatch) => {
    blog.loading = true;
    dispatch(createAction(DATA_LIST_TABLE_DATA, data));
    api[published ? `publishRichDataRecord` : `unpublishRichDataRecord`](blog.id, type)
      .then(response => {
        blog.loading = false;
        blog.status = published ? 'Published' : 'Draft';
        dispatch(createAction(DATA_LIST_TABLE_DATA, data));
      });
  };
};

export const fetchData = (meta: Meta = new Meta(), type: string = 'blog') => {
  return (dispatch) => {
    dispatch(createAction(DATA_LIST_TABLE_DATA_STATUS, Status.createLoading()));

    api.getRichDataRecords(meta, type)
      .then(response => {
        const data = response.data || [];
        const meta = response.meta || new Meta();
        dispatch(createAction(DATA_LIST_TABLE_DATA, data));
        dispatch(createAction(DATA_LIST_TABLE_DATA_STATUS, Status.createSuccess()));
        dispatch(createAction(DATA_LIST_TABLE_META, meta));
      });
  };
};

export const openDelete = (data) => {
  return (dispatch) => {
    dispatch(createAction(DATA_LIST_TABLE_DELETE_STATUS, Status.createProgressing()));
    dispatch(createAction(DATA_LIST_TABLE_DELETE_RECORDS, data));
  };
};

export const confirmDelete = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(DATA_LIST_TABLE_DELETE_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(DATA_LIST_TABLE_DELETE_STATUS, new Status()));
      dispatch(showMessage('You have deleted successfully!', 'success', MSG_DELETE_SUCCESS));
    }, 1000);
  };
};

export const cancelDelete = () => {
  return (dispatch) => {
    dispatch(createAction(DATA_LIST_TABLE_DELETE_STATUS, new Status()));
  };
};

export const openSingleDelete = (data) => {
  return (dispatch) => {
    dispatch(createAction(DATA_LIST_TABLE_SINGLE_DELETE_STATUS, Status.createProgressing()));
    dispatch(createAction(DATA_LIST_TABLE_SINGLE_DELETE_RECORD, data));
  };
};

export const confirmSingleDelete = (id: number, existingRecords = [], type: string = 'blog') => {
  return (dispatch) => {
    dispatch(createAction(DATA_LIST_TABLE_SINGLE_DELETE_STATUS, {
      progressing: true,
      loading: true,
    }));

    api.removeRichDataRecord(id, type)
      .then(() => {
        _.remove(existingRecords, (blog) => {
          return blog.id === id;
        });
        dispatch(createAction(DATA_LIST_TABLE_DATA, existingRecords));
        dispatch(createAction(DATA_LIST_TABLE_SINGLE_DELETE_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_REMOVE_ERROR));
        dispatch(showMessage(
          'You have removed the blog successfully!',
          'success',
          MSG_DELETE_SUCCESS,
        ));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_REMOVE_ERROR));
        dispatch(createAction(DATA_LIST_TABLE_SINGLE_DELETE_STATUS, Status.createProgressing()));
      });
  };
};

export const cancelSingleDelete = () => {
  return (dispatch) => {
    dispatch(createAction(DATA_LIST_TABLE_SINGLE_DELETE_STATUS, new Status()));
  };
};

export const select = (selected, record, selectedRecords) => {
  return (dispatch) => {
    if (selected) {
      selectedRecords.push(record);
    } else {
      _.remove(selectedRecords, (r) => {
        return r.id === record.id;
      });
    }
    dispatch(createAction(DATA_LIST_TABLE_RECORD_SELECT, selectedRecords));
  };
};

export const toggleSelectAll = (selected, allRecords) => {
  return (dispatch) => {
    dispatch(createAction(DATA_LIST_TABLE_RECORD_SELECT, selected ? allRecords : []));
    dispatch(createAction(DATA_LIST_TABLE_ALL_SELECT, selected));
  };
};
