<script lang="ts" setup>
import { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { NDataTable, NButton } from 'naive-ui'
import { onMounted, h } from 'vue'
import { targetData, setIsAdminMode, fetchTargetList, handleShowAddItemPopup } from './index'
import ItemPopup from './ItemPopup.vue'
import Actions from './Actions.vue'
import { TargetItem } from '../type'
import dayjs from 'dayjs'
import QuickFilter from './QuickFilter.vue'

const props = defineProps({
  isAdminMode: Boolean
})

onMounted(() => {
  setIsAdminMode(props.isAdminMode)
  fetchTargetList()
})

let columns: TableColumns<TargetItem> = [
  {
    title: '目标内容',
    key: '目标内容',
  },
  {
    title: '计划完成时间',
    key: '计划完成时间',
    render (rowData) {
      const { 计划完成时间 } = rowData
      return props.isAdminMode
        ? 计划完成时间
        : 计划完成时间 ? dayjs(+计划完成时间).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
  {
    title: '完成时间',
    key: '完成时间',
    render (rowData) {
      const { 完成时间 } = rowData
      return props.isAdminMode
        ? 完成时间
        : 完成时间 ? dayjs(+完成时间).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
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