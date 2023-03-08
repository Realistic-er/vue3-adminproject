<template>
  <div class="topnav">
    <div class="top">
      <!-- 展开 -->
      <el-icon :size="20">
        <component :is="'Expand'"/>
      </el-icon>
      <!-- 折叠 -->
      <el-icon :size="20">
        <component :is="'Fold'"/>
      </el-icon>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@import "../../style/components/TopNav.scss";
</style>
