<template>
  <div class="header">
    <div class="left">
      <ul>
        <li>
          <img class="hvr-wobble-to-bottom-right" src="/images/logo.jpg" />
        </li>
        <li class="hvr-underline-from-center">主页</li>
        <li class="hvr-underline-from-center">主页</li>
        <li class="hvr-underline-from-center">主页</li>
      </ul>
    </div>
    <div class="middle">
      <input type="text" />
      <button class="searchBtn iconfont icon-fangdajing"></button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hvr-underline-from-center:before{
    background: #666;
    height: 2px;
}
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgb(0 0 0 / 15%);
  .left {
    width: 700px;
    ul {
      display: flex;
      align-items: center;
      margin-left: 260px;
      height: 80px;
      li:nth-child(n + 2) {
        display: flex;
        align-items: center;
        height: 30px;
        margin: 0 20px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          box-sizing: border-box;
        }
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
}
</style>