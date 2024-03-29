<script lang="ts" setup>
import dayjs from 'dayjs'
import { NDataTable, NButton } from 'naive-ui'
import { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { onMounted, h, ref } from 'vue'

import { TargetItem } from '../type'

import Actions from './Actions.vue'
import InputBox from './InputBox.vue'
import ItemPopup from './ItemPopup.vue'
import QuickFilter from './QuickFilter.vue'

import { targetData, setIsAdminMode, fetchTargetList, handleShowAddItemPopup, 设置表格Ref } from './index'

const props = defineProps({
  isAdminMode: Boolean
})

const 表格Ref = ref<null>(null)

onMounted(() => {
  setIsAdminMode(props.isAdminMode)
  fetchTargetList()
  设置表格Ref(表格Ref.value)
})

let columns: TableColumns<TargetItem> = [
  {
    title: '目标内容',
    key: '目标内容',
  },
  {
    title: '计划完成时间',
    key: '计划完成时间',
    defaultSortOrder: 'descend',
    sorter: 'default',
    render (rowData) {
      const { 计划完成时间 } = rowData
      return 计划完成时间 ? dayjs(+计划完成时间).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
  {
    title: '完成时间',
    key: '完成时间',
    sorter (rowA:TargetItem, rowB:TargetItem) {
      const a = rowA.完成时间 || 0
      const b = rowB.完成时间 || 0
      return a - b
    },
    render (rowData) {
      const { 完成时间 } = rowData
      return 完成时间 ? dayjs(+完成时间).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    defaultFilterOptionValues: ['已完成', '未完成'],
    filter (value, row) {
      const 完成时间 = row.完成时间 || 0
      if (value === '未完成') {
        return 完成时间 ===0
      } else if (value === '已完成') {
        return 完成时间!==0
      }
      return false
    }
  },
  {
    title: '备注',
    key: '备注',
    render (rowData) {
      return h(InputBox, {
        rowData
      })
    }
  }
]

if (props.isAdminMode) {
  columns.push(
    {
      title: '用户名',
      key: '用户名'
    }
  )
}

columns.push({
  title: '操作',
  key: '操作',
  width: props.isAdminMode ? 270 : 90,
  render (rowData) {
    return h(
      Actions,
      {
        rowData,
        isAdminMode: props.isAdminMode
      },
    )
  }
})
</script>

<template>
  <QuickFilter />
  <div
    v-if="isAdminMode"
    class="top-box"
  >
    <n-button
      data-test-id="添加"
      @click="handleShowAddItemPopup"
    >
      添加
    </n-button>
    <ItemPopup />
  </div>
  <n-data-table
    ref="表格Ref"
    data-test-id="表格"
    :row-key="(item) => item.id"
    :columns="columns"
    :data="targetData"
  />
</template>

<style>
.top-box {
  margin: 15px;
}
</style>