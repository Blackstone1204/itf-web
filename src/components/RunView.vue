<template>
  <div>
    <!--     <result ref="result" @close="closeResult"></result> -->
    <el-dialog id="runview" title="运行设置" :visible.sync="isShow" :before-close="close">
      <div class="startTime">
      </div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="run-set" name="1">
          <el-select size='mini' style='' placeholder='选择环境' v-model="value">
            <el-option v-for="item in planSet.environment" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input-number v-model="planSet.counter" @change="handleChange" :min="1" :max="10" label="描述文字" size='mini'></el-input-number>
          <el-input v-model='planSet.delay' clearable size="mini" style='width:100px;' placeholder='延时时间'></el-input>
          <el-date-picker v-model="time" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
          </el-date-picker>
        </el-collapse-item>

        <el-collapse-item title="run-vew" name="2">

          <el-table :data="result" height="250">

            <el-table-column prop="name" label="名称" width="90">
            </el-table-column>

            <el-table-column prop="version" label="版本" width="90">
            </el-table-column>

            <el-table-column prop="url" label="url" width="180">
            </el-table-column>

            <el-table-column prop="rcode" label="返回码" width="90">
            </el-table-column>

            <el-table-column prop="spendTime" label="响应(ms)" width="90">
            </el-table-column>


            <el-table-column prop="flag" label="结果" width="90">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <span size="mini" @click="query(scope.$index)" class="iconfont icon-filesearch"></span>
              </template>
            </el-table-column>
          </el-table>

        </el-collapse-item>
      </el-collapse>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!--
-->
  </div>
</template>
<script type="text/javascript">
import result from './Result'
export default {
  props: {
    show: Boolean

  },
  components: {
    result

  },
  data: function() {
    return {
      activeName: '2',
      planSet: {
        environment: '',
        counter: '',
        delay: '',
        ext: ''

      },
      result: [{
        name: '支付接口',
        version: 'v1.0',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },
      {
        name: '支付接口',
        version: 'v1.1',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },
      {
        name: '支付接口',
        version: 'v1.2',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },
      {
        name: '支付接口',
        version: 'v1.3',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },
      {
        name: '支付接口',
        version: 'v1.4',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },
      {
        name: '支付接口',
        version: 'v1.5',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },
      {
        name: '支付接口',
        version: 'v1.6',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },
      {
        name: '支付接口',
        version: 'v1.7',
        url: '/wwww/payali?www=1',
        spendTime: '100',
        rcode: '200',
        flag: 'pass'

      },


      ],

      isShow: false,
      value: '',
      time: ''

    }
  },
  methods: {
    handleChange() {

    },

    close() {
      this.$emit("close")
    },
    cancle() {
      this.isShow = false
      this.close()


    },
    submit() {

      console.log("submit")
      this.isShow = false
      this.close()


    },
    closeResult() {

    },
    query(index){


    }

  },
  mounted: function() {

    this.planSet.environment = [{ 'label': '测试环境', 'value': 'test' }, { 'label': '开发环境', 'value': 'develop' }]


  },
  watch: {
    show: function() {
      this.isShow = this.show
    }
  }
}

</script>
<style type="text/css" scoped>


</style>
