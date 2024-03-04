### 安装
```bash
npm install gao-watermark --save-dev
```

### 使用
#### vue3使用
```html
<!-- 单文件使用 -->
import { waterMark, IMarkConfig } from 'gao-watermark'
<waterMark color='red' text="测试水印"/>
```
#### vue2使用
> 目前不支持vue2版本
### 参数配置
| 属性 | 类型 | 默认值 | 描述 | 
|------|------|------|------|
| fontSize | number | 14 | 字体大小 |
| color | string | #ccc | 字体颜色 |
| text | string | watermark | 水印内容文字 |
| gap | number | 50 | 间距 |
| zIndex | number | 9999 | 层级 |



