<template>
  <div id="TabPage">
    <div class='label' :class="{active:currentIndex===index}" v-for="(page,index) in pageInfo" @click="labelClick(index)">{{getLabelName(page)}}<span v-show="index>0" @click.stop="close(index)">&times</span></div>

    <scroll height="100%" width="100%">  
      <div class="page" v-show="currentIndex===index" v-for="(page,index) in pageInfo" v-html="getPageInfo(page)"></div></scroll>
  </div>
</template>
<script type="text/javascript">
import bus from '.././bus.js'
import scroll from '../scrollPanel/main'
export default {

  components:{scroll},

  data: function() {
    return {

      //
      currentIndex: 0,


      //label跟event对应关系
      map: {

        "0": "首页",
        "1": "显示目录",
        "2": "显示用例",
        "3": "新增用例",
        "4": "新增目录",
        "5": "更新用例",
        "6": "更新目录"
      },
      //处理不同事件
      //type=1 显示目录
      //type=2 显示用例
      //type=3 增加用例
      //type=4 增加目录
      //type==5 更新用例
      //type=6 更新目录
      pageInfo: [{
        "eventType": 0,
        "info": {
          "html": "welcome come here"
        }

      }]
    }
  },
  computed: {

  },
  methods: {
    close: function(index) {
      // let len=this.pageInfo.length


      if (index === this.currentIndex && index === this.pageInfo.length - 1) {

        //console.log("equal")
        this.pageInfo.splice(index, 1);
        this.currentIndex = index - 1;

      } else {
        this.pageInfo.splice(index, 1);
      }


    },

    labelClick: function(index) {

      //console.log(this.currentIndex)
      this.currentIndex = index;


      //console.log(this.currentIndex)

    },
    getLabelName: function(page) {
      return this.map[page.eventType];

    },
    getPageInfo: function(page) {
      if (page.eventType === 0) {
        return page.info.html;


      } else if (page.eventType === 1) {

        //let tmp=page.info.dirname+""+page.info.author+""+page.info.createTime+""+page.info.updateTime
        return "显示目录"

      } else if (page.eventType === 2) {
        //let tmp=page.info.casename+""+page.info.author+""+page.info.createTime+""+page.info.updateTime+""
        +page.info.url + "" + page.info.paramInfo

        return "显示用例"

      } else if (page.eventType === 3) {

        return "<input type='text' value='添加用例 '></input>"

      } else if (page.eventType === 4) {

        return "增加目录"



      } else if (page.eventType === 5) {
        return "更新用例"
      } else {

        //let tmp=page.info.casename+""+page.info.author+""+page.info.createTime+""+page.info.updateTime+""
        //+page.info.url+""+page.info.paramInfo

        return "更新目录"
      }

    }
  },
  mounted: function() {

    //

    document.getElementById("TabPage").style["height"]=window.innerHeight-100+"px"

    let self = this
    bus.$on("addCase", function() {

      var eventItem = {
        "eventType": 3,
        "info": {

        }
      }

      self.pageInfo.push(eventItem);



    })

    bus.$on("addDir", function() {

      var eventItem = {
        "eventType": 4,
        "info": {

        }
      }

      self.pageInfo.push(eventItem);



    })

    bus.$on("showDir", function(obj) {

      var eventItem = {
        "eventType": 1,
        "info": obj
      }

      self.pageInfo.push(eventItem);

    })

    bus.$on("showCase", function(obj) {

      var eventItem = {
        "eventType": 2,
        "info": obj
      }

      self.pageInfo.push(eventItem)

    })

    bus.$on("updateCase", function(obj) {


      var eventItem = {
        "eventType": 5,
        "info": obj
      }

      self.pageInfo.push(eventItem)

    })
    bus.$on("updateDir", function(obj) {

      var eventItem = {
        "eventType": 6,
        "info": {

        }
      }

      self.pageInfo.push(eventItem);



    })

  }
}

</script>
<style type="text/css" scoped>

.active{
  border-color:#515151;

}
#TabPage{
	border: 2px solid  white;
	display: block;
	border-radius:5px;
  width: 50%;
  color:white;
  margin-left:10px;
  float: left;
  padding: 20px;
  background-color: #515151;

}



.page{

  height: 100%;
  width: 100%; 
  border: 1px solid white;




}
.label {

  display: inline;
  margin-left: 5px;
  margin-bottom: 10px;
  padding: 5px;
  font-size:12px; 
  border:1px solid white;



}
.label:hover{
    border: 1px solid #B0B0B0;
}

</style>
