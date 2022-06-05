<template>
  <div id="app">
    <Header></Header>
  </div>
</template>

<script>
const Header = () => import('@/components/Header/Header.vue')
export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
</style>
