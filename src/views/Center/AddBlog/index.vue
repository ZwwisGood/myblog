<template>
  <div class="add">
    <router-view></router-view>
    <div>
      <span>标题：</span>
      <el-input
        v-model="title"
        class="title"
        placeholder="请输入文章标题（必填）"
      ></el-input>
      &nbsp;&nbsp;
      <span>文章类型：</span>
      <el-input
        v-model="type"
        class="title"
        placeholder="请输入文章类型（必填）"
      ></el-input>
    </div>
    <div>
      <span>描述：</span>
      <el-input
        v-model="description"
        class="description"
        placeholder="请输入文章描述（选填）"
      ></el-input>
    </div>
    <mavon-editor class="markdown" v-model="content" :toolbars="toolbars" />
    <el-button class="btn" type="primary" @click="addBlog">发表</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: '',  //文章类型
      htmlcontent: '', //html格式
      title: '', //博客题目
      description: '', //描述
      content: ' ', //输入的数据 markdown格式
      toolbars: {
        bold: true, // 粗体
        header: true, // 标题
        underline: true, // 下划线
        quote: true, // 引用
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        subfield: true, // 是否需要分栏
        readmodel: true, // 沉浸式阅读
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
      },
    }
  },
  methods: {
    async addBlog() {
      // 转化为html格式
      this.htmlcontent = this.converter.makeHtml(this.content)
      // 生成一个随机图当作该博客封面
      //生成一个1-3的随机整数
      let random = Math.floor(Math.random() * 3) + 1
      let result = await this.$api({
        url: '/api/addblog',
        method: 'post',
        data: {
          type: this.type,
          title: this.title,
          description: this.description,
          content: this.content,
          htmlcontent: this.htmlcontent,
          img: `/images/card${random}.jpg`,
        },
      })
      console.log(result)
    },
  },
}
</script>

<style lang="less" scoped>
.el-input {
  margin: 10px 0;
}
.add {
  margin: 0 auto;
  ::v-deep .markdown {
    margin-top: 10px;
    width: 1000px;
    height: 450px;
  }
  span {
    font-size: 16px;
  }
  .title {
    width: 350px;
  }
  .description {
    width: 500px;
  }
  .btn {
    margin-top: 10px;
    float: right;
  }
}
</style>