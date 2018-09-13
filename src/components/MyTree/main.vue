<template>
  <div id="mytree" style="width: 200px">
    <div id="root" style="font-size:14px;text-align:center;">{{rootname}}<span style="cursor:pointer" class="icon iconfont icon-addition_fill"></span></div>
    <TreeNode :style="css" v-for="node in data" :ext="node" :showlevel.number=showlevel></TreeNode>
  </div>
</template>
<script type="text/javascript">
import TreeNode from "./TreeNode"
import "..//../assets/iconfont/iconfont.css"
export default {
  //name: "MyTree",
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    rootname: {
      type: String,
      default: "用例管理"
    },
    showlevel: {
      type: String,
      default: "1"
    },
    css: {
      type: String,
      default: ''
    }
  },
  mounted:function(){

    let h1=window.innerHeight-100+"px"

    document.getElementById("mytree").style.height=h1

  }

}

</script>
<style type="text/css">
#mytree{
float: left;
margin-left:150px;
border: 2px solid white;
border-radius: 5px;
display: table;
background-color:#515151;
color: white;


}


</style>
