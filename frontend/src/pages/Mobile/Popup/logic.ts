import {ref} from 'vue'

import {TargetItem} from '../../../components/type'
import {handleEditItem} from '../logic'

export const router = ref<any>(null)

export const setRouter = (value: any) => {
  router.value = value
  if (value.currentRoute.value.name === '手机端详情') {
    router.value.replace({name: '首页'})
  }
}

export const 是否显示详情弹出层 = ref(false)

export const 操作显示详情弹出层 =(item: TargetItem) => {
  详情表单数据.value = {
    ...item
  }
  是否显示详情弹出层.value = true
  router.value.push({name: '手机端详情'})
}

export const 操作关闭详情弹出层 = () => {
  是否显示详情弹出层.value = false
  setTimeout(() => {
    history.back()
  }, 100)
}

export const 详情表单数据 = ref<TargetItem>({
  目标内容: '',
  用户名: '',
  计划完成时间: null,
} as any)

export const 处理详情表单提交 = async () => {
  await handleEditItem(详情表单数据.value)
  是否显示详情弹出层.value = false
}