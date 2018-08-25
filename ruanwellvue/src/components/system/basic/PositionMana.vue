<template>
  <div>
    <div>
      <el-input
        placeholder="添加职位"
        prefix-icon="el-icon-plus"
        @keydown.native.enter="addPosition"
        v-model="positionName" style="width: 300px;" size="mini">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="addPosition">添加</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table
        :data="positions"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
        size="mini"
        style="width: 800px">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="编号"
          prop="id"
          width="120">
        </el-table-column>
        <el-table-column
          label="职位名称"
          prop="name"
          width="180">
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="180">
          <template slot-scope="scope">
            {{scope.row.createDate | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 10px">
      <el-button type="danger" size="mini" :disabled="multipleSelection.length==0" @click="deleteMany">批量删除</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        positionName: '',
        positions: [],
        loading: false,
        multipleSelection: []
      }
    },
    methods: {
      deleteMany() {
        var ids = '';
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var row = this.multipleSelection[i];
          ids += row.id;
          if (i != this.multipleSelection.length - 1) {
            ids += ",";
          }
        }
        this.doDelete("此操作将删除[" + this.multipleSelection.length + "]条记录，是否继续?", ids);
      },
      addPosition() {
        this.postRequest("/system/basic/position", {name: this.positionName}).then(resp => {
          if (resp) {
            var data = resp.data;
            this.$message({
              message: data.msg,
              type: data.status
            });
            this.positionName = '';
            this.loadPositionData();
          }
        })
      },
      handleEdit(index, row) {
        this.$prompt('请输入新名称', '编辑', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          inputValue: row.name
        }).then(({value}) => {
          this.loading = true;
          this.putRequest("/system/basic/position", {id: row.id, name: value}).then(resp => {
            if (resp) {
              var data1 = resp.data;
              this.$message({
                type: data1.status,
                message: data1.msg
              });
              this.loadPositionData();
            }
            this.loading = false;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },
      handleDelete(index, row) {
        this.doDelete('此操作将永久删除[' + row.name + ']职位, 是否继续?', row.id);
      },
      doDelete(msg, ids) {
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          this.deleteRequest("/system/basic/position/" + ids).then(resp => {
            if (resp) {
              var data = resp.data;
              this.$message({
                message: data.msg,
                type: data.status
              });
              this.loadPositionData();
            }
            this.loading = false;
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      loadPositionData() {
        this.loading = true;
        this.getRequest("/system/basic/positions").then(resp => {
          if (resp) {
            this.positions = resp.data;
          }
          this.loading = false;
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    mounted: function () {
      this.loadPositionData();
    }
  }
</script>
