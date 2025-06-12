<template>
  app
  
  <div id="app">
      <gao-watermark v-bind="config">
        <div style="height: 500px; border: 1px solid #ccc;">通过标签属性修改</div>
      </gao-watermark>
  
  
      <!-- <gao-watermark>
        <div style="height: 500px; border: 1px solid #ccc;">默认配置</div>
      </gao-watermark> -->
    </div>
  </template>
  
  
  <script setup lang="ts">
  import icon from './assets/te.png'
  
  import { ref } from 'vue';
  import { type IGaoMarkConfig } from './type'
  let config = ref<IGaoMarkConfig>({
    color: '#000',
    fontSize: 20,
    text: ['第一行', '第二行内容', '第三阿斯达是大多行', '123爱仕达多阿斯达书大撒多1阿斯达书大阿斯达23'],
    rotate: 20,
    gap: [500, 200],
    // image: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original',
    image: icon
  })
  
  </script>
  
  