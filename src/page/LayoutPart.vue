<template>
  <div class="layoutcontainer">
    <!-- 左侧导航栏 -->
    <div class="leftnav">
      <LeftNav />
    </div>
    <div class="leftcontainer">
      <div class="topnav">
        <TopNav />
      </div>
      <div class="bottomview">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import LeftNav from '../components/layout/LeftNav.vue';
import TopNav from '../components/layout/TopNav.vue';

</script>

<style lang="scss" scoped>
@import "../style/page/LayoutPart.scss";
</style>
