import React, { useState, useCallback } from 'react'
import {
  View,
  useShow,
  canIUse,
  Text,
  Input,
  Button,
  setStorageSync,
  redirectTo,
} from 'remax/wechat'
import styles from './guide.module.css'
import { createUser, getUserInfo } from '../../functions/user.function'

const Guide = () => {
  // hooks
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [loading, setLoading] = useState(false)

  // 关闭返回首页的按钮
  useShow(() => canIUse('hideHomeButton') && wx.hideHomeButton())

  // 提交
  const handleSubmit = useCallback(async () => {
    setLoading(true)
    try {
      await createUser(name, avatar)
      const user = await getUserInfo()
      setStorageSync('user', user)
      redirectTo({ url: '/pages/index/index' })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [name, avatar])

  return (
    <React.Fragment>
      <View className={styles.spacer}></View>

      <Text className={styles['set-name-title']}>设置你的姓名用于教师识别</Text>

      <View className={styles.spacer}></View>

      <Input
        autoFocus
        onInput={event => setName(event.detail.value)}
        maxlength={6}
      />

      <View className={styles.spacer}></View>

      <Button
        openType="getUserInfo"
        onGetUserInfo={event =>
          event.detail.userInfo && setAvatar(event.detail.userInfo.avatarUrl)
        }
        plain={true}
      >
        获取微信头像
      </Button>

      <View className={styles.spacer}></View>

      <Button
        plain
        disabled={!name || !avatar}
        onClick={() => handleSubmit()}
        loading={loading}
      >
        提交
      </Button>
    </React.Fragment>
  )
}

export default Guide
