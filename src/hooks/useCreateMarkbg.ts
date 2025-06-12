
import type { IGaoMarkConfig } from '@/type'

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
const defaultConfig: IGaoMarkConfig = {
  color: '#ccc',
  fontSize: 14,
  text: 'watermark',
  rotate: 45,
  gap: 50
}

export const useCreateMarkBg = async (config: IGaoMarkConfig | Record<string, any>): Promise<IReturndMark> => {

  let _config = { ...defaultConfig, ...config }

  let canvas:HTMLCanvasElement = document.createElement('canvas');
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  await renderText(canvas, ctx, _config)
  
  if(!_config.image) {
   await renderText(canvas, ctx, _config)
  }else{
    await renderImage(canvas, ctx, _config)
  }

  // console.log('canvas.....::::::::::::::::', canvas.toDataURL())
  // canvas.toDataURL()


  return Promise.resolve({
    base64: canvas.toDataURL(),
    size: {
      width: canvas.width,
      height: canvas.height
    }
  })
}


function renderText(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, _config: IGaoMarkConfig): Promise<any> {
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
  // console.log('text_arr::::::::::::::::', text_arr)
  text_arr.forEach((item, index) => {
    let y = index - text_arr.length / 2 + 0.5 // 让多行文字居中
    ctx.fillText(item, 0, y * fontSize)
  })
  // ctx.fillText(_config.text!, 0, 0)


  return Promise.resolve()
}

export function renderImage(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, _config: IGaoMarkConfig): Promise<any> {
  return new Promise((resolve) => {
    // 创建图片
    const image = new Image()
    image.src = _config.image!
    // 处理图片跨域
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = () => {
      // console.log('image::::::::::::::::', image.width, image.height)


      
      // 最大宽高
      const maxWidth = Math.cos(_config.rotate!) * image.width * 1.5
      // 最大高度
      const maxHeight = Math.sin(_config.rotate!) * image.width * 1.5 || image.height
      
      // console.log('maxWidth::::::::::::::::', Math.abs(maxWidth), Math.abs(maxHeight))


      canvas.width = Math.abs(maxWidth)
      canvas.height = Math.abs(maxHeight)
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(Math.PI / 180 * _config.rotate!)
      ctx.drawImage(image, -image.width/2, -image.height/2, image.width, image.height)
      resolve(null)
    }
    image.onerror = (err) => {
      console.warn(err)
      throw Error('图片加载失败')
    }
  })
  
}