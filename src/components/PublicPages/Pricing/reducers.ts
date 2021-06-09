import { Status } from 'Models/Status';

import {
  PUBLIC_PRICING_PACKAGES,
  IState,
} from './types';

const initialState: IState = {
  packages: { status: new Status(), data: [] },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case PUBLIC_PRICING_PACKAGES:
      return {
        ...state, packages: { ...state.packages, ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
