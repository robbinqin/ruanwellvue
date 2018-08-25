<template>
  <el-container style="height: 100%;position: absolute;width: 100%;">
    <el-header>
      <div style="display: flex;justify-content: space-between">
        <div style="font-family: 华文行楷;font-size: 30px">
          百威美食尚餐饮管理系统
        </div>
        <div style="display: flex;align-items: center">
          <i class="el-icon-bell" @click="goChat" style="cursor: pointer;margin-right: 15px"></i>
          <el-dropdown style="cursor: pointer;" @command="handleCommand">
  <span class="el-dropdown-link" style="display: flex;align-items: center;height: 60px;">
    {{user.name}}<img
    :src="user.userface" alt=""
    style="width: 40px;height: 40px;border-radius: 40px;margin-left: 10px">
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="usercenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="true" :router="true">
          <el-submenu :index="index+''" v-for="(item,index) in this.routes" v-if="!item.hidden"
                      :key="index">
            <template slot="title">
              <i :class="item.iconCls" style="color: #20a0ff"></i>
              <span>{{item.name}}</span>
            </template>
            <template v-for="(child,i) in item.children">
              <el-menu-item :index="child.path" :key="child.id">{{child.name}}</el-menu-item>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.name!='Home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="font-family: 华文行楷;font-size: 30px;text-align: center" v-else>欢迎来到百威美食尚V8餐饮管理系统！</div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        user: JSON.parse(window.localStorage.getItem("user"))
      }
    },
    methods: {
      goChat(){
        this.$router.push('/chat');
      },
      handleCommand(command) {
        if (command == 'logout') {
          this.$confirm('此操作将注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getRequest("/logout");
            window.localStorage.removeItem("user");
            this.$store.commit('initMenu', []);
            this.$router.replace("/");
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消注销'
            });
          });
        }
      }
    },
    computed: {
      routes(){
        return this.$store.state.routes
      }
    }
  }
</script>
<style>
  .el-header {
    background-color: #20a0ff;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #ffffff;
  }
</style>
