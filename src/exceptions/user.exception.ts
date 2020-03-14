export class UserNotExistException {
  message: string

  constructor() {
    this.message = '用户未注册'
  }
}
