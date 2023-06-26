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
    style="width: 100%">
      <el-table-column label="序号" type="index" width="50" />
      <!--  -->
      <el-table-column prop="name" label="名字">
        <template #default="scope">
          <el-tag type="success"
          v-for="item in scope.row.name" :key="item.id"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column prop="country" label="国家">
        <template #default="scope">
          <el-tag  type="info"
          v-for="item in scope.row.country" :key="item.country"
            >{{ item.country }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份">
        <template #default="scope">
          <el-tag type="danger"
          v-for="item in scope.row.province" :key="item.id"
            >{{ item.province }}</el-tag
          >
        </template>
      </el-table-column>
      <!--  -->
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
    <Add-Serve ref="RefChilde"></Add-Serve>
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
import RefreshIcon from '@/components/RefreshIcon.vue';
import getinfoList from '../../util/api/monitor/servemonitor';
import AddServe from '../../components/servemonitor/AddServe.vue';
import ElPagination from '../../components/ElPagination.vue';
import {
  name, country, province, nametype, countrytype, provincetype,
} from '../../util/type/servemonitor';

interface RuleForm {
  name: nametype[],
  country: countrytype[],
  province: provincetype[],
}
const tableData = ref([]);
const RefChilde = ref();
const RefPagination = ref();
getinfoList().then((res) => {
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
const handleClick = (val:RuleForm) => {
  RefChilde.value.editForm();
  RefChilde.value.form.name = val.name.map((item) => item.id);
  RefChilde.value.form.country = val.country.map((item) => item.id);
  RefChilde.value.form.province = val.province.map((item) => item.id);
};
const handleDelete = (val:RuleForm) => {
  ElMessageBox.confirm(
    `是否删除服务名称为-${val.name}-这条数据嘛？`,
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
.el-table_1_column_2 {
  .cell {
    display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
    span {
      margin-right: calc(4% / 3);
      margin-bottom: calc(4% / 3);
      flex: 0 0 24%;
    }
    /* 使最后一个元素的边距填满剩余空间 */
    span:last-child{
      margin-right: auto;
    }
  }
}
.el-table_1_column_3 {
  .cell {
    display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
    span {
      margin-right: calc(4% / 3);
      margin-bottom: calc(4% / 3);
      flex: 0 0 24%;
    }
    // span:nth-child(4n){
    //   margin-right: 0;
    // }
    /* 使最后一个元素的边距填满剩余空间 */
    span:last-child{
      margin-right: auto;
    }
  }
}
.el-table_1_column_4 {
  .cell {
    display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
    span {
      margin-right: calc(4% / 3);
      margin-bottom: calc(4% / 3);
      flex: 0 0 24%;
    }
    /* 使最后一个元素的边距填满剩余空间 */
    span:last-child{
      margin-right: auto;
    }
  }
}
</style>
