<template>
  <div id="app">
    <Header></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
const Header = () => import('@/components/Header/Header.vue')
const Footer = () => import('@/components/Footer/Footer.vue')
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
</style>
