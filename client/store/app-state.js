import {
  observable,
  computed,
  extendObservable,
  autorun,
  action,
  toJS,
} from 'mobx'

import { post, get } from '../util/http'
import { userSchema } from '../util/variable-define'

const createUser = user => Object.assign({}, userSchema, user)

class User {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
}

export default class AppState {
  @observable user
  @observable userDetail

  constructor({ userDetail = [], user = { isLogin: false, info: {} } } = {}) {
    this.user = new User(user)
    this.userDetail = userDetail.map(detail => new User(createUser(detail)))
  }

  @computed get userMap() {
    return this.userDetail.reduce((result, detail) => {
      result[detail.loginname] = detail
      return result
    }, {})
  }

  @action login(accessToken) {
    return new Promise((resolve, reject) => {
      post('/user/login', {}, {
        accessToken,
      }).then((resp) => {
        if (resp.success) {
          this.user.isLogin = true
          this.user.info = resp
          resolve()
        } else {
          reject(resp)
        }
      }).catch(reject)
    })
  }

  @action getUserDetail(userName) {
    return new Promise((resolve, reject) => {
      if (this.userMap[userName]) {
        resolve(this.userMap[userName])
      } else {
        get(`/user/${userName}`, {}).then((resp) => {
          if (resp.success) {
            const user = new User(createUser(resp.data))
            this.userDetail.push(user)
            resolve(resp)
          } else {
            reject(resp)
          }
        }).catch(reject)
      }
    })
  }

  toJson() {
    return {
      user: toJS(this.user),
      userDetail: this.userDetail,
    }
  }
}

autorun(() => {
//  aaa
})
