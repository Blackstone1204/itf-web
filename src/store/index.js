import Vue from 'vue'
import Vuex from 'vuex'
import {get} from '../utils'


Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    accessToken:'',
    isLogin:"0",
    userName:"未登录",
    treeInfo:{
      treedata:[],
      expandkeys:['1']
    }
  },
  getters: {

  },
  mutations: {
    login(state,userInfo) {

      state.isLogin ="1"
      state.userName=userInfo.userName

      localStorage.setItem("isLogin","1")
      localStorage.setItem("userName",userInfo.userName)
      localStorage.setItem("accountId",userInfo.userId)

    },
    logout(state,payload) {

      state.isLogin ="0"
      state.userName=""

      localStorage.setItem("isLogin","0")
      localStorage.setItem("userName","未登录")

    },
    updateTreeData(state){

      
      if(state.isLogin!=1)return

      let next=function(res){
        state.treeInfo.treedata=res.data.data

        localStorage.setItem("treeData",JSON.stringify(res.data.data));

        console.log("更新store树->data")
      }
      
      get("/api/target/queryAll", {}, next)

    },

    addTreeExpandKeys(state,key){

      console.log("展开节点")

      //

      if(key=='1'){
        console.log("添加过滤 key= "+key)
        return
      }
      state.treeInfo.expandkeys.push(key)

      console.log("add expand key->"+state.treeInfo.expandkeys)

    },
    removeTreeExpandKeys(state,key){
        console.log("关闭节点")
        if(key=='1')return;

        const index=state.treeInfo.expandkeys.indexOf(key)
        console.log("index->"+index)
        if(index>-1){
          state.treeInfo.expandkeys.splice(index,1)
        }

     console.log("remove expand key->"+state.treeInfo.expandkeys)

    }
  },
  actions: {



  },
  modules: {}
})





export default store
