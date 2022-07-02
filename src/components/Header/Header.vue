<template>
  <div class="header">
    <div class="left">
      <ul>
        <li>
          <img class="hvr-wobble-to-bottom-right" src="/images/logo.jpg" />
        </li>
        <li @click="goHome" class="hvr-underline-from-center">
          <i class="iconfont icon-zhuye1"></i>主页
        </li>
        <li @click="goBlog" class="hvr-underline-from-center">
          <i class="iconfont icon-16"></i>文章笔记
        </li>
        <li @click="goLife" class="hvr-underline-from-center">
          <i class="iconfont icon-shenghuo"></i>生活
        </li>
      </ul>
    </div>
    <div class="middle">
      <input v-model.trim="keyword" type="text" @keyup.enter="goSearch" />
      <button
        @click="goSearch"
        class="searchBtn iconfont icon-fangdajing"
      ></button>
    </div>
    <div class="right">
      <ul>
        <li class="hvr-buzz-out" @click="goMessageBoard">留言板</li>

        <el-popover placement="bottom" title="微信" width="200" trigger="hover">
          <img class="me" src="/images/me.jpg" alt="" />
          <div class="qq">QQ：1329824163</div>
          <li class="hvr-buzz-out" slot="reference">联系我</li>
        </el-popover>
        <li class="hvr-buzz-out" @click="goManage">博客管理</li>
      </ul>
    </div>
    <div @click="goGithub" class="github hvr-curl-top-right">
      <img src="/images/github.jpg" title="Follow me on GitHub" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    goManage() {
      this.$router.push('/manage')
    },
    goHome() {
      this.$router.push('/home')
    },
    goBlog() {
      this.$router.push('/blog')
    },
    goLife() {
      this.$router.push('/life')
    },
    goGithub() {
      window.open('https://github.com/ZwwisGood/')
    },
    goMessageBoard() {
      this.$router.push('/messageBoard')
    },
    goSearch() {
      if (this.keyword == '') {
        return
      }
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.keyword,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.hvr-underline-from-center:before {
  background: #666;
  height: 2px;
}
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  height: 80px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgb(0 0 0 / 15%);
  z-index: 999;
  .left {
    width: 650px;
    i {
      margin-right: 2px;
      font-size: 18px;
      color: #666;
    }
    ul {
      display: flex;
      align-items: center;
      height: 80px;
      margin-left: 25%;
      li{
        white-space:nowrap;
      }
      li:nth-child(n + 2) {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 20px;
        font-size: 18px;
        cursor: pointer;
      }
    }
    img {
      margin-right: 20px;
      width: 65px;
      border-radius: 50%;
    }
  }
  .middle {
    display: flex;
    flex: 1;
    align-items: center;
    position: relative;
    input {
      padding: 0 6px;
      width: 200px;
      height: 35px;
      font-size: 16px;
      border: 2px solid black;
      border-right: none;
      outline: none;
    }
    .searchBtn {
      position: relative;
      width: 50px;
      height: 39px;
      border: 2px solid black;
      border-left: none;
      background: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .right {
    width: 350px;
    ul {
      display: flex;
      li {
        display: flex;
        align-items: center;
        width: 73px;
        font-size: 18px;
        margin: 0 10px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
  .github {
    height: 80px;
    img {
      width: 80px;
      cursor: pointer;
    }
  }
}
.me {
  width: 200px;
  height: 200px;
}
.qq {
  text-align: center;
}
i::before {
  font-size: 25px;
}
</style>