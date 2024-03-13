export interface IMarkConfig {
  text?: string,
  fontSize?: number,
  color?: string,
  gap?: number | Array<number>,
  zIndex?: number,
  [key: string|number|symbol]: any
}