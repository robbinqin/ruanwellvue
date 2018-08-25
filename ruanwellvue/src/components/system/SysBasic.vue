<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top: 10px">
      <el-tab-pane label="部门管理" name="depmana"><depmana></depmana></el-tab-pane>
      <el-tab-pane label="职位管理" name="position"><positionmana></positionmana></el-tab-pane>
      <el-tab-pane label="职称管理" name="joblevel">职称管理</el-tab-pane>
      <el-tab-pane label="奖惩规则" name="ec">奖惩规则</el-tab-pane>
      <el-tab-pane label="权限组" name="permiss"><permissmana></permissmana></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import PositionMana from '@/components/system/basic/PositionMana'
  import DepMana from '@/components/system/basic/DepMana'
  import PermissMana from '@/components/system/basic/PermissMana'
  export default {
    data() {
      return {
        activeName: 'permiss'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
      'positionmana': PositionMana,
      'permissmana': PermissMana,
      'depmana': DepMana,
    }
  };
</script>
