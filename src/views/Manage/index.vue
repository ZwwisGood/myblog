<template>
  <div>
    <div class="manage">
      <h1>博客管理</h1>
      <div>请输入管理员密码</div>
      <input v-model="password" type="password" @keyup.enter="check"/>
      <el-button class="btn" type="primary" @click="check">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
    }
  },
  methods: {
    check() {
      if (this.password == '') {
        this.$msg({
          message: '密码不能为空',
          type: 'warning',
        })
      } else {
        if (this.password === '123') {
          this.$router.push('/center')
        } else {
          this.$msg.error('密码错误')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.manage {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
  width: 300px;
  height: 500px;
  box-shadow: 0 0 10px #ccc;
  h1 {
    font-size: 30px;
  }
  div {
    margin-top: 60px;
    text-align: center;
    font-size: 16px;
  }
  input {
    margin-top: 30px;
    padding: 0 6px;
    width: 100px;
    height: 30px;
    border: 2px solid #000;
    font-size: 16px;
    outline: none;
  }
  .btn {
    margin-top: 60px;
  }
}
</style>