<script setup lang="ts">
import dayjs from 'dayjs'
import { Tag } from 'vant'
import { PropType, computed } from 'vue'

import {TargetItem} from '../../../components/type'
import { 目标是今日目标, 目标已超时, 目标是本周目标 } from '../logic'

const props = defineProps({
  value: {
    type: Object as PropType<TargetItem>,
    required: true,
  },
})

const 至今差别天数 = computed(() => {
  const 计划完成时间Dayjs= dayjs(props.value.计划完成时间)
  const 当前Dayjs = dayjs()
  const 小时 = 计划完成时间Dayjs.diff(当前Dayjs, 'hour')
  if (小时 < 24) {
    return `剩${小时}小时`
  }
  const 天数 = 计划完成时间Dayjs.diff(当前Dayjs, 'day')
  if (天数 < 7) {
    return `${天数}天后`
  }
  const 周数 = 计划完成时间Dayjs.diff(当前Dayjs, 'week')
  if (周数 < 5) {
    return `${周数}周后`
  }
  const 月数 = 计划完成时间Dayjs.diff(当前Dayjs, 'month')
  if (月数 < 12) {
    return `${月数}个月后`
  }
  const 年数 = 计划完成时间Dayjs.diff(当前Dayjs, 'month')
  return `${年数}月后`
})

</script>

<template>
  <span class="tag-list">
    <Tag
      v-if="目标是今日目标(props.value)"
      type="primary"
      class="tag-item"
    >
      今日目标
    </Tag>
    <Tag
      v-if="目标是本周目标(props.value)"
      type="warning"
      class="tag-item"
    >
      本周目标
    </Tag>
    <Tag
      v-if="目标已超时(props.value)"
      type="danger"
      class="tag-item"
    >
      已超时
    </Tag>
    <Tag
      v-if="!(目标是本周目标(props.value)||目标已超时(props.value))"
      plain
      type="warning"
      class="tag-item"
    >
      {{ 至今差别天数 }}
    </Tag>
  </span>
</template>

<style>
.tag-list {
  margin-left: 10px;
}
.tag-item + .tag-item {
  margin-left: 10px;
}
</style>