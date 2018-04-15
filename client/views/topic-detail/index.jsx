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
import Button from 'material-ui/Button'

import Container from '../layout/container'
import { topicDetailStyle } from './styles'
import { tabs } from '../../util/variable-define'

import Reply from './reply'

@inject(stores => ({
  topicStore: stores.topicStore,
}))
@observer
class TopicDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.topicStore.getTopicDetail(id)
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


    const collect = cn({
      [classes.collectBtn]: true,
      [classes.fr]: true,
    })
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
              <Button variant="raised" color={topic.is_collect ? 'default' : 'secondary'} className={collect}>
                {topic.is_collect ? '已收藏' : '收藏'}
              </Button>
            </div>
          </header>
          <section className={classes.contentMain}>
            <div dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>

        <Paper elevation={4} className={classes.replies} >
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
          </header>
          <List>
            {
              topic.replies.map(reply => (<Reply reply={reply} key={reply.id} />))
            }
          </List>
        </Paper>
      </div>
    )
    /* eslint-disable */
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object,
}
TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object,
}

export default withStyles(topicDetailStyle)(TopicDetail)
