<script setup lang="ts">
import dayjs from 'dayjs'
import {defineProps} from 'vue'

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  空值文本: {
    type:  String,
    default: '无效时间'
  }
})

function getDateText () {
  const { value, 空值文本 } = props
  if (!value) {
    return 空值文本
  }
  const 现在时间 = dayjs()
  if (dayjs(value).isSame(现在时间, 'day')) {
    return dayjs(value).format('HH:mm')
  }
  if (dayjs(value).isSame(现在时间.add(1,'day'), 'day')) {
    return dayjs(value).format('明天 HH:mm')
  }
  if (dayjs(value).isSame(现在时间.subtract(1,'day'), 'day')) {
    return dayjs(value).format('昨天 HH:mm')
  }
  if (dayjs(value).isSame(现在时间, 'week')) {
    return dayjs(value).format('ddd HH:mm')
  }
  if (dayjs(value).isSame(现在时间, 'year')) {
    return dayjs(value).format('M月D日 HH:mm')
  }
  return dayjs(value).format('YYYY年M月D日 HH:mm')
}
const text = getDateText()

</script>
<template>
  <span>{{ text }}</span>
</template>