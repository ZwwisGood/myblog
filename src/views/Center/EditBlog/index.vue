<template>
  <div class="edit animate__animated animate__fadeIn">
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
    <el-button class="btn" type="primary" @click="save">保存修改</el-button>
    <el-button class="btn" type="danger" @click="back">返回</el-button>
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
    //处理转换html格式文本（markdown格式中有些无法转换成html标签）
    handleHtmlContent() {
      //修正html里的++++改为下划线标签
      let num = 0
      let str = this.htmlcontent
      let a = str
      while (/\+\+/.test(a)) {
        if (num == 0) {
          a = a.replace(/\+\+/, '<u>')
          num++
        } else if ((num & 1) == 1) {
          a = a.replace(/\+\+/, '</u>')
          num++
        } else if ((num & 1) == 0) {
          a = a.replace(/\+\+/, '<u>')
          num++
        }
      }
      this.htmlcontent = a
    },
    //保存修改
    save() {
      if(this.title == ''){
        this.$msg.error('标题不能为空')
        return
      }
      if(this.type == ''){
        this.$msg.error('类型不能为空')
        return
      }
      if(this.content == ''){
        this.$msg.error('内容不能为空')
        return
      }
      MessageBox.confirm('确定保存修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          this.confirmSave()
        })
        .catch(() => {})
    },
    async confirmSave() {
      //获取路由参数的id
      const id = this.$route.query.id
      // 转化为html格式
      this.htmlcontent = this.converter.makeHtml(this.content)
      try {
        let res = await this.$api({
          url: '/api/updateBlog',
          method: 'post',
          data: {
            id,
            type: this.type,
            title: this.title,
            description: this.description,
            content: this.content,
            htmlcontent: this.htmlcontent,
          },
        })
        if (res.code == 0) {
          this.$msg({
            message: '修改成功',
            type: 'success',
          })
        } else {
          this.$msg.error({ message: '修改失败' })
        }
      } catch (err) {
        console.log(err)
        this.$msg.error('修改失败')
      }
    },
    //返回按钮
    back() {
      this.$router.go(-1)
    },
    //markdown的添加图片事件
    async imgAdd(pos, $file) {
      try {
        let fromData = new FormData()
        fromData.append('file', $file)
        let res = await this.$api({
          url: '/api/upload',
          method: 'post',
          data: fromData,
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
  },
  //进入页面后，获取博客内容
  async created() {
    //获取路由参数的id
    const id = this.$route.query.id
    try {
      let res = await this.$api({
        url: '/api/getBlogById',
        method: 'get',
        params: {
          id: id,
        },
      })
      if (res.code == 0) {
        this.type = res.data[0].type
        this.title = res.data[0].title
        this.description = res.data[0].description
        this.content = res.data[0].content
        this.htmlcontent = res.data[0].htmlcontent
        this.handleHtmlContent()
      } else {
        this.$msg.error(res.msg)
      }
    } catch (err) {
      console.log(err)
      this.$msg.error('出现了错误')
    }
  },
}
</script>

<style lang="less" scoped>
.el-input {
  margin: 10px 0;
}
.edit {
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