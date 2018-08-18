<template>
  <div>

    <header class="header-fix">
      <div class="menu-icon" :class="{'packed':!sidebar.opened}" @click="toggleMenu">
        <el-tooltip v-model="showPackedTip" class="item" effect="dark" :content="sidebar.opened?'收起菜单':'展开菜单'" placement="bottom-start">
          <i class="iconfont icon-menu"></i>
        </el-tooltip>
      </div>
      <div class='tabs-view-container'>
        <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
          <el-tag size="medium" :closable="true" :type="isActive(tag.path)?'':'info'" @close='closeViewTabs(tag,$event)'>
            {{tag.name}}
          </el-tag>
        </router-link>
      </div>
      <div class="nav-admin">
        <a href="https://github.com/hdk4/vue-cli3-demo" class="icon-github">
          <svg height="28" viewBox="0 0 16 16" version="1.1" width="28" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
        </a>
        <el-dropdown size="medium">
          <div class="sidebar-admin">
            <i class="iconfont icon-manager"></i>
            <span>{{userData && userData.name || '后台管理员'}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="modPassword" v-if="hasModPassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            <el-dropdown-item divided @click.native="toHome">返回首页</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Navbar',
  data() {
    return {
      showPackedTip: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'visitedViews',
      'hasModPassword',
      'userData'
    ])
  },
  methods: {
    modPassword() {
      this.$router.push('/modpwd')
    },
    logout() {
      this.$confirm('确定要退出到登录页吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('userLogout', true)
        this.$store.dispatch('clearVisitedViews')
        this.$router.push('/login')
      }).catch(() => {
        this.$message('已取消操作')
      });
    },
    toggleMenu() {
      this.showPackedTip = false
      this.$store.dispatch('ToggleSideBar')
    },
    closeViewTabs(view, $event) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    addViewTabs() {
      if (this.$route.name) {
        this.$store.dispatch('addVisitedViews', this.$route);
      }
    },
    isActive(path) {
      return path === this.$route.path
    },
    toHome() {
      this.$router.push('/');
    }
  },
  watch: {
    // 路由变化时隐藏
    $route() {
      this.addViewTabs();
    }
  }
}
</script>

<style scoped lang="less">
.header-fix {
  position: relative;
  padding: 0 15px;
  height: 60px; line-height: 60px;
  border-bottom: 2px solid #ddd;
  background: #fff;
}
.menu-icon {
  position: absolute;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &.packed {
    transform: rotate(-90deg);
  }
}
.nav-admin {
  cursor: pointer;
  position: absolute;
  right: 10px; top: 0px;
  .el-dropdown {
    font-size: 16px;
  }

  // padding-right: 30px;
  // background: url(../../assets/icon-header.png) no-repeat center right;
  // background-size: 25px;
  // cursor: pointer;
  // &.on {
  //   color: #ffcb15;
  //   background-image: url(../../assets/icon-header-hover.png);
  // }
  // // hack 一个外框的样式问题
  // &:focus {
  //   outline: none;
  // }
}
.tabs-view-container {
  display: inline-block;
  vertical-align: top;
  margin-left: 30px;
  .tabs-view {
    margin-left: 10px;
    cursor: pointer;
  }
}
.icon-github {
  float: left;
  margin-top: 10px;
  margin-right: 20px;
}
</style>
