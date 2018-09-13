<template>
  <div id="templateTable">
    <table id="datashow">
      <thead>
        <td @dblclick="toggleSort(field.name)" v-for="field in fields">{{field.labelName}}</td>
      </thead>
      <tbody>
        <tr v-for="obj in dataCopy" class="tr">
          <td v-for="field in fields" class="td">{{obj[field.name]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript">
import '../../assets/iconfont/iconfont.css'
import bus from '../bus.js'
export default {

  props: {
    //
    //[{"name":"A","age":12},{"name":"B","age":56}],
    mdata: {
      type: Array,
      requied: true
    },
    //[{"name":"name","labelName":"名称","isSort":true},{"name":"age","labelName":"年龄","isSort":false}]
    fields: {
      type: Array,
      requied: true
    }
  },
  data: function() {
    return {
      sortMap: {},
      dataCopy:this.mdata
    }

  },

  methods: {
    initSortMap:function(){

      if (Object.keys(this.sortMap).length === 0) {
        let self = this
        this.fields.map(function(item) {

          if (item.isSort) {
           // console.log(item.name)
            self.sortMap[item.name] = true
          }

        })
      }

    },

    toggleSort: function(attr) {
      //

      this.initSortMap()

      //
      if (undefined === this.sortMap[attr]) {
        console.warn("[MyTable]" + attr + " 不支持排序")
        return
      }

      this.dataCopy.sort(this.compare(attr, this.sortMap[attr]))
      this.sortMap[attr] = !this.sortMap[attr]

    },
    compare: function(prop, type) {

      if (type) {
        return function(obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        }
      } else {
        return function(obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (val1 < val2) {
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        }
      }

    }
  },
  mounted:function(){




    let self=this
    bus.$on("onSearch",
      function(v){

      //let self.dataCopy=self.mdata;

      if(undefined===v||v.length<1){
        self.dataCopy=self.mdata
      }else{

        let tmpData=[]

        for(var i=0;i<self.dataCopy.length;i++){

          let keys=Object.keys(self.dataCopy[i])
          for(var j=0;j<keys.length;j++){

            let value=self.dataCopy[i][keys[j]].toString()

            //console.log("value:"+value)

            if(value.indexOf(v)>-1){

              tmpData.push(self.dataCopy[i])
              continue

            }

          }
        }

        self.dataCopy=tmpData

      }


    })



  },
  watch:{
    mdata:function(){
      this.dataCopy=this.mdata
    }
  }



}

</script>
<style type="text/css" scoped>
#search {
  margin: 10px;
}

table {
  border: 2px solid #C6E2FF;
  padding: 0;
  border-radius: 5px;
}

tr {
  padding: 0px;
}

td {
  text-align: left;
  width: 100px;
  font-size: 10px;
}

thead td {
  cursor: pointer;
  font-size: 12px;
}

</style>
