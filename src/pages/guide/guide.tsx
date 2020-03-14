import React from 'react'
import { View, useShow, canIUse } from 'remax/wechat'

const Guide = () => {
  // 关闭返回首页的按钮
  useShow(() => canIUse('hideHomeButton') && wx.hideHomeButton())

  return <View>设置向导</View>
}

export default Guide
