<template>
  <div id="paramInfo">
    <el-radio-group v-model="radio">
      <el-radio-button label="k/v"></el-radio-button>
      <el-radio-button label="raw"></el-radio-button>
      <el-radio-button label="file"></el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="radio2" size="mini" v-show="radio==='raw'" style="margin-left:20px;">
      <el-radio-button label="json"></el-radio-button>
      <el-radio-button label="xml"></el-radio-button>
      <el-radio-button label="text"></el-radio-button>
      <el-radio-button label="html"></el-radio-button>
    </el-radio-group>
    <!--     <el-radio-group  v-model="radio3" size="mini" v-show="radio==='k/v'" style="margin-left:20px;">
      <el-radio-button label="www-form-urlencode"></el-radio-button>
      <el-radio-button label="form/data"></el-radio-button>

    </el-radio-group> -->
    <el-input v-show="radio==='raw'" v-model="textarea" :rows='5' type="textarea" style="margin-top: 10px;" placeHolder="请输入文本内容"></el-input>

    <div id="k-v" style="margin-top: 10px;" v-show="radio=='k/v'" v-for="item,index in kv">
      <el-input placeHolder="key" style="width:100px;" v-model="item.k"></el-input>
      <el-input style="width:100px;margin-left: 10px;" placeHolder='value' v-model="item.v"></el-input>
      <span class="el-icon-circle-plus" style="margin-left: 10px;" @click="add"></span>
      <span class="el-icon-remove-outline" style="margin-left: 10px;" @click="reduce(index)"></span>
    </div>

    <div id="file" v-show="radio==='file'">
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple style="margin-top:10px;">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      radio: "k/v",
      radio2: "json",
      radio3: 'www-form-urlencode',
      textarea: '',
      kv: [{
        k: '',
        v: ''

      }]
    }
  },
  methods: {
    add() {
      this.kv.push(
        {
        k: '',
        v: ''

      });
    },
    reduce(index) {
      this.kv.splice(index, 1);
    },
    reset(){
      this.kv= [{
        'k': '',
        'v': ''

      }]
    }
  }
}

</script>
