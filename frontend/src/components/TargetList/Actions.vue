<script setup lang="ts">
import { NPopconfirm, NButton } from 'naive-ui'
import { PropType } from 'vue'

import { TargetItem } from '../type'

import { handleDeleteItem, handleShowEditItemPopup, handleCompleteItem } from './index'


defineProps({
  rowData: {
    type  : Object as PropType<TargetItem>,
    required: true
  },
  isAdminMode: Boolean
})

</script>
<template>
  <n-button
    v-if="!rowData.完成时间"
    type="primary"
    class="action-button"
    data-test-id="完成"
    @click="handleCompleteItem(rowData)"
  >
    完成
  </n-button>
  <template v-if="isAdminMode">
    <n-button
      class="action-button"
      data-test-id="编辑"
      @click="handleShowEditItemPopup(rowData)"
    >
      编辑
    </n-button>
    <n-popconfirm
      :show-icon="false"
      negative-text="算了"
      positive-text="确定"
      @positive-click="handleDeleteItem(rowData)"
    >
      <template #trigger>
        <n-button
          class="action-button"
          type="error"
          size="small"
          data-test-id="删除"
        >
          删除
        </n-button>
      </template>
      确定要删除吗？
    </n-popconfirm>
  </template>
</template>

<style>
.action-button + .action-button {
  margin-left: 15px;
}
</style>