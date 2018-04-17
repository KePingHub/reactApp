import React from 'react'
import PropTypes from 'prop-types'
import {
  inject,
  observer,
} from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { ListItemText } from 'material-ui/List'
import Select from 'material-ui/Select'
import TextField from 'material-ui/TextField'

import Container from '../layout/container'
import Editor from '../editor/editor'

import styles from './styles'
import { newTopicTab } from '../../util/variable-define'

@inject(stores => ({
  topicStore: stores.topicStore,
  isLogin: stores.appState.user.isLogin,
}))@observer
class CreateTopic extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.state = {
      tab: 'dev',
      title: '',
      titleErr: false,
      content: '',
      titleHelpText: '',
      contentHelpText: '',
    }
  }

  componentWillMount() {
    if (!this.props.isLogin) {
      this.context.router.history.push('/user/login')
    }
  }

  handleTabSelectChange = (e) => {
    this.setState({
      tab: e.target.value,
    })
  }

  handleEditChange = (newValue) => {
    this.setState({
      content: newValue,
    })
    console.log(newValue)
    if (newValue) {
      this.setState({
        contentHelpText: '',
      })
    }
  }

  handleTitleChange = (e) => {
    const value = e.target.value.trim()
    this.setState({
      title: value,
    })
    if (value.length > 10) {
      this.setState({
        titleErr: false,
        titleHelpText: '',
      })
    }
  }

  handleSendCreateClick = () => {
    const {
      title,
      tab,
      content,
    } = this.state

    if (title.length < 10 || !content) {
      if (title.length < 10) {
        this.setState({
          titleHelpText: '标题必须大于10个字',
          titleErr: true,
        })
      }
      if (!content) {
        this.setState({
          contentHelpText: '内容不能为空',
        })
      }
    } else {
      this.props.topicStore.createTopic({ title, tab, content })
        .then(resp => this.context.router.history.push(`/detail/${resp.topic_id}`))
        .catch((err) => {
          console.log(err) // eslint-disable-line
        })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Container>
        <FormControl className={classes.wrap}>
          <InputLabel htmlFor="tab">选择版块</InputLabel>
          <Select
            value={this.state.tab}
            onChange={this.handleTabSelectChange}
            input={<Input name="tab" id="tab" />}
          >
            {
              Object.keys(newTopicTab).map(tab => (
                <MenuItem key={tab} value={tab}>
                  <ListItemText primary={newTopicTab[tab]} />
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <div className={classes.wrap}>
          <TextField
            fullWidth
            error={this.state.titleErr}
            label="标题"
            value={this.state.title}
            placeholder="请输入标题,至少十个字以上"
            onChange={this.handleTitleChange}
            helperText={this.state.titleHelpText}
          />
        </div>
        <div className={classes.wrap} aria-describedby="name-error-text">
          <Editor
            buttonText="提交"
            handleChange={this.handleEditChange}
            value={this.state.content}
            handleSendClick={this.handleSendCreateClick}
          >
            <span className={classes.helpText}>{this.state.contentHelpText}</span>
          </Editor>
        </div>
      </Container>
    )
  }
}

CreateTopic.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  isLogin: PropTypes.bool.isRequired,
}
CreateTopic.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateTopic)
