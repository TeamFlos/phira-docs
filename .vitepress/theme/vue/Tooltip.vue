<template>
  <span class="tooltip-wrapper" @mouseenter="show = true" @mouseleave="show = false">
    <!-- 触发图标（紧跟文字） -->
    <span class="tooltip-icon">ⓘ</span>
    
    <!-- 提示内容 -->
    <div class="tooltip-box" :class="{ visible: show }">
      <slot />
    </div>
  </span>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block; /* 保持 inline 特性，跟随文字排版 */
  margin: 0 2px; /* 与前后文字保持微小间距 */
  cursor: help;
}

.tooltip-icon {
  color: #2563eb; /* 蓝色提示图标 */
  font-size: 0.8em; /* 图标稍小于文字 */
  vertical-align: super; /* 与文字基线对齐 */
}

.tooltip-box {
  /* 基础样式 */
  position: absolute;
  z-index: 999;
  width: 240px;
  padding: 8px 12px;
  border-radius: 4px;
  background: #1e293b;
  color: #f8fafc;
  font-size: 0.875em;
  line-height: 1.5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  
  /* 默认定位在上方（可根据需要调整） */
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6px;
  
  /* 初始状态 */
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.2s ease;
}

/* 显示状态 */
.tooltip-box.visible {
  visibility: visible;
  opacity: 1;
}

/* 提示框箭头 */
.tooltip-box::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
}
</style>
