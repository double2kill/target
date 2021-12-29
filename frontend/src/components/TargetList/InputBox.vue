<script setup lang="ts">
import { MdAdd } from '@vicons/ionicons4'
import { NButton, NIcon, NInput, NInputGroup } from 'naive-ui'
import { ref, PropType, nextTick } from 'vue'

import { addMarkToTargetAPI } from '../../api/target'
import { TargetItem } from '../type'

import { fetchTargetList } from './index'

const props = defineProps({
  rowData: {
    type: Object as PropType<TargetItem>,
    required: true
  },
})

const inputRef = ref<any>(null)
const 备注内容 = ref('')

const 是否显示输入框 = ref(true)
const 处理输入框显示 = () => {
  是否显示输入框.value = false
  nextTick(() => {
    inputRef.value.focus()
  })
}

const 处理备注提交 = async () => {
  await addMarkToTargetAPI(props.rowData.id, 备注内容.value)
  await fetchTargetList()
}

</script>
<template>
  <span v-if="rowData.备注">
    {{ rowData.备注 }}
  </span>
  <template v-else>
    <n-button
      v-if="是否显示输入框"
      dashed
      @click="处理输入框显示"
    >
      <n-icon>
        <MdAdd />
      </n-icon>
      添加
    </n-button>
    <n-input-group v-else>
      <n-input
        ref="inputRef"
        v-model:value="备注内容"
        :style="{ width: '80%' }"
        @keyup.enter="处理备注提交"
      />
      <n-button
        type="primary"
        ghost
        @click="处理备注提交"
      >
        提交
      </n-button>
    </n-input-group>
  </template>
</template>