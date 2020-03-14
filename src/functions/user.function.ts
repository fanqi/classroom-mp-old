import { cloud } from 'remax/wechat'
import { UserNotExistException } from '../exceptions/user.exception'
import User from '../models/user.model'

export async function getUserInfo(): Promise<User> | never {
  const users = cloud.database().collection('users')
  const res = await users.get()
  const user = (res.data as User[])[0]
  if (!!user) throw new UserNotExistException()
  return user
}
