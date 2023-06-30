<template>
<div class="lockfather">
  <div class="unlock">
    <el-input v-model="input" placeholder="情输入解锁密码"
    width="50px" :clearable="true"></el-input>
    <el-button :icon="Unlock" type="primary" @click="lockin">解锁</el-button>
  </div>

</div>
</template>

<script setup lang="ts">
import {
  reactive, ref, toRaw, computed, watch,
} from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { Unlock } from '@element-plus/icons-vue';

const input = ref();
const store = useStore();
const isscreen = computed(() => store.state.menu.isscreen);
const lockin = () => {
  const account = window.localStorage.getItem('account');
  if (account === input.value) {
    ElMessage({
      message: '解锁成功',
      type: 'success',
    });
    store.commit('lock');
    input.value = '';
  } else {
    ElMessage.error('锁屏密码不正确,请重试');
  }
};
</script>

<style lang="scss" scoped>
.lockfather {
  z-index: 2005;
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("@/assets/backgroundlogin.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .unlock {
    width: 20%;
    position: absolute;
    left: 50%;
    margin-left: -10%;
    bottom: 20%;
    display: flex;
  }
}

</style>
