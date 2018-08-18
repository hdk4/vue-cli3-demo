<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="sidebar-wrapper">
      <Sidebar class="sidebar-container"/>
    </div>
    <div class="main-container">
      <Navbar/>
      <CurPos v-if="showCurPos" />
      <AppMain/>
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import Navbar from './navbar'
import AppMain from './app-main'
import CurPos from './curpos'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    CurPos
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    showCurPos() {
      return this.$route.path !== '/404' && !this.$route.meta.hideCurPos;
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarWidth = this.sidebarWidth.reverse();
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@sidebar-width: 180px;
.app-wrapper {
  min-height: 100%;
  // width: 100%;
  padding-left: @sidebar-width;
  &.hideSidebar {
    padding-left: 64px;
    .sidebar-wrapper{
      width: 64px;
    }
  }
  .sidebar-wrapper {
    width: @sidebar-width;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: #000;
    transition: all 0.28s ease-out;
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
  .sidebar-container {
    transition: all 0.5s ease-out;
  }
  .main-container {
    width: 100%;
    min-height: 100%;
    transition: all 0.5s ease-out;
  }
}
.main-content {
  padding: 10px;
  background-color: #fff;
}
</style>
