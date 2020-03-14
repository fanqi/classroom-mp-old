import { cloud } from 'remax/wechat'
import { UserNotExistException } from '../exceptions/user.exception'
import User from '../models/user.model'

export async function getUserInfo(): Promise<User> | never {
  const user = cloud.database().collection('users')
  const res = await user.get()
  const users = res.data as User[]
  if (!!users) throw new UserNotExistException()
  return users[0]
}
