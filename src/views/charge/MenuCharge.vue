<template>
  <GlobalContainer>
    <div class="btn">
      <!-- 新增按钮 -->
      <el-button :icon="Plus" type="primary" @click="add()">新增</el-button>
      <el-button :icon="Edit" type="success" disabled>修改</el-button>
      <el-button :icon="Delete" type="danger" disabled>删除</el-button>
    </div>
    <el-table
    id="out-table"
    :data="tableData"
    :border="true"
    style="width: 100%">
    <!--  -->
      <el-table-column type="expand">
        <template #default="props">
          <el-table :data="props.row.children" :border="true">
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column prop="meta.title" label="菜单名称" />
            <!--  -->
            <el-table-column prop="meta.icon" label="图标">
              <template #default="scope">
                  <el-icon :size="20">
                  <component :is="scope.row.meta.icon"/>
                </el-icon>
              </template>
            </el-table-column>
            <!--  -->
            <el-table-column prop="meta.role" label="权限标识" >
              <template #default="scope">
                <el-tag
                  v-for="role in scope.row.meta.role" :key="role"
                  style="margin-right: 10px"
                  type="success"
                  disable-transitions
                  >{{ role }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column prop="path" label="组件路径" />
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClickExpand(scope.row)"
                  >修改</el-button
                >
                <el-button link type="primary" size="small"
                @click="handleDeleteExpand(scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <!--  -->
          </el-table>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="meta.title" label="菜单名称" />
      <!--  -->
      <el-table-column prop="meta.icon" label="图标">
        <template #default="scope">
            <el-icon :size="20">
            <component :is="scope.row.meta.icon"/>
          </el-icon>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column prop="meta.role" label="权限标识">
        <template #default="scope">
          <el-tag
            v-for="role in scope.row.meta.role" :key="role"
            style="margin-right: 10px"
            type="success"
            disable-transitions
            >{{ role }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="path" label="组件路径" />
      <!--  -->
      <!--  -->
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small"
          @click="handleClick(scope.row)" >新增</el-button>
          <el-button link type="primary" size="small" @click="handleClick(scope.row)"
            >修改</el-button
          >
          <el-button link type="primary" size="small"
          @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!--  -->
    </el-table>
    <!-- 新增dialog -->
    <Add-menu ref="RefChilde"></Add-menu>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  Delete, Edit, Search, Share, Bottom, Plus,
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import getmenucharge from '../../util/api/charge/menucharge';
import Addmenu from '../../components/menucharge/AddMenu.vue';

type menu = {
  code: string,
  name: string,
  sort: number,
  status: string,
  text: string,
};
type scope = {
  code: string,
  name: string,
  sort: number,
  status: number,
  time: string,
};
const tableData = ref([]);
const RefChilde = ref();
const RefPagination = ref();
getmenucharge().then((res) => {
  tableData.value = res.data.data;
});
const add = () => {
  RefChilde.value.opendialog();
};
const handleClick = (val:scope) => {
  RefChilde.value.editForm();
  RefChilde.value.form.name = val.name;
  RefChilde.value.form.code = val.code;
  RefChilde.value.form.sort = val.sort;
  RefChilde.value.form.status = String(val.status);
};
const handleDelete = (val:scope) => {
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
const handleAdd = (val:scope) => {
  console.log('122');
};
const handleClickExpand = (val:scope) => {
  RefChilde.value.editForm();
  RefChilde.value.form.name = val.name;
  RefChilde.value.form.code = val.code;
  RefChilde.value.form.sort = val.sort;
  RefChilde.value.form.status = String(val.status);
};
const handleDeleteExpand = (val:scope) => {
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
@import "../../style/views/MenuCharge.scss";
</style>
