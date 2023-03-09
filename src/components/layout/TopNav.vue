<template>
  <div class="topnav">
    <div class="top">
      <!-- 左侧折叠按钮 -->
      <div class="expand">
        <el-icon :size="20" @click.prevent="clickIcon">
          <component :is=" isCollapse ? 'Expand' : 'Fold'"/>
        </el-icon>
      </div>
      <!-- 右侧图标集合 -->
      <div class="icons">
        <el-icon :size="20" v-for="icon in icons"
        :key="icon">
          <component :is="icon"/>
        </el-icon>
        <img src="@/assets/user.webp" class="imgs" alt="">
      </div>
    </div>
    <div class="bottom">
      <el-tag
        v-for="(item,index) in routetagarray"
        class="eltag"
        :effect="item.name === $route.name ? 'dark' : 'plain'"
        :key="item.name"
        :closable="item.name !== 'index'"
        @close="closeTag(item, index)"
        @click="jumpTag(item)"
      >
      {{ item.title }}
    </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, toRaw, computed,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { routeTag } from '../../util/type/routetype';

const store = useStore();
const icons = ['Search', 'FullScreen', 'Lock'];
const isCollapse = computed(() => store.state.menu.isCollapse);
// const routetagarray:routeTag[] = computed(() => store.state.menu.routeTagarray).value;
const routetagarray:routeTag[] = reactive(store.state.menu.routeTagarray);
const router = useRouter();

const clickIcon = () => {
  store.commit('changecollapse');
};
const closeTag = (item:routeTag, index:number) => {
  const currentroute = router.currentRoute.value;
  store.commit('closeTag', item);
  if (item.name === currentroute.name) {
    router.push({
      name: routetagarray[index - 1].name,
    });
  }
};
const jumpTag = (item:routeTag) => {
  router.push({
    name: item.name,
  });
};
</script>

<style lang="scss" scoped>
@import "../../style/components/TopNav.scss";
</style>
