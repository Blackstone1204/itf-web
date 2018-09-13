import mock from 'mockjs'

let url = ""


/**
 ********A 用例模块***********************
 *****/

//1.获取用例列表
//


let child1_1 = {
  "label":"输入错误密码",
  "title": "输入错密码",
  "type": 0,
  "children": []
}

let child1 = {
  "label":"登录失败",
  "title": "登录失败",
  "type": 1,
  "children": [child1_1]
}

let parent1 = {
  "label":"登录",
  "title": "登录",
  "type": 1,
  "children": [child1]

}


let parent2 = {
  "label":"购物",
  "title": "购物",
  "type":1,
  "children": []

}





let caseList = function() {
  mock.mock("/user/getCaseList", {
    "code": 0,
    "msg": "",
    "data": [parent1, parent2]
  });
}


//2.添加用例


//3.删除用例


//4.更改用例


//5.运行单条用例


//6.有序运行测试集用例


//7.无须运行测试集用例

//8.有序运行分散的多个用例

//9、无序运行分散的多个用例

//10。查看历史 
let history=function(){
  console.log("模拟历史数据")
  mock.mock("/user/history",{
    "code":200,
    "msg":"",
    "data":[
    {
      "id":"1",
      "describe":"用户登录",
      "url":"http://xxx/user/login",
      "paramInfo":"",
      "success":true
    },
    {
      "id":"2",
      "describe":"密码修改",
      "url":"http://xxx/user/pwdset",
      "paramInfo":"",
      "success":true
    }



    ]
  })
}



/***
 *********B 用户模块
 ***/

//1.用户登录
let login = function() {
  mock.mock("/user/login", {
    "code": 200,
    "msg": "登录成功",
    "isLogin": 1
  })
}



/****
 ********C 其他
 ******/

let pagerMock=function(){
  mock.mock("/pager/mock",{
    "data":[{"name":"A","age":"boy"},{"name":"B","age":"girl"},{"name":"A","age":"boy2"},{"name":"B","age":"girl2"},{"name":"A","age":"boy3"}]
  })
}


let m = function() {
  login()
  caseList()
  pagerMock()
  history()

}

export { m }
