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
        <user-table :userinfo="userinfo"></user-table>
      </div>
      <!--  -->
      </div>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UserTable from '@/components/usercharge/UserTable.vue';
import { datatree } from '@/util/data';
import getuser from '../../util/api/charge/usercharge';

interface Tree {
  label: string
  children?: Tree[],
  id?: string;
}

const userinfo = ref([]);
const getuserlist = () => {
  getuser().then((res) => {
    console.log(res);
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
  console.log(val);
  getuserlist();
}, { immediate: true, deep: true });
</script>

<style lang="scss" scoped>
@import '../../style/views/UserCharge.scss'
</style>
