import * as React from 'react'
import './app.css'
import {
  cloud,
  useAppLaunch,
  useAppShow,
  redirectTo,
  getStorageSync,
  setStorageSync,
} from 'remax/wechat'
import { getUserInfo } from './functions/user.function'
import { UserNotExistException } from './exceptions/user.exception'

const App: React.FC = props => {
  // 初始化云函数
  useAppLaunch(() => cloud.init())

  // 读取用户信息，如果用户不存在则跳转至 guide 页面
  useAppShow(async () => {
    if (getStorageSync('user')) return
    try {
      const user = await getUserInfo()
      setStorageSync('user', user)
    } catch (e) {
      if (e instanceof UserNotExistException) {
        redirectTo({ url: '/pages/guide/guide' })
      }
    }
  })

  return props.children as React.ReactElement
}

export default App
