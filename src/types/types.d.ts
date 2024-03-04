export interface IMarkConfig {
  [key: string]: any;
  text?: string,
  fontSize?: number,
  color?: string,
  gap?: number | Array<number>,
  zIndex?: number,
}

export const waterMark: any;
export const install: () => void;
export default {
  install,
  waterMark
}