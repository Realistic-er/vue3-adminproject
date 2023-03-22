<template>
  <GlobalContainer>
    <div class="containeruser">
        <el-table
        id="out-table"
        :data="userinfo"
        :border="true"
        style="width: 100%"
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="username" label="用户名称" />
          <el-table-column prop="name" label="用户昵称" />
          <el-table-column prop="part" label="部门" />
          <el-table-column prop="email" label="邮箱" />
          <!--  -->
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag
                :type="scope.row.status === '1' ? '' : 'danger'"
                disable-transitions
                >{{ scope.row.status === '1' ? '正常' : '停用' }}</el-tag
              >
            </template>
          </el-table-column>
          <!--  -->
          <el-table-column prop="time" label="创建时间" />
          <!--  -->
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClick(scope.row)"
                >修改</el-button
              >
              <el-button link type="primary" size="small"
              @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <!--  -->
        </el-table>
      </div>
      <!--  -->
  </GlobalContainer>
</template>

<script setup lang="ts">
import {
  reactive, ref, defineProps, toRefs, getCurrentInstance,
} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { userlist } from '../../util/type/requesrtype';

const props = defineProps({
  userinfo: Array,
});
const { userinfo } = toRefs(props);
const instance = getCurrentInstance();
const handleSelectionChange = () => {
  console.log('123');
};
const handleClick = (val: userlist) => {
  instance?.proxy?.$Bus.emit('on-click', val);
};
const handleDelete = (val:userlist) => {
  ElMessageBox.confirm(
    `是否删除岗位名称为-${val.name}-这条数据嘛？`,
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
        message: '删除成功',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
};
</script>

<style lang="scss" scoped>
</style>
