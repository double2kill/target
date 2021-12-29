<script setup lang="ts">
import dayjs from 'dayjs'
import { NDataTable } from 'naive-ui'
import { TableColumns } from 'naive-ui/es/data-table/src/interface'

import { TargetItem } from '../../components/type'

import { 过滤后的数据 } from './index'

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
    }
  },
  {
    title: '备注',
    key: '备注'
  }
]
</script>

<template>
  <n-data-table
    :row-key="(item) => item.id"
    :columns="columns"
    :data="过滤后的数据"
  />
</template>