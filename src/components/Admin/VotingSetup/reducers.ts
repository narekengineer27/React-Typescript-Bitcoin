
import { 
    VOTING_LIST,
    VOTING_LIST_SUCCESS,
    VOTING_LIST_FAILURE,
    VOTING_SETUP,
    VOTING_SETUP_SUCCESS,
    VOTING_SETUP_FAILURE,
    VOTING_SETUP_UPDATE_FAILED,
    VOTING_SETUP_UPDATE_SUCCESS,
    VOTING_SETUP_UPDATE
 } from './types';

export default (state, action) => {
  switch (action.type) {
    case VOTING_LIST:
        return {
            ...state,
            votelist:[],
            status: {
                loading: true
            }
        }
    case VOTING_LIST_SUCCESS:
        return {
            ...state,
            votelist: action.payload.data,
            status: {
                loading: false, success: true
            }
        }
    case VOTING_LIST_FAILURE:
        return {
            ...state,
            votelist:[],
            status: {
                loading: false, error: true
            }
        }
    case VOTING_SETUP:        
        return {
            ...state,
            status: {
                loading: true
            }
        }
    case VOTING_SETUP_SUCCESS:
        var voteList = state.votelist;
        voteList.push(action.payload.data);
        return {
            ...state,
            votelist: voteList,
            status: {
                loading: false, success: true
            }
        }
    case VOTING_SETUP_FAILURE:
        return {
            ...state,
            status: {
                loading: false, error: true
            }
        }
    case VOTING_SETUP_UPDATE:        
        return {
            ...state,
            status: {
                loading: true
            }
        }
    case VOTING_SETUP_UPDATE_SUCCESS:
        return {
            ...state,
            voteupdate: action.payload.data,
            status: {
                loading: false, success: true
            }
        }
    case VOTING_SETUP_UPDATE_FAILED:
        return {
            ...state,
            status: {
                loading: false, error: true
            }
        }
    default:
        return {
            ...state,
        };
  }
};
