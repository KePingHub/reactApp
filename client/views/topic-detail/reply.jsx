import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import ListItem from 'material-ui/List/ListItem'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ReplyIcon from 'material-ui-icons/Reply'

import marked from 'marked'
import cn from 'classnames'
import dateformat from 'dateformat'

import { repliesStyle } from './styles'
import Editor from './editor'

class Reply extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  handleSendReplyClick = () => {
    const {
      reply,
      handleSendReplyClick,
    } = this.props
    handleSendReplyClick(reply.id)
  }

  handleChange = (content) => {
    const {
      reply,
      handleChange,
    } = this.props
    handleChange(content, reply.id)
  }
  toggleEditorStatus = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  /* eslint-disable */
  render() {
    const {
      classes,
      value,
      reply,
    } = this.props
    const avatar = cn({
      [classes.avatar]: true,
      [classes.fl]: true,
    })

    return (
      <ListItem className={classes.listItem}>
        <div className={classes.replyInfo}>
          <Link to={`/userDetail/${reply.author.loginname}`}>
            <Avatar className={avatar} src={reply.author.avatar_url} />
          </Link>
          <div className={classes.fullSurplus}>
            <span className={classes.replyName} >{reply.author.loginname}</span>
            <span className={classes.replyTime}>{dateformat(reply.create_at, 'yy/mm/dd HH:MM:ss')}</span>
          </div>
          <div className={classes.thumb}>
            <ThumbUp color={reply.is_uped ? 'primary' : 'disabled'} />
            <span>{reply.ups.length ? reply.ups.length : " "}</span>
            <ReplyIcon color="disabled" onClick={this.toggleEditorStatus} />
          </div>
        </div>
        <div
          className={classes.replyContent}
          dangerouslySetInnerHTML={{ __html: marked(reply.content) }}
        />
        {
          this.state.open ?
            <Editor
              handleChange={this.handleChange}
              value={value || `@${reply.author.loginname} `}
              handleSendClick={this.handleSendReplyClick}
            /> : null
        }
      </ListItem>
    )
  }
  /* eslint-disable */
}

Reply.propTypes = {
  classes: PropTypes.object.isRequired,
  reply: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSendReplyClick: PropTypes.func.isRequired,
  open: PropTypes.bool,
  value: PropTypes.string.isRequired,
}

export default withStyles(repliesStyle)(Reply)
