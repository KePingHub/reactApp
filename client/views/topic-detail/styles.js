export const topicDetailStyle = theme => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerWrap: {
    fontSize: 14,
    color: '#333',
    '& a': {
      color: '#08c',
      textDecoration: 'none',
    },
    '& img': {
      height: 'auto',
      maxWidth: '100%',
      verticalAlign: 'middle',
    },
  },
  header: {
    padding: 10,
    borderBottom: '1px solid #e5e5e5',
  },
  top: {
    fontSize: 12,
    color: '#FFF',
    borderRadius: 3,
    padding: '0 6px',
    backgroundColor: theme.palette.secondary[500],
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 700,
    margin: '8px 0',
    wordBreak: 'break-all',
  },
  createInfo: {
    fontSize: 12,
    color: '#838383',
    '& span': {
      lineHeight: '20px',
    },
  },
  collectBtn: {
    fontSize: 15,
    color: '#FFF',
  },
  contentMain: {
    padding: 20,
  },
  replies: {
    margin: '0 24px',
  },
  replyHeader: {
    padding: 10,
    backgroundColor: '#f6f6f6',
    '& span': {
      color: '#444',
    },
  },
  editor: {
    marginBottom: 20,
  },
  replyBtnBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  replyBtn: {
    margin: 10,
  },
  clearFix: {
    '&::after': {
      content: '""',
      display: 'table',
      clear: 'both',
    },
  },
  fr: {
    float: 'right',
  },
})

export const repliesStyle = () => ({
  fl: {
    float: 'left',
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 3,
    marginRight: 10,
  },
  replyContent: {
    paddingLeft: 50,
    '& img': {
      height: 'auto',
      maxWidth: '100%',
      verticalAlign: 'middle',
    },
  },
  replyName: {
    fontSize: 12,
    color: '#666',
  },
  replyInfo: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-end',
  },
  fullSurplus: {
    flexGrow: 1,
  },
  replyTime: {
    color: '#08c',
    fontSize: 11,
    display: 'inline-block',
    marginLeft: 5,
  },
  thumb: {
    cursor: 'pointer',
    '& span': {
      display: 'inline-block',
      color: '#9e9e9e',
      fontSize: 12,
      height: '100%',
      marginLeft: 5,
      verticalAlign: 'top',
    },
  },
})

export const editor = () => ({
  replyBtn: {
    margin: 10,
    fontSize: 15,
    color: '#FFF',
  },
  replyBtnBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})
