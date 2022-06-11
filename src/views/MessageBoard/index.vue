<template>
  <div class="messageboard">
    <div class="main">
      <div class="top">
        <h1>留言板</h1>
        <p>欢迎留下你的留言</p>
      </div>
      <div class="list">
        <ul>
          <li v-for="message in messages" :key="message.id" class="message">
            <img class="avatar" src="/images/logo.jpg" alt="" />
            <span class="name">{{ message.name }}</span>
            <div class="content">{{ message.content }}</div>
            <div class="time">{{ message.time }}</div>
          </li>
        </ul>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
      <div class="writeMessage">
        <div class="t">请在下方写下你的留言吧!</div>
        <div class="avatar" @click="selectAvatar">
          <span>选择头像：</span>
          <img src="/images/logo.jpg" alt="" />
          <img src="/images/card1.jpg" alt="" />
          <img src="/images/card2.jpg" alt="" />
        </div>
        <div class="who">
          <span>留言人：</span>
          <input v-model.trim="name" type="text" />
        </div>
        <span>内&nbsp;&nbsp;&nbsp;容：</span>
        <textarea v-model="content" name="msgContent"></textarea>
        <div class="submit">
          <div @click="addMessage" class="button">发表</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [], //对应页数的留言
      page: 1, //当前页数
      total: 0, //总数量
      pageSize: 5, //每页显示的数据量
      name: localStorage.getItem('name') || '', //留言人
      content: '', //留言内容
      avatar: '', //头像
    }
  },
  methods: {
    //获取所有留言
    getMessages() {
      this.$api({
        url: '/api/getMessages',
        method: 'get',
        params: {
          page: this.page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.messages = res.data.results
        this.total = res.data.total
      })
    },
    //切换页数
    async handleCurrentChange(newPage) {
      this.page = newPage
      try {
        let res = await this.$api({
          url: '/api/getMessages',
          method: 'get',
          params: {
            page: this.page,
            pageSize: this.pageSize,
          },
        })
        console.log(res)
        this.messages = res.data.results
        this.total = res.data.total
      } catch (err) {
        console.log(err)
        this.$msg('不好意思，出错了')
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    //添加留言
    async addMessage() {
      localStorage.setItem('name', this.name)
      try {
        let time = new Date().toLocaleString()
        let res = await this.$api({
          url: '/api/addMessage',
          method: 'post',
          data: {
            name: this.name,
            content: this.content,
            time,
          },
        })
        if (res.code == 0) {
          this.content = ''
          this.getMessages()
          this.$msg({
            message: '留言成功',
            type: 'success',
          })
        } else {
          this.$msg({
            message: '留言失败',
            type: 'error',
          })
        }
      } catch (err) {
        console.log(err)
        this.$msg('不好意思，出错了')
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    //选择头像
    selectAvatar(e) {
      console.log(e.nodeName)
      let avatar = e.target.src
      this.avatar = avatar
    },
  },
  created() {
    //获取所有留言
    this.getMessages()
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 0 auto;
  width: 800px;
  box-shadow: 0 4px 6px rgb(0 0 0 / 30%);
  .top {
    text-align: center;
    h1 {
      margin: 20px 0 20px 0;
      font-size: 40px;
    }
    p {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
  .list {
    ul {
      margin-top: 50px;
      li {
        position: relative;
        margin: 30px 90px;
        border-bottom: 1px solid #ccc;
        img {
          margin: 0 10px;
          width: 40px;
          height: 40px;
          vertical-align: bottom;
          font-size: 0;
        }
        span {
          font-size: 18px;
          line-height: 40px;
        }
        .content {
          margin: 30px 60px;
          font-size: 15px;
        }
        .time {
          position: absolute;
          right: 0;
          top: 10px;
          color: #aaa;
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }
  .writeMessage {
    padding: 0 90px;
    span {
      font-size: 14px;
    }
    textarea {
      padding: 5px 10px;
      width: 540px;
      height: 80px;
      font-size: 16px;
      border: 2px solid #ccc;
      border-radius: 5px;
      outline: none;
      resize: none;
      vertical-align: top;
    }
    .t {
      margin-bottom: 10px;
      height: 30px;
      font-size: 20px;
      color: #fff;
      background-color: rgb(96, 205, 180);
      border-radius: 5px;
      text-align: center;
    }
    .who {
      margin: 10px 0 10px 0;
      span {
        font-size: 14px;
      }
      input {
        padding: 0 10px;
        height: 30px;
        font-size: 16px;
        border: 2px solid #ccc;
        border-radius: 5px;
        outline: none;
      }
    }
    .submit {
      display: flex;
      justify-content: end;
    }
    .button {
      margin: 15px 0;
      width: 80px;
      line-height: 40px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      background-color: rgb(96, 205, 180);
      cursor: pointer;
      &:hover {
        background-color: rgb(45, 189, 156);
      }
    }
    .avatar {
      img {
        margin: 0 5px;
        width: 45px;
        height: 45px;
        vertical-align: middle;
      }
    }
  }
}
</style>