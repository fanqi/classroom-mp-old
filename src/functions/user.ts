import { cloud, getStorageSync, setStorageSync } from 'remax/wechat'
import User from '../models/user'
const users = cloud.database().collection('users')

export async function getUserInfo(): Promise<User> {
  const openid = await getOpenID()
  const {data} = await users.doc(openid).get()
  return data as User
}

export async function getOpenID(): Promise<string> {
  if (getStorageSync('openid')) return getStorageSync('openid')
  const { result } = await cloud.callFunction({name: 'login'})
  setStorageSync('openid', result)
  return result as string
}

export async function createUser(name: string): Promise<User> {
  const openid = await getOpenID()
  await users.add({data: {_id: openid, name}})
  return getUserInfo()
}

export async function updateUserName(name: string): Promise<void> {
  const openid = await getOpenID()
  await users.doc(openid).update({data: {name}})
}