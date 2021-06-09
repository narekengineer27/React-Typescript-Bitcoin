import { User } from 'Models/User';
import { Status } from 'Models/Status';
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

export default (state, action) => {
  switch (action.type) {
    case FETCH_PROCESSES_REQUEST:
      return {
          ...state,
          processData: {
              processes: [],
              status: {
                  loading: true
              }
            }
      }
    case FETCH_PROCESSES_REQUEST_SUCCESS:
        return {
            ...state,
            processData: {
                processes: action.payload.data,
                status: {
                    loading: false, success: true
                }
            }
        }
    case FETCH_PROCESSES_REQUEST_FAILED:
        return {
            ...state,
            processData: {
                processes: [],
                status: {
                    loading: false, error: true
                }
            }
        }

    case SAVE_PROCESSES_REQUEST:
        return {
            ...state,
            processData: {
                ...state.processData,
                status: {
                    loading: true
                }
                }
      }
    case SAVE_PROCESSES_REQUEST_SUCCESS:
        var processes = state.processData.processes;
        processes.push(action.payload.data);
        return {
            ...state,
            processData: {
                processes: processes,
                status: {
                    loading: false, success: true
                }
            }
        }
    case SAVE_PROCESSES_REQUEST_FAILED:
        return {
            ...state,
            processData: {
                ...state.processData,
                status: {
                    loading: false, error: true
                }
            }
        }
    case FETCH_PROCESSE_SETTINGS_REQUEST:
      return {
          ...state,
          processSettingsData: {
              processSettings: [],
              status: {
                  loading: true
              }
            }
      }
    case FETCH_PROCESSE_SETTINGS_REQUEST_SUCCESS:
        return {
            ...state,
            processSettingsData: {
                processSettings: action.payload.data,
                status: {
                    loading: false, success: true
                }
            }
        }
    case FETCH_PROCESSE_SETTINGS_REQUEST_FAILED:
        return {
            ...state,
            processSettingsData: {
                processSettings: [],
                status: {
                    loading: false, error: true
                }
            }
        }

    case SAVE_PROCESSE_SETTING_REQUEST:
        return {
            ...state,
            processSettingsData: {
                ...state.processSettingsData,
                status: {
                    loading: true
                }
                }
      }
    case SAVE_PROCESSE_SETTING_REQUEST_SUCCESS:
        var processSettings = state.processSettingsData.processSettings;
        processSettings.map((m, index) => {
            if(m.id == action.payload.data.id) {
                processSettings[m.id] = action.payload.data;
            }
        });

        return {
            ...state,
            processSettingsData: {
                processSettings: processSettings,
                status: {
                    loading: false, success: true
                }
            }
        }
    case SAVE_PROCESSE_SETTING_REQUEST_FAILED:
        return {
            ...state,
            processSettingsData: {
                ...state.processSettingsData,
                status: {
                    loading: false, error: true
                }
            }
        }
    default:
      return {
        ...state,
      };
  }
};
