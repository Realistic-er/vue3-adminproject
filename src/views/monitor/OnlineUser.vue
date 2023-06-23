<template>
  <GlobalContainer>
    <el-table
    id="out-table"
    :data="tableData"
    :border="true"
    style="width: 100%">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="system" label="用户系统" />
      <el-table-column prop="IP" label="IP地址" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 1 ? '' : 'danger'"
            disable-transitions
            >{{ scope.row.status === 1 ? '正常' : '停用' }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="time" label="登录次数" />
      <!--  -->
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small"
          @click="handleBlack(scope.row)">{{ scope.row.status === 1 ? '拉黑' : '解除拉黑' }}</el-button>
        </template>
      </el-table-column>
      <!--  -->
    </el-table>
    <!-- 分页 -->
    <el-pagination ref="RefPagination"/>
    <!-- 新增dialog -->
    <Add-Job ref="RefChilde"></Add-Job>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  Delete, Edit, Search, Share, Bottom, Plus,
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import getonlineuser from '../../util/api/monitor/onlineuser';

type job = {
  code: string,
  name: string,
  sort: number,
  status: string,
  text: string,
};
type scope = {
  system: string,
  IP: string,
  time: number,
  status: number,
};
const tableData = ref([]);
const RefChilde = ref();
const RefPagination = ref();
getonlineuser().then((res) => {
  tableData.value = res.data.data.data;
});
const handleBlack = (val:scope) => {
  if (val.status === 1) {
    ElMessageBox.confirm(
      `是否拉黑用户IP-${val.IP}-这条数据嘛？`,
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '拉黑成功',
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消拉黑',
        });
      });
  } else {
    ElMessageBox.confirm(
      `是否将用户IP-${val.IP}-放出黑名单？`,
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '解除拉黑成功',
        });
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消解除拉黑',
        });
      });
  }
};

</script>

<style lang="scss" scoped>
@import "../../style/views/JobCharge.scss";
</style>
