<template>
  <el-switch
    :value="gender"
    @input="onChange"
    :active-value="0"
    :inactive-value="1"
    active-text="女"
    inactive-text="男">
  </el-switch>
</template>

<script>
export default {
  name: 'z-gender',
  props: {
    value: [String, Number]
  },
  computed: {
    gender() {
      return this.value
    }
  },
  methods: {
    onChange(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style>

</style>
