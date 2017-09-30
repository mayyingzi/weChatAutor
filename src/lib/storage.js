/**
 * 浏览器缓存处理
 */
// import _ from 'lodash'
// key words
const webEnv = 'WEB_Env'
const weixinCode = 'WX_CODE'

/**
 * 微信授权信息存储到sessionStorage
 */
export const setWxCode = (code) => {
  sessionStorage.setItem(weixinCode, code)
}

export const getWxCode = () => {
  try {
    return sessionStorage.getItem(weixinCode)
  } catch (err) {
    console.warn(err)
    return ''
  }
}

/**
 * 存储当前环境到sessionStorage
 * 微信环境： weChat
 * 浏览器： web
 * 原生app： app
 */
export const setWebEnv = (env) => {
  sessionStorage.setItem(webEnv, env)
}

export const geWebEnv = () => {
  try {
    return sessionStorage.getItem(webEnv)
  } catch (err) {
    console.warn(err)
    return ''
  }
}
