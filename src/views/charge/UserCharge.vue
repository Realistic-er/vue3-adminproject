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
          <!-- 新增按钮 -->
          <el-button icon="Plus" type="primary" @click="add()">新增</el-button>
          <el-button icon="Edit" type="success" disabled>修改</el-button>
          <el-button icon="Delete" type="danger" disabled>删除</el-button>
          <el-button icon="Bottom" type="warning" @click="exportExcel()">Excel导出</el-button>
        </div>
        <user-table :userinfo="userinfo"></user-table>
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
  console.log(data.id);
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
