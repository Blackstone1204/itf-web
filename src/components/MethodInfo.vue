<template>
  <el-radio-group  v-model="radio">
    <el-radio-button label="get"></el-radio-button>
    <el-radio-button label="post"></el-radio-button>
    <el-radio-button label="put"></el-radio-button>
    <el-radio-button label="delete"></el-radio-button>
  </el-radio-group>
</template>
<script type="text/javascript">

export default{
  props:{
    value:String,
    default:''
  },
	data(){
		return{
			radio:'post'
		}
	},
  watch:{
    radio:function(){
      this.$emit("radioChanged",this.radio)
    }

  },
  mounted(){
    console.log("methodInfo mounted! value="+this.value)
    if(this.value===undefined)return;
    this.radio=this.value

  }

}


</script>
