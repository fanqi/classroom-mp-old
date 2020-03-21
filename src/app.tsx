import * as React from 'react'
import './app.css'
import { cloud, useAppEvent } from 'remax/wechat'

const App: React.FC = props => {
  // 初始化云函数
  useAppEvent('onShow', () => cloud.init())

  return props.children as React.ReactElement
}

export default App
