import React from 'react'
import PropTypes from 'prop-types'

import {
  inject,
  observer,
} from 'mobx-react'

import Avatar from 'material-ui/Avatar'
import AccountCircle from 'material-ui-icons/AccountCircle'
import { withStyles } from 'material-ui/styles'

import Container from '../layout/container'
import userStyle from './styles/userStyle'

@inject(stores => ({
  appState: stores.appState,
  // userDetail: stores.appState.userDetail,
}))@observer
class UserWrapper extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
  // aaa
  }

  render() {
    const { classes } = this.props
    const { params } = this.context.router.route.match
    const loginName = params.name ? params.name : ''
    const user = this.props.appState.userMap[loginName] || {}
    return (
      <Container>
        <div className={classes.bg}>
          <div className={classes.avatar}>
            {
              user.avatar_url ?
                <Avatar className={classes.avatarImg} src={user.avatar_url} /> :
                <Avatar className={classes.avatarImg}>
                  <AccountCircle />
                </Avatar>
            }
            <span className={classes.userName}>{user.loginname || '未登录'}</span>
          </div>
        </div>
        {this.props.children}
      </Container>
    )
  }
}

UserWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}
UserWrapper.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

export default withStyles(userStyle)(UserWrapper)
