const ejs = require('ejs')
const ReactDomServer = require('react-dom/server')
const serialize = require('serialize-javascript')
const bootstrap = require('react-async-bootstrapper')
const Helmet = require('react-helmet').default

const SheetsRegistry = require('react-jss').SheetsRegistry
const create = require('jss').create
const preset = require('jss-preset-default').default
const createMuiTheme = require('material-ui/styles').createMuiTheme
const createGenerateClassName = require('material-ui/styles').createGenerateClassName
const colors = require('material-ui/colors')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const user = req.session.user
    const createStoreMap = bundle.createStoreMap
    const createApp = bundle.default
    const routerContext = {}
    const stores = createStoreMap()
    if (user) {
      const info = Object.assign({}, user)
      delete info.accessToken
      stores.appState.user.isLogin = true
      stores.appState.user.info = info
    } else {
      stores.appState.user.isLogin = false
      stores.appState.user.info = {}
    }

    const theme = createMuiTheme({
      palette: {
        primary: colors.pink,
        accent: colors.lightBlue,
        type: 'light'
      }
    })
    const sheetsRegistry = new SheetsRegistry()
    const generateClassName = createGenerateClassName()
    const app = createApp(stores, routerContext, sheetsRegistry, generateClassName, theme, req.url)

    bootstrap(app).then(() => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const state = getStoreState(stores)
      const content = ReactDomServer.renderToString(app)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
        materialCss: sheetsRegistry.toString()
      })
      res.send(html)
      resolve()
    }).catch(reject)
  })
}
