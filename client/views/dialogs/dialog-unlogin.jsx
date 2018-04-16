import React from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DialogUnlogin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  handleGoLogin = () => {
    this.context.router.history.push('/user/login')
  }

  render() {
    const { handleClose, open } = this.props
    return (
      <div>
        <Dialog
          maxWidth="md"
          open={open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-slide-title">
            您目前暂未登录
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              登录后更精彩,更多功能等你去发现
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleGoLogin} color="primary">
              去登陆
            </Button>
            <Button onClick={handleClose} color="primary">
              暂不登录
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

DialogUnlogin.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default DialogUnlogin
