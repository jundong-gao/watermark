
import { IMarkConfig } from '@/types/types'

export interface IReturndMark {
  base64: string,
  size: {
    width: number,
    height: number
  }
}

/**
 * 默认配置项
 */
const defaultConfig: IMarkConfig = {
  color: '#ccc',
  fontSize: 14,
  text: 'watermark',
  gap: 50
}

export const useCreateMarkBg = (config: IMarkConfig | Record<string, any>): IReturndMark => {

  let _config = { ...defaultConfig, ...config }

  let canvas:HTMLCanvasElement = document.createElement('canvas');
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  let fontSize = _config.fontSize! * window.devicePixelRatio;

  ctx.font = `${fontSize}px Arial`

  let textWidth = ctx.measureText(_config.text!).width

  // 三角形直角边长度
  let short_width = textWidth * Math.cos(Math.PI / 4)

  let canvasWidth = 0
  let canvasHeight = 0
  if(Array.isArray(_config.gap)) {
    canvasWidth = Math.min(short_width, textWidth) + _config.gap[0] * devicePixelRatio
    canvasHeight = Math.min(short_width, textWidth) + _config.gap[1] * devicePixelRatio
  }else{
    canvasHeight = canvasWidth = Math.min(short_width, textWidth) + _config.gap! * devicePixelRatio
  }


  canvas.width = canvasWidth;
  canvas.height = canvasHeight

  ctx.translate(canvasWidth / 2, canvasHeight / 2)
  ctx.rotate(Math.PI / 180 * -45)

  ctx.fillStyle = _config.color!;
  ctx.font = `${fontSize}px Arial`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(_config.text!, 0, 0)

  console.log('base64::::::::::::::::', canvas.toDataURL('image/png'))


  return {
    base64: canvas.toDataURL('image/png'),
    size: {
      width: canvasWidth,
      height: canvasHeight
    }
  }
}