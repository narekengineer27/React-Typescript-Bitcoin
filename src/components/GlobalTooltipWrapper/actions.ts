import { toggleTooltip } from 'Components/GlobalTooltip/actions';

export const toggle = (text: string = '', left: number = 0, top: number = 0) => {
  return (dispatch) => {
    dispatch(toggleTooltip(text, left, top));
  };
};
