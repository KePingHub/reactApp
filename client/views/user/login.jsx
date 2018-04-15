import React from 'react'
import PropTypes from 'prop-types'

import {
  observer,
  inject,
} from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

import UserWrapper from './user'
import loginStyle from './styles/loginStyle'

@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user,
}))
@observer
class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor() {
    super()
    this.state = {
      helpText: '',
      accessToken: '',
    }
  }

  componentWillMount() {
    if (this.props.user.isLogin) {
      this.context.router.history.replace(`/userDetail/${this.props.user.info.loginname}`)
    }
  }

  handleChange = (e) => {
    const accessToken = e.target.value.trim()
    this.setState({ accessToken })
  }

  loginIn = () => {
    if (!this.state.accessToken) {
      return this.setState({
        helpText: 'accessToken不能为空',
      })
    }
    this.setState({
      helpText: '',
    })
    return this.props.appState.login(this.state.accessToken)
      .then(() => this.context.router.history.replace(`/userDetail/${this.props.user.info.loginname}`))
      .catch((err) => {
        console.log(err) // eslint-disable-line
      })
  }

  render() {
    const { classes } = this.props

    return (
      <UserWrapper>
        <div className={classes.root}>
          <TextField
            id="password-input"
            label="请输入CNode-AccessToken"
            className={classes.textField}
            placeholder="请输入CNode-AccessToken"
            helperText={this.state.helpText}
            value={this.state.accessToken}
            type="password"
            autoComplete={this.state.accessToken}
            onChange={this.handleChange}
            margin="normal"
          />
          <Button
            className={classes.loginBtn}
            variant="raised"
            color="primary"
            onClick={this.loginIn}
          >
            登录
          </Button>
        </div>
      </UserWrapper>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

Login.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default withStyles(loginStyle)(Login)
