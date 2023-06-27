<template>
  <div class="menucontainer">
    <el-aside class="sidemenu" :width="isCollapse ? '55px' : '250px'">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        background-color="rgb(48, 65, 86)"
        text-color="rgb(191, 203, 217)"
        active-text-color="rgb(64, 158, 255)"
        router
      >
        <div class="box">
          <img src="@/assets/user.webp" alt="">
          <span v-show="!isCollapse" class="chargename" @click="jumpindex()">后台管理系统</span>
        </div>
      <div
        v-for="(item, index) in menu"
        :key="index">
          <el-menu-item
            v-if="item.children.length === 1"
            :index="item.path + '/' + item.children[0].path"
            @click="saveTagIndex(item.children[0])">
            <el-icon style="margin-right:10px;">
              <component :is="item.children[0].meta.icon"/>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </el-menu-item>
          <template v-else>
            <el-sub-menu :index="index.toString()">
              <template #title>
                <el-icon style="margin-right:10px;">
                  <component :is="item.meta.icon"/>
                </el-icon>
                <span>{{ item.meta.title }}</span>
              </template>
              <el-menu-item v-for="(menu, index) in item.children"
              :key="index"
              :index="item.path + '/' + menu.path"
              @click="saveTagIndex(menu)">
              <el-icon style="margin-right:10px;">
                <component :is="menu.meta.icon"/>
              </el-icon>
                {{ menu.meta.title }}
              </el-menu-item>
            </el-sub-menu>
          </template>
      </div>
      </el-menu>
    </el-aside>

  </div>
</template>

<script lang="ts" setup>
import {
  reactive, ref, computed, toRaw,
} from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import { routearray, routeTag } from '../../util/type/routetype';

const store = useStore();
const menu = ref(JSON.parse(window.localStorage.getItem('menu')));
const isCollapse = computed(() => store.state.menu.isCollapse);
// 一级菜单栏
const saveTagIndex = (para:routearray) => {
  // console.log(para);
  store.commit('changerouteTag', para);
};
const jumpindex = () => {
  router.push({
    name: 'index',
  });
};
</script>

<style lang="scss" scoped>
@import "../../style/components/LeftNav.scss"
</style>
