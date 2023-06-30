<template>
  <div class="routecontainer">
    <router-view></router-view>
    <!--  -->
    <Lock-Screen v-show="isscreen"></Lock-Screen>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import LockScreen from '@/components/LockScreen.vue';

const store = useStore();
const isscreen = computed(() => store.state.menu.isscreen);
</script>

<style lang="scss">
  @import "../src/style/RemoveDefault.scss";
  @import '@/style/elementui/ElementUi.scss';
  .routecontainer {
    width:100%;
    height: 100%;
  }
</style>
