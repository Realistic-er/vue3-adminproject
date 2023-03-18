<template>
  <div class="iconlist">
    <ul class="icons">
      <li v-for="icon in iconlist"
      :key="icon">
      <el-icon @click="choose(icon)">
        <component :is="icon"/>
      </el-icon>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, defineExpose, toRaw, defineEmits,
} from 'vue';
import { iconlist } from '../../util/data';

const emit = defineEmits(['choose']);
const choose = (val:string) => {
  console.log(val);
  emit('choose', val);
};
defineExpose({
});
</script>

<style lang="scss" scoped>
.iconlist {
  .icons {
    display: flex;
    align-items: center;
    /* 自动换行属性 */
    flex-wrap: wrap;
    overflow: scroll;
    height: 130px;
    overflow-x: hidden;
    li {
      flex: 0 0 20%;
      margin-bottom: 10px;
      .el-icon {
        font-size: 30px;

      }
    }
  }
}
</style>
