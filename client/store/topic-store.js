import {
  observable,
  // toJs,
  computed,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema, replySchema } from '../util/variable-define'
import { get, post } from '../util/http'

const createTopic = topic => Object.assign({}, topicSchema, topic)
const createDetail = topic => Object.assign({}, replySchema, topic)

class Topic {
  constructor(data) {
    extendObservable(this, data)
  }
  @observable syncing = false
}

class TopicStore {
  @observable topics
  @observable details
  @observable syncing
  @observable lockReq = false

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createDetail(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  deleteTopicId(topicId) {
    this.details.map((topic, index) => topic.id === topicId && this.details.splice(index, 1))
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  @action fetchTopics(params) {
    return new Promise((resolve, reject) => {
      this.syncing = true
      this.topics.clear()
      get('/topics', {
        mdrender: false,
        ...params,
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach(topic => this.addTopic(topic))
          resolve()
        } else {
          reject()
        }
        this.syncing = false
      }).catch((err) => {
        reject(err)
        this.syncing = false
      })
    })
  }

  @action createTopic(params) {
    return new Promise((resolve, reject) => {
      if (!this.lockReq) {
        this.lockReq = true
        post('/topics', { needAccessToken: true }, params)
          .then((resp) => {
            if (resp.success) {
              resolve(resp)
            } else {
              reject()
            }
            this.lockReq = false
          }).catch((err) => {
            reject(err)
            this.lockReq = false
          })
      }
    })
  }

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
          needAccessToken: true,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createDetail(resp.data))
            this.details.push(topic)
            resolve(topic)
          } else {
            reject()
          }
        }).catch(reject)
      }
    })
  }

  @action sendComment(params) {
    return new Promise((resolve, reject) => {
      console.log(params)
      this.syncing = true
      if (!this.lockReq) {
        this.lockReq = true
        post(`/topic/${params.topicId}/replies`, {
          needAccessToken: true,
        }, params)
          .then((resp) => {
            console.log(resp)
            if (resp.success) {
              this.deleteTopicId(params.topicId)
              this.getTopicDetail(params.topicId)
              resolve()
            } else {
              reject()
            }
            this.syncing = false
            this.lockReq = false
          }).catch((err) => {
            reject(err)
            this.syncing = false
            this.lockReq = false
          })
      }
    })
  }

  @action setThumbUpOrDown(replyId) {
    return new Promise((resolve, reject) => {
      if (!this.lockReq) {
        post(`/reply/${replyId}/ups`, { needAccessToken: true })
          .then((resp) => {
            if (resp.success) {
              resolve(resp)
            } else {
              reject()
            }
            this.lockReq = false
          }).catch((err) => {
            reject(err)
            this.lockReq = false
          })
      }
    })
  }

  toJson() {
    return {
      topics: this.topics,
      syncing: this.syncing,
    }
  }
}

export default TopicStore
