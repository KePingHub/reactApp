import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import ListItem from 'material-ui/List/ListItem'

import marked from 'marked'
import cn from 'classnames'
import dateformat from 'dateformat'

import { repliesStyle } from './styles'

const Reply = ({ classes, reply }) => {
  const avatar = cn({
    [classes.avatar]: true,
    [classes.fl]: true,
  })
  /* eslint-disable */
  return (
    <ListItem className={classes.listItem}>
      <div className={classes.replyInfo}>
        <Link to={`/userDetail/${reply.author.loginname}`}>
          <Avatar className={avatar} src={reply.author.avatar_url} />
        </Link>
        <span className={classes.replyName} >{reply.author.loginname}</span>
        <span className={classes.replyTime}>{dateformat(reply.create_at, 'yy/mm/dd HH:MM:ss')}</span>
      </div>
      <div
        className={classes.replyContent}
        dangerouslySetInnerHTML={{ __html: marked(reply.content) }}
      />
    </ListItem>
  )
  /* eslint-disable */
}

Reply.propTypes = {
  classes: PropTypes.object.isRequired,
  reply: PropTypes.object.isRequired,
}

export default withStyles(repliesStyle)(Reply)
