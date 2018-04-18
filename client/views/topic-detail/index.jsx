import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import marked from 'marked'
import dateformat from 'dateformat'
import {
  inject,
  observer,
} from 'mobx-react'

import cn from 'classnames'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'

import Container from '../layout/container'
import { topicDetailStyle } from './styles'
import { tabs } from '../../util/variable-define'

import Reply from './reply'
import DialogUnlogin from '../dialogs/dialog-unlogin'
import Editor from '../editor/editor'

@inject(stores => ({
  topicStore: stores.topicStore,
  user: stores.appState.user,
}))
@observer
class TopicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newReply: '',
      newReplyComments: {},
      isLogin: this.props.user.isLogin,
      open: false,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.topicStore.getTopicDetail(id, this.state.isLogin)
  }

  getReplyComment = (reply) => {
    const { id } = reply
    const { loginname } = reply.author
    return this.state.newReplyComments[id] || `@${loginname} `
  }

  bootstrap = () => {
    const { id } = this.props.match.params
    console.log(id)
    return this.props.topicStore.getTopicDetail(id, this.state.isLogin).then(() => {
      console.log('success')
    }).catch(() => {
      console.log('faild')
    })
  }

  newReplyCommentsChange = (content, replyId, type = '') => {
    let comments = Object.assign({}, this.state.newReplyComments)
    let newReplyComments = {}

    if (type === 'delete') {
      Object.keys(comments).forEach((key) => {
        if (key !== replyId) {
          newReplyComments[key] = comments[key]
        }
      })
      comments = null
    } else {
      comments[replyId] = content
    }
    newReplyComments = comments || newReplyComments
    this.setState({ newReplyComments })
  }

  handleNewReplyChange = (newValue) => {
    this.setState({ newReply: newValue })
  }

  handleSendReplyClick = (e, replyId = '') => {
    if (!this.state.isLogin) {
      this.handleDialogOpenClick()
      return
    }

    const topicId = this.props.match.params.id
    const params = { topicId }
    if (replyId) {
      params.reply_id = replyId
      params.content = this.state.newReplyComments[replyId]
    } else {
      params.content = this.state.newReply
    }
    this.props.topicStore.sendComment(params)
      .then(() => {
        if (!replyId) {
          this.setState({ newReply: '' })
        } else {
          this.newReplyCommentsChange('', replyId, 'delete')
        }
      }).catch((err) => {
        console.log(err) // eslint-disable-line
      })
  }

  handleDialogOpenClick = () => {
    this.setState({ open: true })
  }

  handleDialogCloseClick = () => {
    this.setState({ open: false })
  }

  render() {
    const {
      classes,
    } = this.props
    const { id } = this.props.match.params
    const topic = this.props.topicStore.detailMap[id]

    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="secondary" />
          </section>
        </Container>
      )
    }

    const createInfo = cn({
      [classes.createInfo]: true,
      [classes.clearFix]: true,
    })
    /* eslint-disable */
    return (
      <div className={classes.containerWrap}>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <div className={classes.topicTitle}>
              {
                topic.top ? (<span className={classes.top} >置顶</span>) : null
              }
              <span className={classes.title} >{topic.title}</span>
            </div>
            <div className={createInfo}>
              <span>
                <span>{` · 发布于 ${dateformat(topic.create_at, 'yy/mm/dd')}`}</span>
                <span>{` · 作者 ${topic.author.loginname}`}</span>
                <span>{` · ${topic.visit_count} 次浏览`}</span>
                <span>{` · 最后一次编辑 ${dateformat(topic.last_reply_at, 'yy/mm/dd')}`}</span>
                <span>{` · 来自 ${tabs[topic.tab]}`}</span>
              </span>
            </div>
          </header>
          <section className={classes.contentMain}>
            <div dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        {
          this.state.isLogin ?
            (<Paper elevation={4} className={classes.replies} >
              <header className={classes.replyHeader}>
                <span>添加回复</span>
              </header>
              <section className={classes.editor}>
                <Editor
                  buttonText="回复"
                  handleChange={this.handleNewReplyChange}
                  value={this.state.newReply}
                  handleSendClick={this.handleSendReplyClick}
                />
              </section>
            </Paper>) : null
        }

        <Paper elevation={4} className={classes.replies} >
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
          </header>
          <List>
            {
              topic.replies.map(reply => (
                <Reply
                  reply={reply}
                  key={reply.id}
                  isLogin={this.state.isLogin}
                  value={this.getReplyComment(reply)}
                  handleChange={this.newReplyCommentsChange}
                  handleSendReplyClick={this.handleSendReplyClick}
                  handleDialogOpenClick={this.handleDialogOpenClick}
                />
              ))
            }
          </List>
        </Paper>

        <DialogUnlogin open={this.state.open} handleClose={this.handleDialogCloseClick} />
      </div>
    )
    /* eslint-disable */
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object,
  user: PropTypes.object,
}
TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object,
}

export default withStyles(topicDetailStyle)(TopicDetail)
