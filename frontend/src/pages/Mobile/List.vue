<script setup lang="ts">
import dayjs from 'dayjs'
import { Cell, CellGroup, Tag, Button } from 'vant'
import { onMounted } from 'vue'

import FormattedDate from '../../components/Date/FormattedDate.vue'

import { listData, fetchData, handleCompleteItem, handleCancelItem, 目标是今日目标, 目标已超时, 目标是本周目标 } from './logic'

onMounted(() => {
  fetchData()
})

</script>
<template>
  <div>
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
            type="primary"
            class="tag-item"
          >
            今日目标
          </Tag>
          <Tag
            v-if="目标是本周目标(item)"
            type="warning"
            class="tag-item"
          >
            本周目标
          </Tag>
          <Tag
            v-if="目标已超时(item)"
            type="danger"
            class="tag-item"
          >
            已超时
          </Tag>
          <span class="action">
            <Button
              v-if="目标已超时(item)"
              size="small"
              @click="handleCancelItem(item)"
            >
              取消
            </Button>
            <Button
              type="primary"
              size="small"
              @click="handleCompleteItem(item)"
            >
              完成
            </Button>
          </span>
        </template>
      </Cell>
    </CellGroup>
  </div>
</template>

<style>
.action {
  float: right;
}
.tag-item {
  margin-left: 10px;
}
</style>