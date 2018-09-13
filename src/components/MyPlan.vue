<template>
  <div>
    <el-table :data="plan" height="250">
     <el-table-column
        prop="step"
        label="运行顺序"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180"
        >
      </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <span
          size="mini"
          @click="up(scope.$index)" class="iconfont icon-up-square"></span>
        <span
          size="mini"
          @click="down(scope.$index)" class="iconfont icon-down-square"></span>

        <span
          size="mini"
          @click="down(scope.$index)" class="iconfont icon-delete"></span>

        <span
          size="mini"
          @click="down(scope.$index)" class="iconfont icon-edit-square"></span>
      </template>
    </el-table-column>
    </el-table>


  </div>
</template>
<script type="text/javascript">
export default {

  data() {
    return {

      plan: []
    }
  },

  methods: {
  	up(index){
  		if(index<1)return
  		let tmp=this.plan[index-1]
  	    let s1=tmp.step
  	    let s2=this.plan[index].step

  	    //

  	    this.plan[index-1].step=s2
  	    this.plan[index].step=s1

  	    //

  	    this.plan.splice(index-1,1,this.plan[index])
  	    this.plan.splice(index,1,tmp)

  	    //



  	    console.log(this.plan)



  	},
  	down(index){
  		if(index===this.plan.size)return
  		let tmp=this.plan[index+1]
  	  	let s1=tmp.step
  	    let s2=this.plan[index].step
  	    //
  	    this.plan[index+1].step=s2
  	    this.plan[index].step=s1
  	    //

  	    this.plan.splice(index+1,1,this.plan[index])
  	    this.plan.splice(index,1,tmp)

  	    console.log(this.plan)

  	},
    //sort up
    getSortUpByStepCase() {
      let org = [
      { "name": 'case_1', 'step': '1' },
      { "name": 'case_2', 'step': '2' },
      { "name": 'case_3', 'step': '3' },
      { "name": 'case_4', 'step': '4' },
      { "name": 'case_5', 'step': '5' },
      { "name": 'case_6', 'step': '6' },
      { "name": 'case_7', 'step': '7' },
      { "name": 'case_8', 'step': '8' },
      ]
      return org.sort(this.compare)

    },
    compare(obj1, obj2) {
      var val1 = obj1.step
      var val2 = obj2.step
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }

    }
  },

  mounted(){
  	this.plan=this.getSortUpByStepCase()
  }


}

</script>
