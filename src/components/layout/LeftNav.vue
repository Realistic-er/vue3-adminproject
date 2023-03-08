<template>
  <div class="menucontainer">
    <el-menu
        :default-active="currentroute"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        background-color="rgb(48, 65, 86)"
        text-color="rgb(191, 203, 217)"
        active-text-color="rgb(64, 158, 255)"
        @open="handleOpen"
        @close="handleClose"
        router
      >
      <div
      v-for="(item, index) in menu[0].children"
      :key="index">
        <el-menu-item
          v-if="item.children.length === 0"
          :index="'/' + item.path">
          <el-icon>
            <component :is="item.meta.icon"/>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
        <template v-else>
          <el-sub-menu :index="index.toString()">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon"/>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="(menu, index) in item.children"
            :key="index"
            :index="'/' + item.path + '/' + menu.path"
            >
            <el-icon>
              <component :is="menu.meta.icon"/>
            </el-icon>
              {{ menu.meta.title }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentroute = ref(router.currentRoute.value.fullPath);
const menu = JSON.parse(window.localStorage.getItem('menu'));
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
@import "../../style/components/LeftNav.scss"
</style>
