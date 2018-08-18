<template>
  <div>
    <div class="logo" :class="{'collapse': !sidebar.opened}">
      <img src="../../assets/logo.png" >
      <span v-if="sidebar.opened">客服系统</span>
    </div>

    <!-- <div v-if="sidebar.opened" class="sidebar-sep">查看项目</div> -->

    <el-menu
      background-color="#111" text-color="#aaa" active-text-color="#ffd04b"
      unique-opened
      router
      :default-active="curRouter"
      :collapse="isCollapse"
      id="side-menu"
    >
      <div class='menu-wrapper'>
        <el-menu-item index="/index">
          <i class="iconfont icon-data"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="settings">
          <template slot="title">
            <i class="iconfont icon-settings"></i>
            <span slot="title">设置</span>
          </template>
          <el-menu-item index="/settings/platform">
            <i class="iconfont icon-base"></i>
            <span slot="title">应用管理</span>
          </el-menu-item>
          <el-menu-item index="/settings/kb">
            <i class="iconfont icon-list"></i>
            <span slot="title">知识库分类</span>
          </el-menu-item>
          <el-menu-item index="/settings/feedback">
            <i class="iconfont icon-feedback"></i>
            <span slot="title">投诉反馈分类</span>
          </el-menu-item>
          <el-menu-item index="/settings/link">
            <i class="iconfont icon-link"></i>
            <span slot="title">应用跳转</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/kb">
          <i class="iconfont icon-kb"></i>
          <span slot="title">知识库管理</span>
        </el-menu-item>
        <el-menu-item index="/feedback">
          <i class="iconfont icon-online"></i>
          <span slot="title">投诉反馈管理</span>
        </el-menu-item>
        <el-menu-item index="/blacklist">
          <i class="iconfont icon-blacklist"></i>
          <span slot="title">黑名单</span>
        </el-menu-item>
        <el-menu-item index="/modpwd">
          <i class="iconfont icon-modpwd"></i>
          <span slot="title">设置密码</span>
        </el-menu-item>
        <el-submenu index="system">
          <template slot="title">
            <i class="iconfont icon-cogs"></i>
            <span slot="title">系统配置</span>
          </template>
          <el-menu-item index="/system/menu">
            <i class="iconfont icon-menu-settings"></i>
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/system/role">
            <i class="iconfont icon-role"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/system/user">
            <i class="iconfont icon-crm"></i>
            <span slot="title">管理员列表</span>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Sidebar",
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    curPath() {
      return this.$route.matched[0].path.substr(1)
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    curRouter() {
      let curPath = this.$route.path
      let temp = curPath.split('/').slice(0, 3);

      if (['staff', 'kb', 'feedback', 'blacklist'].indexOf(temp[1]) !== -1) {
        return '/' + temp[1];
      }

      return temp.join('/')
    }
  },
  created() {
    // this.$store.dispatch('fetchMenuData');
  },
}
</script>

<style lang="less" scoped>
@text-color: #aaa;
@border-color: #313131;
@bg-color: #111;

img {
  margin-top: 6px;
}
#sidebar-menu>li {
  border-bottom: 1px solid @border-color;
}
.logo {
  background-color: @bg-color;
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: white;
  border-bottom: 1px solid @border-color;
  display: flex;
  img {
    height: 50px;
    transition: all ease .3s;
  }
  span {
    margin-left: 10px;
  }
  &.collapse {
    text-align: center;
    img {
      height: 30px;
      margin: 10px auto;
    }
  }
}
.el-menu {
  border-right: none;
  .iconfont {
    font-size: 18px;
    margin-right: 5px;
    vertical-align: middle;
  }
}
.sidebar-sep {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  background-color: @bg-color;
  color: @text-color;
  font-size: 14px;
  border-top: 1px solid @border-color;
  border-bottom: 1px solid @border-color;
}
.sidebar-admin {
  width: 100%;
  padding: 0 20px;
  height: 60px; line-height: 60px;
  color: @text-color;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}
</style>
