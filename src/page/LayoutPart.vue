<template>
  <div class="layoutcontainer" :class="[isscreen ? 'layoutcontainer2' : 'layoutcontainer1']">
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
import {
  reactive, ref, computed, watch,
} from 'vue';
import { useStore } from 'vuex';
import LeftNav from '../components/layout/LeftNav.vue';
import TopNav from '../components/layout/TopNav.vue';

const store = useStore();
const isCollapse = computed(() => store.state.menu.isCollapse);
const isscreen = computed(() => store.state.menu.isscreen);
</script>

<style lang="scss" scoped>
@import "../style/page/LayoutPart.scss";
.layoutcontainer1 {
  width: 100%;
  height: 100%;
  display: flex;
}
.layoutcontainer2 {
  width: 100%;
  height: 100%;
  display: flex;
  z-index: -1;
  position: absolute;
}
</style>
