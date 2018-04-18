import React, { Component } from 'react'
import {
  inject,
  observer,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import queryString from 'query-string'

import Tabs, { Tab } from 'material-ui/Tabs'
import List from 'material-ui/List'
import { CircularProgress } from 'material-ui/Progress'

import { AppState, TopicStore } from '../../store/store'

import Container from '../layout/container'
import TopicListItem from './list-item'

import { tabs } from '../../util/variable-define'

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
})) @observer
export default class TopicList extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    this.props.topicStore.fetchTopics(this.getTab())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const tab = this.getTab(nextProps.location.search)
      this.props.topicStore.fetchTopics(tab)
    }
  }

  getTab = (searches) => {
    const search = searches || this.props.location.search
    const query = queryString.parse(search)
    return query.tab || 'all'
  }

  bootstrap = () => {
    const query = queryString.parse(this.props.location.search)
    const { tab } = query
    return this.props.topicStore.fetchTopics(tab || 'all').then(() => {
      console.log('success') // eslint-disable-line
    }).catch(() => {
      console.log('faild') // eslint-disable-line
    })
  }

  changeTab = (e, type) => {
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${type}`,
    })
  }

  /* eslint-disable */
  listItemClick = (e, id) => {
    this.context.router.history.push(`/detail/${id}`)
  }
  /* eslint-disable */

  render() {
    const tab = this.getTab()
    const {
      topicStore,
    } = this.props
    const topicList = topicStore.topics
    const syncingTopics = topicStore.syncing

    return (
      <Container>
        <Helmet>
          <title>this is title</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tab} indicatorColor="primary" onChange={this.changeTab} >
          {
            Object.keys(tabs).map((tab, index) => <Tab key={'tab' + index} label={tabs[tab]} value={tab} />)
          }
        </Tabs>
        <List>
          {
            topicList.map((topic) => <TopicListItem key={topic.id } onClick={e => this.listItemClick(e, topic.id)} topic={topic} />)
          }
        </List>
        {
          syncingTopics ?
            (
              <div>
                <CircularProgress color='secondary' size={100} />
              </div>
            ) : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState),
  topicStore: PropTypes.instanceOf(TopicStore),
  location: PropTypes.object.isRequired,
}


