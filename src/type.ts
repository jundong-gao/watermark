export interface IMarkConfig {
  text?: string | string[],
  fontSize?: number,
  color?: string,
  gap?: number | Array<number>,
  zIndex?: number,
  rotate?: number,
  [key: string|number|symbol]: any
}