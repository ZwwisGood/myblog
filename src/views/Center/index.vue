<template>
  <div class="center">
    <div class="left">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item-group>
          <template slot="title">博客管理</template>
          <el-menu-item index="1-1" @click="addBlog">添加博客</el-menu-item>
          <el-menu-item index="1-2" @click="deleteBlog">删除博客</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="留言管理">
          <el-menu-item index="1-3">删除留言</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {

  methods: {
    addBlog() {
      this.$router.push('/center/addBlog')
    },
    deleteBlog(){
      this.$router.push('/center/deleteBlog')
    }
  },
}
</script>

<style lang="less" scoped>
.center {
  display: flex;
  .left {
    margin-top: -10px;
    width: 300px;
    height: 650px;
    .el-menu {
      height: 100%;
    }
  }
}
</style>