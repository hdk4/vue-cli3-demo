<template>
  <i :class="'iconfont icon-' + name" :style="'color: ' + color"></i>
</template>

<script>
export default {
  name: 'z-icon',
  props: {
    color: {
      type: String,
      value: 'inherit'
    },
    name: {
      type: String
    }
  }
}
</script>

<style>

</style>
