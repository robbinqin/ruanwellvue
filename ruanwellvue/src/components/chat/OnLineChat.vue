<template>
  <div>
    <div>
      <div style="width: 500px;height: 500px">
        <div v-for="(chat,index) in chats" style="display: flex"  :class="{sendMsgStyle:chat.to}">
          <!--发出去的消息-->
          {{chat.msg}}
        </div>
      </div>
    </div>
    <div>
      <el-input v-model="msg" placeholder="请输入聊天内容" style="width: 400px;"></el-input>
      <el-button type="primary" round @click="send">发送</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OnLineChat",
    data() {
      return {
        msg: '',
        stomp: '',
        chats: []
      }
    },
    methods: {
      send() {
        var s = this.msg;
        this.chats.push(JSON.parse('{"msg":"' + this.msg + '","to":"' + this.msg.substring(this.msg.lastIndexOf(";") + 1, this.msg.length) + '"}'));
        this.stomp.send("/ws/chat", {}, s);
      }
    },
    mounted() {
      //和服务端建立socket连接
      this.stomp = Stomp.over(new SockJS("/ws/ep"));
      //发起连接，第二个参数表示连接成功的回调，第三个参数表示连接失败的回调
      this.stomp.connect({}, frame => {
        //连接成功后，订阅消息，注意，要添加一个/user前缀
        this.stomp.subscribe("/user/queue/chat", message => {
          this.chats.push(JSON.parse(message.body))
        });
      }, failedMsg => {

      });
    }
  }
</script>

<style scoped>
  .sendMsgStyle {
    justify-content: flex-end;
  }
</style>
