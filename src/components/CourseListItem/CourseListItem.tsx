import React from 'react'
import Course from '../../models/course.model'
import { View, Image, Text } from 'remax/wechat'
import styles from './CourseListItem.module.css'

interface CourseListItemProps {
  course: Course
}

const CourseListItem = ({ course }: CourseListItemProps) => {
  return (
    <View className={styles['course-container']}>
      <Image className={styles.avatar} src={course.owner.avatar} />
      <View className={styles.content}>
        <Text className={styles.name}>{course.name}</Text>
        <Text className={styles.teacher}>{course.owner.name}</Text>
      </View>
    </View>
  )
}

export default CourseListItem
