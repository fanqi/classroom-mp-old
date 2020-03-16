import React from 'react'
import { View, Text, Image } from 'remax/wechat'
import styles from './EmptyCourseList.module.css'
// @ts-ignore
import EmptyBg from '../../assets/empty-bg.png'

interface EmptyCourseListProps {
  showImg?: boolean
}

const EmptyCourseList = ({ showImg }: EmptyCourseListProps) => {
  return (
    <View className={styles['course-empty']}>
      {showImg && <Image src={EmptyBg} />}
      <Text>点击右下角创建或加入课堂</Text>
    </View>
  )
}

export default EmptyCourseList
