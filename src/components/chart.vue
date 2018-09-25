<template>

  <el-dialog title="使用分析" :visible.sync="isShow" :before-close="close">
    <div class="echarts" id="echarts-dom"></div>
  
  </el-dialog>

</template>

<script>
    import echarts from 'echarts'

    export default {
        name: 'echarts',
        props:{
            show:Boolean
        },
        data() {
            return {
                isShow:false
            }
        },
        methods:{
            close(){

            }
        },
        mounted() {

            setTimeout(function(){
            let $echartsDOM = document.getElementById('echarts-dom')
            let myEcharts = echarts.init($echartsDOM)
            let option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
            myEcharts.setOption(option)


        },2000)


        },
        watch:{
            show:function(){
                this.isShow=this.show
            }
        }
    }
</script>

<style scoped>
    .echarts {
        width: 300px;
        height:300px;
    }
</style>