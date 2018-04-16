import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((res, key) => (
    `${res + key}=${params[key]}&`
  ), '')
  return `${baseUrl}/api${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => (
  new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then((resp) => {
        const { data } = resp
        if (data && data.success) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
)

export const post = (url, params, datas) => (
  new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), datas)
      .then((resp) => {
        const data = resp.data.data || resp.data
        if (data && data.success) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
)

