<template>
  <GlobalContainer>
    <div class="containeruser">
      <!--  -->
      <div class="left">
        <el-tree :data="data" :props="defaultProps"
          node-key="id"
          current-node-key="beijingyanfa"
          @node-click="handleNodeClick" />
      </div>
      <!--  -->
      <div class="right">
        <div class="btn">
          <div>
            <!-- 新增按钮 -->
            <el-button icon="Plus" type="primary" @click="add()">新增</el-button>
            <el-button icon="Bottom" type="warning" @click="exportExcel()">Excel导出</el-button>
          </div>
          <Refresh-Icon @clickToFather="refresh()"></Refresh-Icon>
        </div>
        <user-table :userinfo="userinfo"></user-table>
        <!-- 分页 -->
        <el-pagination ref="RefPagination"/>
      </div>
      <!--  -->
      </div>
      <!-- dialog -->
      <add-user ref="RefChilde"></add-user>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UserTable from '@/components/usercharge/UserTable.vue';
import AddUser from '@/components/usercharge/AddUser.vue';
import RefreshIcon from '@/components/RefreshIcon.vue';
import { datatree } from '@/util/data';
import getuser from '../../util/api/charge/usercharge';

interface Tree {
  label: string
  children?: Tree[],
  id?: string;
}
const RefChilde = ref();
const userinfo = ref([]);
const getuserlist = () => {
  getuser().then((res) => {
    userinfo.value = res.data.data.data;
  });
};
getuserlist();
const handleNodeClick = (data: Tree) => {
  console.log('');
};
const refresh = () => {
  ElMessage({
    message: '刷新成功',
    type: 'success',
  });
};
const data: Tree[] = datatree;
const defaultProps = {
  children: 'children',
  label: 'label',
  id: 'id',
};
watch(() => data.id, (val) => {
  getuserlist();
}, { immediate: true, deep: true });
const add = () => {
  RefChilde.value.opendialog();
};
</script>

<style lang="scss" scoped>
@import '../../style/views/UserCharge.scss'
</style>
