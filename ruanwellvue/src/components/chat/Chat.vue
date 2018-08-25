<template>
  <div>
    <el-tabs v-model="activeName" style="margin-top: 10px">
      <el-tab-pane label="系统通知" name="systemnf">系统通知</el-tab-pane>
      <el-tab-pane label="在线聊天" name="onlinechat"><onlinechat></onlinechat></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import OnLineChat from '@/components/chat/OnLineChat'

  export default {
    name: "Chat",
    data() {
      return {
        activeName: 'onlinechat'
      }
    },
    components:{
      'onlinechat':OnLineChat
    }
  }
</script>

<style scoped>

</style>
