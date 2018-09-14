<template>
  <div id="mainView">
    <el-container>
      <el-header>
        <info></info>
      </el-header>
      <el-container>
        <el-aside width="250px" style="float: left">
          <el-input placeholder="搜索用例" v-model="filterText" size='mini'>
          </el-input>
          <el-tree node-key="id" @node-expand="handleNodeExpand" ref="tree" :data="$store.state.treeInfo.treedata" :props="props" :expand-on-click-node="false" :filter-node-method="filterNode" :default-expanded-keys="$store.state.treeInfo.expandkeys" @node-collapse="handleNodeCollapse">
            <span class="custom-tree-node " slot-scope="{ node, data }" @mouseover="mouseover(node,data)">
            
            <span :class="{
            'iconfont icon-folder-fill':data.method==''||data.method==null,
            // 'folder-class':data.isDir=='1',
            'get-class':data.method=='get',
            'post-class':data.method=='post',
            'put-class':data.method=='put',
            'delete-class':data.method=='delete'
            }" >{{node.label}}</span>
            <span class="tool">
          <span class="iconfont icon-folder-add"
            type="text"
            size="mini"
            @click="() => appendFolder(node,data)">
          </span>
            <span class="iconfont icon-file-text" type="text" size="mini" @click="() => append(node,data)">
          </span>
            <span class="iconfont icon-edit-square" v-show="data.parentId!=-1" type="text" size="mini" @click="() => update(data)">
          </span>
            <!--           <el-button
           v-show="data.parentId!=-1"
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button> -->
            <span class="iconfont icon-delete" v-show="data.parentId!=-1" type="text" size="mini" @click="() => remove(node, data)">
            
          </span>
            <span class="iconfont icon-int" type="text" size="mini" @click="() => box(node, data)">
          </span>
            </span>
            </span>
          </el-tree>
        </el-aside>
        <el-main :style="{height:h}" style="padding: 0;margin-top:5px;">
          <myCard></myCard>
        </el-main>
      </el-container>
    </el-container>
    <addCaseDialog @onClose="onClose" :show="isShow" :ext="ext1"></addCaseDialog>
    <updateCaseDialog @onClose_1="onClose_1" :show="isShow_1" :ext="ext1"></updateCaseDialog>
    <delCaseDialog @onClose_2="onClose_2" :show="isShow_2" :ext1="ext1" :ext2="ext2" message="你确认要删除该用例么?"></delCaseDialog>
  </div>
</template>
<script type="text/javascript">
import info from './baseInfo'
import addCaseDialog from './AddCaseDialog'
import updateCaseDialog from './UpdateCaseDialog'
import delCaseDialog from './DelCaseDialog'
import myCard from './MyCard'

export default {

  components: { info, addCaseDialog, updateCaseDialog, delCaseDialog, myCard },
  watch: {
    filterText: function(val) {
      this.$refs.tree.filter(val);
    }

  },
  data: function() {
    return {
      h: '200px',

      filterText: "",

      props: {
        children: "child",
        label: "title"
      },
      mdata: [],
      isShow: false,
      isShow_1: false,
      isShow_2: false,
      ext1: {},
      ext2: {}

    }
  },
  methods: {

    /***
     *****
     **/
    handleNodeExpand(data, node, component) {

      this.$store.commit("addTreeExpandKeys", data.id)



    },
    handleNodeCollapse(data, node, component) {

      this.$store.commit("removeTreeExpandKeys", data.id)



    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },

    appendFolder(node, data) {

      self=this

      console.log("开始新建目录=>" + JSON.stringify(data))

      this.$prompt("名称", '新建目录', {
          inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,20}$/,
          inputErrorMessage: '名称不正确'
        })
        .then(({ value }) => {

          let target = {

            title: value,
            accountId: localStorage.getItem("accountId"),
            parentId: data.id,
            isDir: '1',

          }

          this.$post("/api/target/add", target,function(){

            self.$message({
              'message': '新增目录'+value,
              'type': 'success'
            })

            self.$store.commit("updateTreeData")
          })
       

        })
        .catch((value) => {

          this.$message({
            type: 'error',
            message: '新建目录失败=>' + value
          })

        })

    },

    append(node, data) {
      console.log(node)
      // console.log(data)
      // console.log("append")

      this.isShow = true
      this.ext1 = data


    },
    update(data) {
      this.isShow_1 = true
      this.ext1 = data


    },
    remove(node, data) {

      console.log("准备删除 "+JSON.stringify(data))

      this.isShow_2 = true
      this.ext1 = data
      this.ext2 = node




    },
    query(data) {


    },
    box(node, data) {

    },
    mouseover(node, data) {
      console.log("mouseover")
      // document.querySelector("tool").style.display = ""
    },
    /***
     ****
     ***/
    onClose(isClose) {
      this.isShow = isClose
    },
    onClose_1(isClose) {
      // console.log("her")
      this.isShow_1 = isClose

    },
    onClose_2(isClose) {
      this.isShow_2 = isClose

    }


  },
  mounted: function() {

    console.log("mainView.vue page mounted")

    this.$store.commit("updateTreeData")
    //停止特效

    this.$nextTick(() => {

      document.querySelector("canvas").style['display'] = 'none'
      // document.querySelector("#app").style['background-color']='#EDEDED'

    })


  },
  created: function() {

    // self.$store.commit("updateTreeData")

    console.log("mainView.vue page create")

    this.h = window.innerHeight - 100 + "px"


  }

}

</script>
<style type="text/css" scoped>
.get-class {
  color: #66CD00;
}

.post-class {
  color: #79CDCD;
}

.delete-class {
  color: #EE4000;
}

.put-class {
  color: #EE82EE;
}

.folder-class {
  color: #EEB422;
}

.tool {
  margin-left: 10px;
  color: #909399;
  float: right;
  /*  display: none;*/
}

.icon-folder-fill:before {
  color: #EEB422;
}

</style>
