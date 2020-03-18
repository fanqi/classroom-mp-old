import React, { useReducer, useState, useCallback } from 'react'
import {
  View,
  Text,
  useQuery,
  setNavigationBarTitle,
  Input,
  showNavigationBarLoading,
  hideNavigationBarLoading,
  useShow,
  navigateBack,
} from 'remax/wechat'
import {
  getCourseInfo,
  deleteCourse,
  setCourseName,
} from '../../functions/course.function'
import FloatButton from '../../components/FloatButton/FloatButton'
import Tabs from '../../lib/tabs/index'
import Slideview from 'weui-miniprogram/miniprogram_dist/slideview/slideview'
import Cell from 'weui-miniprogram/miniprogram_dist/cell/cell'
import Dialog from 'weui-miniprogram/miniprogram_dist/dialog/dialog'
import './course.css'

const Course = () => {
  const [actionState, actionDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'create':
        return {
          type: 'create',
          title: '创建新的讨论',
          tip: '输入讨论题目',
          show: true,
        }
      case 'delete':
        return {
          type: 'delete',
          title: '删除课堂',
          tip: '删除后不可撤销',
          show: true,
        }
      case 'changeName':
        return {
          type: 'changeName',
          title: '修改课堂名称',
          tip: '输入新的名称',
          show: true,
        }
      case 'close':
        return { show: false }
      default:
        return {}
    }
  }, {})

  const [input, setInput] = useState('')

  const { id } = useQuery()

  useShow(async () => {
    const course = await getCourseInfo(id)
    setNavigationBarTitle({ title: course.name })
  })

  const handleAction = useCallback(
    async event => {
      actionDispatch({ tpye: 'close' })
      if (event.detail.index === 0) return
      showNavigationBarLoading()
      if (actionState.type === 'delete') {
        await deleteCourse(parseInt(id))
        navigateBack()
      }
      if (actionState.type === 'changeName') {
        await setCourseName(parseInt(id), input)
        setNavigationBarTitle({ title: input })
      }
      setInput('')
      hideNavigationBarLoading()
    },
    [actionState, input]
  )

  return (
    <React.Fragment>
      <View className="tab-container">
        <Tabs
          tab-class="tab"
          swiperClass="weui-tabs-swiper"
          activeClass="tab-bar-title__selected"
          tabs={[{ title: '讨论' }, { title: '签到' }]}
        >
          <View slot="tab-content-0">
            <View className="tab-list">
              <Slideview buttons={[{ text: '删除', type: 'warn' }]}>
                <Cell value="讨论" footer="说明文字" />
              </Slideview>
            </View>
          </View>
          <View slot="tab-content-1">b</View>
        </Tabs>
      </View>
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
        {actionState.type === 'delete' ? (
          <Text>{actionState.tip}</Text>
        ) : (
          <Input
            placeholder={actionState.tip}
            value={input}
            type={actionState.type === 'join' ? 'number' : 'text'}
            onInput={e => setInput(e.detail.value)}
          />
        )}
      </Dialog>
      <FloatButton
        right="40px"
        bottom="140px"
        icon="add"
        types={[{ text: '创建讨论', value: 'create' }]}
        onClick={type => actionDispatch({ type })}
      />
      <FloatButton
        right="40px"
        bottom="60px"
        icon="setting"
        types={[
          { text: '修改课堂名称', value: 'changeName' },
          { text: '删除课堂', value: 'delete' },
        ]}
        onClick={type => actionDispatch({ type })}
      />
    </React.Fragment>
  )
}

export default Course
