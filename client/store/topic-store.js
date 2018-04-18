import {
  observable,
  toJS,
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
  @observable tab
  @observable lockReq = false

  constructor({
    syncing = false,
    topics = [],
    tab = null,
    details = [],
  } = {}) {
    this.syncing = syncing
    this.topics = topics.map(topic => new Topic(createTopic(topic)))
    this.details = details.map(topic => new Topic(createDetail(topic)))
    this.tab = tab
  }

  @action addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)))
  }

  @action deleteTopic(topicId) {
    this.details.map((topic, index) => topic.id === topicId && this.details.splice(index, 1))
  }

  @action clearDetails() {
    this.details.clear()
  }

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail
      return result
    }, {})
  }

  @action fetchTopics(tab) {
    return new Promise((resolve, reject) => {
      if (tab === this.tab && this.topics.length > 0) {
        resolve()
      } else {
        this.tab = tab
        this.syncing = true
        this.topics.clear()
        get('/topics', {
          mdrender: false,
          tab,
        }).then((resp) => {
          if (resp.success) {
            const topics = resp.data.map(topic => new Topic(createTopic(topic)))
            this.topics = topics
            resolve()
          } else {
            reject()
          }
          this.syncing = false
        }).catch((err) => {
          reject(err)
          this.syncing = false
        })
      }
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

  @action getTopicDetail(id, isLogin) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id])
        console.log('aaa')
      } else {
        const params = {
          mdrender: false,
        }
        if (isLogin) {
          params.needAccessToken = true
        }
        get(`/topic/${id}`, params)
          .then((resp) => {
            if (resp.success) {
              const topic = new Topic(createDetail(resp.data))
              this.details.push(topic)
              console.log(this.details.length)
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
      this.syncing = true
      if (!this.lockReq) {
        this.lockReq = true
        post(`/topic/${params.topicId}/replies`, {
          needAccessToken: true,
        }, params)
          .then((resp) => {
            if (resp.success) {
              this.deleteTopic(params.topicId)
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
      topics: toJS(this.topics),
      syncing: this.syncing,
      details: toJS(this.details),
      lockReq: this.lockReq,
      tab: this.tab,
    }
  }
}

export default TopicStore
