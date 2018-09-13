<template>
  <div id="variables">
    <el-dialog title="变量管理" :visible.sync='isShow' :before-close="close">
      <el-form size='mini'>
        <span>Environment</span>
        <el-form-item>
          <div @click="touchTag(index)" v-for="env,index in envs" style="display: inline;">
            <el-tag :key='env.name'  :type="currentIndex===index?'':'info'" closable @close.stop="remove(index)"  style='margin-left:5px;margin-bottom:5px;'>{{env.name}}
          </el-tag>
          </div>

          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" style='width:100px'>
          </el-input>
          <el-button @click="showInput">+New</el-button>
          <div class='keyV' v-for="item,index in currentParams" style="margin-bottom:5px;">
            <el-input style='width: 100px;'></el-input>
            <el-input style='width:100px;'></el-input>
            <span class="el-icon-circle-plus" style="margin-left: 10px;" @click="add1"></span>
            <span class="el-icon-remove-outline" style="margin-left: 10px;" @click="reduce1(index)"></span>
          </div>
        </el-form-item>
        <hr></hr>
        <!--   global  -->
        <span>Global</span>
        <el-form-item>
          <div class='keyV2' v-for="item,index in global" style="margin-bottom:5px;">
            <el-input style='width: 100px;'></el-input>
            <el-input style='width:100px;'></el-input>
            <span class="el-icon-circle-plus" style="margin-left: 10px;" @click="add"></span>
            <span class="el-icon-remove-outline" style="margin-left: 10px;" @click="reduce(index)"></span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      isShow: this.show,
      inputVisible: false,
      inputValue: '',
      envs: [{
          name: '测试环境',
          params: [{ 'key': '', 'value': '' }, { 'key': '', 'value': '' }]
        },
        {
          name: '开发环境',
          params: [{ 'key': '', 'value': '' }]
        },
      ],
      global: [{
          'key1': 'value1'

        },
        {
          'key2': 'value2'

        }
      ],
      currentParams: [],
      currentIndex:0
    }
  },
  props: {
    show: {
      type: Boolean
    }
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.envs.push({
          name: inputValue,
          params: [{'key':'','value':''}]
        });
      }
      this.inputVisible = false;
      this.inputValue = '';

      //切换到新加的tag

      this.touchTag(this.envs.length-1)

    
    },
    close() {
      this.isShow = false
      this.$emit("onClose", this.isShow)
    },
    submit() {

      this.close()

    },
    cancle() {
      this.close()

    },
    add() {
      this.global.push({})

    },
    add1(){
    	this.currentParams.push({'key':'','value':''})

    },
    addEnv() {
      this.envs.push({})

    },
    touchTag(index){

      console.log("点击"+this.envs[index].name)

      this.currentIndex=index
      this.currentParams=this.envs[index].params
    	// this.$nextTick(()=>{
    
    	// })

    },
    reduce(index) {
      this.global.splice(index, 1)

    },
    reduce1(index){
    	this.currentParams.splice(index,1)

    },
    remove(index) {

      if(this.envs.length===1)return
      this.envs.splice(index, 1)
      this.touchTag(0)
    },
  },
  mounted() {
    this.currentParams = this.envs[0].params

  },
  watch: {
    show: function() {
      this.isShow = this.show
    }
  }
}

</script>
