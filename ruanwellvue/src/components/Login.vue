<template>
  <div style="width: 100%;display: flex;justify-content: center;margin-top: 150px">
    <el-card class="box-card" style="width: 500px;">
      <div slot="header">
        <span>登录</span>
      </div>
      <div>
        <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login('ruleForm')" style="width: 300px">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    methods: {
      login(formName){
//        this.$refs[formName].validate(function (result) {
//          if(result) {
//
//          }else{
//
//          }
//        })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postRequest("/login", this.user).then(resp=> {
              if (resp && resp.data.status == 'success') {
                //登录成功，登录成功之后获取菜单
                console.log(resp.data)
                window.localStorage.setItem("user", JSON.stringify(resp.data.msg));
                this.$router.replace("/home")
              }
            })
          } else {
            console.log('验证失败');
            return false;
          }
        });
      }
    },
    data()
    {
      /*为什么使用return
       https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E5%87%BD%E6%95%B0*/
      return {
        user: {
          username: 'admin',
          password: '123'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    }
  }
</script>

<style>

</style>
