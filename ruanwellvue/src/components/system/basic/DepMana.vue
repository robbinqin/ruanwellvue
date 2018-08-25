<template>
  <div>
    <el-input
      placeholder="输入关键字进行搜索"
      style="width: 300px;margin-top: 10px"
      size="mini"
      prefix-icon="el-icon-search"
      v-model="filterText">
    </el-input>

    <el-tree
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :render-content="renderContent"
      ref="depTree">
    </el-tree>

    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal=false>
      <div>
        <div>上级部门
          <el-select v-model="pDepId" placeholder="请选择" size="mini" style="width: 250px;">
          <el-option
            v-for="dep in allDeps"
            :key="dep.id"
            :label="dep.name"
            :value="dep.id">
          </el-option>
        </el-select></div>
        <div style="margin-top: 10px">部门名称
          <el-input v-model="depName" placeholder="请输入部门名称..." size="mini" style="width: 250px"></el-input></div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="addDep" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.depTree.filter(val);
      }
    },
    mounted:function(){
      this.loadTreeData();
      this.loadAllDeps();
    },
    methods: {
      addDep(){
        this.postRequest("/system/basic/dep",{name:this.depName,parentId:this.pDepId}).then(resp=>{
          if (resp) {
            this.setDataToTree(this.treeData,this.pDepId,resp.data.msg);
            this.dialogVisible = false;
            this.depName = '';
          }
        })
      },
      deleteLocalDep(treeData, id) {
        for(var i=0;i<treeData.length;i++){
          var td=treeData[i];
          if(td.id==id){
            treeData.splice(i, 1);
            return;
          }else{
            this.deleteLocalDep(td.children,id)
          }
        }
      },
      setDataToTree(treeData,pid,respData){
        treeData.forEach(td=>{
          if (td.id == pid) {
            td.children = td.children.concat(respData);
            return;
          }else{
            this.setDataToTree(td.children, pid, respData);
          }
        })
      },
      loadAllDeps(){
        this.getRequest("/system/basic/deps").then(resp=>{
          if (resp) {
            this.allDeps = resp.data;
          }
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      loadTreeData(){
        this.getRequest("/system/basic/dep").then(resp=>{
          if (resp) {
            this.treeData = resp.data;
          }
        })
      },
      deleteDep(data,event){
        event.stopPropagation();
        if(data.children&&data.children.length>0){
          this.$message({type:"error",message:"该部门下尚有其他部门，删除失败!"})
          return;
        }
        this.$confirm('此操作将永久['+data.name+']部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest("/system/basic/dep?id="+data.id).then(resp=>{
            if(resp){
              this.$message({type:"success",message:"删除成功!"})
              this.deleteLocalDep(this.treeData,data.id);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      showAddDepView(data,event){
        this.pDepId = data.id;
        this.dialogVisible = true;
        event.stopPropagation();
      },
      renderContent(h, { node, data, store }) {
        return (
          <div style="display: flex;justify-content: space-between;width:400px">
          <span>{node.label}</span>
        <span>
        <el-button size="mini" style="padding:3px" type="primary" on-click={ () => this.showAddDepView(data,event) }>添加部门</el-button>
        <el-button size="mini" style="padding:3px" type="danger" on-click={ () => this.deleteDep(data,event)}>删除部门</el-button>
        </span>
        </div>);
      }
    },
    data() {
      return {
        filterText: '',
        depName: '',
        treeData: [],
        allDeps: [],
        pDepId:-1,
        dialogVisible:false,
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    }
  };
</script>

<style>

</style>
