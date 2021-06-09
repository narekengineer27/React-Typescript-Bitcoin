import { showMessage } from 'Components/GlobalMessage/actions';
const MSG_CONNECTION_ERROR = {};

export const onError = (url: string = '') => {
  return (dispatch) => {
    dispatch(showMessage(`Failed to connect to WebSocket: ${url}`, 'error', MSG_CONNECTION_ERROR));
  };
};
