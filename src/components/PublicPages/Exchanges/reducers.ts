import { Status } from 'Models/Status';

import {
  IState,
} from 'Components/PublicPages/Articles/types';

const initialState: IState = {
  article: { status: new Status(), data: {} },

};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
