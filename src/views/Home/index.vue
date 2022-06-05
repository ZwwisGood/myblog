<template>
  <div class="home">
    <div class="pic">
      <h1>Zww</h1>
      <h2>God helps those who help themselves</h2>
      <img src="/images/pic.png" alt="" />
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style lang="less" scoped>
.home {
  width: 1200px;
  margin: 0 auto;
  .pic {
    position: relative;
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
}
</style>