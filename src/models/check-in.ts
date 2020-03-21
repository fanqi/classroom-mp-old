import User from './user'

export default interface CheckIn {
  _id: string
  createTime: number
  endTime: number
  key: number
  completed: User[]
  adsence: User[]
}
