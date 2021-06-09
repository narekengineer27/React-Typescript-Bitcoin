import { createAction } from 'Models/Action';
import { GLOBAL_TOOLTIP, GLOBAL_TOOLTIP_WIDTH, GLOBAL_TOOLTIP_HOVER } from './types';

export const toggleTooltip = (text: any = '', left: number = 0, top: number = 0, targetWidth: number = 0) => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_TOOLTIP, {
      text,
      left,
      top,
      targetWidth,
    }));
  };
};

export const updateTooltipWidth = (width) => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_TOOLTIP_WIDTH, width));
    if (width === 0) {
      dispatch(createAction(GLOBAL_TOOLTIP, {
        text: '',
        left: 0,
        top: 0,
      }));
    }
  };
};

export const hoverTooltip = (hover: boolean, text: string) => {
  return (dispatch) => {
    dispatch(createAction(GLOBAL_TOOLTIP_HOVER, {
      text,
      hover,
    }));
    dispatch(createAction(GLOBAL_TOOLTIP_WIDTH, 0));
  };
};
