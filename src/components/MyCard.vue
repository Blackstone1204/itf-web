<template>
  <div>
    <!-- <el-scrollbar class="el-scrollbar"> -->
    <el-card class="box-card" v-for="plan in plans " shadow="hover" :key="plan.name">
      <div slot="header" class="clearfix">
        <span class="plan_name">计划_{{plan.name}}</span>
        <span>
          <span class="pass">pass:4</span><span class="error">error:5</span><span class="total">total:9</span><span class="skip">skip:0</span>
        </span>
      </div>
      <div>
        <el-progress type='circle' :percentage='35' color='#67c23a'></el-progress>
      </div>
      <div class="bottom">
        <span @click="del" class="plan-icon iconfont icon-delete" style="float: right;margin-right: 5px;"></span>
        <span @click='update' class="plan-icon iconfont icon-edit-square" style="float: right;margin-right: 5px;"></span>
        <span @click='view' class="plan-icon iconfont icon-linechart" style="float: right;margin-right: 5px;"></span>
        <span @click='run' class="plan-icon iconfont icon-play-circle-fill" style="float: right;margin-right: 5px;"></span>
      </div>
    </el-card>
    <!-- </el-scrollbar> -->
    <el-dialog title="计划编辑" :visible.sync="isShow" :before-close="close">
      <MyPlan ref="plan"></MyPlan>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

    <mychartDialog :show="isShow_1" @close="listenClose"></mychartDialog>
    <RunView :show="isShow_2" @close="listenClose2"></RunView>

   <!--    <div class="echarts" id="echarts-dom"></div> -->
  </div>


</template>
<script type="text/javascript">
import MyPlan from './MyPlan'
import mychartDialog from './chart'
import RunView from './RunView'
export default {
  components: { MyPlan,mychartDialog,RunView},
  data() {
    return {
      isShow: false,
      isShow_1:false,
      isShow_2:false,
      plans: []
    }

  },

  methods: {
    listenClose(){
      this.isShow_1=false;

    },
    listenClose2(){
      this.isShow_2=false

    },
    submit() {
      self = this

      let da = this.$refs.plan.$data.plan
      let next = function() {

        self.isShow = false

      }
      console.log(da)


      this.$post('/api/plan/update', da, next)

    },
    cancle() {
      this.isShow = false

    },
    update() {
      console.log(8888888)
      this.isShow = true

    },
    del() {

    },
    run() {

      console.log("打开runview")

      this.isShow_2=true;

    },
    view() {
      this.isShow_1=true;

    },
    close() {

      this.isShow = false

    }
  },
  mounted: function() {
    let self = this


    let next = function(res) {
      //alert(res.data.data)
      self.plans = res.data.data


    }
    this.$get("/api/plan/queryAll", {}, next)
  }


}

</script>
<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 200px;
  float: left;
  margin-left: 20px;
  margin-bottom: 20px;
}

.plan-icon:hover {
  color: #67C23A;

}

.pass {
  color: #67C23A;
}

.total {
  color: #409EFF;
  margin-left: 10px;
}

.error {
  color: #F56C6C;
  margin-left: 10px;
}
.skip{
  color:#909399;
  margin-left: 10px;
}

.plan_name {
  color: #606266;
  font-weight: bold;
  font-family: "Microsoft YaHei";
}

</style>
