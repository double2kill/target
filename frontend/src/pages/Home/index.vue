<script setup lang="ts">
import { Cell, CellGroup, Tag, Button } from 'vant'
</script>
<template>
  <CellGroup>
    <Cell
      title="任务 3"
    >
      <template #label>
        5天前
        <Tag type="danger">
          已超时
        </Tag>
        <Button
          type="primary"
          size="mini"
          class="action"
        >
          完成
        </Button>
      </template>
    </Cell>
  </CellGroup>
</template>

<style>
.action {
  float: right;
}
</style>