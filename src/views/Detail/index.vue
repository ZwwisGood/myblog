<template>
  <div class="body animate__animated animate__fadeIn">
    <div class="detail">
      <a @click="$router.back(-1)">返回</a>
      <h1 class="title">{{ title }}</h1>
      <div class="time">{{ time }}</div>
      <div
        class="markdown-body main"
        v-html="htmlcontent.replace(/\n/g, '<br>')"
      ></div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import $ from 'jquery'
export default {
  data() {
    return {
      type: ``, //博客类型
      title: ``, //博客标题
      description: ``, //博客描述
      content: ``, //markdown格式文本
      htmlcontent: ``, //html格式文本
      time: ``, //发表时间
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
  },
  async mounted() {
    let res = await this.$api({
      url: '/api/detail',
      method: 'get',
      params: {
        id: this.$route.query.id,
      },
    })
    this.type = res.data[0].type
    this.title = res.data[0].title
    this.description = res.data[0].description
    this.content = res.data[0].content
    this.htmlcontent = res.data[0].htmlcontent
    this.time = res.data[0].time
    this.handleHtmlContent()

    // 点击图片放大
    $('.main').on('click', 'img', function (e) {
      let width = e.target.natrualWidth
      let height = e.target.natrualHeight
      let src = $(this).attr('src')  // 获取点击图片的src属性值
      let img = `<img class="oimg" src="${src}" style="width:${width};height:${height};}"">`
      MessageBox.alert(img, {
        dangerouslyUseHTMLString: true,
        customClass: 'messageBox', //添加默认类名
        showConfirmButton: false, //不显示确认按钮
        lockScroll: true, //锁定body的滚动条
        center: true,
      })
    })
  },
}
</script>

<style lang="less" scoped>
.body {
  overflow-x:hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -10px;
  background-color: rgb(239, 239, 239);
}
.detail {
  position: relative;
  padding-top: 50px;
  background-color: #fff;
  a {
    position: absolute;
    top: 30px;
    right: 60px;
    font-size: 16px;
    cursor: pointer;
  }
}
.title {
  font-size: 30px;
  margin-bottom: 20px;
}
.time {
  color: #999;
}
.title,
.time {
  text-align: center;
}
.main {
  padding: 50px 50px;
  width: 800px;
  min-height: 600px;
}

::v-deep .el-message-box {
  max-width: 1300px !important;
}
</style>
<style lang="less">
.main > br {
  display: none;
}
.main > p img {
  position: relative;
  left: 50%;
  transform: translateX(-50%)
}
blockquote > br {
  display: none;
}
.messageBox {
  width: 90vw;
  height: 93vh;
  text-align: center;
  margin: auto 0;
  overflow: scroll;
  img {
    cursor: auto;
  }
}
</style>