/*
 * @Descripttion: 接口请求方法定义
 * @Author: pujianguo
 * @Date: 2021-04-02 09:41:47
 */

import axios from 'axios'
import config from '@/config'

const request = axios.create({
  baseURL: config.apiUrl,
  timeout: 60000,
  headers: {
    Env: config.apiEnv,
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
  const { data } = response
  if (data.code !== undefined) {
    if (data.code === 0) {
      return data.Response
    } else if (data.code === 401) {
      toLogin()
    } else {
      const msg = data.message || '调用接口失败'
      // ElNotification.error({ title: '错误提示', message: msg })
      console.log('api response error: ', msg)
      return Promise.reject(msg)
    }
  } else {
    // TODO:兼容旧接口, 迁移完成后可删除
    return response.data
  }
}, error => {
  let msg = ''
  if (error.response) {
    if (error.response.data && error.response.data.message) {
      msg = error.response.data.message
    } else {
      msg = error.response.data
    }
  } else {
    msg = error.message
  }
  if (msg !== 'not login') {
    // 这里统一做错误提示，如果要单独处理，跳过这里即可
    // ElNotification.error({ title: '错误提示', message: msg })
  }
  console.log('api response error: ', msg)
  return Promise.reject(msg)
})

export const toLogin = () => {
  const baseLocalStore = useBaseLocalStore()
  baseLocalStore.setLogout()
  // ElNotification.error({ title: '错误提示', message: '登录信息已过期，请重新登录' })
  window.location.href = getPageLocationHref('', '', 'login')
}

export const send = (url, data) => {
  const body = {
    cmd: url,
    env: config.apiEnv,
    request: data,
  }
  return request.post(config.urlPrefix + url, body)
}
