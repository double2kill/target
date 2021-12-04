<script lang="ts" setup>
import { NModal, FormValidationError } from 'naive-ui'
import { isItemPopupShow, itemFormRef, initialFormData } from './index'
import ItemForm from './ItemForm.vue'

const validFormData = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    itemFormRef.value.validate((errors: FormValidationError) => {
      if (!errors) {
        resolve(true)
      } else {
        reject()
      }
    })
  })
}

const handleSubmit = async () => {
  await validFormData()
  await itemFormRef.value.onSubmit()
}


</script>

<template>
  <n-modal
    v-model:show="isItemPopupShow"
    :mask-closable="false"
    :show-icon="false"
    preset="dialog"
    title="添加目标"
    positive-text="确认"
    negative-text="算了"
    @positive-click="handleSubmit"
  >
    <ItemForm :initial-form-data="initialFormData" />
  </n-modal>
</template>