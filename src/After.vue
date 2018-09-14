<template>
  <div id="directiveAfter">
    <div v-for="item,index in directiveInfo">
      <el-input v-model="item.info" style="width:210px;margin-top:10px;"></el-input><span class="el-icon-circle-plus" style="margin-left: 10px;" @click="add"></span><span class="el-icon-remove-outline" style="margin-left:10px;" @click="reduce(index)"></span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {

  data: function() {
    return {
      directiveInfo: [{}]
    }
  },

  methods: {
    add() {
      this.directiveInfo.push({'info':'','type':'1'})
    },
    reduce(index) {
      this.directiveInfo.splice(index, 1)
    }
  }
}

</script>
