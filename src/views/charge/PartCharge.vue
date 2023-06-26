<template>
  <GlobalContainer>
    <div class="btn">
        <!-- 新增按钮 -->
        <el-button icon="Plus" type="primary" @click="add()">新增</el-button>
        <Refresh-Icon @clickToFather="refresh()"></Refresh-Icon>
      </div>
    <el-table
      :data="datatree"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :border="true"
    >
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="partname" label="部门名称" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === '1' ? '' : 'danger'"
            disable-transitions
            >{{ scope.row.status === '1' ? '正常' : '停用' }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="time" label="创建时间" />
      <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small"
        @click="handleEdit(scope.row)"
          >编辑</el-button>
        <el-button link type="primary" size="small"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!--  -->
    <!-- 分页 -->
    <el-pagination ref="RefPagination"/>
    <add-part ref="RefChilde"></add-part>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import RefreshIcon from '@/components/RefreshIcon.vue';
import { part } from '../../util/type/requesrtype';
import AddPart from '../../components/partcharge/AddPart.vue';
import getpart from '../../util/api/charge/partcharge';

const datatree = ref([]);
const RefChilde = ref();
getpart().then((res) => {
  datatree.value = res.data.data.data;
});
const refresh = () => {
  ElMessage({
    message: '刷新成功',
    type: 'success',
  });
};
const handleEdit = (val) => {
  RefChilde.value.opendialog();
  RefChilde.value.form.partname = val.partname;
  RefChilde.value.form.sort = val.sort;
  RefChilde.value.form.personcharge = val.personcharge;
  RefChilde.value.form.phone = val.phone;
  RefChilde.value.form.email = val.email;
  RefChilde.value.form.status = val.status;
};
const handleDelete = (val) => {
  ElMessageBox.confirm(
    `是否删除岗位名称为-${val.partname}-这条数据嘛？`,
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
const add = () => {
  RefChilde.value.opendialog();
};
</script>

<style lang="scss" scoped>
.btn {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #909399;

}
</style>
