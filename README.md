### 安装
```bash
npm install gao-watermark --save-dev
```

### 使用
#### vue3使用
```html
<!-- 单文件使用 -->
import { watermark } from 'gao-watermark'
<watermark color='red' text="测试水印"/>

<!-- ================================================================== -->

<!-- 全局注册 -->
import waterMark from 'gao-watermark'
let app = createApp(App)
app.use(waterMark, {
  fontSize: 14,
  color: '#ccc',
  text: 'watermark',
  gap: 50,
  zIndex: 1000,
  rotate: 45
})
<!-- 使用 -->
<GaoWatermark></GaoWatermark>

```
#### vue2使用
> 目前不支持vue2版本
### 参数配置
| 属性     | 类型   | 默认值    | 描述         |
| -------- | ------ | --------- | ------------ |
| fontSize | number | 14        | 字体大小     |
| color    | string | #ccc      | 字体颜色     |
| text     | string | watermark | 水印内容文字 |
| gap      | number | 50        | 间距         |
| zIndex   | number | 9999      | 层级         |
| rotate   | number | 45        | 旋转角度     |



