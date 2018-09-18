<template>
  <el-dialog title="新建用例" :visible.sync="isShow" :before-close="close">
    <el-form :model="xmodel" v-if="xmodel" size="mini">
      <el-form-item label-width="100px" :label="keymap[key]" v-for="key,index in getKeys(xmodel)" :key="key" >

        <el-input v-model="xmodel[key]" :key="index" clearable></el-input>
      </el-form-item>

      <el-form-item label="请求方式" label-width="100px">
         <method  ref="method" :key="new Date().getTime()"></method>
      </el-form-item>

      <el-form-item label="参数信息" label-width="100px">
       <paramInfo  ref="params"></paramInfo>
      </el-form-item>

      <el-form-item label="前置信息" label-width="100px">
         <directiveBefore ref="before"></directiveBefore>
      </el-form-item>

      <el-form-item label="后置信息" label-width="100px">
         <directiveAfter ref="after"></directiveAfter>
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
import directiveBefore from './Before'
import directiveAfter from './After'
import method from './MethodInfo'
export default {
  components:{paramInfo,directiveBefore,directiveAfter,method},
  data() {
    return {
      isShow: this.show,
      xmodel: {

        'title': '',
        'url': ''
      },
      keymap: {
        'title': "名称",
        'url': '接口地址'
    
      }

    }
  },

  props: {
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
      // console.log(self.$refs)
      // console.log("submit" + JSON.stringify(this.xmodel));
      if (typeof(this.onSubmit) === 'Function') this.onSubmit(this.xmodel)

      // 调target接口

      const method=self.$refs.method.radio

      // console.log("mehod=>"+JSON.stringify(self))

      let target = {

        title: this.xmodel.title,
        url: this.xmodel.url,
        method:method,
        accountId: localStorage.getItem("accountId"),
        parentId: this.ext.id,
        isDir:'0'
      

      }

      let next = function(res){

        console.log(self.$refs)

        //调paramInfo接口 默认无效数据 需要 服务端处理 
        let list1=self.$refs.params.kv
        console.log("填写的参数信息=>"+JSON.stringify(list1))
        let paramInfo=[]

        list1.forEach(function(item){
          paramInfo.push({
            targetId:res.data.data,
            k:item.k,
            v:item.v
          })

        })


        

        self.$post("/api/paramInfo/add",paramInfo)

        //调用directive接口  无效数据需要服务端处理
        //console.log("获取前置信息=>"+JSON.stringify(self.$refs.before.directiveInfo))
        const list2=self.$refs.after.directiveInfo.concat(self.$refs.before.directiveInfo)
        console.log("填写的指令信息=>"+JSON.stringify(list2))

        let directives=[]

        list2.forEach(function(item){
          directives.push({
            'targetId':res.data.data,
            'type':item.type,
            'info':item.info,
            'sequence':item.sequence+''
          })
        })
 


        self.$post("/api/directive/add",directives)

       //会有坑
        self.$store.commit("updateTreeData")

        self.$message({
          'message': '新增用例成功',
          'type': 'success'
        })


        //重置参数和指令信息
        self.$refs.after.reset()
        self.$refs.before.reset()
        self.$refs.params.reset()

        // console.log("新增node " + JSON.stringify(newChild))


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
  },
  mounted(){
    console.log("addcase page mounted!")
    //console.log(this)
  }



}

</script>
