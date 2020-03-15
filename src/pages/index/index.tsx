import React, { useCallback, useReducer, useState, useMemo } from 'react'
import {
  View,
  Input,
  useShow,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  getStorageSync,
} from 'remax/wechat'
import AddButton from '../../components/AddButton/AddButton'
import Dialog from 'weui-miniprogram/miniprogram_dist/dialog/dialog'
import EmptyCourseList from '../../components/EmptyCourseList/EmptyCourseList'
import CourseListItem from '../../components/CourseListItem/CourseListItem'
import { createCourse, getMyCourseList } from '../../functions/course.function'
import Course from '../../models/course.model'

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
      case 'close':
        return { show: false }
      default:
        return {}
    }
  }, {})

  // hooks
  const [input, setInput] = useState('')
  const [myCourseList, setMyCourseList] = useState<Course[]>([])

  // 进入首页时加载课程列表
  useShow(async () => {
    if (!getStorageSync('user')) return
    setMyCourseList(await getMyCourseList())
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
      setInput('')
      hideNavigationBarLoading()
    },
    [actionState, input]
  )

  const MyCourseList = useMemo(
    () => myCourseList.map(x => <CourseListItem key={x._id} course={x} />),
    [myCourseList]
  )

  return (
    <React.Fragment>
      {MyCourseList}
      <EmptyCourseList />
      <AddButton onClick={type => actionDispatch({ type })} />
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
