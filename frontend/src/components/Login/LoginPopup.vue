<script lang="ts" setup>
import { NModal,FormValidationError } from 'naive-ui'

import LoginForm from './LoginForm.vue'

import { isLoginPopupShow, loginFormRef } from './index'

const validFormData = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    loginFormRef.value.validate((errors: FormValidationError) => {
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
  await loginFormRef.value.onSubmit()
  isLoginPopupShow.value = false
}
</script>

<template>
  <n-modal
    v-model:show="isLoginPopupShow"
    :mask-closable="false"
    :show-icon="false"
    preset="dialog"
    title="登录"
    positive-text="确认"
    negative-text="算了"
    data-test-id="登录弹窗"
    @positive-click="handleSubmit"
  >
    <LoginForm :on-enter="handleSubmit" />
  </n-modal>
</template>