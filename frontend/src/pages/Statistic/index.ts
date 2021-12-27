import { ref, computed, watch } from 'vue'
import { getTargetAPI } from '../../api/target'
import { loginUser } from '../../components/Login/loginUser'
import dayjs from 'dayjs'
import { TargetItem } from '../../components/type'

export const statisticFilter = ref<'thisWeek' | 'lastWeek' | ''>('lastWeek')

export const isThisWeekFilter = computed(() => statisticFilter.value === 'thisWeek')
export const isLastWeekFilter = computed(() => statisticFilter.value === 'lastWeek')
export const isAllFilter = computed(() => statisticFilter.value === '')

export const setThisWeekFilter = () => {
  statisticFilter.value = 'thisWeek'
}
export const setLastWeekFilter = () => {
  statisticFilter.value = 'lastWeek'
}
export const setAllFilter = () => {
  statisticFilter.value = ''
}

export const listData = ref<TargetItem[]>([])

export const fetchStatisticList = async () => {
  const { 用户名 } = loginUser
  let filterParams: any = {
    用户名
  }
  if (isThisWeekFilter.value) {
    filterParams.计划完成时间_gte = dayjs().startOf('week').valueOf()
    filterParams.计划完成时间_lte = dayjs().endOf('week').valueOf()
  } else if (isLastWeekFilter.value) {
    filterParams.计划完成时间_gte = dayjs().startOf('week').subtract(1, 'week').valueOf()
    filterParams.计划完成时间_lte = dayjs().endOf('week').subtract(1, 'week').valueOf()
  }
  const result = await getTargetAPI(filterParams)
  listData.value = result.data
}

watch(statisticFilter, () => {
  fetchStatisticList()
})

export const completeStatusFilter = ref('未完成')
export const setCompleteStatusFilter = (value: string) => {
  completeStatusFilter.value = value
}

export const 未完成的数据 = computed(() => {
  return listData.value.filter(item => {
    if (!item.完成时间) {
      return true
    }
    return item.完成时间 > item.计划完成时间
  })
})

export const 已完成的数据 = computed(() => {
  return listData.value.filter(item => {
    if (!item.完成时间) {
      return false
    }
    return item.完成时间 <= item.计划完成时间
  })
})

export const 完成率 = computed(() => {
  if (listData.value.length === 0) {
    return 0
  }
  return (已完成的数据.value.length / listData.value.length * 100).toFixed(0)
})

export const 过滤后的数据 = computed(() => {
  if (completeStatusFilter.value === '全部') {
    return listData.value
  }
  if (completeStatusFilter.value === '未完成') {
    return 未完成的数据.value
  }
  return 已完成的数据.value
})