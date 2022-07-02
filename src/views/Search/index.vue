<template>
  <div class="search animate__animated animate__fadeIn">
    <div class="main" v-if="blogs.length">
      <transition
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__slideInUp"
        leave-active-class="animate__zoomOut"
      >
        <h1>搜索结果：</h1>
      </transition>
      <div class="cards">
        <!-- <transition-group
          appear
          name="animate_animated fa"
          enter-active-class="animate__fadeInUp"
          leave-active-class="animate__fadeOutDown"
        > -->
          <div
            class="card"
            v-for="blog in blogs"
            :key="blog.id"
            @click="goDetail(blog.id)"
          >
            <img v-lazy="blog.img" alt="" key="89"/>
            <span class="type" key="88">{{ blog.type }}</span>
            <h1 class="title" key="87">{{ blog.title }}</h1>
            <div class="discribe" key="86">{{ blog.description }}</div>
            <div class="time" key="85">{{ blog.time }}</div>
          </div>
        <!-- </transition-group> -->
      </div>
    </div>
    <div class="main" v-if="blogs.length == 0">
      <transition
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__slideInUp"
        leave-active-class="animate__zoomOut"
      >
        <h1>搜索结果：</h1>
      </transition>
      <el-empty description="没有找到相关内容"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
    }
  },
  methods: {
    //点击进入某一篇博客
    goDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id,
        },
      })
    },
    //获取数据
    async getData() {
      try {
        let res = await this.$api({
          url: '/api/search',
          method: 'get',
          params: {
            keyword: this.$route.query.keyword,
          },
        })
        this.blogs = res.data
      } catch (error) {
        console.log(error)
      }
    },
  },
  watch: {
    // 利用watch方法检测路由变化
    $route(to, from) {
      this.getData()
    },
  },
  //初始化数据
  async created() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
.search {
  min-height: 600px;
  .main {
    margin: 50px auto;
    width: 1200px;
    h1 {
      margin-bottom: 30px;
      font-size: 30px;
    }
    .cards {
      margin: 0 auto;
      margin-bottom: 30px;
      display: flex;
      flex-wrap: wrap;
      width: 1062px;
      .card {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 0 25px 10px 25px;
        width: 300px;
        height: 450px;
        border: 2px solid #eee;
        border-radius: 10px;
        transform: translateY(7px);
        box-shadow: none;
        transition: all 0.3s;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          transform: translateY(-7px);
          transition: all 0.3s;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }
        img {
          height: 250px;
          object-fit: cover;
        }
        .type {
          margin: 10px 0 20px 10px;
          width: 80px;
          line-height: 25px;
          text-align: center;
          color: #fff;
          font-size: 13px;
          letter-spacing: 2px;
          background-color: rgb(69, 206, 192);
          border-radius: 13px;
        }
        .title {
          margin-bottom: 30px;
          padding: 0 30px;
          text-align: center;
        }
        .discribe {
          height: 30px;
          padding: 0 30px;
          text-align: center;
          overflow: hidden;
        }
        .time {
          position: absolute;
          bottom: 5px;
          left: 50%;
          color: #888;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>