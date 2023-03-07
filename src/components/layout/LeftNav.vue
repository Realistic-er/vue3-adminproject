<template>
  <div class="menucontainer">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
        router
      >
      <template
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
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

const menu = JSON.parse(window.localStorage.getItem('menu'));
console.log(menu);
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
