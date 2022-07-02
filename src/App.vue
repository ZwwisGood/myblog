<template>
  <div id="app">
    <Header></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer></Footer>

    <div class="leftBottom">
      <div class="calenderBtn" @click="showCal">
        <i class="iconfont icon-rili"></i>
        <span class="word">日历</span>
      </div>
    </div>

    <transition-group
      name="animate__animated fade"
      enter-active-class="animate__backInRight"
      leave-active-class="animate__backOutRight"
    >
      <div class="calender" v-show="showCalender" key="1">
        <el-calendar class="cal" v-model="value" key="2"> </el-calendar>
      </div>
    </transition-group>
    <div class="goTop" @click="goTop" v-show="goTopBtn">
      <p>回到顶部</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
const Header = () => import('@/components/Header/Header.vue')
const Footer = () => import('@/components/Footer/Footer.vue')
export default {
  name: 'App',
  data() {
    return {
      showCalender: false,
      value: new Date(),
      goTopBtn: false, //回到顶部按钮显示
    }
  },
  methods: {
    showCal: _.throttle(
      function () {
        this.showCalender = !this.showCalender
      },
      700,
      {
        leading: true,
        trailing: false,
      }
    ),
    //浏览器滚动600像素后显示按钮
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
  components: {
    Header,
    Footer,
  },
  created() {
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
  },
}
</script>

<style lang="less" scoped>
.calenderBtn {
  margin-left: -31px;
  position: fixed;
  left: 0;
  bottom: 50px;
  width: 70px;
  height: 60px;
  background-color: rgb(100, 100, 100);
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    width: 85px;
    transform: translateX(30px);
    transition: all 0.3s;
    .word {
      margin-left: 10px;
      transition: all 0.3s;
    }
  }
  i {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 26px;
    color: #fff;
  }
  span {
    position: absolute;
    top: 20px;
    font-size: 16px;
    color: white;
    margin-left: -10px;
    transition: all 0.3s;
  }
}
.calender {
  position: fixed;
  right: 0;
  top: 80px;
  width: 700px;
}
.el-calendar {
  color: black;
  background-color: rgba(126, 126, 126, 0.651);
}
.goTop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 50px;
  bottom: 80px;
  width: 60px;
  height: 60px;
  color: #fff;
  background-color: #666;
  border-radius: 50%;
  box-shadow: 3px 5px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
