import User from './user'

export default interface Course {
  _id: string
  name: string
  createTime: number
  students: User[]
  homework: {
    content: string
    endTime: number
    show: boolean
  }
}
