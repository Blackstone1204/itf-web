<template>
  <div id="app">
    <vue-particles color='#d1d1d1'  :linesWidth='3' :linesDistance="1" :lineOpacity='1' shapeType="star" 
     :particleSize='10'  :hoverEffect="false" :lineLinked="false" :particlesNumber="20"></vue-particles>

    <MainView v-if="$store.state.isLogin==='1'"></MainView>
    <LoginView v-else></LoginView>

  </div>
</template>
<script type="text/javascript">
import LoginView from "./components/LoginView"
import MainView from "./components/MainView"


export default {
  components: { LoginView, MainView},
  data: function() {
    return {
   
    }
  },
  created:function(){


    console.log("app.vue page create")

    const status=localStorage.getItem("isLogin")
    console.log("localstorage->isLogin->"+status)

    if(status==='1'){

      this.$store.state.isLogin="1"
      this.$store.state.userName=localStorage.getItem("userName")
      // this.$store.state.treeInfo.treedata=JSON.parse(localStorage.getItem("treeData"))
      this.$store.state.accessToken=localStorage.getItem("accessToken")

    }else{

      this.$store.state.isLogin="0"
      this.$store.state.userName="未登录"
      // this.$store.state.treeInfo.treedata=[]
      this.$store.state.accessToken=[]


    }
   
  },

  methods:{

  },
  mounted(){

    console.log("app.vue page mounted")
        




  }

}

 

</script>
<style type="text/css">
  #app{

     
  }
</style>
