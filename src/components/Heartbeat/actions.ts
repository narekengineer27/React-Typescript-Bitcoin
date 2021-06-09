import * as api from 'Utils/api';
import * as _ from 'lodash';
import { createAction } from 'Models/Action';
import { showMessage } from 'Components/GlobalMessage/actions';

import { HEARTBEAT_PULSE } from './types';

const MSG_HEARTBEAT_FAILED = {};

export const pulse = () => {
  return (dispatch) => {
    api.heartbeat()
      .then((response) => {
        const version = _.get(response, 'data.version', '');
        const existingVersion = localStorage.getItem('version');
        if (!existingVersion) {
          localStorage.setItem('version', version);
        }
        if (existingVersion && version !== existingVersion) {
          dispatch(showMessage(
            'Please kindly refresh the whole page to enjoy our new features.',
            'error',
            MSG_HEARTBEAT_FAILED,
          ));
          api.signOutLocal();
          dispatch(createAction(HEARTBEAT_PULSE, false));
        } else {
          dispatch(createAction(HEARTBEAT_PULSE, true));
        }
      })
      .catch(() => {
      });
  };
};

export const born = () => {
  return (dispatch) => {
    dispatch(createAction(HEARTBEAT_PULSE, true));
  };
};
