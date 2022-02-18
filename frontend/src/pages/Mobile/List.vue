<script setup lang="ts">
import { Cell, CellGroup, Button } from 'vant'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import FormattedDate from '../../components/Date/FormattedDate.vue'
import {TargetItem} from '../../components/type'


import { listData, fetchData, handleCompleteItem, handleCancelItem, 目标已超时 } from './logic'
import {操作显示详情弹出层, setRouter} from './Popup/logic'
import PopupList from './Popup/PopupList.vue'
import TagList from './TagList/TagList.vue'

const router = useRouter()

onMounted(() => {
  fetchData()
  setRouter(router)
})

const 操作点击列表单元格 = (item: TargetItem) => {
  操作显示详情弹出层(item)
}

</script>
<template>
  <div>
    <CellGroup>
      <Cell
        v-for="item in listData"
        :key="item.id"
        :title="item.目标内容"
        clickable
        @click="操作点击列表单元格(item)"
      >
        <template #label>
          <FormattedDate
            :value="item.计划完成时间"
          />
          <TagList
            :value="item"
          />
          <span class="action">
            <Button
              v-if="目标已超时(item)"
              plain
              type="primary"
              size="small"
              @click.stop="handleCancelItem(item)"
            >
              取消
            </Button>
            <Button
              type="primary"
              size="small"
              @click.stop="handleCompleteItem(item)"
            >
              完成
            </Button>
          </span>
        </template>
      </Cell>
    </CellGroup>
    <PopupList />
  </div>
</template>

<style>
.action {
  float: right;
}
.action button+button {
  margin-left: 5px;
}
</style>