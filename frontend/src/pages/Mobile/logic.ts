import axios from 'axios'
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
  const result = await axios.get<TargetItem[]>(TARGET_LIST, {params})
  listData.value = result.data.filter(item => !item.完成时间)
}

export const handleCompleteItem = async (rowData: TargetItem) => {
  await axios.patch(`${TARGET_LIST}/${rowData.id}`, {
    完成时间: new Date().valueOf()
  })
  await fetchData()
}