import React from 'react'
import Course from '../../models/course.model'
import { View, Image, Text } from 'remax/wechat'
import styles from './CourseListItem.module.css'

interface CourseListItemProps {
  course: Course
  onClick: (courseId: string) => void
}

const CourseListItem = ({ course, onClick }: CourseListItemProps) => {
  return (
    <View
      className={styles['course-container']}
      onClick={() => onClick && onClick(course._id)}
    >
      <Image className={styles.avatar} src={course.owner.avatar} />
      <View className={styles.content}>
        <Text className={styles.name}>{course.name}</Text>
        <Text className={styles.teacher}>{course.owner.name}</Text>
      </View>
    </View>
  )
}

export default CourseListItem
