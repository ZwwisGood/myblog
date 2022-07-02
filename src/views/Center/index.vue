<template>
  <div class="center animate__animated animate__fadeInLeft">
    <div class="left">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#fff"
      >
        <el-menu-item-group>
          <template slot="title">博客管理</template>
          <el-menu-item index="1-1" @click="addBlog" :class="{activeBtn: index == 0}">添加博客</el-menu-item>
          <el-menu-item index="1-2" @click="deleteBlog" :class="{activeBtn: index == 1}">编辑和删除博客</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="留言管理">
          <el-menu-item index="1-3" @click="deleteMsg" :class="{activeBtn: index == 2}">删除留言</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0
    }
  },
  watch: {
    $route: function (to, from) {
      if (to.path.includes('/addBlog')) {
        this.index = 0
      } else if (to.path.includes('/deleteBlog')) {
        this.index = 1
      } else if (to.path.includes('/deleteMsg')) {
        this.index = 2
      }
    }
  },
  methods: {
    addBlog() {
      this.$router.push('/center/addBlog')
    },
    deleteBlog(){
      this.$router.push('/center/deleteBlog')
    },
    deleteMsg(){
      this.$router.push('/center/deleteMsg')
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
::v-deep .activeBtn{
  color: rgb(255, 208, 75)!important
}
</style>