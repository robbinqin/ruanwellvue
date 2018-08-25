<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      size="mini"
      border
      style="width: 70%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        label="生日"
        width="120">
        <template slot-scope="scope">{{ scope.row.birthday | formatDate }}</template>
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size=10
      @current-change="currentChange"
      :current-page=1
      :page-sizes="[10, 20, 30, 40]"
      @size-change="sizeChange"
      layout="sizes,prev, pager, next"
      :total="totalEmps">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData3: [],
        multipleSelection: [],
        totalEmps: -1,
        pageSize: 10,
        currentPage: 1
      }
    },
    mounted: function () {
      this.loadEmps(this.currentPage,this.pageSize);
    },
    methods: {
      sizeChange(size) {
        this.loadEmps(this.currentPage,size);
        this.pageSize = size;
      },
      currentChange(currentPage){
        this.loadEmps(currentPage,this.pageSize);
        this.currentPage = currentPage;
      },
      loadEmps(currentPage,size){
        this.getRequest("/salary/sobcfg/emps?page="+currentPage+"&size="+size).then(resp=>{
          if (resp) {
            this.tableData3=resp.data.emps;
            this.totalEmps=resp.data.totalCount;
          }
        })
      }
    }
  }
</script>
