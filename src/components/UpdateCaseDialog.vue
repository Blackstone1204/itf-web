<template>
  <el-dialog title="编辑用例" :visible.sync="isShow" :before-close="close">
    <el-form :model="xmodel" v-if="xmodel">
      <el-form-item label-width="100px" :label="keymap[key]" v-for="key,index in getKeys(xmodel)" :key="key">
        <el-input v-model="xmodel[key]" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button type="primary" @click="reset" >重 置</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      isShow: this.show,
      // xmodel: {
      //   'id':'',
      //   'url': '',
      //   'title': '',
      //   'accontId':'',
      //   'parentId':'',
      //   'domain':'',
      //   'lev':''
      // }


      xmodel:[],
      keymap:{
        'id':'id',
        'title':'名称',
        'method':'请求方式',
        'url':'接口地址',
        'paramInfo':'参数信息',
        'accountId':'作者id'
      }
     

    }
  },

  props: {

    //

    //
    show: {
      type: Boolean

    },


    ext: {


    },

    //
    onClose: {
      type: Function
    },
    onSubmit: {
      type: Function
    },
    onReset: {
      type: Function

    },
    onCancle: {
      type: Function
    }



  },

  methods: {
    getKeys(obj) {
      return Object.keys(obj)

    },
    getAttrName(attr) {
      return attr

    },
    close() {
      console.log("close" + JSON.stringify(this.xmodel));
      if (typeof(this.onClose) === 'Function') this.onClose(this.xmodel)
      this.isShow = false
      this.ext=[]
      this.$emit("onClose_1", this.isShow)
      this.clearText()


    },
    cancle() {
      console.log("cancle" + JSON.stringify(this.xmodel));
      if (typeof(this.onCancle) === 'Function') this.onCancle()
      this.isShow = false
      this.ext=[]
      this.$emit("onClose_1", this.isShow)
      this.clearText()

    },
    submit() {

      let self=this
      console.log("submit" + JSON.stringify(this.xmodel));
      if (typeof(this.onSubmit) === 'Function') this.onSubmit(this.xmodel)
      let title=this.xmodel.title
      let target = {
        id:this.ext.id,
        title: this.xmodel.title,
        url: this.xmodel.url,
        accountId: this.ext.accountId,
        parentId: this.ext.parentId,
        domain: this.ext.domain,
        lev: this.ext.lev,
        isDir:this.ext.isDir,
        isDelete:'0'

      }


      let next = function(res) {

 
         //self.ext.title=title
         self.$store.commit("updateTreeData")
         self.$message({
          'message':'成功更新用例',
          'type':'success'
         })
         console.log("更新node名称 "+title)

      }

      this.$post("/api/target/update", target, next)
      // this.$emit("onTreeDataChange", "")
      this.isShow = false
      this.ext=[]
      this.$emit("onClose_1", this.isShow)
      this.clearText()


    },
    reset() {

      console.log("reset " + JSON.stringify(this.xmodel))

      if (typeof(this.onReset) === 'Function') this.onReset()
      // console.log(this.xmodel)
      this.clearText()





    },
    clearText() {

      let self = this
      Object.keys(this.xmodel).forEach(function(key) {

        /// console.log(key)
        self.xmodel[key] = ""

      })

    }

  },
  watch: {
    show: function() {
      this.isShow = this.show
    },

    ext: function() {

      this.xmodel={
        "id":this.ext.id,
        "title":this.ext.title,
        "accountId":this.ext.accountId,
        "url":this.ext.url,
        "paramInfo":""
      }

      console.log("编辑节点" + this.ext.title)

    }
  },

  created() {
    //console.log("11" + JSON.stringify(this.ext))
  },
  mounted(){
    //console.log("this.ext->"+this.ext)
  }



}

</script>
