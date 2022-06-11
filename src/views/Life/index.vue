<template>
  <div class="blog">
    <div class="top">
      <img src="/images/pic2.jpeg" alt="" class="pic" />
      <h1 class="title">Life 生活</h1>
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
  name: 'Blog',
  data() {
    return {
      blogs: [], //所有博客
      goTopBtn: false, //回到顶部按钮显示
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
    //浏览器滚动600像素后显示按钮
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
  //初始化数据(已缓存，代替created)
  async activated() {
    console.log('activated')
    //获取所有博客
    let res = await this.$api({
      url: '/api/getLifeBlogs',
      method: 'get',
    })
    console.log(res);
    this.blogs = res.data
    //监听滚动条，显示回到顶部按钮
    window.addEventListener('scroll', () => {
      //获得当前滚动距离
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 600) {
        this.goTopBtn = true
      } else {
        this.goTopBtn = false
      }
    })
    //从路由元信息meta拿到记录的滚动距离
    const scrollTop = this.$route.meta.scrollTop
    window.scrollTo({
      top: scrollTop, //滚动到原来的位置
      behavior: 'smooth',
    })
  },
  deactivated() {
    //解绑事件
    window.removeEventListener('scroll', () => {})
  },
}
</script>

<style lang="less" scoped>
.blog {
  width: 1200px;
  margin: 0 auto;
  .top {
    position: relative;
    .title{
        position: absolute;
        top: 30%;
        left: 50%;
        color: #eee;
        text-shadow: 3px 5px 10px black;
        font-size: 50px;
        transform: translate(-50%, -50%);
    }
    .pic {
      width: 100%;
      height: 300px;
      //不拉伸图片
      object-fit: cover;
      object-position: 0 50%;
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