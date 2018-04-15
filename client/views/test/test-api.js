import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class TestApi extends React.Component {
  getTopics = () => {
    axios.get('/api/topics')
      .then((resp) => {
        console.log(resp)
      }).catch((err) => {
        console.log(err)
      })
  }

  login = () => {
    axios.post('/api/user/login', {
      accessToken: '3cf2dfe2-9eaf-47e7-9904-c5b499ad15db',
    }).then((resp) => {
      console.log(resp)
    }).catch((err) => {
      console.log(err)
    })
  }

  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true', {
      accessToken: '3cf2dfe2-9eaf-47e7-9904-c5b499ad15db',
    }).then((resp) => {
      console.log(resp)
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topic</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-disable */
