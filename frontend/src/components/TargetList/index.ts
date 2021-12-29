import axios from 'axios'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'

import { TARGET_LIST } from '../../../../constants/api'
import { loginUser } from '../Login/loginUser'
import { TargetItem, TargetFormData } from '../type'

import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export const isAdminMode = ref(false)
export const setIsAdminMode = (value: boolean) => { isAdminMode.value = value}

export const targetData = ref<TargetItem[]>([])

export const fetchTargetList = async () => {
  const {用户名} = loginUser
  if (!用户名) {
    targetData.value = []
    return
  }
  let filterParams: any = {}
  if (filterStartWith.value) {
    filterParams.计划完成时间_gte = dayjs().startOf(filterStartWith.value).valueOf()
    filterParams.计划完成时间_lte = dayjs().endOf(filterStartWith.value).valueOf()
  }
  if (!isAdminMode.value) {
    filterParams.用户名 = 用户名
  }
  const result = await axios.get(TARGET_LIST, {params: filterParams})
  targetData.value = result.data
}

export const handleAddItem = async (formData: TargetFormData) => {
  await axios.post(TARGET_LIST, {
    ...formData,
    添加时间: new Date().valueOf()
  })
  await fetchTargetList()
}

export const handleEditItem = async (formData: TargetFormData) => {
  await axios.put(`${TARGET_LIST}/${formData.id}`, formData)
  await fetchTargetList()
}

export const handleDeleteItem = async (rowData: TargetItem) => {
  await axios.delete(`${TARGET_LIST}/${rowData.id}`)
  await fetchTargetList()
}

export const handleCompleteItem = async (rowData: TargetItem) => {
  await axios.patch(`${TARGET_LIST}/${rowData.id}`, {
    完成时间: new Date().valueOf()
  })
  await fetchTargetList()
}

export const isItemPopupShow = ref(false)
export const handleShowAddItemPopup = () => {
  initialFormData.value = {
    目标内容: '',
    计划完成时间: null,
    用户名: '',
  }
  isItemPopupShow.value = true
}

export const handleShowEditItemPopup = (rowData: TargetItem) => {
  initialFormData.value = rowData
  isItemPopupShow.value = true
}

export const itemFormRef = ref<any>(null)
export const setItemFormRef = (ref: any) => {
  itemFormRef.value = ref
}

export const initialFormData = ref<TargetFormData>({
  目标内容: '',
  计划完成时间: null,
  用户名: '',
})

watch(loginUser, () => {
  fetchTargetList()
})

export const filterStartWith = ref<'day' | 'week' | ''>('day')
export const isAllFilter = computed(() => filterStartWith.value === '')
export const isTodayFilter = computed(() => filterStartWith.value === 'day')
export const isWeekFilter = computed(() => filterStartWith.value === 'week')

export const setAllFilter = () => {
  filterStartWith.value = ''
}
export const setTodayFilter = () => {
  filterStartWith.value = 'day'
}
export const setWeekFilter = () => {
  filterStartWith.value = 'week'
}

watch(filterStartWith, () => {
  fetchTargetList()
})