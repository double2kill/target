<script setup lang="ts">
import { NCard, NStatistic, NGrid, NGridItem, NDivider } from 'naive-ui'
import { onMounted } from 'vue'

import CompleteStatusFilter from './CompleteStatusFilter.vue'
import Filter from './Filter.vue'
import List from './List.vue'

import { fetchStatisticList, 已完成的数据, 已及时完成的数据, listData, 及时完成率, 完成率 } from './index'

onMounted(() => {
  fetchStatisticList()
})
</script>
<template>
  <div>
    <Filter />
    <n-divider />
    <n-grid
      cols="4"
      item-responsive
    >
      <n-grid-item
        offset="0 640:1"
        span="4 640:2"
      >
        <n-card
          embedded
          title="统计结果"
        >
          <n-grid
            x-gap="12"
            cols="2"
          >
            <n-grid-item>
              <n-statistic label="完成情况">
                {{ 已完成的数据.length }}
                <template #suffix>
                  / {{ listData.length }}
                </template>
              </n-statistic>
            </n-grid-item>
            <n-grid-item>
              <n-statistic label="完成率">
                {{ 完成率 }} %
              </n-statistic>
            </n-grid-item>
            <n-grid-item>
              <n-statistic label="及时完成情况">
                {{ 已及时完成的数据.length }}
                <template #suffix>
                  / {{ listData.length }}
                </template>
              </n-statistic>
            </n-grid-item>
            <n-grid-item>
              <n-statistic label="及时完成率">
                {{ 及时完成率 }} %
              </n-statistic>
            </n-grid-item>
          </n-grid>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-divider />
    <CompleteStatusFilter />
    <List />
  </div>
</template>