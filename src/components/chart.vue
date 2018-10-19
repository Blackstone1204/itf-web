<template>
  <!--     <div> -->
  <el-dialog title="性能分析" :visible.sync="isShow" :before-close="close">
    <div class="echarts" id="e"></div>
  </el-dialog>
  <!-- </div> -->
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'echarts',
  props: {
    show: Boolean
  },
  data() {
    return {
      isShow: false,
      xdata: [],
      ydata: [],
      adata: []
    }
  },
  methods: {
    close() {
      this.isShow = false
      this.$emit("close")

    },
    draw() {

      this.$nextTick(function() {

        let e = document.getElementById("e")

        console.log("dom=>" + e);

        if (null === e) return;

        // this.loadData('r',"2")
        // 
        var self = this

        // setInterval(function() {

        //   self.loadData(self.getCurrentTimeStr(), Math.floor(Math.random() * 10))
        // }, 1000)
        // 
        this.loadData()


      })



    },
    getCurrentTimeStr() {
      var now = new Date();
      var yy = now.getFullYear(); //年
      var mm = now.getMonth() + 1; //月
      var dd = now.getDate(); //日
      var hh = now.getHours(); //时
      var ii = now.getMinutes(); //分
      var ss = now.getSeconds(); //秒
      var clock = yy + "-";
      if (mm < 10) clock += "0";
      clock += mm + "-";
      if (dd < 10) clock += "0";
      clock += dd + " ";
      if (hh < 10) clock += "0";
      clock += hh + ":";
      if (ii < 10) clock += '0';
      clock += ii + ":";
      if (ss < 10) clock += '0';
      clock += ss;

      return clock;

    },

    loadData() {

      let e = document.getElementById("e")

      console.log("dom=>" + e);

      if (null === e) return;

      // this.xdata.push(x)
      // this.ydata.push(y)
      this.xdata=['2017-12-02 21:00:04','2017-12-12 24:00:04','2013-12-12 24:00:04']
      this.ydata=['5','20','42']

      let myEcharts = echarts.init(e)
      let option = {
        title: {
          text: ''
        },
        tooltip: {},
        dataZoom: [{
          type: 'inside'
        }, {
          type: 'slider'
        }],
        legend: {
          type: 'scroll',
          data: ['total', '登录接口', '购物接口', '支付接口', '查询订单', '取消订单']
        },
        xAxis: {
          data: this.xdata
        },
        yAxis: {},
        series: [{
            name: 'total',
            type: 'line',
            data: this.ydata
          },
          {
            name: '登录接口',
            type: 'line',
            data: this.ydata

          },
          {
            name: '购物接口',
            type: 'line',
            data: this.ydata

          },
          {
            name: '支付接口',
            type: 'line',
            data: []
          },
          {
            name: '查询订单',
            type: 'line',
            data: []
          },
          {
            name: '取消订单',
            type: 'line',
            data: []
          }

        ]
      }

      //
      myEcharts.setOption(option)
    }


  },
  watch: {
    show: function() {
      this.isShow = this.show
      // this.draw()
    },
    isShow: function() {
      console.log("isShow=>" + this.isShow)
      if (this.isShow == true) this.draw();
    }
  }
}

</script>
<style scoped>
.echarts {
  width: 600px;
  height: 300px;
}

</style>
