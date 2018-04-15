export const topicSchema = {
  author: {},
  author_id: '',
  content: '',
  create_at: '',
  good: false,
  id: '',
  last_reply_at: '',
  reply_count: 0,
  tab: '',
  title: '',
  top: false,
  visit_count: 0,
}

export const tabs = {
  all: '全部',
  good: '精华',
  share: '分享',
  ask: '问答',
  job: '招聘',
}

export const replySchema = {
  author: {},
  author_id: '',
  content: '',
  create_at: '',
  good: false,
  id: '',
  is_collect: '',
  last_reply_at: '',
  replies: [],
  reply_count: 0,
  tab: '',
  title: '',
  visit_count: 0,
}

export const userSchema = {
  avatar_url: '',
  create_at: '',
  githubUsername: '',
  loginname: '',
  recent_replies: [],
  recent_topics: [],
  success: false,
}
