<template>
  <el-dialog title="新建用例" :visible.sync="isShow" :before-close="close">
    <el-form :model="xmodel" v-if="xmodel" size="mini">
      <el-form-item label-width="100px" :label="keymap[key]" v-for="key,index in getKeys(xmodel)" :key="key">

        <paramInfo v-if="key==='paramInfo'"></paramInfo>

        <el-radio-group v-else-if="key==='method'" v-model="radio" >
          <el-radio-button label="get"></el-radio-button>
          <el-radio-button label="post"></el-radio-button>
          <el-radio-button label="put"></el-radio-button>
          <el-radio-button label="delete"></el-radio-button>
        </el-radio-group>

        <el-input v-model="xmodel[key]" :key="index" clearable v-else></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button type="primary" @click="reset">重 置</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
import paramInfo from './ParamInfo'
export default {
  components:{paramInfo},
  data() {
    return {
      radio:'post',
      isShow: this.show,
      xmodel: {
        // 'id':'',

        'title': '',
        //'author':localStorage.getItem("userName"),
        'url': '',
        'method': '',
        'paramInfo': '',
        'a': '',
        'b': ''
        // 'author': '',
        // 'accontId':'',
        // 'parentId':'',
        // 'domain':'',
        // 'lev':''
      },
      keymap: {
        'title': "名称",
        'url': '接口地址',
        'method': '请求方式',
        'paramInfo': '参数信息',
        'a': '前置条件',
        'b': '后置条件'
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
      type: Object


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
      this.$emit("onClose", this.isShow)
      this.clearText()

    },
    cancle() {
      console.log("cancle" + JSON.stringify(this.xmodel));
      if (typeof(this.onCancle) === 'Function') this.onCancle()
      this.isShow = false
      this.$emit("onClose", this.isShow)
      this.clearText()

    },
    submit() {

      let self = this
      console.log("submit" + JSON.stringify(this.xmodel));
      if (typeof(this.onSubmit) === 'Function') this.onSubmit(this.xmodel)

      // 调target接口

      let target = {

        title: this.xmodel.title,
        url: this.xmodel.url,
        accountId: localStorage.getItem("accountId"),
        parentId: this.ext.id,
        domain: this.xmodel.domain,
        lev: this.xmodel.lev,
        isDir:'0',
        method:this.radio

      }


      let next = function(res) {

        //调paramInfo接口
        let paramInfo={
          'targetId':res.data.data,
          'key':'',
          'value':''
        }
        self.$post("/api/paramInfo/add",[paramInfo],function(){})

        //调用directive接口
        let directiveBefore={
          'targetId':res.data.data,
          'type':'0',
          'info':self.a
        }
        let directiveAfter={
          'targetId':res.data.data,
          'type':'1',
          'info':self.b
        }

        let directives=[]
        directives.push(directiveBefore)
        directives.push(directiveAfter)
        self.$post("/api/directive/add",directives,function(){})

       //会有坑
        self.$store.commit("updateTreeData")

        self.$message({
          'message': '新增用例成功',
          'type': 'success'
        })

        console.log("新增node " + JSON.stringify(newChild))


      }

      this.$post("/api/target/add", target, next)


      this.isShow = false
      this.$emit("onClose", this.isShow)
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

    xmodel: function() {
      console.log(JSON.stringify(this.xmodel))
    },
    ext: function() {
      console.log("新增节点" + JSON.stringify(this.ext))

    }
  },

  created() {
    //console.log("11" + JSON.stringify(this.ext))
  }



}

</script>
