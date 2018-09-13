<template>
  <div id="loginForm">

    <el-form label-width="80px" size="mini" :model="user" :rule="rules" ref="ruleForm" status-icon>
      <el-form-item style='text-align: center;'><h1 style="color:#409eff;font-family:Helvetica Neue">itf</h1></el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="user.account" placeHolder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.number="user.password" placeHolder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="onLogin('ruleForm')">登录</el-button>
        <el-button type="primary">注册</el-button>
        <el-button>找回密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/javascript">
// import {save} from '../store'

console.log("hhhhhhhhhhhhhhhhhhhhhhh")

export default {

  data: function() {
    return {
      user: {
      	account:"admin",
      	password:"admin"

      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    onLogin: function(formName) {
      //*********************

      let self = this

      console.log("[try login]" +JSON.stringify(self.user))

      let url="/account/login"
      let data={
           "account": this.user.account,
           "password": this.user.password
      }
      let then=function(res){
        // console.log("cc"+res.name)

        if(res.status===200&res.data.code===1){

          const userId=res.data.data
          const userName=self.user.account
          const userInfo={'userId':userId,'userName':userName}
        

          self.$store.commit("login",userInfo)


    

         
        }



      }

      this.$post(url,data,then)




    }
  },
  mounted:function(){
   console.log("login.vue page mounted")
   document.querySelector("canvas").style['display']=''


   // this.$nextTick(()=>{


   // })

   const formWidth=300
   const formHeight=200
   const leftW=(window.innerWidth-formWidth)/2
   const leftH=(window.innerHeight-formHeight)/2  
   document.getElementById("loginForm").style.position="fixed"
   document.getElementById("loginForm").style.width=formWidth+'px'
   document.getElementById("loginForm").style['left']=leftW+'px'
   document.getElementById("loginForm").style['top']=leftH-20+'px'
  }

}

///*****************************************************


</script>
<style type="text/css" scoped="">
/*#loginForm {
  width: 350px;
}*/

</style>
