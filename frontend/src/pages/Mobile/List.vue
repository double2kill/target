<script setup lang="ts">
import dayjs from 'dayjs'
import { Cell, CellGroup, Tag, Button } from 'vant'
import { onMounted } from 'vue'

import FormattedDate from '../../components/Date/FormattedDate.vue'

import { listData, fetchData, handleCompleteItem, 目标是今日目标, 目标已超时 } from './logic'

onMounted(() => {
  fetchData()
})

</script>
<template>
  <CellGroup>
    <Cell
      v-for="item in listData"
      :key="item.id"
      :title="item.目标内容"
    >
      <template #label>
        <FormattedDate
          :value="item.计划完成时间"
        />
        <Tag
          v-if="目标是今日目标(item)"
          type="warning"
          class="tag-item"
        >
          今日目标
        </Tag>
        <Tag
          v-if="目标已超时(item)"
          type="danger"
          class="tag-item"
        >
          已超时
        </Tag>
        <Button
          type="primary"
          size="mini"
          class="action"
          @click="handleCompleteItem(item)"
        >
          完成
        </Button>
      </template>
    </Cell>
  </CellGroup>
</template>

<style>
.action {
  float: right;
}
.tag-item {
  margin-left: 10px;
}
</style>