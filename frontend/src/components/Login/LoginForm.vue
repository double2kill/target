<script lang="ts" setup>
import { NForm, NFormItem, NInput, FormRules } from 'naive-ui'
import { ref, onMounted } from 'vue'

import { requiredValueValidator } from '../../utils/validator'
import { handleLogin } from '../Login/loginUser'
import { LoginFormData } from '../type'

import { setLoginFormRef } from './index'

const formRef = ref(null)

const formData = ref<LoginFormData>({
  用户名: '',
  密码: '',
})

const rules: FormRules = {
  '用户名': [
    {
      required: true,
      validator: requiredValueValidator,
      trigger: ['input', 'blur']
    }
  ],
}

onMounted(() => {
  setLoginFormRef(formRef.value)
})

</script>
<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    @submit="handleLogin(formData)"
  >
    <n-form-item
      path="用户名"
      label="用户名"
    >
      <n-input
        v-model:value="formData.用户名"
        data-test-id="用户名"
        placeholder="请输入"
        @keydown.enter.prevent
      />
    </n-form-item>
  </n-form>
</template>