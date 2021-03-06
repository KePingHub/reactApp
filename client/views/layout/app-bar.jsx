import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import ToolBar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'

import {
  inject,
  observer,
} from 'mobx-react'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    marginLeft: 20,
  },
}

@inject(stores => ({
  appState: stores.appState,
  user: stores.appState.user,
}))@observer
class MainAppBar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
  //  do something here
  }
  /* eslint-disable */
  onHomeIconClick = () => {
    this.context.router.history.push('/list')
  }

  createButtonClick = () => {
    this.context.router.history.push('/topic/create')
  }

  loginButtonClick = () => {
    this.context.router.history.push('/user/login')
  }

  avatarClick = (e, loginname) => {
    this.context.router.history.push(`/userDetail/${loginname}`)
  }
  /* eslint-disable */

  render() {
    const { classes } = this.props
    const { isLogin, info } = this.props.user
    return (
      <div className={classes.root}>
        <AppBar position="fixed" >
          <ToolBar>
            <IconButton color="inherit" onClick={this.onHomeIconClick} >
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex} >
              KNode
            </Typography>
            {
              isLogin ?
                <Button variant="raised" color="primary" onClick={this.createButtonClick} >
                  新建话题
                </Button> : null
            }
            {
              isLogin ?
                <Avatar className={classes.avatar} src={info.avatar_url} onClick={e => this.avatarClick(e, info.loginname)} /> :
                <Button color="inherit" onClick={this.loginButtonClick} >
                  登录
                </Button>
            }
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

MainAppBar.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar)
