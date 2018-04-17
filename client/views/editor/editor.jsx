import React from 'react'
import PropTypes from 'prop-types'

import SimpleMDE from 'react-simplemde-editor'

import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import editor from './styles'

const Editor = (props) => {
  const {
    handleChange,
    value,
    classes,
    buttonText,
    handleSendClick,
    children,
  } = props
  return (
    <div>
      <SimpleMDE
        value={value}
        onChange={handleChange}
        options={{
          spellChecker: false,
          placeholder: '添加内容',
          autoFocus: false,
          status: false,
        }}
      />
      <div className={classes.replyBtnBox}>
        {children}
        <Button
          variant="raised"
          color="secondary"
          className={classes.replyBtn}
          onClick={handleSendClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

Editor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleSendClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

export default withStyles(editor)(Editor)
