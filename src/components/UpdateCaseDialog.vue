<template>
  <el-dialog title="编辑用例" :visible.sync="isShow" :before-close="close">
    <el-form :model="xmodel" v-if="xmodel" size='mini'>
      <el-form-item label-width="100px" :label="keymap[key]" v-for="key,index in getKeys(xmodel)" :key="key">
        <el-input v-model="xmodel[key]" clearable></el-input>
      </el-form-item>
      <el-form-item label="请求方式" label-width="100px">
        <method ref="method" :value="method" @radioChanged="radioChanged"></method>
      </el-form-item>
      <el-form-item label="参数信息" label-width="100px">
        <paramInfo></paramInfo>
      </el-form-item>
      <el-form-item label="前置信息" label-width="100px">
        <before></before>
      </el-form-item>
      <el-form-item label="后置信息" label-width="100px">
        <after></after>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button type="primary" @click="test">测 试</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
import paramInfo from './ParamInfo'
import before from './Before'
import after from './After'
import method from './MethodInfo'
export default {
  components: { after, before, paramInfo, method },
  data() {
    return {

      isShow: this.show,
      xmodel: {
        // "id":this.ext.id,
        "title": this.ext.title,
        "accountId": this.ext.accountId,
        "url": this.ext.url
      },
      keymap: {
        // 'id':'id',
        'title': '名称',
        'method': '请求方式',
        'url': '接口地址',
        // 'paramInfo':'参数信息',
        'accountId': '作者id'
      },
      method:'post'


    }
  },

  props: {
    //
    show: {
      type: Boolean

    },


    ext: {


    },

  },

  methods: {
    radioChanged(radio){
      this.method=radio
      console.log("radioChanged=>"+this.method)

    },
    getKeys(obj) {
      return Object.keys(obj)

    },
    getAttrName(attr) {
      return attr

    },
    close() {
      console.log("close" + JSON.stringify(this.xmodel));
 
      this.isShow = false
      // this.ext ={}
      this.$emit("onClose_1", this.isShow)
      this.reset()


    },
    cancle() {
      console.log("cancle" + JSON.stringify(this.xmodel));

      this.isShow = false
      // this.ext ={}
      this.$emit("onClose_1", this.isShow)
      this.reset()

    },
    submit() {

      let self = this
      console.log("submit" + JSON.stringify(this.xmodel));

      let title = this.xmodel.title
      let target = {
        id: this.ext.id,
        title: this.xmodel.title,
        method:this.method,
        url: this.xmodel.url,
        accountId: this.ext.accountId,
        parentId: this.ext.parentId,
        domain: this.ext.domain,
        lev: this.ext.lev,
        isDir: this.ext.isDir,
        isDelete: '0'

      }


      let next = function(res) {


        //self.ext.title=title
        self.$store.commit("updateTreeData")
        self.$message({
          'message': '成功更新用例',
          'type': 'success'
        })
        console.log("更新node名称 " + title)

      }

      this.$post("/api/target/update", target, next)
      // this.$emit("onTreeDataChange", "")
      this.isShow = false
      // this.ext ={}
      this.$emit("onClose_1", this.isShow)
      this.reset()


    },
    test(){

    },
    reset() {

      console.log("reset " + JSON.stringify(this.xmodel))
 
      this.clearText()
      // this.ext ={}


    },
    clearText() {

      let self = this
      Object.keys(this.xmodel).forEach(function(key) {

        /// console.log(key)
        self.xmodel[key] = ""

      })

    }

  },

  created() {
     console.log("updateCaseDialo created")

  },
  mounted() {
    //console.log("this.ext->"+this.ext)

    console.log("updateCaseDialo mounted")
    this.method=this.ext.method

   // console.log("method=>"+this.method)


  }



}

</script>
