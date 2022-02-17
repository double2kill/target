<script setup lang="ts">
import {Icon} from 'vant'


import {操作关闭详情弹出层} from './logic'

</script>

<template>
  <div class="popup-header">
    <Icon
      name="arrow-left"
      size="25"
      @click="操作关闭详情弹出层"
    />
    <span class="popup-title">目标详情</span>
  </div>
</template>

<style>
.popup-header {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 40px;
    border: 1px solid rgb(239, 239, 245);
}
.popup-title {
    font-size: 18px;
    margin-left: 15px;
}
.complete-button {
  margin-left: auto;
}
</style>