import dayjs from 'dayjs'

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const formattedDate = (value: number) => {
  if (!value) {
    return ''
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