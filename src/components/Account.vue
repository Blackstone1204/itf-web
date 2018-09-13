<template>
  <div id="account">
    <el-dialog title="账号管理" :visible.sync="isShow" :before-close="close">
      <el-form size='mini'>
        <el-form-item label='账号' label-width='100px'>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label='昵称' label-width='100px'>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label='密码' label-width='100px'>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label='角色' label-width='100px'>
          <el-select size='mini' style='' placeholder='选择角色' v-model="optionValue">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
      isShow: this.show,
      options:[],
      optionValue:''
    }
  },
  methods: {
    close() {
      this.isShow = false
      this.$emit("onClose", this.isShow)

    },
    cancle() {
      this.close()
    },
    submit() {
      this.close()
    }
  },
  mounted(){

  	this.options=[{'label':'测试','value':'test'}]

  },

  watch: {
    show: function() {
      this.isShow = this.show
    }
  }


}

</script>
