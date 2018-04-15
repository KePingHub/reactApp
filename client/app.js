import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { lightBlue, pink } from 'material-ui/colors'

import App from './views/App'
import { AppState, TopicStore } from './store/store'

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: lightBlue,
    type: 'light',
  },
})

const initialState = window.__INITIAL__STATE__ || {}

const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />
    }
  }
  return Main
}

const appState = new AppState(initialState.appState)
const topicStore = new TopicStore(initialState.topicStore)

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState} topicStore={topicStore} >
        <BrowserRouter>
          <MuiThemeProvider theme={theme} >
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}

render(createApp(App))

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default // eslint-disable-line
    render(createApp(NextApp))
  })
}
