<template>
  <div>
    <div style="text-align: center">
      <el-input
        placeholder="请输入用户名..."
        prefix-icon="el-icon-search"
        size="mini"
        style="width: 350px"
        v-model="keywords">
      </el-input>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="loadHrs">搜索</el-button>
      <el-button type="primary" size="mini" icon="el-icon-plus">添加</el-button>
    </div>
    <div style="margin-top: 10px;display: flex;flex-wrap: wrap;justify-content: space-around">
      <el-card class="box-card" v-for="(hr,index) in hrs" style="width: 320px;margin: 10px" :key="index">
        <div slot="header" class="clearfix">
          <span>{{hr.name}}</span>
          <i style="float: right; padding: 3px 0;cursor: pointer;color: #ff020c;" class="el-icon-delete"
             size="mini"></i>
        </div>
        <div>
          <div align="center">
            <img :src="hr.userface" style="width: 55px;height: 55px;border-radius: 55px" alt="">
          </div>
          <div>
            <div style="color: #20a0ff;font-size: 14px;margin-top: 5px">用户名:{{hr.name}}</div>
            <div style="color: #20a0ff;font-size: 14px;margin-top: 5px">手机号码:{{hr.phone}}</div>
            <div style="color: #20a0ff;font-size: 14px;margin-top: 5px">电话号码:{{hr.telephone}}</div>
            <div style="color: #20a0ff;font-size: 14px;margin-top: 5px">地址:{{hr.address}}</div>
            <div style="color: #20a0ff;font-size: 14px;margin-top: 5px">用户状态:
              <el-switch
                v-model="hr.enabled"
                @change="enabledChange(hr.enabled,hr.id)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用">
              </el-switch>
            </div>
            <div style="color: #20a0ff;font-size: 14px;margin-top: 5px">用户角色:
              <el-tag type="success" size="mini" v-for="role in hr.roles" :key="role.id" style="margin-left: 5px">
                {{role.nameZh}}
              </el-tag>
              <el-popover
                ref="updateEnabledPop"
                @show="showRoles(hr.roles)"
                @hide="hideRoles(hr.id,hr.roles)"
                placement="right"
                title="角色列表"
                width="200">
                <el-select v-model="selectRoles" size="mini" multiple placeholder="请选择" :key="hr.id">
                  <el-option
                    v-for="role in allRoles"
                    :key="role.id"
                    :label="role.nameZh"
                    :value="role.name">
                  </el-option>
                </el-select>
                <i v-popover:updateEnabledPop slot="reference" class="el-icon-more" style="cursor: pointer"></i>
              </el-popover>
            </div>
            <div style="color: #20a0ff;font-size: 14px;margin-top: 5px">备注:{{hr.remark}}</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keywords: '',
        hrs: [],
        selectRoles: [],
        allRoles: []
      }
    },
    methods: {
      hideRoles(hrid, hrRoles) {
        if (hrRoles.length == this.selectRoles.length) {
          var result = parseInt(0);
          this.selectRoles.forEach(selRole => {
            hrRoles.forEach(hrRole => {
              if (hrRole.name == selRole) {
                result++;
              }
            })
          })
          if (result == hrRoles.length) {
            this.selectRoles = [];
            return;
          }
        }
        var rolesId = [];
        this.allRoles.forEach(allRole => {
          this.selectRoles.forEach(selRole => {
            if (selRole == allRole.name) {
              rolesId.push(allRole.id);
            }
          })
        })
        this.putRequest("/system/hr/roles", {hrid: hrid, roles: rolesId}).then(resp => {
          if (resp) {
            var data = resp.data;
            this.$message({type: data.status, message: data.msg});
            this.loadHrs();
          }
        })
        this.selectRoles = [];
      },
      showRoles(hrRoles) {
        hrRoles.forEach(role => {
          this.selectRoles.push(role.name);
        })
      },
      enabledChange(val, hrid) {
        this.putRequest("/system/hr/", {enabled: val, hrid: hrid}).then(resp => {
          if (resp) {
            var data = resp.data;
            this.$message({type: data.status, message: data.msg})
            this.loadHrs();
          }
        })
      },
      loadHrs() {
        this.getRequest("/system/hr/?keywords=" + this.keywords).then(resp => {
          if (resp) {
            this.hrs = resp.data;
          }
        })
      },
      loadRoles() {
        this.getRequest("/system/hr/roles").then(resp => {
          if (resp) {
            this.allRoles = resp.data;
          }
        })
      }
    },
    mounted: function () {
      this.loadHrs();
      this.loadRoles();
    }
  }
</script>
