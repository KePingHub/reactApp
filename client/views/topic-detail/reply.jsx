import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  inject,
  observer,
} from 'mobx-react'

import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import ListItem from 'material-ui/List/ListItem'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ReplyIcon from 'material-ui-icons/Reply'

import marked from 'marked'
import cn from 'classnames'
import dateformat from 'dateformat'

import { repliesStyle } from './styles'
import Editor from '../editor/editor'

@inject(stores => ({
  topicStore: stores.topicStore,
}))@observer
class Reply extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      isThumbUp: props.reply.is_uped,
      thumbUpCount: props.reply.ups.length,
    }
  }

  handleSendReplyClick = (e) => {
    const {
      reply,
      handleSendReplyClick,
    } = this.props
    handleSendReplyClick(e, reply.id)
  }

  handleChange = (content) => {
    const {
      reply,
      handleChange,
    } = this.props
    handleChange(content, reply.id)
  }

  handleThumbClick = () => {
    const {
      reply,
      isLogin,
      handleDialogOpenClick,
      topicStore,
    } = this.props
    if (!isLogin) {
      handleDialogOpenClick()
    } else {
      topicStore.setThumbUpOrDown(reply.id)
        .then((resp) => {
          const { action } = resp
          if (action === 'up') {
            this.setState({
              isThumbUp: true,
              thumbUpCount: this.state.thumbUpCount + 1,
            })
          } else if (action === 'down') {
            this.setState({
              isThumbUp: false,
              thumbUpCount: this.state.thumbUpCount - 1,
            })
          }
        }).catch(err => console.log(err)) // eslint-disable-line
    }
  }

  toggleEditorStatusClick = () => {
    const { isLogin, handleDialogOpenClick } = this.props
    if (!isLogin) {
      handleDialogOpenClick()
    } else {
      this.setState({
        open: !this.state.open,
      })
    }
  }
  /* eslint-disable */
  render() {
    const {
      classes,
      value,
      reply,
      isLogin,
    } = this.props
    const {
      thumbUpCount,
      isThumbUp,
    } = this.state
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
            <ThumbUp color={isThumbUp ? 'primary' : 'disabled'} onClick={this.handleThumbClick} />
            <span>{thumbUpCount ? thumbUpCount : " "}</span>
            {
              isLogin ?
                <ReplyIcon color="disabled" onClick={this.toggleEditorStatusClick} />
                : null
            }
          </div>
        </div>
        <div
          className={classes.replyContent}
          dangerouslySetInnerHTML={{ __html: marked(reply.content) }}
        />
        {
          this.state.open ?
            <Editor
              buttonText="回复"
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

Reply.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
}
Reply.propTypes = {
  classes: PropTypes.object.isRequired,
  reply: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSendReplyClick: PropTypes.func.isRequired,
  handleDialogOpenClick: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
}

export default withStyles(repliesStyle)(Reply)
