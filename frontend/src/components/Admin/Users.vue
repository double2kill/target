<script lang="ts" setup>
import axios from 'axios'
import { NDataTable } from 'naive-ui'
import {onMounted, ref} from 'vue'

import {USER_LIST} from '../../../../constants/api'
import {User} from '../type'

const userData = ref<User[]>([])
const fetchUserList = async () => {
  const result = await axios.get(USER_LIST)
  userData.value = result.data
}
onMounted(() => {
  fetchUserList()
})
const columns= [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: '用户名',
    key: '用户名'
  },
  {
    title: '邮箱',
    key: '邮箱'
  }
]
</script>

<template>
  <n-data-table
    :row-key="(item) => item.id"
    :columns="columns"
    :data="userData"
  />
</template>