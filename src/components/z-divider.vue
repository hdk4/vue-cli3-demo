<template>
  <div class="divider">
    <div class="divider-content" :style="{'margin-left': left, 'padding': padding, 'color': color}"><slot></slot></div>
    <div class="divider-line" :style="{'background-color': bgColor, 'top': lineTop}"></div>
  </div>
</template>

<script>
export default {
  name: 'z-divider',
  props: {
    color: {
      type: String,
      default: '#999'
    },
    bgColor: {
      type: String,
      default: '#999'
    },
    left: {
      type: String,
      default: '0'
    },
    padding: {
      type: String,
      default: '0 5px'
    },
    lineTop: {
      type: String,
      default: '6px'
    }
  }
}
</script>

<style>
.divider {
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
}
.divider-line {
  position: absolute;
  left: 0; right: 0; height: 1px;
}
.divider-content {
  display: inline;
  background: white;
  position: relative; z-index: 2
}
</style>
