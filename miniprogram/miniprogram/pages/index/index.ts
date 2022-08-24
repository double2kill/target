import {formatTime, formattedDate} from '../../utils/util'
import {getTagConfig} from '../../utils/tag'
import dayjs from 'dayjs'
import {目标是今日目标,目标是本周目标, 目标已超时} from '../../utils/tag'
import {TargetItem} from './types'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')


interface Result {
  data: TargetItem[];
}

// index.js
Page({
  data: {
    listData: [],
    show: false,
    userName: ''
  },
  onLoad: function () {
    const a = formatTime(new Date());
    let filterParams: any = {}
    filterParams.计划完成时间_gte = dayjs().startOf('week').valueOf()
    filterParams.计划完成时间_lte = dayjs().endOf('week').valueOf()
    wx.request({
      url: "https://www.greatwebtech.cn/target/api/targetList", //仅为示例，并非真实的接口地址
      data: {
        用户名: "刘晨测试",
        _sort: "计划完成时间",
        _order: "asc",
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success: (result: Result) => {
        const listData = result.data
          .filter((item) => !item.完成时间)
          .sort((a,b) => {
            if (目标是今日目标(a) && !目标是今日目标(b)) {
              return -1
            }
            if (!目标是今日目标(a) && 目标是今日目标(b)) {
              return 1
            }
            if (目标是本周目标(a) && !目标是本周目标(b)) {
              return -1
            }
            if (!目标是本周目标(a) && 目标是本周目标(b)) {
              return 1
            }
            if (!目标已超时(a) && !目标已超时(b)) {
              return a.计划完成时间 - b.计划完成时间
            }
            return b.计划完成时间 - a.计划完成时间
          })
          .map((item) => ({
            id: item.id,
            title: item.目标内容,
            completeDate: formattedDate(item.计划完成时间),
            tagConfig: getTagConfig(item),
            rawData: item,
            shouldShowCancelButton: 目标已超时(item)
          }));
        this.setData({ listData });
      },
    });
  },
  handleClickComplete(e) {
    const {id} = e.target.dataset

    const dataItem = this.data.listData.find(item => item.id === id)
    if(!dataItem) {
      return
    }
    const data = Object.assign({}, dataItem.rawData, {
      完成时间: new Date().valueOf()
    })
    wx.request({
      url: `https://www.greatwebtech.cn/target/api/targetList/${id}`,
      method: 'PUT',
      data,
      header: {
        "content-type": "application/json", // 默认值
      },
      success: (result: Result) => {
        this.onLoad();
      }
    })
  },
  handleClickCancel(e) {

    const {id} = e.target.dataset

    const dataItem = this.data.listData.find(item => item.id === id)
    if(!dataItem) {
      return
    }
    const data = Object.assign({}, dataItem.rawData, {
      完成时间: new Date().valueOf(),
      备注: '已取消'
    })
    wx.request({
      url: `https://www.greatwebtech.cn/target/api/targetList/${id}`,
      method: 'PUT',
      data,
      header: {
        "content-type": "application/json", // 默认值
      },
      success: (result: Result) => {
        this.onLoad();
      }
    })
  },
  handleOpenPopup() {
    this.setData({ show: true });
  },
  handleClosePopup() {
    this.setData({ show: false });
  }
});
