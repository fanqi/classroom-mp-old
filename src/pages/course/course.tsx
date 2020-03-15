import React from 'react'
import {
  View,
  Text,
  useShow,
  useQuery,
  setNavigationBarTitle,
} from 'remax/wechat'
import { getCourseInfo } from '../../functions/course.function'
import Tabs from '../../lib/tabs/index'
import Slideview from 'weui-miniprogram/miniprogram_dist/slideview/slideview'
import Cell from 'weui-miniprogram/miniprogram_dist/cell/cell'
import './course.css'

const Course = () => {
  const { id } = useQuery()

  useShow(async () => {
    const course = await getCourseInfo(id)
    setNavigationBarTitle({ title: course.name })
  })

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
    </React.Fragment>
  )
}

export default Course
