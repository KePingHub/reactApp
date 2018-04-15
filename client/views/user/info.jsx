import React from 'react'
import PropTypes from 'prop-types'

import {
  observer,
  inject,
} from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import List, { ListItem } from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'

import infoStyle from './styles/infoStyle'
import UserWrapper from './user'
import TopicItem from './topicItem'
import Container from '../layout/container'

// const obj = {
//   id: '5abda42674fe2526d62220d4',
//   author: {
//     loginname: 'JacksonTian',
//     avatar_url: 'https://avatars3.githubusercontent.com/u/327019?v=4&s=120',
//   },
//   title: '请不要再发薅羊毛帖子',
//   last_reply_at: '2018-04-08T08:00:55.965Z',
// }

@inject(stores => ({
  appState: stores.appState,
}))@observer
class UserInfo extends React.Component {
  componentDidMount() {
    const { name } = this.props.match.params
    return this.props.appState.userMap[name] || this.props.appState.getUserDetail(name)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match !== nextProps.match) {
      const { name } = nextProps.match.params
      this.props.appState.getUserDetail(name)
    }
  }

  render() {
    const { classes } = this.props
    const { name } = this.props.match.params
    const userDetail = this.props.appState.userMap[name]

    if (!userDetail) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="secondary" />
          </section>
        </Container>
      )
    }

    return (
      <UserWrapper>
        <section>
          <div className={classes.root}>
            <header className={classes.header}>
              最新创建的话题
            </header>
            <List>
              {
                userDetail.recent_topics.length === 0 ?
                  <ListItem>暂无创建的的话题</ListItem> :
                  userDetail.recent_topics.map(topic => <TopicItem topic={topic} key={topic.id} />)
              }
            </List>
          </div>
          <div className={classes.root}>
            <header className={classes.header}>
              最近参与的话题
            </header>
            <List>
              {
                userDetail.recent_replies.length === 0 ?
                  <ListItem>最近未参与话题讨论</ListItem> :
                  userDetail.recent_replies.map(topic => <TopicItem topic={topic} key={topic.id} />)
              }
            </List>
          </div>
        </section>
      </UserWrapper>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}
UserInfo.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

export default withStyles(infoStyle)(UserInfo)
