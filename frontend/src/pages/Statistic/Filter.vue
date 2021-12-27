<script setup lang="ts">
import { NButton } from 'naive-ui'
import { isThisWeekFilter, isLastWeekFilter, isAllFilter, setThisWeekFilter, setLastWeekFilter, setAllFilter } from './index'
</script>

<template>
  <div class="quick-filter">
    <n-button
      :type="isLastWeekFilter ? 'primary' : 'default'"
      class="filter-button"
      data-test-id="上周统计"
      @click="setLastWeekFilter"
    >
      上周统计
    </n-button>
    <n-button
      :type="isThisWeekFilter ? 'primary' : 'default'"
      class="filter-button"
      data-test-id="本周统计"
      @click="setThisWeekFilter"
    >
      本周统计
    </n-button>
    <n-button
      :type="isAllFilter ? 'primary' : 'default'"
      class="filter-button"
      data-test-id="全部"
      @click="setAllFilter"
    >
      全部
    </n-button>
  </div>
</template>