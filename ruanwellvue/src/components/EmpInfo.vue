<template>
  <div>
    <h1>员工信息</h1>
    <input type="button" value="按钮" @click="btnCLick">
  </div>
</template>
<script>
  export default{
    mounted:function () {
      window.bus.$on('id-selected', function (id) {
        console.log(">>>>>>>>>>>>>>>>>",id)
      })
    },
    methods:{
      btnCLick(){
        window.bus.$emit('id-selected', 1)
      }
    }
  }
</script>
