<script setup lang="ts">
import { Tag } from 'vant'
import { PropType } from 'vue'

import {TargetItem} from '../../../components/type'
import { 目标是今日目标, 目标已超时, 目标是本周目标 } from '../logic'

const props = defineProps({
  value: {
    type: Object as PropType<TargetItem>,
    required: true,
  },
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