export const GLOBAL_TOOLTIP = 'GLOBAL_TOOLTIP';
export const GLOBAL_TOOLTIP_WIDTH = 'GLOBAL_TOOLTIP_WIDTH';
export const GLOBAL_TOOLTIP_HOVER = 'GLOBAL_TOOLTIP_HOVER';

export type IState = {
  text: string,
  left: number,
  top: number,
  tooltipWidth: number,
  targetWidth: number,
  hover: boolean,
};
