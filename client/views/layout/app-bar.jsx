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

  }

  loginButtonClick = () => {
    this.context.router.history.push('/user/login')
  }

  avatarClick = () => {
    this.context.router.history.push('/user/info')
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
            <Button variant="raised" color="primary" onClick={this.createButtonClick} >
              新建话题
            </Button>
            {
              isLogin ?
                <Avatar className={classes.avatar} src={info.avatar_url} onClick={this.avatarClick} /> :
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
