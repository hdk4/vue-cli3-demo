<template>
  <div class="login-box">
    <el-form class="login-form" label-width="80px" :model="loginForm" :rules="loginRules" ref="loginForm">

      <div class="sys-title">
        {{sysName}}
      </div>

      <el-form-item label="用户名" prop="name">
        <el-input size="medium" name="name" v-model="loginForm.name" placeholder="请输入用户名" clearable>
          <i slot="prefix" class="iconfont icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="密　码" prop="password">
        <el-input size="medium" name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入密码">
          <i slot="prefix" class="iconfont icon-password"></i>
          <i slot="suffix" class="iconfont icon-view" @click="showPwd" style="cursor:pointer"></i>
        </el-input>
      </el-form-item>

      <el-button size="large" type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
// import {
//   userLogin,
// } from 'api/system';

// import axios from 'axios';

import md5 from '@/utils/md5.js';

export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        name: '',
        password: '',
      },
      loginRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      },
      pwdType: 'password',
      loading: false,


      sysName: '我是一个演示版本',
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          setTimeout(() => {
            if (this.loginForm.name === 'admin' && md5(this.loginForm.password) === '21232f297a57a5a743894a0e4a801fc3') {
              this.$store.dispatch('loginSuccess', {
                name: 'admin',
                token: 'admin'
              }).then(res => {
                this.$store.dispatch('clearVisitedViews');
                this.loading = false
                this.$router.replace('/')
              });

            } else {
              this.loading = false
              this.$message.warning('用户名或者密码错误')
            }
          }, 800);

          // userLogin(this.loginForm.name, md5(this.loginForm.password)).then(res => {
          //   this.$store.dispatch('loginSuccess', res.data).then(res => {
          //     this.$store.dispatch('fetchUserInfo', true);
          //     this.$store.dispatch('clearVisitedViews');
          //     this.$store.dispatch('fetchMenuData', true).then(res => {
          //       this.loading = false
          //       this.$router.replace('/');
          //     });
          //   });

          // }).catch(res => {
          //   this.loading = false
          // })

        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.login-box {
  background: rgba(39, 25, 25, 0.46);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: url(../../assets/login-bg1.jpg) no-repeat center;
  background-size: cover;
}
.login-form {
  position: absolute;
  top: 120px;
  left: 50%;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  background: white;
}
.sys-title {
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 20px;
}
</style>
