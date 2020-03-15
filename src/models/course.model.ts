import User from './user.model'

export interface Discussion {
  content: string
  publisher: User
  crtime: number
  comments: Discussion[]
}

export default interface Course {
  _id: string
  _openid: string
  name: string
  owner: User
  students: User[]
  discussions: Discussion[]
}
