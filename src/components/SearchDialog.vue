<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      :close-on-click-modal="true"
      :show-close="false"
      :modal="true"
    >
      <!--  -->
      <template #header>
        <!-- 输入框 -->
        <el-input v-model="input" class="w-50 m-2"
          placeholder="Search Route" width="100%" >
            <template #prefix>
              <el-icon class="el-input__icon"><search /></el-icon>
            </template>
        </el-input>
        <!--  -->
        <div class="contentbox">
          <div class="contentchild" v-for="item in arraycontent1" :key="item"
          @click="jump(item)">
            <div class="div1">
              <p class="p1">{{ item.name }}</p>
              <div class="p2">
                <p>{{ item.title }}</p>
              </div>
            </div>
            <div class="div2">
              <el-icon size="20px" >
                <BottomRight />
              </el-icon>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import {
  ref, defineExpose, watch, reactive,
} from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import { routearray } from '../permission';

type obj1 = {
  name: string,
  title: string,
}
const store = useStore();
const dialogVisible = ref(false);
const input = ref('');
const opendialog = () => {
  dialogVisible.value = true;
};
const array:obj1[] = reactive([]);
routearray[0].children.forEach((v) => {
  const obj = {
    name: '',
    title: '',
  };
  obj.name = v.name;
  obj.title = v.meta.title;
  array.push(obj);
});
routearray[1].children.forEach((v) => {
  const obj = {
    name: '',
    title: '',
  };
  obj.name = v.name;
  obj.title = v.meta.title;
  array.push(obj);
});
let arraycontent1:obj1[] = reactive([]);
watch(() => input, (val) => {
  const arraycontent:obj1[] = reactive([]);
  array.forEach((item:obj1) => {
    if (item.title.indexOf(input.value) !== -1) {
      arraycontent.push(item);
    }
  });
  arraycontent1 = arraycontent;
}, { deep: true });
const jump = (val:obj1) => {
  dialogVisible.value = false;
  store.commit('changeroute', val);
  router.push({
    name: val.name,
  });
};
defineExpose({
  opendialog,
});
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.contentbox {
  padding-top: 10px;
  color: #409eff;
  .contentchild {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding-top: 10px; */
    border: 2px solid #409eff;
    padding: 0px 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    .div1 {
      display: flex;
      align-items: center;
      .p1 {
        margin-right: 15px;
      }
      .p2 {

      }
    }
    .div2 {

    }
  }
  .contentchild:hover {
    background-color: #409eff;
    color:antiquewhite;
  }
}
</style>
