import dayjs from 'dayjs'
dayjs.locale('zh-cn')

export const 至今差别天数 = (item: TargetItem) => {
    const 计划完成时间Dayjs= dayjs(item.计划完成时间)
    const 当前Dayjs = dayjs()
    const 小时 = 计划完成时间Dayjs.diff(当前Dayjs, 'hour')
    if (小时 < 24) {
        return `剩${小时}小时`
    }
    const 天数 = 计划完成时间Dayjs.diff(当前Dayjs, 'day')
    if (天数 < 7) {
        return `${天数}天后`
    }
    const 周数 = 计划完成时间Dayjs.diff(当前Dayjs, 'week')
    if (周数 < 5) {
        return `${周数}周后`
    }
    const 月数 = 计划完成时间Dayjs.diff(当前Dayjs, 'month')
    if (月数 < 12) {
        return `${月数}个月后`
    }
    const 年数 = 计划完成时间Dayjs.diff(当前Dayjs, 'month')
    return `${年数}月后`
}

export type TargetFormData = {
    id?: number;
    目标内容: string;
    计划完成时间: number | null;
    用户名: string;
    完成时间?: number;
    备注?: string;
  }
  
  type TargetItem = Required<TargetFormData> & {
    计划完成时间: number;
  };
  
  export  const 目标是今日目标 = (item: TargetItem) => dayjs(item.计划完成时间).isSame(dayjs(), 'day')
  export const 目标已超时 = (item: TargetItem) => item.计划完成时间 < new Date().valueOf()
  export const 目标是本周目标 = (item: TargetItem) => dayjs(item.计划完成时间).isSame(dayjs(), 'week')
  
  export const getTagConfig = (item: TargetItem) => {
    if(目标是今日目标(item)) {
        return {
            tagType: 'primary',
            text: '今日目标'
        }
    }
    if(目标是本周目标(item)) {
        return {
            tagType: 'warning',
            text: '本周目标'
        }
    }
    if(目标已超时(item)) {
        return {
            tagType: 'danger',
            text: '已超时'
        }
    }
    return {
        tagType: 'warning',
        isPlain: true,
        text: 至今差别天数(item)
    }
  }