import React, { useCallback, useReducer, useState, useMemo } from 'react'
import {
  Input,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  getStorageSync,
  navigateTo,
  useReady,
} from 'remax/wechat'
import FloatButton from '../../components/FloatButton/FloatButton'
import Dialog from 'weui-miniprogram/miniprogram_dist/dialog/dialog'
import EmptyCourseList from '../../components/EmptyCourseList/EmptyCourseList'
import CourseListItem from '../../components/CourseListItem/CourseListItem'
import { createCourse, getMyCourseList } from '../../functions/course.function'
import Course from '../../models/course.model'
import { setName } from '../../functions/user.function'

const Index = () => {
  // reducer
  const [actionState, actionDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'create':
        return {
          type: 'create',
          title: '创建课堂',
          tip: '输入课堂名称',
          show: true,
        }
      case 'join':
        return {
          type: 'join',
          title: '加入课堂',
          tip: '输入课堂邀请码',
          show: true,
        }
      case 'changeName':
        return {
          type: 'changeName',
          title: '修改姓名',
          tip: '输入新的姓名',
          show: true,
        }
      case 'close':
        return { show: false }
      default:
        return {}
    }
  }, {})

  // hooks
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [myCourseList, setMyCourseList] = useState<Course[]>([])
  const [joinedCourseList, setJoinedCourseList] = useState<Course[]>([])

  // 进入首页时加载课程列表
  useReady(async () => {
    setLoading(true)
    showNavigationBarLoading()
    if (!getStorageSync('user')) return
    setMyCourseList(await getMyCourseList())
    setLoading(false)
    hideNavigationBarLoading()
  })

  // 处理创建或进入课堂
  const handleAction = useCallback(
    async event => {
      showNavigationBarLoading()
      actionDispatch({ tpye: 'close' })
      if (event.detail.index === 0) return
      if (actionState.type === 'create') {
        await createCourse(input)
        setMyCourseList(await getMyCourseList())
        console.log('创建课堂')
      }
      if (actionState.type === 'join') {
        console.log('加入课堂')
      }
      if (actionState.type === 'changeName') {
        await setName(input)
        setMyCourseList(await getMyCourseList())
      }
      setInput('')
      hideNavigationBarLoading()
    },
    [actionState, input]
  )

  const MyCourseList = useMemo(
    () =>
      myCourseList.map(x => (
        <CourseListItem
          onClick={courseId =>
            navigateTo({ url: `/pages/course/course?id=${courseId}` })
          }
          key={x._id}
          course={x}
        />
      )),
    [myCourseList]
  )

  return (
    <React.Fragment>
      {MyCourseList}
      {!loading && (
        <EmptyCourseList
          showImg={MyCourseList.length + joinedCourseList.length < 3}
        />
      )}
      <FloatButton
        right="40px"
        bottom="140px"
        icon="add"
        types={[
          { text: '创建课堂', value: 'create' },
          { text: '加入课堂', value: 'join' },
        ]}
        onClick={type => actionDispatch({ type })}
      />
      <FloatButton
        right="40px"
        bottom="60px"
        icon="setting"
        types={[{ text: '修改姓名', value: 'changeName' }]}
        onClick={type => actionDispatch({ type })}
      />
      <Dialog
        title={actionState.title}
        show={actionState.show}
        bindclose={() => {
          actionDispatch({ type: 'close' })
          setInput('')
        }}
        buttons={[{ text: '取消' }, { text: '确定' }]}
        bindbuttontap={e => handleAction(e)}
      >
        <Input
          placeholder={actionState.tip}
          value={input}
          type={actionState.type === 'create' ? 'text' : 'number'}
          onInput={e => setInput(e.detail.value)}
        />
      </Dialog>
    </React.Fragment>
  )
}

export default Index
