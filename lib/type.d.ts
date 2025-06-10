export interface IGaoMarkConfig {
  text?: string | string[],
  fontSize?: number,
  color?: string,
  gap?: number | Array<number>,
  zIndex?: number,
  rotate?: number,
  image?: string,
  [key: string|number|symbol]: any
}

