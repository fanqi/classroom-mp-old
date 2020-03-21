import React, { useState, useEffect, useCallback } from 'react'
import { View, usePageEvent, Input, showToast, hideToast, Text } from 'remax/wechat'
import Icon from 'weui-miniprogram/miniprogram_dist/icon/icon'
import { getUserInfo, createUser, updateUserName } from '../../functions/user'
import Dialog from 'weui-miniprogram/miniprogram_dist/dialog/dialog'
import { createCourse, getMyCourse } from '../../functions/course'

export default function Home() {
  const [userNotExist, setUserNotExist] = useState(false)
  const [updateNameShow, setUpdateNameShow] = useState(false)
  const [userName, setUserName] = useState('')
  const [courseName, setCourseName] = useState('')
  const [courseShow, setCourseShow] = useState(false)
  const [myCourses, setMyCourses] = useState([])

  usePageEvent('onReady', async () => {
    showToast({ title: '登录中', icon: 'loading' })
    try {
      const { name } = await getUserInfo()
      setUserName(name)
      const myCourses = await getMyCourse()
      setMyCourses(myCourses)
    } catch (e) {
      setUserNotExist(true)
    } finally {
      hideToast()
    }
  })

  useEffect(() => {
    if (userNotExist) setUpdateNameShow(true)
  }, [userNotExist])

  // 设置用户名
  const handleUpdateUserName = useCallback(async (name: string) => {
    setUpdateNameShow(false)
    if (!name) return
    showToast({ title: '设置中', icon: 'loading' })
    try {
      if (userNotExist) await createUser(name)
      else updateUserName(name)
    } finally {
      hideToast()
    }
  }, [])

  const handleCreateCourse = useCallback(async (courseName: string) => {
    setCourseShow(false)
    if (!courseName) return
    setCourseName('')
    showToast({title: '创建中', icon: 'loading'})
    try {
      const course = await createCourse(courseName)
      setMyCourses(prev => [course, ...prev])
    } finally {
      hideToast()
    }
  }, [])

  return (
    <React.Fragment>
      {myCourses.map(x => (
        <View key={x._id} className="course-card">
          <Text>{x.name}</Text>
          <Text>{userName}</Text>
        </View>
      ))}

      <View className="float-button">
        <Icon icon="add" size={35} bindtap={() => setCourseShow(true)} />
        <Icon icon="me" size={35} bindtap={() => setUpdateNameShow(true)} />
      </View>

      <Dialog
        title="设置你的姓名"
        buttons={[{ text: '取消' }, { text: '确定' }]}
        show={updateNameShow}
        bindclose={() => setUpdateNameShow(false)}
        bindbuttontap={e =>
          e.detail.index === 1
            ? handleUpdateUserName(userName)
            : setUpdateNameShow(false)
        }
      >
        <Input
          value={userName}
          onInput={e => setUserName(e.detail.value)}
        ></Input>
      </Dialog>

      <Dialog
        title="创建课堂"
        buttons={[{ text: '取消' }, { text: '确定' }]}
        show={courseShow}
        bindclose={() => setCourseShow(false)}
        bindbuttontap={e =>
          e.detail.index === 1
            ? handleCreateCourse(courseName)
            : setCourseShow(false)
        }
      >
        <Input
          placeholder="输入课堂名称"
          value={courseName}
          onInput={e => setCourseName(e.detail.value)}
        ></Input>
      </Dialog>
    </React.Fragment>
  )
}
