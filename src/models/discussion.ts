import User from './user'

export default interface Discussion {
  _id: string
  title: string
  content: string
  createTime: number
  comment: {
    content: string
    user: User
  }
}
