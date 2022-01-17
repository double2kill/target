<script setup lang="ts">
import { NButton } from 'naive-ui'

import { 完成状态的选择, 设置完成状态的选择 } from './index'
const options = ['未完成', '已完成', '未及时完成', '及时完成', '全部']
</script>
<template>
  <div class="filter">
    <n-button
      v-for="option in options"
      :key="option"
      :type="完成状态的选择 === option ? 'primary' : 'default'"
      class="filter-button"
      data-test-id="上周统计"
      @click="设置完成状态的选择(option)"
    >
      {{ option }}
    </n-button>
  </div>
</template>
<style>
.filter {
  margin: 15px
}
</style>