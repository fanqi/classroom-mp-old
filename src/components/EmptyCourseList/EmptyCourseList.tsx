import React from 'react'
import { View, Text, Image } from 'remax/wechat'
import styles from './EmptyCourseList.module.css'
import EmptyBg from '../../assets/empty-bg.png'

const EmptyCourseList = () => {
  return (
    <View className={styles['course-empty']}>
      <Image src={EmptyBg} />
      <Text>点击右下角创建或加入课堂</Text>
    </View>
  )
}

export default EmptyCourseList
