import { createAction } from 'Models/Action';
import * as api from 'Utils/api';
import {
    FETCH_PROCESSES_REQUEST,
    FETCH_PROCESSES_REQUEST_SUCCESS,
    FETCH_PROCESSES_REQUEST_FAILED,
    SAVE_PROCESSES_REQUEST,
    SAVE_PROCESSES_REQUEST_SUCCESS,
    SAVE_PROCESSES_REQUEST_FAILED,
    FETCH_PROCESSE_SETTINGS_REQUEST,
    FETCH_PROCESSE_SETTINGS_REQUEST_SUCCESS,
    FETCH_PROCESSE_SETTINGS_REQUEST_FAILED,
    SAVE_PROCESSE_SETTING_REQUEST,
    SAVE_PROCESSE_SETTING_REQUEST_SUCCESS,
    SAVE_PROCESSE_SETTING_REQUEST_FAILED,
} from './types';

export const fetchProcesses = () => {
    return (dispatch) => {
        dispatch(createAction(FETCH_PROCESSES_REQUEST, {}));
        api.getProcesses()
            .then(response => {
                dispatch(createAction(FETCH_PROCESSES_REQUEST_SUCCESS, response));
            })
            .catch(err => {
                dispatch(createAction(FETCH_PROCESSES_REQUEST_FAILED, err));
            });
    };
};

export const saveProcess = (name) => {
    return (dispatch) => {
      dispatch(createAction(SAVE_PROCESSES_REQUEST, false));
      api.saveProcess(name)
        .then(response => {
          dispatch(createAction(SAVE_PROCESSES_REQUEST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(SAVE_PROCESSES_REQUEST_FAILED, err));
        });
    };
};

export const fetchProcessSettings = () => {
    return (dispatch) => {
        dispatch(createAction(FETCH_PROCESSE_SETTINGS_REQUEST, {}));
        api.getProcessSettings()
            .then(response => {
                dispatch(createAction(FETCH_PROCESSE_SETTINGS_REQUEST_SUCCESS, response));
            })
            .catch(err => {
                dispatch(createAction(FETCH_PROCESSE_SETTINGS_REQUEST_FAILED, err));
            });
    };
};

export const saveProcessSetting = (id, data) => {
    return (dispatch) => {
      dispatch(createAction(SAVE_PROCESSE_SETTING_REQUEST, false));
      api.saveProcessSetting(id, data)
        .then(response => {
          dispatch(createAction(SAVE_PROCESSE_SETTING_REQUEST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(SAVE_PROCESSE_SETTING_REQUEST_FAILED, err));
        });
    };
};