<template>
  <div class="home">
    <div class="pic">
      <h1>Zww</h1>
      <h2>God helps those who help themselves</h2>
      <img src="/images/pic.png" alt="" />
    </div>
    <div class="cards">
      <div
        class="card"
        v-for="blog in blogs"
        :key="blog.id"
        @click="goDetail(blog.id)"
      >
        <img :src="blog.img" alt="" />
        <span class="type">{{ blog.type }}</span>
        <h1 class="title">{{ blog.title }}</h1>
        <div class="discribe">{{ blog.description }}</div>
        <div class="time">{{ blog.time }}</div>
      </div>
    </div>
    <div class="goTop" @click="goTop" v-show="goTopBtn">
      <p>回到顶部</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      blogs: [], //所有博客
      goTopBtn: false,
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
    //浏览器滚动300像素后显示按钮
    goTop() {
      window.scrollTo(0, 0)
    },
  },
  //初始化数据
  async created() {
    let res = await this.$api({
      url: '/api/getAllBlogs',
      method: 'get',
    })
    this.blogs = res.data
  },
  //监听滚动条
  mounted() {
    window.addEventListener('scroll', () => {
      //获得当前滚动距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop);
      if (scrollTop > 600) {
        this.goTopBtn = true
      } else {
        this.goTopBtn = false
      }
    })
  },
}
</script>

<style lang="less" scoped>
.home {
  width: 1200px;
  margin: 0 auto;
  .pic {
    position: relative;
    margin-bottom: 30px;
    h1,
    h2 {
      position: absolute;
      left: 50%;
      top: 28%;
      transform: translateX(-50%);
      font-size: 30px;
    }
    h1 {
      top: 20%;
    }
    img {
      width: 100%;
      border-radius: 6px;
    }
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
      margin: 0 25px 50px 25px;
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
        background-color: Turquoise;
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
  .goTop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: 10px;
    bottom: 80px;
    width: 60px;
    height: 60px;
    color: #fff;
    background-color: #666;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>