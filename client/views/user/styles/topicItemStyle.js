export default () => ({
  root: {
    justifyContent: 'space-between',
  },
  // tab: {
  //   padding: '0 6px',
  //   marginRight: 10,
  //   borderRadius: 3,
  //   color: '#FFF',
  //   backgroundColor: theme.palette.secondary[500],
  // },
  full: {
    flexGrow: 1,
    maxWidth: '75%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  title: {
    color: '#08c',
    lineHeight: '30px',
    fontSize: 16,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  time: {
    fontSize: 11,
    color: '#777',
  },
  avatar: {
    marginRight: 15,
  },
})
