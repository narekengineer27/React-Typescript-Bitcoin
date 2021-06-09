export const fadeIn = (element: any, start: number, duration: number, targetOpacity = 1) => {
  element.attr({ opacity: 0 });
  setTimeout(() => element.animate({ opacity: targetOpacity }, duration), start);
};

export const translate = (element: any, start: number, duration: number,
                          x1: number, y1: number, x2: number, y2: number) => {

  element.transform(`t${x1},${y1}`);
  setTimeout(() => element.animate({ transform: `t${x2},${y2}` }, duration), start);
};

export const scale = (element: any, start: number, duration: number,
                      s1: number, s2: number, cx: number, cy: number) => {

  element.transform(`s${s1},${s1},${cx},${cy}`);
  setTimeout(() => element.animate({ transform: `s${s2},${s2},${cx},${cy}` }, duration), start);
};
