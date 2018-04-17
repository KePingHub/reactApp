import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import Login from '../views/user/login'
import Info from '../views/user/info'
import CreateTopic from '../views/topic-create/index'
import TestApi from '../views/test/test-api'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} exact key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" component={Login} key="login" />,
  <Route path="/topic/create" component={CreateTopic} key="createTopic" />,
  <Route path="/userDetail/:name" component={Info} key="info" />,
  <Route path="/test" component={TestApi} key="testApi" />,
]
