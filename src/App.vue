<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth, // 屏幕尺寸
      screeHeight: document.body.clientHeight
    };
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        window.screeHeight = document.body.clientHeight;
        that.screenWidth = window.screenWidth;
        that.screeHeight = window.screeHeight;
      })();
    };
  }
};
</script>

<style lang="less" scoped>
#app{
  height: 100%;
  width: 100%;
}
</style>

