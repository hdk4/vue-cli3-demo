<template>
  <el-form ref="formData" :rules="rules" :model="form" label-width="150px" style="max-width: 800px;" v-loading="loading">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input type="password" clearable v-model="form.oldPassword" placeholder="请输入原始密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" clearable v-model="form.newPassword" placeholder="请输入新密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" clearable v-model="form.confirmPassword" placeholder="请输入确认密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('formData')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import md5 from '@/utils/md5.js';
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      loading: false,
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确定提交当前数据？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message('修改密码....')
          }).catch(() => {
            this.$message('已取消操作')
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style>

</style>
