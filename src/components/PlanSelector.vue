<template>
  <el-dialog title="添加到计划" :visible.sync="isShow" :before-close="close">
    <el-form>
      <span v-if="options.length<1">还没有计划 新建一个</span>
      <el-form-item v-else label="选择计划" label-width="100px">
        <el-select v-model="value" placeholder="请选择">
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
</template>
<script type="text/javascript">
export default {
  props: {
    ext: {}

  },
  data() {
    return {
      isShow:false,
      options: [],
      value: ''

    }
  },
  methods: {
    close() {
      this.isShow = false

    },
    cancle() {
      this.isShow = false
    },
    submit() {
      this.isShow = false
      let self=this
      let next = function(res) {
        if (res.data.code === 1)
           self.$message({
            'message': '关联计划成功',
            'type': 'success'
          })

      }


      const data = {
      	planId:this.value,
      	targetId:this.ext.id
      }

      console.log(JSON.stringify(data))

      this.$post("/api/planDetail/add", data, next)
    }

  },
  mounted() {

    let self = this
    let next = function(res) {

      console.log(JSON.stringify(b))

      b=res.data.data

      b.forEach(function(item) {
        var id = item.id;
        var name = item.name;
        console.log("获取计划选项值=>id=" + id + " name=" + name)
        self.options.push({
          value: id,
          label: name
        })


      })

      console.log("计划=>"+JSON.stringify(self.options))



    }
    let a = []
    let b = this.$get("/api/plan/queryAll", {},next)




  }

}

</script>
