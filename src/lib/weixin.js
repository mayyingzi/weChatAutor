/**
 * 微信公众号工具包
 */
import {setWebEnv, setWxCode, getWxCode} from './storage'
import _ from 'lodash'

 /**
  * 判断当前环境是否为微信环境
  */
const isWeixin = () => {
  const ua = navigator.userAgent.toLowerCase()
  const isWx = !!ua.match(/MicroMessenger/i)

    // 存储当前环境
  isWx && setWebEnv('weChat')
  return isWx
}
/**
 * 添加第三方微信js
 */
const addWeixinSdk = () => {
  if (!isWeixin()) {
    return
  }
  const WxDom = document.createElement('script')
  WxDom.src = '//res.wx.qq.com/open/js/jweixin-1.0.0.js'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(WxDom, s)
}

/**
 * 检测文件code是否存在
 */
const hasWxCode = (params) => {
    // 首先查看session中是否有code
  let code = ''
  code = getWxCode()
  if (!code) {
        // url中code获取
    code = params.code
    !!code && setWxCode(code)
  }
  return !!code
}

/**
 * 跳转公众号授权页
 * @param backUrl 授权成功需跳回链接encodeURIComponent格式 *
 */
const redirectAuthor = (backUrl) => {
  if (!backUrl) {
    return
  }
  // 授权基本配置信息
  const baseConfig = {
    SCOPE: 'snsapi_userinfo', // snsapi_base  为静默授权
    // 该授权页需要，在公众号配置：授权回调域名
    REDIRECT_URI: backUrl,
    APPID: ''
  }
  // 授权路径
  let getWeixinCodeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE#wechat_redirect'
  getWeixinCodeUrl = getWeixinCodeUrl
    .replace('SCOPE', baseConfig.SCOPE)
    .replace('REDIRECT_URI', baseConfig.REDIRECT_URI)
    .replace('APPID', baseConfig.APPID)
  location.href = getWeixinCodeUrl
}
/**
 * 微信环境 格式化URL
 *
 */
const formateUrl = (url) => {
    // 微信code返回&code=09002xdd
    // http://192.168.3.115:8080/#/activity_index 链接不带?,不带参数，需添加?
    // http://192.168.3.115:8080/?from=singlemessage#/activity_index 去掉?from
  let URL = url || location.href
  const hasQuery = URL.split('#')[1]
  hasQuery.indexOf('?') < 0 && (URL += '?')
  URL = URL.replace(/\?.{0,}#/, '#')
    // 支付路径绑定到hash之前
  URL = URL.replace(/#/, '?#')
  URL = encodeURIComponent(URL)
  return URL
}
/**
 * 微信公众号授权：获取微信code
 */
const getweixinCode = () => {
  const URL = formateUrl()
  redirectAuthor(URL)
}

/**
 * 去掉url中的code
 * @param url路由对象
 */
const omitCode = (url) => {
  const goPath = url
  goPath.query = _.omit(goPath.query, ['code'])
  return goPath
}

export {
    isWeixin,
    addWeixinSdk,
    hasWxCode,
    getweixinCode,
    formateUrl,
    omitCode
}

