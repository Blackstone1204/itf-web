<template>
  <div id="pager">
    <div  @click="transfromData(n)" v-for="n in getPageCnt" class='pager-block' :class="{'active':n===current}">{{n<10?'0'+n:n}}
    </div>
    <div class="pager-ctrl"> 跳到第
      <input type="text" placeholder="1" class="input" @change="currentdataChange">页 每页
      <input type="text" placeholder="1" class="input" v-model="mshowcount">条
    </div>
  </div>
</template>
<script type="text/javascript">
import bus from '../bus.js'
import { m } from '../../mock'
import axios from 'Axios'

export default {
  props: {
    url: {
      type: String,
      required: true
    },
    showcount: {
      type: Number,
      default: 2
    }
  },
  data: function() {
    return {

      murl: this.url, //数据源
      mdata: [], //缓存数据源数据
      outdata: [], //需要展示的数据
      current: 1,
      mshowcount: this.showcount


    }
  },
  methods: {
  	clearColor:function(){
  		for(var i=0;i<document.getElementsByClassName("pager-block").length;i++){
  			document.getElementsByClassName("pager-block")[i].style["background-color"]=""

      }

  	},
    currentdataChange: function(e) {

      //console.log(e)
      if (e.target.value > this.getPageCnt) {
        console.warn("[pager]超出页数限制")
        return
      }

      this.current = e.target.value

      console.warn(this.current)

      let from = this.mshowcount * (this.current - 1)
      let to = from + this.mshowcount

      this.outdata = this.mdata.slice(from, to)

      console.log(this.outdata)

      this.clearColor()



      document.getElementsByClassName("pager-block")[this.current-1].style["background-color"]="red"

      bus.$emit("pager_data", this.outdata)


    },
   
    transfromData: function(current) {

      this.clearColor()

      this.current = current
      let from = this.mshowcount * (this.current - 1)
      let to = from + this.mshowcount

      // console.log(from+"->"+to)
      // console.log(this.mdata)

      this.outdata = this.mdata.slice(from, to)
      console.log(this.outdata)

      bus.$emit("pager_data", this.outdata)



    }




  },

  computed: {

    getPageCnt: function() {
      let v = Math.ceil(this.mdata.length / this.mshowcount)
      //console.log("getPageCnt " + v)
      return v
    }

  },


  mounted: function() {
    //


    //初始化数据
    m()
    let self = this

    axios.get(self.murl).then(function(res) {
      self.mdata = res.data.data
    }).catch(function() {
      console.log("[Pager]init fail")
    })





  }
}

</script>
<style type="text/css" scoped>
.pager-block {

  font-size: 10px;
  padding: 5px;
  text-align: center;

  display: inline;
  border: 1px solid red;
  margin: 2px;

  cursor: pointer;
}

.pager-ctrl {
  display: inline;
  font-size:10px;
}

.input {
  width: 15px;
  height:15px;
  font-size:10px;
}

.active{
	background-color: red;
}

</style>
