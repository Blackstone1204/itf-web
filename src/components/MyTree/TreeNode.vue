<template>
  <div>
    <div class='nodepack' style="">
      <div class="node" @mouseover="handleMouseOver"  @mouseout="handleMouseOut" style="">

        <div class="titlepack"  style="display:inline;font-size:11px;">
          <span @click="toggleChildren" class="expand" :class="hasChildren?'icon iconfont icon-unfold':'icon iconfont icon-enter'">
      
        </span><span class="label" @click="show(ext)" style="overflow:hidden;white-space:nowrap;">{{ext.label}}</span>
        </div>
        <div class="op" v-if="showOperate" style="display:inline;float: right;">
          <span class="icon iconfont icon-addition_fill" @click="add(ext)"></span>
          <span class="icon iconfont icon-delete_fill" @click="del()"></span>
          <span class="icon iconfont icon-editor" @click="edit(ext)"></span>
        </div>
      </div>
      <TreeNode v-show="showChildren" v-for="node2 in ext.children" :ext="node2" :counter="counter+1" :showlevel=showlevel></TreeNode>
      <!--    <TreeNode></TreeNode> -->
    </div>
  </div>
</template>
<script type="text/javascript">
import "../../assets/iconfont/iconfont.css"
import bus from '../bus.js'
export default {


  name: "TreeNode",
  data: function() {
    return {

      "showOperate": false,
      "showChildren": this.counter < this.showlevel,
      "hasChildren": this.ext.children.length > 0
    }
  },

  props: {
    //层级计数器
    counter: {
      type: Number,
      default: 1

    },

    ext: {
      type: Object,
      default: function() {
        return {};
      }
    },
    showlevel: {
      type: String,
      required: true
    },
    css:{
      type:String,
      default:""
    }
  },
  methods: {
    add:function(node){
      if(1===node.type){
        bus.$emit("addDir","");
      }else
      bus.$emit("addCase","");

    },
    edit:function(node){
      if(1===node.type)bus.$emit("updateDir","")
        else bus.$emit("updateCase","")

    },
    show:function(node){
      if(1===node.type)bus.$emit("showDir","")
        else bus.$emit("showCase","")

    },
    handleMouseOver: function() {
      this.showOperate = true

    },
    handleMouseOut: function() {
      this.showOperate = false

    },
    toggleChildren: function() {
      this.showChildren = !this.showChildren;

    }
  }



}

</script>
<style type="text/css">
.nodepack {
  margin-left: 12px;
}

.node:hover{
  padding: 0px;
  background-color:#CEE6F5;
  cursor: pointer;
}



</style>
