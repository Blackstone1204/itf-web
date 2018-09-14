import axios from './axios'
import store from '../store'
import Vue from 'vue'
import { Message } from 'element-ui'
/**
 **资源请求
 **/
let access_token = ""
let setToken = function(token) {

  console.log("[set new token] " + token)
  access_token = token

}
let ajax = function(url, data, method, next, doerror) {

  console.log("[" + method + "]" + JSON.stringify(data) + " token=" +store.state.accessToken  + " -> " + url)

  axios({
    method: method,
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": store.state.accessToken
    }

  }).then(function(res) {
    console.log(res.status + "->" + JSON.stringify(res.data))

    //正常请求

    if (res.data.access_token) {
      setToken(res.data.access_token)
      store.state.accessToken = res.data.access_token
      localStorage.setItem("accessToken", res.data.access_token)

    }

    
    if(typeof(next)==='function')next(res);
    else console.log(typeof(next));



  }).catch(function(error) {

    console.error(error)

    console.error("请求异常 ->" + JSON.stringify(error))
    //accessToken 过期或请求异常处理 清除状态和localstorage

    if (error.response) {

       const status = error.response.status

      if (status === 401) {
        store.state.isLogin = "0"
        store.state.userName = "未登录"
        store.state.accessToken = ''

        Message.info("请重新登录  -> token过期错误")

      } else {
       
        const url = error.config.url
        const method = error.config.method

        Message.error(method + "  ->  " + url + "  =>  " + status)
      }

      //localstorge树信息覆盖  accountid

    } else {


      if(store.state.isLogin==='1'&&error.config.timeout){
        Message.info("请重新登录->session过期-> ")
        store.state.isLogin = "0"
        store.state.userName = "未登录"
        store.state.accessToken = ''

      }




    }


  })


}

let get = function(url, data, then, doerror) {
  ajax(url, data, "get", then, doerror)

}

let post = function(url, data, then, doerror) {
  ajax(url, data, "post", then, doerror)

}



/**
 **重定向
 */

let redirectTo = function(url) {
  console.log("[redirectTo]" + url)
  window.location.href = url
  return

}


export { post, get }
