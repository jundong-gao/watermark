
import { IMarkConfig } from '@/type'

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
  rotate: 45,
  gap: 50
}

export const useCreateMarkBg = (config: IMarkConfig | Record<string, any>): IReturndMark => {

  let _config = { ...defaultConfig, ...config }

  let canvas:HTMLCanvasElement = document.createElement('canvas');
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  let fontSize = _config.fontSize! * window.devicePixelRatio;

  ctx.font = `${fontSize}px Arial`


  let text_arr = Array.isArray(_config.text) ? _config.text : [_config.text!]

  // 求出文字数组的最大宽度
  let textWidth = Math.max(...text_arr.map(item => ctx.measureText(item).width))

  // let textWidth = ctx.measureText(_config.text!).width

  // 三角形直角边长度
  let short_width = textWidth * Math.cos(Math.PI / 4) + text_arr.length * fontSize

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
  ctx.rotate(Math.PI / 180 * -(_config.rotate!))

  ctx.fillStyle = _config.color!;
  ctx.font = `${fontSize}px Arial`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  // 绘制文字数组
  console.log('text_arr::::::::::::::::', text_arr)
  text_arr.forEach((item, index) => {
    let y = index - text_arr.length / 2 + 0.5 // 让多行文字居中
    ctx.fillText(item, 0, y * fontSize)
  })
  // ctx.fillText(_config.text!, 0, 0)

  console.log('base64::::::::::::::::', canvas.toDataURL('image/png'))


  return {
    base64: canvas.toDataURL('image/png'),
    size: {
      width: canvasWidth,
      height: canvasHeight
    }
  }
}