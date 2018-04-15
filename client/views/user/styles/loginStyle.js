const inputWidth = 300

export default () => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 0 50px',
  },
  textField: {
    width: inputWidth,
    marginBottom: 20,
  },
  loginBtn: {
    width: inputWidth,
    color: '#FFF',
  },
})
