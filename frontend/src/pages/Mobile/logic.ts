import axios from 'axios'
import dayjs from 'dayjs'
import { ref } from 'vue'

import { TARGET_LIST } from '../../../../constants/api'
import { loginUser } from '../../components/Login/loginUser'
import { TargetItem } from '../../components/type'


export const listData = ref<TargetItem[]>([])

export const fetchData = async () => {
  const {用户名} = loginUser
  if (!用户名) {
    listData.value = []
    return
  }
  const params = {
    用户名,
    _sort: '计划完成时间',
    _order: 'asc'
  }

  const 现在时间 = new Date().valueOf()

  let result = await axios.get<TargetItem[]>(TARGET_LIST, {params})

  listData.value = result.data
    .filter(item => !item.完成时间)
    .sort((a,b) => {
      if (目标是今日目标(a) && !目标是今日目标(b)) {
        return -1
      }
      if (!目标是今日目标(a) && 目标是今日目标(b)) {
        return 1
      }
      if (目标是本周目标(a) && !目标是本周目标(b)) {
        return -1
      }
      if (!目标是本周目标(a) && 目标是本周目标(b)) {
        return 1
      }
      if (!目标已超时(a) && !目标已超时(b)) {
        return a.计划完成时间 - b.计划完成时间
      }
      return b.计划完成时间 - a.计划完成时间
    })
}

export const handleCancelItem = async (rowData: TargetItem) => {
  await axios.patch(`${TARGET_LIST}/${rowData.id}`, {
    完成时间: new Date().valueOf(),
    备注: '已取消'
  })
  await fetchData()
}

export const handleCompleteItem = async (rowData: TargetItem) => {
  await axios.patch(`${TARGET_LIST}/${rowData.id}`, {
    完成时间: new Date().valueOf()
  })
  await fetchData()
}

export const handleEditItem = async (rowData: TargetItem) => {
  await axios.put(`${TARGET_LIST}/${rowData.id}`, rowData)
  await fetchData()
}

export const 目标是今日目标 = (item: TargetItem) => dayjs(item.计划完成时间).isSame(dayjs(), 'day')
export const 目标已超时 = (item: TargetItem) => item.计划完成时间 < new Date().valueOf()
export const 目标是本周目标 = (item: TargetItem) => dayjs(item.计划完成时间).isSame(dayjs(), 'week')