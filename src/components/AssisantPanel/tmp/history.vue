<template>
  <div id="history">
    <input id="search" type="text" placeholder="支持全字段搜索" @change="search">
    <mytable :mdata="d" :fields="fieldInfo"></mytable>
  </div>
</template>
<script type="text/javascript">
import mytable from '../../MyTable/main'
import axios from "axios"
import { m } from "../../../mock"
import bus from '../../bus.js'
export default {
  data: function() {
    return {
      d: [],
      fieldInfo: []
    }
  },

  components: { mytable },
  methods: {
    search: function(e) {
      //


      //
      bus.$emit("onSearch", e.target.value)
      console.log("search :" + e.target.value)
    }

  },

  mounted: function() {
  	let self=this

    m()

    console.warn("[history]组件渲染")

    // this.d = [{
    //     "id": "1",
    //     "describe": "用户登录",
    //     "url": "http://xxx/user/login",
    //     "paramInfo": "",
    //     "success": true
    //   },
    //   {
    //     "id": "2",
    //     "describe": "密码修改",
    //     "url": "http://xxx/user/pwdset",
    //     "paramInfo": "",
    //     "success": true
    //   }


    // ]
    axios.get("/user/history").then(function(res) {
    	self.d=res.data.data

      console.log(this.d)
    }).catch(function(res){
    	console.log(res)
    })
    this.fieldInfo = [
      { "name": "describe", "labelName": "名称", "isSort": true },
      { "name": "url", "labelName": "url", "isSort": true },
      { "name": "paramInfo", "labelName": "参数", "isSort": true },
      { "name": "success", "labelName": "结果", "isSort": true }
    ]

    console.log("**************************8")

    console.log(this.d)
    console.log(this.fieldInfo)




  }

}

</script>
<style type="text/css" scoped>
#search {

  margin: 10px;
  color:blue;
  font-size: 12px;
}

</style>
