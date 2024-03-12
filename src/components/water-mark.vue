<template>
  <div style="position: relative;" ref="parentRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance} from 'vue'
import { useCreateMarkBg } from '../hooks/useCreateMarkbg'
import { IMarkConfig } from '../types/types'

let instance = getCurrentInstance()!

//  默认配置
const defaultConf: IMarkConfig = {
  fontSize: 20,
  color: 'rgba(0, 0, 0, .2)',
  text: 'WaterMark',
  gap: 50,
  zIndex: 9999
}
// 组件属性传值
const props = withDefaults(defineProps<IMarkConfig>(), {})
// 用户注册组件，默认配置
let userParams = instance.appContext.config.globalProperties._watermark_config || {}

// 获取水印配置
let watermarkConfig = {...defaultConf}
Object.keys(props).forEach(key => {
  watermarkConfig[key] = props[key] || userParams?.[key] || defaultConf[key]
})



console.log('config::::::::::::::::', watermarkConfig)

const parentRef = ref<Element|null>(null)

const { base64, size } = useCreateMarkBg(watermarkConfig)


let div:HTMLElement|null = null // 水印图层
const createWaterMark = () => {
  if(!parentRef.value) return
  if(div) div.remove()
  div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.inset = '0'
  div.style.pointerEvents = 'none'
  div.style.zIndex = String(watermarkConfig.zIndex)
  div.style.backgroundImage = `url(${base64})`
  div.style.backgroundSize = `${size.width}px ${size.height}px`
  div.style.backgroundRepeat = 'repeat'

  parentRef.value.appendChild(div)
}


let ob = new MutationObserver((entries) => {
  for (const entry of entries) {
    for (const node of entry.removedNodes) {
      // 水印图层被删除
      if(node === div) createWaterMark()
    }
    // 水印图层的属性被修改
    if(entry.target === div) createWaterMark()
  }
})

onMounted(() => {
  createWaterMark()
  ob.observe(parentRef.value!, {
    attributes: true,
    childList: true,
    subtree: true
  })
})

onUnmounted(() => {
  ob.disconnect()
})

</script>