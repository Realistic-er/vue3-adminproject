<template>
  <div class="topnav">
    <div class="top">
      <!-- 左侧折叠按钮 -->
      <div class="expand">
        <!-- 图标 -->
        <el-icon :size="20" @click.prevent="clickIcon">
          <component :is=" isCollapse ? 'Expand' : 'Fold'"/>
        </el-icon>
        <!-- 面包屑 -->
        <div class="brand">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="route in array" :key="route">
              {{ route.meta.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!-- 右侧图标集合 -->
      <div class="icons">
        <el-button type="primary" icon="Search" text circle
        size="large" class="searchbtn" @click="opendialog()">
          Search
          <span class="keyboard">CRTL+K</span>
        </el-button>
        <el-icon :size="20" v-for="icon in icons"
        :key="icon" @click="handleclick(icon)">
          <component :is="icon"/>
        </el-icon>
        <img src="@/assets/user.webp" class="imgs" alt="" @click="jumpsetting()">
        <el-button type="primary" link class="btn" @click="loginout">退出</el-button>
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
    <!-- 组件 -->
    <Search-Dialog ref="RefChilde"></Search-Dialog>

  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, toRaw, computed, watch,
} from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import { useStore } from 'vuex';
import { ElScrollbar } from 'element-plus';
import screenfull from 'screenfull';
import SearchDialog from '../SearchDialog.vue';
import { routeTag } from '../../util/type/routetype';

const store = useStore();
const RefChilde = ref();
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const icons = ['FullScreen', 'Lock'];
const isCollapse = computed(() => store.state.menu.isCollapse);
const routetagarray = computed(() => store.state.menu.routeTagarray);
const router = useRouter();
const route = useRoute();
const array = ref([]);
const arrayindex = ref([
  {
    path: '/index',
    meta: {
      title: '首页',
    },
  },
]);
watch(() => route.matched, (val) => {
  if (val[1].meta.title !== '首页') {
    array.value = arrayindex.value.concat(val.slice(1));
  } else {
    array.value = val.slice(1);
  }
}, { immediate: true, deep: true });
const clickIcon = () => {
  store.commit('changecollapse');
};
const handleclick = (icon) => {
  if (icon === 'Lock') {
    store.commit('lock');
  } else {
    screenfull.toggle();
  }
};
const closeTag = (item:routeTag, index:number) => {
  const currentroute = router.currentRoute.value;
  store.commit('closeTag', item);
  if (item.name === currentroute.name) {
    router.push({
      name: routetagarray.value[index - 1].name,
    });
  }
};
const jumpsetting = () => {
  router.push({
    name: 'setting',
  });
  store.commit('jumpsetting');
};
const jumpTag = (item:routeTag) => {
  router.push({
    name: item.name,
  });
};
const loginout = () => {
  router.push({
    name: 'login',
  });
};
const opendialog = () => {
  RefChilde.value.opendialog();
};
</script>

<style lang="scss" scoped>
@import "../../style/components/TopNav.scss";
</style>
