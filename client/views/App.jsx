import React, { Component } from 'react'
import Routes from '../config/router'

import AppBar from './layout/app-bar'

export default class App extends Component {
  componentDidMount() {
  //  do something here
  }

  render() {
    return [
      <AppBar key="AppBar" />,
      <Routes key="routers" />,
    ]
  }
}
