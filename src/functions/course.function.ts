import { cloud, getStorageSync } from 'remax/wechat'
import Course from '../models/course.model'
import User from '../models/user.model'

export async function getMyCourseList(): Promise<Course[]> {
  const courses = cloud.database().collection('courses')
  const coursesData = (await courses.get()).data as Course[]
  const users = cloud.database().collection('users')
  const { _id } = getStorageSync('user')
  const userData = (await users.doc(_id).get()).data as User
  return coursesData.map(x => (x.owner = userData) && x)
}

export async function createCourse(name: String): Promise<void> {
  const courses = cloud.database().collection('courses')
  let success = false
  let count = 5
  while (!success && count) {
    try {
      count--
      await courses.add({
        data: {
          _id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
          name,
          students: [],
          discussions: [],
        },
      })
      success = true
    } catch (error) {}
  }
}
