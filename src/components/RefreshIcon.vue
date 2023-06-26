<template>
  <div class="fresh" @click="changehandle">
    <el-icon size="20px" >
      <Refresh />
    </el-icon>
    <span>刷新</span>
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, defineExpose, toRaw, defineEmits,
} from 'vue';

const emit = defineEmits(['clickToFather']);
const changehandle = () => {
  emit('clickToFather');
};
</script>

<style lang="scss" scoped>
.fresh {
    display: flex;
    align-items: center;
    padding-right: 15px;
    color: #337ecc;
    span {
      margin-left: 5px;
    }
}
.fresh:hover {
  cursor: pointer;

}
</style>
