<template>
  <div class="cur-pos">
    <template v-for="(item,i) in matchedRouter">
      <span>{{i===0?item.name:item.meta.title}}</span>
      <i class="iconfont icon-next" v-if="matchedRouter.length - 1 > i"></i>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CurPos',
  data() {
    return {
      matchedRouter: this.$route.matched
    }
  },
  watch: {
    $route() {
      this.matchedRouter = this.$route.matched
    }
  }
}
</script>

<style lang="less" scoped>
.cur-pos {
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.7);
  text-indent: 1em;
  color: #fff;
  font-size: 14px;
  i {
    font-size: 12px;
    margin: 0 5px;
  }
}
</style>
