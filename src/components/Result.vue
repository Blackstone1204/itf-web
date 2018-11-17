<template>
<div>
<el-dialog title="运行结果" :visible.sync="isShow" :before-close="close"></el-dialog>
</div>
	

</template>

<script type="text/javascript">


export default{
	data:function(){
		return {
			isShow:false
		}
	},
	methods:{
		close(){


		}

	}

}
	

</script>