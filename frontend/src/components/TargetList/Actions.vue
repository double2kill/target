<script setup lang="ts">
import { PropType } from 'vue'
import { NPopconfirm, NButton } from 'naive-ui'
import { handleDeleteItem, handleShowEditItemPopup } from './index'
import { TargetItem } from '../type'

defineProps({
  rowData: {
    type  : Object as PropType<TargetItem>,
    required: true
  }
})

</script>
<template>
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

<style>
.action-button + .action-button {
  margin-left: 15px;
}
</style>