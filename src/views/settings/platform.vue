<template>
  <div
    v-loading="loading"
    element-loading-text="加载中..."
  >
    <el-form ref="form" :model="form" inline label-width="80px">
      <el-form-item label="应用名称">
        <el-input v-model="form.name" placeholder="请输入应用名称进行搜索" clearable style="width:200px;"></el-input>
      </el-form-item>
      <el-button @click="searchTable">搜索</el-button>
    </el-form>
    <el-button-group class="mb10">
      <el-button icon="iconfont icon-add" type="primary" @click="openDialog"></el-button>
      <el-button icon="iconfont icon-ban" type="danger" @click="delData" :disabled="multipleSelection.length === 0"></el-button>
      <el-button icon="iconfont icon-audit" type="success" @click="enableData" :disabled="multipleSelection.length === 0"></el-button>
    </el-button-group>
    <el-table
      :data="listData"
      border
      highlight-current-row
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="platformName"
        label="应用名称">
      </el-table-column>
      <el-table-column
        prop="platformKey"
        label="KEY">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{ scope.row.createTime | dateFormat('yyyy-MM-dd') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="valid"
        label="状态"
        :filters="[{text: '启用', value: true}, {text: '禁用', value: false}]"
        :filter-method="filterHandler"
        filter-placement="bottom-start"
      >
        <template slot-scope="scope">{{scope.row.valid?'启用':'禁用'}}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        width="180">
        <template slot-scope="scope">
          <el-button-group>
            <!-- 编辑 -->
            <el-button @click="cellEdit(scope.row)" icon="iconfont icon-edit" type="primary"></el-button>
            <!-- 禁用 -->
            <el-button v-if="scope.row.valid" @click="cellDelete(scope.row)" icon="iconfont icon-ban" type="danger"></el-button>
            <!-- 启用 -->
            <el-button v-else @click="cellEnable(scope.row)" icon="iconfont icon-audit" type="success"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="showPage"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :current-page="pageNum"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog :title="opType" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="formData" label-width="120px" :rules="rules" ref="formData">
        <el-form-item label="应用名称" prop="platformName">
          <el-input v-model="formData.platformName" placeholder="请输入应用名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="KEY" prop="platformKey">
          <el-input v-model="formData.platformKey" placeholder="请输入应用的 KEY" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData('formData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getPlatforms,
//   addPlatform,
//   editPlatform,
//   delPlatform,
//   batchDelPlatforms,
//   enablePlatform,
//   batchEnablePlatforms
// } from 'api/platform';

export default {
  data() {
    return {
      form: {
        valid: true,
      },
      currentRow: null,
      loading: false,
      pageNum: 1,
      pages: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      listData: [],
      total: 0,
      multipleSelection: [],

      dialogVisible: false,
      opType: '添加',
      formData: {},
      rules: {
        platformName: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        platformKey: [
          { required: true, message: '请输入应用 KEY', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    showPage() {
      // return true;
      return this.pages >= 1
    },
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      const data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.form
      };
      this.$refs['multipleTable'].clearFilter()
      this.loading = true
      //
      setTimeout(() => {
        this.listData = Array(7).fill({}).map(item => {
          return {

          }
        })
        this.loading = false
        this.pages = 7
        this.total = 77
      }, 800);
    },
    searchTable() {
      // this.pageNum = 1;
      this.loadData()
    },
    pageSizeChange(val) {
      this.pageSize = val
      this.loadData()
    },
    pageCurrentChange(val) {
      this.pageNum = val
      this.loadData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    filterHandler(value, row, column) {
      return row.valid === value;
    },
    cellEdit(data) {
      this.opType = '修改';
      this.formData = {
        platformName: data.platformName,
        platformKey: data.platformKey,
        platformId: data.platformId
      };
      this.dialogVisible = true
    },
    cellDelete(data) {
      this.$confirm('确定禁用本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPlatform(data.platformId).then(res => {
          this.$message.success('操作成功');
          this.loadData();
          this.$store.dispatch('fetchValidPlatforms', true);
        })
      }).catch(() => {
        this.$message('已取消操作')
      });
    },
    cellEnable(data) {
      this.$confirm('确定启用本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        enablePlatform(data.platformId).then(res => {
          this.$message.success('操作成功');
          this.loadData();
          this.$store.dispatch('fetchValidPlatforms', true);
        })
      }).catch(() => {
        this.$message('已取消操作')
      });
    },
    openDialog() {
      this.opType = '添加';
      this.formData = {};
      this.dialogVisible = true;
    },
    submitData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确定提交当前数据？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.opType === '修改') {
              editPlatform(this.formData).then(res => {
                this.$message.success('修改成功');
                this.dialogVisible = false;
                this.loadData();
                this.$store.dispatch('fetchValidPlatforms', true);
              })
            } else {
              addPlatform(this.formData).then(res => {
                this.$message.success('添加成功');
                this.dialogVisible = false;
                this.loadData();
                this.$store.dispatch('fetchValidPlatforms', true);
              })
            }
          }).catch(() => {
            this.$message('已取消操作')
          });
        }
      });
    },
    delData() {
      if (this.multipleSelection.length < 1) {
        this.$message.warning('请选择后再进行操作');
      } else {
        this.$confirm('确定禁用当前选中的数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchDelPlatforms(this.multipleSelection.map(item => item.platformId)).then(res => {
            this.$message.success('操作成功');
            this.loadData();
            this.$store.dispatch('fetchValidPlatforms', true);
          })
        }).catch(() => {
          this.$message('已取消操作')
        });
      }
    },
    enableData() {
      if (this.multipleSelection.length < 1) {
        this.$message.warning('请选择后再进行操作');
      } else {
        this.$confirm('确定启用当前选中的数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          batchEnablePlatforms(this.multipleSelection.map(item => item.platformId)).then(res => {
            this.$message.success('操作成功');
            this.loadData();
            this.$store.dispatch('fetchValidPlatforms', true);
          })
        }).catch(() => {
          this.$message('已取消操作')
        });
      }
    }
  }
}
</script>

<style>

</style>
