import {
  GLOBAL_TOOLTIP,
  GLOBAL_TOOLTIP_WIDTH,
  GLOBAL_TOOLTIP_HOVER,
  IState,
} from './types';

const initialState: IState = {
  text: '',
  left: 0,
  top: 0,
  tooltipWidth: 0,
  targetWidth: 0,
  hover: false,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TOOLTIP:
      return {
        ...state,
        ...action.payload,
      };
    case GLOBAL_TOOLTIP_WIDTH:
      return {
        ...state,
        tooltipWidth: action.payload,
      };
    case GLOBAL_TOOLTIP_HOVER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
