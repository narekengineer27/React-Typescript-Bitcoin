import * as _ from 'lodash';
import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
  ROLE_CHANGE,
  ROLE_CHANGE_SUCCESS,
  ROLE_CHANGE_FAILURE,
  ROLE_FETCH,
  ROLE_FETCH_SUCCESS,
  ROLE_FETCH_FAILURE,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
import { history } from 'Components/Routes';

const MSG_FAILED = {};
const MSG_SUCCESS = {};

export const roleList = () => {
    return (dispatch) => {
      dispatch(createAction(ROLE_FETCH, {}));
      api.roleList()
        .then(response => {
          dispatch(createAction(ROLE_FETCH_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(ROLE_FETCH_FAILURE, err));
        });
    }
}

export const roleChange = (flag:any, data:any) => {
    return (dispatch) => {
      if(flag==0){
        dispatch(showMessage("Please Select Role.", 'error', MSG_FAILED));
      }else{
        dispatch(createAction(ROLE_CHANGE, data));
        api.roleChange(data)
          .then(response => {
            dispatch(createAction(ROLE_CHANGE_SUCCESS, response));
            // dispatch(hideMessage(MSG_FAILED));
            // dispatch(showMessage("Successfully Changed.", 'info', MSG_SUCCESS));
            let userJson = localStorage.getItem('user');
            var data = JSON.parse(userJson);
            switch(flag) { 
                case "1": {
                    data['role_id'] = 1;
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/dashboard/exchanges');
                    break;
                } 
                case "2": {
                    data['role_id'] = 2;
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/dashboard/token-owner');
                    break; 
                }
                case "3": {
                    data['role_id'] = 3;
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/dashboard/market-maker');
                    break; 
                } 
                case "4": {
                    data['role_id'] = 4;
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/dashboard/trader');
                    break; 
                }
                case "5": {
                    data['role_id'] = 5;
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/dashboard/community');
                    break; 
                } 
                default: { 
                    //statements; 
                    break; 
                } 
           }
          })
          .catch(err => {
            dispatch(createAction(ROLE_CHANGE_FAILURE, err));
            dispatch(showMessage(err, 'error', MSG_FAILED));
          });
      }
    };
}
