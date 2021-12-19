<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NButton, NModal, NForm, NFormItem, NInput, NRow, NCol, FormValidationError, NDatePicker, NConfigProvider, zhCN, dateZhCN, FormRules } from 'naive-ui'
import { addTargetAPI } from '../../api/target'
import { fetchTargetList } from '../TargetList/index'

type 表单类型 = {
  目标内容: string
  计划完成时间: number | null
}

const formRef = ref<any>(null)

const isModalShow = ref(false)
const hanldeShowModal = () => {
  isModalShow.value = true
}

const 表单内容 = reactive<表单类型>({ 目标内容: '', 计划完成时间: null })
const rules: FormRules = {
  目标内容: {
    required: true,
    message: '请填写目标内容',
    trigger: 'blur'
  },
  计划完成时间: {
    type: 'number',
    required: true,
    message: '请选择计划完成时间',
    trigger: 'blur'
  },
}

const 验证表单数据 = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    formRef.value.validate((errors: FormValidationError) => {
      if (!errors) {
        resolve(true)
      } else {
        reject()
      }
    })
  })
}

const handleSubmit = async () => {
  await 验证表单数据()
  const {目标内容, 计划完成时间} = 表单内容
  if (!计划完成时间) {
    return
  }
  await addTargetAPI({
    目标内容,
    计划完成时间,
  })
  debugger
  await fetchTargetList()
  isModalShow.value = false
  表单内容.目标内容 = ''
  表单内容.计划完成时间 = null
}

</script>

<template>
  <n-button
    type="primary"
    @click="hanldeShowModal"
  >
    添加
  </n-button>
  <n-modal
    v-model:show="isModalShow"
    :mask-closable="false"
    preset="dialog"
    title="添加目标"
    :show-icon="false"
  >
    <n-form
      ref="formRef"
      :label-width="80"
      :model="表单内容"
      :rules="rules"
      :show-label="false"
      style="padding-top: 25px"
    >
      <n-form-item path="目标内容">
        <n-input
          v-model:value="表单内容.目标内容"
          placeholder="填写目标"
        />
      </n-form-item>
      <n-form-item path="计划完成时间">
        <n-config-provider
          abstract
          :locale="zhCN"
          :date-locale="dateZhCN"
        >
          <n-date-picker
            v-model:value="表单内容.计划完成时间"
            placeholder="选择计划完成时间"
            type="datetime"
            style="width: 100%"
            clearable
            update-value-on-close
          />
        </n-config-provider>
      </n-form-item>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end;">
            <n-button
              type="primary"
              @click="handleSubmit"
            >
              添加
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </n-modal>
</template>