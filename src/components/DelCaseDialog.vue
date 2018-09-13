<template>
  <el-dialog title="删除用例" :visible.sync="isShow" :before-close="close">
    <span>{{message}}</span>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
 
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      isShow: this.show,


    }
  },

  props: {

    //

    //
    show: {
      type: Boolean

    },
    message:{
      type:String
    },

    ext1: {
      type:Object


    },
    ext2:{
      type:Object

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


    close() {
      console.log("close")
      if (typeof(this.onClose) === 'Function') this.onClose()
      this.isShow = false
      this.$emit("onClose_2", this.isShow)


    },
    cancle() {
      console.log("cancle")
      if (typeof(this.onCancle) === 'Function') this.onCancle()
      this.isShow = false
      this.$emit("onClose_2", this.isShow)


    },
    submit() {

      let self=this
      let data=self.ext1
      let node=self.ext2
  
      console.log("submit->"+self.ext1.id);
      if (typeof(this.onSubmit) === 'Function') this.onSubmit()

        // let parent = node.parent
        // //console.log("parent->"+JSON.stringify(parent))
        // console.log(typeof(parent.data.children)+"|"+parent.data)
        // const children = parent.data.children || parent.data
        // console.log("children->"+JSON.stringify(children))
        // const index = children.findIndex(d => d.id === data.id)




      let next = function(res) {

        self.$store.commit("updateTreeData")

        self.$message({
          'message':'成功删除用例',
          'type':'success'
         })



        // console.log("index="+index)
        // children.splice(index, 1);

         console.log("删除node")
        

      }

      let target = {
        id:this.ext1.id,
        title: this.ext1.title,
        url: this.ext1.url,
        accountId: this.ext1.accountId,
        parentId: this.ext1.parentId,
        domain: this.ext1.domain,
        lev: this.ext1.lev,
        isDir:this.ext1.isDir,
        isDelete:'1'

      }

      this.$post("/api/target/update",target, next)
      // this.$emit("onTreeDataChange", "")
      this.isShow = false
      this.$emit("onClose_2", this.isShow)



    },
    reset() {

      console.log("reset " + JSON.stringify(this.xmodel))

      if (typeof(this.onReset) === 'Function') this.onReset()
      // console.log(this.xmodel)


    }

  },
  watch: {
    show: function() {
      this.isShow = this.show
    },
    ext: function() {
      console.log("操作节点" + JSON.stringify(this.ext))

    }
  },

  created() {
    //console.log("11" + JSON.stringify(this.ext))
  }



}

</script>
