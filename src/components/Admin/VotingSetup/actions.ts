import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';

import {
    VOTING_SETUP,
    VOTING_SETUP_FAILURE,
    VOTING_SETUP_SUCCESS,
    VOTING_LIST,
    VOTING_LIST_FAILURE,
    VOTING_LIST_SUCCESS,
    VOTING_SETUP_UPDATE,
    VOTING_SETUP_UPDATE_SUCCESS,
    VOTING_SETUP_UPDATE_FAILED
} from './types';

const MSG_FAILED = {};
const MSG_SUCCESS = {};

export const adminVotingSetup = (data) => {
    return (dispatch) => {
      dispatch(createAction(VOTING_SETUP, {}));
      api.adminVotingSetup(data)
        .then(response => {
          dispatch(createAction(VOTING_SETUP_SUCCESS, response));
          dispatch(hideMessage(MSG_FAILED));
          dispatch(showMessage("Successfully Saved.", 'info', MSG_SUCCESS));
        })
        .catch(err => {
          dispatch(createAction(VOTING_SETUP_FAILURE, err));
          dispatch(showMessage(err, 'error', MSG_FAILED));
        });
    }
}

export const updateVotingSetupData = (id, data) => {
    return (dispatch) => {
      dispatch(createAction(VOTING_SETUP_UPDATE, data));
      api.adminVotingSetupUpdate(id, data)
        .then(response => {
          dispatch(createAction(VOTING_SETUP_UPDATE_SUCCESS, response));
          dispatch(hideMessage(MSG_FAILED));
          dispatch(showMessage("Successfully Updated.", 'info', MSG_SUCCESS));
        })
        .catch(err => {
          dispatch(createAction(VOTING_SETUP_UPDATE_FAILED, err));
          dispatch(showMessage(err, 'error', MSG_FAILED));
        });
    };
}

export const adminVoteList = () => {
    return (dispatch) => {
      dispatch(createAction(VOTING_LIST, {}));
      api.adminVoteList()
        .then(response => {
          dispatch(createAction(VOTING_LIST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(VOTING_LIST_FAILURE, err));
        });
    }
}
