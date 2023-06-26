<template>
  <GlobalContainer>
    <el-steps :active="2" align-center>
      <el-step title="Step 1" description="Some description" />
      <el-step title="Step 2" description="Some description" />
      <el-step title="Step 3" description="Some description" />
      <el-step title="Step 4" description="Some description" />
    </el-steps>
    <!--  -->
    <el-steps :active="1">
      <el-step title="Step 1" description="Some description" />
      <el-step title="Step 2" description="Some description" />
      <el-step title="Step 3" description="Some description" />
    </el-steps>
    <!--  -->
    <el-steps :active="1">
      <el-step title="Step 1" :icon="Edit" />
      <el-step title="Step 2" :icon="Upload" />
      <el-step title="Step 3" :icon="Picture" />
    </el-steps>
  </GlobalContainer>
</template>

<script setup lang="ts">
import { Edit, Picture, Upload } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>

</style>
