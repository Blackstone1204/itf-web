<template>
  <div id="authManager">
    <el-dialog title="角色管理" :visible.sync='isShow' :before-close='close'>
      <el-button @click="add">+New</el-button>
      <el-table :data="roles" height="250">
        <el-table-column prop="id" label="ID" width="180">
        </el-table-column>
        <el-table-column prop="name" label="角色名称" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span size="mini" @click="view(scope.$index)" class="el-icon-view"></span>
            <span size="mini" @click="del(scope.$index)" class="el-icon-delete"></span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ?new  -->
    <el-dialog title="新建角色" :visible.sync='isShow2' :before-close='closeRole'>
      <el-form>
        <div id='role' v-model='role'>
          <el-form-item label="ID" label-width='100px'>
            <el-input v-model='role.id'></el-input>
          </el-form-item>
          <el-form-item label="角色名称" label-width='100px'>
            <el-input v-model='role.name'></el-input>
          </el-form-item>
        </div>

        <div id="auth" style="">
          <div class='option' v-for='item in mauth' :key='item.toString()'>
            <el-switch v-show="black.indexOf(key)==-1" @change="change(key)" v-for="key in Object.keys(item)" v-model="mauth[key]" :inactive-text="key" inactive-color='#409EFF' active-color='#C0CCDA' style='width:30%;' :key="key"></el-switch>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleRole">取 消</el-button>
        <el-button type="primary" @click="submitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      black:['roleId','canAddOther'],
      roles: [],
      role: {},
      mauth: [],
      isShow: this.show,
      isShow2: false

    }
  },
  props: {
    show: {
      type: Boolean
    }

  },
  methods: {
  	t(list){

  		//console.log(list)
  		let auth=[]
  		for(var item in list){

  		   // console.log(item)
  			let keys=Object.keys(list[item])

  		    console.log("keys=>"+JSON.stringify(keys))
  			let newObj={}
  			for(var key in keys){
  				if(item[keys[key]]==='1')newObj[keys[key]]=true
  			    else newObj[keys[key]]=false

  			}

  		//console.log(JSON.stringify(newObj))
  		auth.push(newObj)

  		}

  		return auth


  	},
  	change(attr){
  		console.log("toggle "+attr)
  		

  	},
    close() {
      this.isShow = false
      this.$emit("onClose", this.isShow)
    },
    cancle() {
      this.close()
    },
    submit() {
      this.close()
    },
    add() {
      this.isShow2 = true
      //this.isShow=false

    },
    closeRole() {
      this.isShow2 = false
    },
    cancleRole() {
      this.closeRole()
      this.isShow = true
    },
    submitRole() {
      let self=this
      this.closeRole()
      this.isShow = true
      let next=function(res){
        if(res.data.code===1)
          self.$message({
            type:'success',
            message:'添加角色'+self.role.name+"成功"
          })

      }
      let entity={
        name:role.name,
        // canReadSelf:this.mauth.canReadSelf==true?

      }
     // this.$post("/api/role/add",entity,next)
    },
    getBoolean(v){
    	if(v==='1')return true
    	else return false

    },
    view(index){
    	this.isShow2=true

    },
    del(index){

    	this.$confirm("你确认要删除这条记录么","提示").then(()=>{
    		this.$message({'type':'success','message':'删除成功'})
    	}).catch(()=>{
    		this.$message({'type':'info','message':'取消删除'})
    	})

    }
  },
  mounted() {
    this.roles = [{ 'id': '1', 'name': '测试' }, { 'id': '2', 'name': '开发' }]
    this.role = { 'id': '', 'name': '' }
    let auth = [{ 'roleId': '1', 'canReadSelf': '0', 'canReadOther': '1', 'canDelSelf': '0', 'canDelOther': '1', 'canEditSelf': '0', 'canEditOther': '0', 'canAddSelf': '1', 'canAddOther':'1' }]

    this.mauth=this.t(auth)

    console.log(JSON.stringify(this.mauth))

  },
  watch: {
    show: function() {
      this.isShow = this.show
    },
    mauth:function(){
    	console.log(this.mauth)

    }
  }
}

</script>
