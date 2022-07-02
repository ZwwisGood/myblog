<template>
  <div class="messageboard animate__animated animate__fadeInRightBig">
    <div class="main">
      <div class="top">
        <h1>留言板</h1>
        <p>欢迎留下你的留言</p>
      </div>
      <div class="list">
        <ul>
          <li v-for="message in messages" :key="message.id" class="message">
            <img class="avatar" :src="message.avatar" alt="" />
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
        <div class="avatar" @click="selectAvatar" :style="disabled1">
          <span>选择头像：</span>
          <img
            src="/images/avatar9.jpeg"
            data-id="1"
            :class="{ active: active == 1 }"
            alt=""
          />
          <img
            src="/images/avatar1.jpeg"
            :class="{ active: active == 2 }"
            data-id="2"
            alt=""
          />
          <img
            src="/images/avatar2.jpeg"
            :class="{ active: active == 3 }"
            data-id="3"
            alt=""
          />
          <img
            src="/images/avatar3.jpeg"
            :class="{ active: active == 4 }"
            data-id="4"
            alt=""
          />
          <img
            src="/images/avatar4.jpeg"
            :class="{ active: active == 5 }"
            data-id="5"
            alt=""
          />
          <img
            src="/images/avatar5.jpeg"
            :class="{ active: active == 6 }"
            data-id="6"
            alt=""
          />
          <img
            src="/images/avatar6.jpeg"
            :class="{ active: active == 7 }"
            data-id="7"
            alt=""
          />
          <img
            src="/images/avatar7.jpeg"
            :class="{ active: active == 8 }"
            data-id="8"
            alt=""
          />
          <img
            src="/images/avatar8.jpeg"
            :class="{ active: active == 9 }"
            data-id="9"
            alt=""
          />
        </div>
        <div class="who">
          <span>留言人：</span>
          <input v-model.trim="name" type="text" :disabled="disabled" />
          <span
            >&nbsp;&nbsp;（请注意：头像和留言人在留言后<span class="red"
              >不可修改</span
            >）</span
          >
        </div>
        <span>内&nbsp;&nbsp;&nbsp;容：</span>
        <textarea v-model.trim="content" name="msgContent"></textarea>
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
      avatar: localStorage.getItem('avatar') || '/images/avatar9.jpeg', //头像
      active: localStorage.getItem('active') || 1, //选中头像
      disabled: false, //是否禁用留言人输入框
      disabled1: '', //是否禁用头像选择框
      first: true, //是否第一次留言
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
      if (this.name == '' || this.content == '') {
        this.$msg.error('留言人和留言内容不能为空!')
        return
      }
      try {
        let time = new Date().toLocaleString()
        let res = await this.$api({
          url: '/api/addMessage',
          method: 'post',
          data: {
            name: this.name,
            content: this.content,
            time,
            avatar: this.avatar,
            first: this.first,
          },
        })
        if (res.code == 0) {
          this.content = ''
          this.getMessages()
          this.$msg({
            message: '留言成功',
            type: 'success',
          })
          localStorage.setItem('name', this.name)
          localStorage.setItem('avatar', this.avatar)
          localStorage.setItem('active', this.active)
          this.first = false
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        } else {
          this.$msg({
            message: res.msg,
            type: 'error',
          })
          this.name = ''
          this.content = ''
          this.first = true
        }
      } catch (err) {
        console.log(err)
        this.$msg.error('不好意思，出错了')
      }
      //已经留言过的用户不能再次更名
      if (localStorage.getItem('name')) {
        this.disabled = true
        this.disabled1 = 'pointer-events: none'
        this.first = false
      }
    },
    //选择头像
    selectAvatar(e) {
      //获取自定义属性
      let id = e.target.dataset.id
      this.active = id
      //判断获取的是不是img标签
      if (e.target.nodeName == 'IMG') {
        //获取src里/images以及以后的部分
        let src = '/images' + e.target.src.split('/images')[1]
        this.avatar = src
      }
    },
  },
  created() {
    //获取所有留言
    this.getMessages()
    //已经留言过的用户不能再次更名
    if (localStorage.getItem('name')) {
      this.disabled = true
      this.disabled1 = 'pointer-events: none'
      this.first = false
    }
  },
}
</script>

<style lang="less" scoped>
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #60cdb4;
}
.main {
  margin: 0 auto;
  width: 800px;
  min-height: 800px;
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
          width: 50px;
          height: 50px;
          vertical-align: bottom;
          font-size: 0;
        }
        span {
          font-size: 18px;
          line-height: 50px;
        }
        .content {
          margin: 30px 70px;
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
      justify-content: flex-end;
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
        border: 3px solid transparent;
        vertical-align: middle;
      }
      .active {
        border: 3px solid rgb(96, 205, 180);
      }
    }
  }
}
.red {
  color: rgb(255, 0, 0);
  font-weight: 600;
}
</style>