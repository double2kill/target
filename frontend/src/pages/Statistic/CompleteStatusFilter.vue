<script setup lang="ts">
import { NButton } from 'naive-ui'

import { completeStatusFilter, setCompleteStatusFilter } from './index'
const options = ['未完成', '完成', '全部']
</script>
<template>
  <div class="filter">
    <n-button
      v-for="option in options"
      :key="option"
      :type="completeStatusFilter === option ? 'primary' : 'default'"
      class="filter-button"
      data-test-id="上周统计"
      @click="setCompleteStatusFilter(option)"
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