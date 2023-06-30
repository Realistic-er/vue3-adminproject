<template>
  <GlobalContainer>
    <div class="btn">
      <div>
        <!-- 新增按钮 -->
        <el-button :icon="Plus" type="primary" @click="add()">新增</el-button>
        <!-- <el-button :icon="Bottom" type="warning" @click="exportExcel()">Excel导出</el-button> -->
      </div>
      <Refresh-Icon @clickToFather="refresh()"></Refresh-Icon>
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
            <el-table-column prop="path" label="接口路径" />
            <!--  -->
            <el-table-column prop="method" label="请求方式">
            </el-table-column>
            <!--  -->
            <el-table-column prop="label" label="模块名称" >
            </el-table-column>
            <!--  -->
            <el-table-column fixed="right" label="操作">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row)"
                  >修改</el-button
                >
                <el-button link type="primary" size="small"
                @click="handleDeleteExpand(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="value" label="模块名称" />
      <!--  -->
      <el-table-column prop="label" label="模块" />

      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row)"
            >修改</el-button
          >
          <el-button link type="primary" size="small" @click="addLabel(scope.row)"
            >新增</el-button
          >
          <el-button link type="primary" size="small"
          @click="handleDeleteExpand(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!--  -->
    </el-table>
    <!-- 分页 -->
    <el-pagination ref="RefPagination"/>
    <!-- 新增dialog -->
    <Add-Task ref="RefChilde"></Add-Task>
    <!-- 新增dialog -->
    <Add-Label ref="RefChildeAdd"></Add-Label>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  Delete, Edit, Search, Share, Bottom, Plus,
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import RefreshIcon from '@/components/RefreshIcon.vue';
import gettimetask from '../../util/api/monitor/timetask';
import AddTask from '../../components/timetask/AddTask.vue';
import AddLabel from '../../components/timetask/AddLabel.vue';

type menu = {
  code: string,
  name: string,
  sort: number,
  status: string,
  text: string,
};
type scope = {
  label: string,
  value: string,
};
const tableData = ref([]);
const RefChilde = ref();
const RefChildeAdd = ref();
const RefPagination = ref();
gettimetask().then((res) => {
  tableData.value = res.data.data.data;
});
const refresh = () => {
  ElMessage({
    message: '刷新成功',
    type: 'success',
  });
};
const edit = (val:scope) => {
  RefChilde.value.editForm();
  RefChilde.value.form.label = val.label;
  RefChilde.value.form.value = val.value;
};
const add = () => {
  RefChilde.value.opendialog();
};
const addLabel = () => {
  RefChildeAdd.value.opendialog();
};
const handleClick = (val) => {
  RefChildeAdd.value.editForm();
  RefChildeAdd.value.form.path = val.path;
  RefChildeAdd.value.form.label = val.label;
  RefChildeAdd.value.form.method = val.method;
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
    `是否删除岗位名称为-${val.label}-这条数据嘛？`,
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
