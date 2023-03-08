<template>
  <div class="layoutcontainer">
    <!-- 左侧导航栏 -->
    <div class="leftnav">
      <LeftNav />
    </div>
    <div class="leftcontainer" :style="{'margin-left': isCollapse ? '-190px' : '0px'}">
      <TopNav />
      <router-view></router-view>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import LeftNav from '../components/layout/LeftNav.vue';
import TopNav from '../components/layout/TopNav.vue';

const store = useStore();
const isCollapse = computed(() => store.state.menu.isCollapse);
</script>

<style lang="scss" scoped>
@import "../style/page/LayoutPart.scss";
</style>
