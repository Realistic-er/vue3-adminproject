<template>
  <div class="pagination">
    <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[5, 10, 15, 20]"
    background layout="prev, pager, next" :total="20" />
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, defineExpose, toRaw,
} from 'vue';

const currentPage = ref(1);
const pageSize = ref(5);

defineExpose({
  currentPage,
  pageSize,
});
</script>

<style lang="scss" scoped>
.pagination {
  position: relative;
  padding-top: 10px;
  .el-pagination {
    position: absolute;
    right: 0;
  }
}
</style>
