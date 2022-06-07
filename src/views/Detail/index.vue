<template>
  <div class="body">
    <div class="detail">
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
          console.log(a, '改1', num)
          console.log(/\+\+/.test(a))
        } else if ((num & 1) == 1) {
          a = a.replace(/\+\+/, '</u>')
          num++
          console.log(a, '改2', num)
          console.log(/\+\+/.test(a))
        } else if ((num & 1) == 0) {
          a = a.replace(/\+\+/, '<u>')
          num++
          console.log(a, '改3', num)
          console.log(/\+\+/.test(a))
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
  },
}
</script>

<style lang="less" scoped>
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -10px;
  background-color: rgb(239, 239, 239);
  .detail {
    padding-top: 50px;
    background-color: #fff;
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
}
</style>