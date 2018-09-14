<template>
  <div id="directiveBefore">
    <div v-for="item,index in directiveInfo">
      <el-input v-model="item.info" style="width:210px;margin-top:10px;"></el-input><span class="el-icon-circle-plus" style="margin-left: 10px;" @click="add(index)"></span><span class="el-icon-remove-outline" style="margin-left:10px;" @click="reduce(index)"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {

  data: function() {
    return {
      directiveInfo: [{
        'type':'0',
        'info':'',
        'sequence':"0"
      }]
    }
  },

  methods: {
    add(index) {
      this.directiveInfo.push(
        {
        'type':'0',
        'info':'',
        'sequence':index
      })
    },
    reduce(index) {
      this.directiveInfo.splice(index, 1)
    }
  }
}

</script>
