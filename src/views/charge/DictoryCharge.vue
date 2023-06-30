<template>
  <GlobalContainer>
    <div class="btn">
      <div>
        <!-- 新增按钮 -->
        <el-button :icon="Plus" type="primary" @click="add()">新增</el-button>
        <el-button :icon="Bottom" type="warning" @click="exportExcel()">Excel导出</el-button>
      </div>
      <Refresh-Icon @clickToFather="refresh()"></Refresh-Icon>
    </div>
    <el-table
    id="out-table"
    :data="tableData"
    :border="true"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="dictoryname" label="字典名称" />
      <el-table-column prop="dictorytype" label="字典类型" />
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
      <el-table-column prop="text" label="备注" />
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
    <add-dictory ref="RefChilde"></add-dictory>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  Delete, Edit, Search, Share, Bottom, Plus,
} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
// 引入导出Excel表格依赖
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import RefreshIcon from '@/components/RefreshIcon.vue';
import getdictory from '../../util/api/charge/dictorycharge';
import ElPagination from '../../components/ElPagination.vue';
import AddDictory from '../../components/dictorycharge/AddDictory.vue';

type dictory = {
  dictoryname: string,
  dictorytype: string,
  status: string,
  text: string,
  time: string,
};
type dictorymore = {
  '字典名称': string,
  '字典类型': string,
  '状态': string,
  '创建时间': string,
  '备注': string,
};
const tableData = ref([]);
const RefChilde = ref();
const RefPagination = ref();
const router = useRouter();
const multipleSelection = ref([]);
getdictory().then((res) => {
  tableData.value = res.data.data.data;
});
const refresh = () => {
  ElMessage({
    message: '刷新成功',
    type: 'success',
  });
};
const add = () => {
  RefChilde.value.opendialog();
};
const handleClick = (val) => {
  RefChilde.value.editForm();
  RefChilde.value.form.dictoryname = val.dictoryname;
  RefChilde.value.form.dictorytype = val.dictorytype;
  RefChilde.value.form.time = val.time;
  RefChilde.value.form.text = val.text;
  RefChilde.value.form.status = val.status;
};
const handleDelete = (val) => {
  ElMessageBox.confirm(
    `是否删除岗位名称为-${val.dictoryname}-这条数据嘛？`,
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
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

// 导出表格  按钮点击后触发事件
const exportExcel = () => {
  const wb = XLSX.utils.book_new();
  let wbout;
  if (multipleSelection.value.length > 0) {
    const ws = XLSX.utils.json_to_sheet(multipleSelection.value);
    XLSX.utils.book_append_sheet(wb, ws, `${router.currentRoute.value.meta.title}`); // 工作簿名称
    wbout = XLSX.writeFile(wb, `${router.currentRoute.value.meta.title}.xlsx`); // 保存的文件名
  } else {
    /* 从表生成工作簿对象 */
    const wb1 = XLSX.utils.table_to_book(document.querySelector('#out-table'));
    /* 获取二进制字符串作为输出 */
    wbout = XLSX.write(wb1, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array',
    });
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: 'application/octet-stream' }),
        `${router.currentRoute.value.meta.title}.xlsx`,
      );
    } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout);
    }
  }
  return wbout;
};

</script>

<style lang="scss" scoped>
@import "../../style/views/JobCharge.scss";
</style>
