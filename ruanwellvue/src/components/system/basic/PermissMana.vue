<template>
  <div>
    <div>
      <el-input size="mini" style="width: 250px" placeholder="请输入角色英文名称..." v-model="roleEnName">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="mini" style="width: 200px" v-model="roleZhName" placeholder="请输入角色中文名称..."></el-input>
      <el-button size="mini" type="primary">添加角色</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-collapse v-model="activeName" accordion style="width: 500px" @change="collapseChange">
        <el-collapse-item :title="role.nameZh" :name="role.id" v-for="(role,index) in allRoles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <i style="float: right; padding: 3px 0;color: #ff020c;cursor: pointer;" class="el-icon-delete"></i>
            </div>
            <div>
              <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-checked-keys="selectCheckRoles"
                :key="index"
                highlight-current
                :props="defaultProps">
              </el-tree>
              <div style="float: right;margin-bottom: 20px">
                <el-button size="mini" type="default" @click="cancelUpdate">取消修改</el-button>
                <el-button size="mini" type="primary" @click="confirmUpdate(index,role.id)">确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: '-1',
        roleZhName: '',
        roleEnName: '',
        allRoles: [],
        treeData: [],
        selectCheckRoles: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      cancelUpdate(){
        this.activeName = '-1';
      },
      confirmUpdate(index,rid) {
        this.putRequest("/system/basic/role",{rid:rid,mids:this.$refs.tree[index].getCheckedKeys(true)}).then(resp=>{
          if (resp) {
            var data = resp.data;
            this.$message({type:data.status, message: data.msg})
            this.activeName = '-1';
          }
        })
      },
      collapseChange(rid) {
        if (rid == "") {
          return;
        }
        this.getRequest("/system/basic/menus/" + rid).then(resp => {
          if (resp) {
            this.treeData = resp.data.menus;
            this.selectCheckRoles = resp.data.ids;
          }
        });
      },
      loadAllRoles() {
        this.getRequest("/system/basic/roles").then(resp => {
          if (resp) {
            this.allRoles = resp.data;
          }
        })
      }
    },
    mounted: function () {
      this.loadAllRoles();
    }
  }
</script>

<style scoped>

</style>
