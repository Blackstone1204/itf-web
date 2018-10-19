<template>
  <div>
    <el-dialog id="runview" title="" 运行设置 :visible.sync="isShow" :before-close="close">
      <div id="leftview" style="float:left;border-radius:5px;border:2px solid gray">
        <el-row style="margin-top:10px;">
        	<el-button type="primary" icon="iconfont icon-setting" circle></el-button>
        </el-row>
        <el-row style="margin-top:10px;">
        	<el-button type="primary" icon="iconfont  icon-filesearch" circle></el-button>
        </el-row>
       
      </div>
      <div id="rightview" style="height:500px;"></div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    show: Boolean

  },
  data: function() {
    return {
      isShow: false,
      environment: '',
      count: '',
      delay: '',
      format: ''
    }
  },
  methods: {

    close() {
      this.$emit("close")
    }

  },
  mounted: function() {
    document.getElementById('rightview').style.height = window.innerHeight + 'px';

    // this.$nextTick(function(){
    // 	  	document.getElementById('rightview').style["height"]=window.innerHeight+'px';
    // document.getElementById('rightview').style["width"]=window.innerWidth+'px';
    // })


  },
  watch: {
    show: function() {
      this.isShow = this.show
    }
  }
}

</script>
<style type="text/css" scoped>


</style>
