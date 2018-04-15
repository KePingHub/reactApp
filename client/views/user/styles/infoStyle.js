export default theme => ({
  root: {
    marginTop: 20,
    fontSize: 14,
    color: '#333',
    lineHeight: '20px',
  },
  header: {
    padding: 10,
    color: '#FFF',
    backgroundColor: theme.palette.primary[500],
  },
  footer: {
    padding: 10,
    backgroundColor: '#f6f6f6',
  },
  avatar: {
    marginRight: 15,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
