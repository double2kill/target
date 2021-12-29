<script setup lang="ts">
import dayjs from 'dayjs'
import {
  NButton,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NRow,
  NCol,
  FormValidationError,
  NDatePicker,
  NTimePicker,
  NConfigProvider,
  zhCN,
  dateZhCN,
  FormRules
} from 'naive-ui'
import { ref, reactive, watch } from 'vue'

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

const 表单内容 = reactive<表单类型>({ 目标内容: '', 计划完成时间: dayjs().startOf('day').add(8, 'hour').valueOf() })

const 处理日期变化 = (修改日期: number) => {
  // 清空状态
  if (!修改日期) {
    表单内容.计划完成时间 = 修改日期
    return
  }
  // 第一次添加日期的时候
  const {计划完成时间} = 表单内容
  if (!计划完成时间) {
    const 修改日8点 = dayjs(修改日期).startOf('day').add(8, 'hour').valueOf()
    表单内容.计划完成时间 = 修改日8点
    return
  }
  // 其余时候修改日期都不能修改时间
  const 计划完成日期零点时间 = dayjs(计划完成时间).startOf('day').valueOf()
  表单内容.计划完成时间 = 修改日期 + 计划完成时间 - 计划完成日期零点时间
}

const 禁用之前的日期 = (时间戳: number) => {
  return 时间戳 < dayjs().startOf('day').valueOf()
}

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
            type="date"
            style="width: 50%"
            clearable
            update-value-on-close
            :actions="null as any"
            :is-date-disabled="禁用之前的日期"
            :on-update:value="处理日期变化"
          />
          <n-time-picker
            v-model:value="表单内容.计划完成时间"
            format="HH:mm"
            :disabled="!表单内容.计划完成时间"
            :minutes="15"
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