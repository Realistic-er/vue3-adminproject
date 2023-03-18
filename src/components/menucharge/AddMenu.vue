<template>
  <div class="addmenu">
    <el-dialog
      v-model="dialogVisible"
      title="添加岗位"
      width="50%"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="上级菜单" prop="forwardmenu" width="50%">
          <el-tree-select v-model="form.forwardmenu"
          :data="data" :render-after-expand="false" />
        </el-form-item>
        <el-form-item label="菜单类型" prop="menutype">
          <el-radio-group v-model="form.menutype">
            <el-radio label="1" size="large">目录</el-radio>
            <el-radio label="2" size="large">菜单</el-radio>
            <el-radio label="3" size="large">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--  -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuname">
              <el-input v-model="form.menuname" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                :min="1"
                :max="100"
                controls-position="right"
                size="large"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!--  -->
        <el-row v-show="isshow1">
          <el-col :span="24">
            <el-form-item label="菜单图标" prop="icon"
            v-popover="popoverRef" v-click-outside="onClickOutside">
            <el-input v-model="form.icon">
              <template #prefix>
                <el-icon>
                  <component :is="form.icon"/>
                </el-icon>
              </template>
            </el-input>
            </el-form-item>
            <el-popover
                ref="popoverRef"
                trigger="click"
                virtual-triggering
                persistent
                width="30%"
              >
              <icon-list @choose="chooseicon"></icon-list>
            </el-popover>
        </el-col>
        </el-row>
        <!--  -->
        <el-row v-show="isshow1">
          <el-col :span="12">
            <el-form-item label="是否外链" prop="isout">
              <el-radio-group v-model="form.isout">
                <el-radio label="1" size="large">是</el-radio>
                <el-radio label="2" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由地址" prop="routeaddress">
              <el-input v-model="form.routeaddress" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isshow1">
          <el-col :span="12">
            <el-form-item label="显示状态" prop="showstatus">
              <el-radio-group v-model="form.showstatus">
                <el-radio label="1" size="large">显示</el-radio>
                <el-radio label="2" size="large">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单状态" prop="menustatus">
              <el-radio-group v-model="form.menustatus">
                <el-radio label="1" size="large">正常</el-radio>
                <el-radio label="2" size="large">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  -->

        <!--  -->
        <el-row>
          <el-col :span="12" v-show="isshow2">
            <el-form-item label="组件路径" prop="componentpath">
              <el-input v-model="form.componentpath" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-show="isshow4">
            <el-form-item label="权限字符" prop="rolestring">
              <el-input v-model="form.rolestring" />
            </el-form-item>
          </el-col>
        </el-row>

        <!--  -->
        <el-row v-show="isshow2">
          <el-col :span="12">
            <el-form-item label="路由参数" prop="routequery">
              <el-input v-model="form.routequery" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否缓存" prop="isalive">
              <el-radio-group v-model="form.isalive">
                <el-radio label="1" size="large">是</el-radio>
                <el-radio label="2" size="large">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  -->
        <!--  -->
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addForm(ruleFormRef)">
          新建
        </el-button>
      </span>
    </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, defineExpose, toRaw, unref, watch,
} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
  ClickOutside as vClickOutside, ElMessage,
} from 'element-plus';
import IconList from './IconList.vue';
import { data, iconlist } from '../../util/data';

const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);
const popoverRef = ref();
const isshow1 = ref(true);
const isshow2 = ref(true);
const isshow4 = ref(false);
const form = reactive({
  forwardmenu: '',
  menutype: '1',
  icon: 'Search',
  menuname: '',
  sort: 1,
  isout: '1',
  routeaddress: '',
  componentpath: '',
  rolestring: '',
  routequery: '',
  isalive: '1',
  showstatus: '1',
  menustatus: '1',
});
const rules = reactive<FormRules>({
  forwardmenu: [
    { required: true, message: '岗位名称不能为空', trigger: 'blur' },
  ],
  menutype: [
    { required: true, message: '岗位编码不能为空', trigger: 'blur' },
    {
      min: 1, max: 5, message: '岗位编码长度在1-5', trigger: 'blur',
    },
  ],
  icon: [
    { required: true, message: '', trigger: 'blur' },
  ],
  menuname: [
    { required: true, message: '', trigger: 'blur' },
  ],
});
watch(() => form.menutype, (val) => {
  if (form.menutype === '1') {
    isshow1.value = true;
    isshow2.value = false;
    isshow4.value = false;
  } else if (form.menutype === '2') {
    isshow1.value = true;
    isshow2.value = true;
    isshow4.value = true;
  } else if (form.menutype === '3') {
    isshow1.value = false;
    isshow2.value = false;
    isshow4.value = true;
  }
}, { immediate: true, deep: true });
const opendialog = () => {
  dialogVisible.value = true;
};
const addForm = (formEl: FormInstance | undefined) => {
  ElMessage({
    message: `${toRaw(form)}`,
    type: 'success',
  });
  dialogVisible.value = false;
  if (!formEl) return;
  formEl.resetFields();
};
const editForm = () => {
  dialogVisible.value = true;
};
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
const chooseicon = (val:string) => {
  form.icon = val;
};
defineExpose({
  opendialog,
  editForm,
  form,
});
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  font-weight:800;
}
</style>
