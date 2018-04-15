import {
  observable,
  // toJs,
  computed,
  action,
  extendObservable,
} from 'mobx'
import { topicSchema, replySchema } from '../util/variable-define'
import { get } from '../util/http'

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

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createDetail(topic)))
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
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
  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
      } else {
        get(`/topic/${id}`, {
          mdrender: false,
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

  toJson() {
    return {
      topics: this.topics,
      syncing: this.syncing,
    }
  }
}

export default TopicStore
