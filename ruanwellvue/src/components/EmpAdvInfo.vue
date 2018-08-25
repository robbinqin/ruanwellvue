<template>
  <div>
    <h1>员工高级信息</h1>
  </div>
</template>
<script>
  export default{
    mounted:function () {
      window.bus.$on('id-selected', function (id) {
        console.log(">>>>>>>>>>>>>>>>>",id)
      })
    }
  }
</script>
