<script setup lang="ts">
import {onBeforeRouteLeave} from 'vue-router'

import DetailPopup from './DetailPopup.vue'
import {是否显示详情弹出层, 操作关闭详情弹出层} from './logic'

onBeforeRouteLeave((to) => {
  if (是否显示详情弹出层.value && to.name !== '手机端详情') {
    操作关闭详情弹出层()
    return false
  }
  return true
})
</script>
<template>
  <DetailPopup />
</template>