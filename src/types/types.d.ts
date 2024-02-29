
export interface IMarkConfig {
  [key: string]: string | number;
  text?: string,
  fontSize?: number,
  color?: string,
  gap?: number|Array<number>,
  zIndex?: number,
}

declare module 'gao-watermark' {
  export interface IMarkConfig extends IMarkConfig {
    
  }
}