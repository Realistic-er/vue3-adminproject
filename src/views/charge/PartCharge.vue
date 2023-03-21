<template>
  <GlobalContainer>
    <el-table
      :data="datatree"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :border="true"
    >
      <el-table-column prop="label" label="部门名称" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="time" label="创建时间" />
    </el-table>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { parttype } from '../../util/type/requesrtype';
import { datatree } from '../../util/data';

</script>

<style lang="scss" scoped>

</style>
