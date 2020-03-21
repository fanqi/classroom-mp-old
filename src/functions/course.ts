import { cloud } from "remax/wechat";
import Course from "../models/course";
import { getOpenID } from "./user";

const courses = cloud.database().collection('courses')

export async function getCourseInfo(id: string | number): Promise<Course> {
  const {data} = await courses.doc(id).get()
  return data as Course
}

export async function createCourse(name: string): Promise<Course> {
  const {_id} = await courses.add({data: {
    name,
    createTime: Date.now(),
    students: [],
    homework: {
      content: '',
      endTime: 0,
      show: false
    }
  }})
  return getCourseInfo(_id)
}

export async function getMyCourse(): Promise<Course[]> {
  const openid = getOpenID()
  const {data} = await courses.where({_openid: openid}).orderBy('createTime', 'desc').get()
  return data as Course[]
}