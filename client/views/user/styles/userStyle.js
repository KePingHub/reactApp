import bg from './bg.jpg'

export default () => ({
  bg: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200,
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
  },
  avatar: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImg: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    letterSpacing: 3,
    color: '#FFF',
  },
})
