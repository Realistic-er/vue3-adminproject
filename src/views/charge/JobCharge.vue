<template>
  <GlobalContainer>
    <div class="btn">
      <!-- 新增按钮 -->
      <el-button :icon="Plus" type="primary" @click="add()">新增</el-button>
      <el-button :icon="Edit" type="success" disabled>修改</el-button>
      <el-button :icon="Delete" type="danger" disabled>删除</el-button>
      <el-button :icon="Bottom" type="warning" @click="exportExcel()">Excel导出</el-button>
    </div>
    <el-table
    id="out-table"
    :data="tableData"
    :border="true"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="code" label="岗位编码" />
      <el-table-column prop="name" label="岗位名称" />
      <el-table-column prop="sort" label="岗位排序" />
      <!--  -->
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === 1 ? '' : 'danger'"
            disable-transitions
            >{{ scope.row.status === 1 ? '正常' : '停用' }}</el-tag
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
// 引入导出Excel表格依赖
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import getjobcharge from '../../util/api/charge/jobcharge';
import AddJob from '../../components/jobcharge/AddJob.vue';
import ElPagination from '../../components/ElPagination.vue';

type job = {
  code: string,
  name: string,
  sort: number,
  status: string,
  note: string,
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
getjobcharge().then((res) => {
  tableData.value = res.data.data.data;
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
  console.log('111');
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
const handleSelectionChange = (val:job[]) => {
  console.log(val);
};

// 导出表格  按钮点击后触发事件
const exportExcel = () => {
  /* 从表生成工作簿对象 */
  const wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
  /* 获取二进制字符串作为输出 */
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array',
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      'idea.xlsx',
    );
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout);
  }
  return wbout;
};

</script>

<style lang="scss" scoped>
@import "../../style/views/JobCharge.scss";
</style>
