<template>
  <div class="add animate__animated animate__fadeIn">
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
    <mavon-editor
      @imgAdd="imgAdd"
      @save="save"
      class="markdown"
      v-model="content"
      :toolbars="toolbars"
      ref="md"
    />
    <el-button class="btn" type="primary" @click="addBlog">发表</el-button>
    <el-button class="btn" type="info" @click="save">暂存</el-button>
    <el-button class="btn" type="danger" @click="clear"
      >清空并删除已暂存内容</el-button
    >
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  data() {
    return {
      type: '', //文章类型
      htmlcontent: '', //html格式
      title: '', //博客题目
      description: '', //描述
      content: '', //输入的数据 markdown格式
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
        navigation: true, // 导航目录
      },
    }
  },
  methods: {
    //添加博客
    async addBlog() {
      if (this.title == '') {
        this.$msg.error('标题不能为空')
        return
      }
      if (this.type == '') {
        this.$msg.error('类型不能为空')
        return
      }
      if (this.content == '') {
        this.$msg.error('内容不能为空')
        return
      }
      // 转化为html格式
      this.htmlcontent = this.converter.makeHtml(this.content)
      // 生成一个随机图当作该博客封面
      //生成一个1-7的随机整数
      let random = Math.floor(Math.random() * 7) + 1
      try {
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
        this.$msg({
          message: '添加成功',
          type: 'success',
        })
        localStorage.removeItem('blog')
      } catch (err) {
        console.log(err)
        this.$msg.error('添加失败')
      }
    },
    //markdown的添加图片事件
    async imgAdd(pos, $file) {
      var formData = new FormData()
      formData.append('file', $file)
      console.log(formData.get('file'))
      try {
        let formData = new FormData()
        formData.append('file', $file)
        let res = await this.$api({
          url: '/api/upload',
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        //通过ref插入到文档中
        this.$refs.md.$img2Url(pos, res.url)
      } catch (e) {
        console.log(e)
      }
    },
    //暂存
    save() {
      if (this.title == '') {
        this.$msg.error('标题不能为空')
        return
      }
      if (this.type == '') {
        this.$msg.error('类型不能为空')
        return
      }
      if (this.content == '') {
        this.$msg.error('内容不能为空')
        return
      }
      let blog = {
        title: this.title,
        type: this.type,
        description: this.description,
        content: this.content,
      }
      localStorage.setItem('blog', JSON.stringify(blog))
      this.$msg({
        message: '暂存成功',
        type: 'success',
      })
    },
    clear() {
      MessageBox.confirm(
        '确定清空所有内容吗? 你已暂存的内容也会被清除',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      )
        .then(() => {
          this.title = ''
          this.type = ''
          this.description = ''
          this.content = ''
          localStorage.removeItem('blog')
          this.$msg({
            message: '已清空',
            type: 'success',
          })
        })
        .catch(() => {})
    },
  },
  created() {
    if (localStorage.getItem('blog')) {
      this.title = JSON.parse(localStorage.getItem('blog')).title
      this.type = JSON.parse(localStorage.getItem('blog')).type
      this.description = JSON.parse(localStorage.getItem('blog')).description
      this.content = JSON.parse(localStorage.getItem('blog')).content
    }
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
    margin-left: 10px;
    float: right;
  }
}
</style>