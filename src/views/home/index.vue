<template>
  <div class="home">
    <p>我是一个 DEMO 啊。<span>当前时间：{{now|dateFormat('YYYY-MM-DD hh:mm:ss')}}</span></p>
    <hr>
    <p class="red">我是 SCSS 的测试文本
    </p>
  </div>
</template>

<style scoped lang="less">
.home {
  background: cyan;
  padding: 10px;
  p {
    font-size: 20px; font-weight: bold;
  }
}
</style>

<script>
export default {

  data() {
    return {
      now: Date.now()
    }
  },
  created() {
    setInterval(() => {
      this.now = Date.now()
    }, 1000)
  },
}
</script>
