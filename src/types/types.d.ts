export interface IMarkConfig {
  [key: string]: any;
  text?: string,
  fontSize?: number,
  color?: string,
  gap?: number|Array<number>,
  zIndex?: number,
}

declare module 'gao-watermark' {
  export const waterMark: any
}