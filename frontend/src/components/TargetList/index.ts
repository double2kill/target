import { ref } from 'vue'
import { TargetItem, TargetFormData } from '../type'
import axios from 'axios'
import { TARGET_LIST } from '../../../../constants/api'

export const targetData = ref<TargetItem[]>([])
export const fetchTargetList = async () => {
  const result = await axios.get(TARGET_LIST)
  targetData.value = result.data
}

export const handleAddItem = async (formData: TargetFormData) => {
  await axios.post(TARGET_LIST, formData)
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

export const isItemPopupShow = ref(false)
export const handleShowAddItemPopup = () => {
  initialFormData.value = {
    目标内容: '',
    计划完成时间: '',
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
  计划完成时间: '',
  用户名: '',
})