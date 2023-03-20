<template>
  <GlobalContainer>
    <div class="containeruser">
        <el-table
        id="out-table"
        :data="roleinfo"
        :border="true"
        style="width: 100%"
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="rolename" label="角色名称" />
          <el-table-column prop="rolestring" label="权限字符" />
          <el-table-column prop="sort" label="显示顺序" />
          <!--  -->
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="1"
                inactive-value="2"
                :before-change="beforeChange1()"
              />
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
  reactive, ref, defineProps, toRefs,
} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { roleList } from '../../util/type/requesrtype';
import getrole from '../../util/api/charge/rolecharge';

const roleinfo = ref([]);
getrole().then((res) => {
  roleinfo.value = res.data.data.data;
});
const beforeChange1 = () => (
  new Promise((resolve) => {
    ElMessageBox.confirm(
      `是否停用-${val.rolename}-这个角色嘛？`,
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(() => {
        resolve(true);
        ElMessage({
          type: 'success',
          message: '操作成功',
        });
      })
      .catch(() => {
        resolve(false);
        ElMessage({
          type: 'info',
          message: '取消操作',
        });
      });
  })
);
const handleSelectionChange = () => {
  console.log('123');
};
const handleClick = (val: roleList) => {
  console.log(val);
};
const handleDelete = (val: roleList) => {
  console.log('111');
  ElMessageBox.confirm(
    `是否删除岗位名称为-${val.rolename}-这条数据嘛？`,
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
