<template>
  <div id="assisant">

    <div id="ass-ctrl">
      <div class="block">
        <span class="ic icon iconfont icon-setup_fill" @click="handleClick(1)"></span><span class="describe">全局设置</span>
      </div>
      <div class="block">
      	<span class="ic icon iconfont icon-int" @click="handleClick(2)"></span><span class="describe">我的盒子</span>
      </div>
      <div class="block">
      	<span class="ic icon iconfont icon-add" @click="handleClick(3)"></span><span class="describe">用户操作</span>
      </div>

      <div class="block">
      	<span class="ic icon iconfont icon-add" @click="handleClick(4)"></span><span class="describe">运行记录</span>
      </div>

      <div class="block">
      	<span class="ic icon iconfont icon-group_fill" @click="handleClick(5)"></span><span class="describe">用户管理</span>
      </div>

      <div class="block">
        <span class="ic icon iconfont icon-share_fill" @click="handleClick(5)"></span><span class="describe">响应模拟</span>
      </div>
      <div class="block">
        <span class="ic icon iconfont icon-clock" @click="handleClick(5)"></span><span class="describe">定时任务</span>
      </div>

    </div>
    <div id="collspace" :class="isExpand?'icon iconfont icon-enter':'icon iconfont icon-return'" @click="toggle"></div>
    <div id="ass-content" v-show="isExpand" >
    	<div v-if="1===current"><globalset></globalset></div>
    	<div v-if="2===current"><mybox></mybox></div>
    	<div v-if="3===current"><useroperate></useroperate></div>
    	<div v-if="4===current"><history></history></div>
    	<div v-if="5===current"><usermanager></usermanager></div>

    </div>
  </div>
</template>
<script type="text/javascript">
import '../../assets/iconfont/iconfont.css'

import globalset from './tmp/globalset'
import history from './tmp/history'
import mybox from './tmp/mybox'
import usermanager from './tmp/usermanager'
import useroperate from './tmp/useroperate'

export default {
  components:{globalset,history,mybox,useroperate,usermanager},
  data:function(){
  	return{
  		isExpand:false,
  		current:1

  	}
  },

  mounted: function() {
    let a = [window.screen.height, window.screen.availHeight, document.body.scrollHeight, document.body.scrollTop, document.body.clientHeight, document.body.offsetHeight, window.outerHeight, window.innerHeight]

    //alert(a)

    document.getElementById("ass-ctrl").style["height"] = window.innerHeight - 100 + "px"
    document.getElementById("ass-content").style["height"] = window.innerHeight - 100 + "px"
    document.getElementById("collspace").style["margin-top"] = window.innerHeight/2-50+ "px"


  },

  methods:{
    handleClick:function(current){
      this.current=current

    },
  	toggle:function(){
      //console.log("toggle")
  		this.isExpand=!this.isExpand

      //console.log(this.isExpand)


  	}
  }


}

</script>
<style type="text/css" scoped>
#assisant {
/*  border: 2px solid red;*/

z-index: 100;
position:fixed;
right: 0px;
top:20px;
right: 150px;

}

#collspace{
  float: right;
  cursor: pointer;
  font-weight: bold;
  font-size:20px;

}

#ass-ctrl {

  float: right;
  height: 100%;
  background-color:#515151;
}

#ass-content{

	float: right;
	min-width:350px;
  background-color:#515151;
  color:white;
  border-radius: 5px;
  border: 2px solid white;

}



.block {
  /*	border: 2px solid red;*/
  margin: 10px;
  color: white;
}

.ic {
  text-align: center;
  font-size: 25px;
  border: 2px solid white;
  border-radius: 5px;
  display: block;
  padding: 0;
  cursor: pointer;

}

.ic:hover{
  border: 2px solid #B0B0B0;
}

.describe {
  font-size: 10px;
  display: block;
  margin-top: 5px;
  padding: 0;
  color:white;
}


</style>
