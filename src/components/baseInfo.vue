<template>
  <div id="baseInfo">
    <span class='iconfont icon-logout' @click="logout" type="text" style='float: right;color:#F56C6C;margin-right:70px;margin-top:10px'></span>
    <div class="user"><div class="user-img"></div><span class="user-name">{{$store.state.userName}}</span></div>
<!--     <span type="text" style="float: right;color:#303e33;margin-top:10px;margin-right:10px;">{{$store.state.userName}}</span> -->

    <el-select size='mini' style='margin:10px;float:right;' placeholder='选择环境' v-model="value">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>

    <span class="iconfont icon-setting-fill" style="float:right;margin-top:10px;margin-right:20px;" @click='vmManager'></span>
    
    <span class="iconfont icon-adduser" style="float:right;margin-top:10px;margin-right:20px;" @click='actManager'></span>
    
    <span class="iconfont icon-team"  style="float:right;margin-top:10px;margin-right:20px;" @click='authManager'></span>
    <span class="iconfont icon-plus"  style="float:right;margin-top:10px;margin-right:20px;" @click='addPlan'></span>

    <vm :show='isShow' @onClose='onClose'></vm>
    <am :show='isShow2' @onClose='onClose2'></am>
    <act :show="isShow3" @onClose="onClose3"></act>
    <pl :show="isShow4" @onClose="onClose4"></pl>


  </div>
</template>
<script type="text/javascript">
import vm from './Variables'
import am from './Auth'
import  act from './Account'
import pl from './PlanAdd'
export default {
  components: { vm,am,act,pl},
  data() {
    return {
      isShow: false,
      isShow2:false,
      isShow3:false,
      isShow4:false,
      value: '',
      options:[]
    }

  },

  methods: {
    logout() {
      this.$store.commit("logout", "")

    },
    vmManager() {

      this.isShow = true
      console.log("编辑变量")

    },
    authManager(){
      this.isShow2=true;
      console.log("权限管理")

    },
    actManager(){
      this.isShow3=true

    },
    addPlan(){
      this.isShow4=true
      console.log("addPlan")

    },
    onClose(show) {
      this.isShow = show
    },
    onClose2(show){
      this.isShow2=show

    },
    onClose3(show){
      this.isShow3=show
    },
    onClose4(show){

      this.isShow4=show

    }
  },

  mounted(){
    this.options=[{'label':'测试环境','value':'test'},{'label':'开发环境','value':'develop'}]
  },

}

</script>
<style type="text/css" scoped>
.iconfont{
  font-size:18px;
}

.user{
  float: right;
  margin-right:10px;
}
.user-name{
  text-align: center;
}
.user-img{
  background-color:red;
  border-radius: 50%;
  width:40px;
  height: 40px;

}

</style>
