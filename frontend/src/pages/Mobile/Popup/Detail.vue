<script setup lang="ts">
import {Form, Field, Button} from 'vant'

import FormattedDate from '../../../components/Date/FormattedDate.vue'
import TagList from '../TagList/TagList.vue'

import {详情表单数据, 处理详情表单提交} from './logic'

</script>

<template>
  <Form @submit="处理详情表单提交">
    <Field
      label="目标内容"
    >
      <template #input>
        <div class="van-multi-ellipsis--l2">
          {{ 详情表单数据.目标内容 }}
        </div>
      </template>
    </Field>
    <Field
      label="计划完成时间"
    >
      <template #input>
        <FormattedDate
          :value="详情表单数据.计划完成时间"
          空值文本=""
        />
        <TagList :value="详情表单数据" />
      </template>
    </Field>
    <Field
      v-model="详情表单数据.完成时间"
      label="完成时间"
    >
      <template #input>
        <FormattedDate
          :value="详情表单数据.完成时间"
          空值文本=""
        />
      </template>
    </Field>
    <Field
      v-model="详情表单数据.备注"
      name="备注"
      label="备注"
      placeholder="填写备注"
      rows="1"
      autosize
      type="textarea"
    />
    <div style="margin: 16px;">
      <Button
        size="small"
        block
        type="primary"
        native-type="submit"
      >
        修改备注
      </Button>
    </div>
  </Form>
</template>