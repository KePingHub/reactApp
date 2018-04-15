import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import dateformat from 'dateformat'

import {
  ListItem,
  ListItemAvatar,
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'

import topicItem from './styles/topicItemStyle'

const TopicItem = ({ classes, topic }) => (
  <ListItem className={classes.root}>
    <Link to={`/userDetail/${topic.author.loginname}`}>
      <ListItemAvatar className={classes.avatar}>
        <Avatar src={topic.author.avatar_url} />
      </ListItemAvatar>
    </Link>
    <div className={classes.full}>
      <Link className={classes.title} to={`/detail/${topic.id}`}>{topic.title}</Link>
    </div>
    <span className={classes.time}>{dateformat(topic.last_reply_at, 'yyyy/mm/dd HH:MM:ss')}</span>
  </ListItem>
)

TopicItem.propTypes = {
  classes: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
}
export default withStyles(topicItem)(TopicItem)
