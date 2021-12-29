<script setup lang="ts">
import { NButton } from 'naive-ui'

import { isAllFilter, setAllFilter, isTodayFilter, setTodayFilter, isWeekFilter, setWeekFilter } from './index'
</script>

<template>
  <div class="quick-filter">
    <n-button
      :type="isTodayFilter ? 'primary' : 'default'"
      class="filter-button"
      data-test-id="今日目标"
      @click="setTodayFilter"
    >
      今日目标
    </n-button>
    <n-button
      :type="isWeekFilter ? 'primary' : 'default'"
      class="filter-button"
      data-test-id="本周目标"
      @click="setWeekFilter"
    >
      本周目标
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

<style scope>
.quick-filter {
    margin: 15px;
}
.filter-button + .filter-button {
    margin-left: 10px;
}
</style>