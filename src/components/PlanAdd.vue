<template>
  <div id="addPlan">
    <el-dialog title="新建计划" :visible.sync="isShow" :before-close="close">
      <el-form>
        <el-form-item label="计划名称" label-width="100px">
        	<el-input v-model='value' clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>

      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      isShow: false,
      value:''
    }
  },
  methods: {
    close() {
      this.isShow = false
      this.$emit("onClose", this.isShow)

    },
    submit(){
      let self=this
      this.isShow=false;
      let next=function(res){
         self.$emit("onClose", self.isShow)
         self.$message({
          type:'success',
          message:'新建计划成功'
         })

      }
      let  plan={
        id:'',
        name:this.value,
        isDelete:'0'
      }

      this.$post("/api/plan/add",plan,next)

    },
    cancle(){
      this.isShow=false
       this.$emit("onClose", this.isShow)


    }
  },
  watch: {
    show: function() {
      this.isShow = this.show
    }
  }
}

</script>
