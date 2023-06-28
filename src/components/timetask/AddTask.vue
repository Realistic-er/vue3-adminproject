<template>
  <div class="addrole">
    <el-dialog
      v-model="dialogVisible"
      title="添加模块"
      width="50%"
      :before-close="closedialog"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="模块" prop="label">
          <el-input v-model="form.label" placeholder="请输入模块" />
        </el-form-item>
        <el-form-item label="模块名称" prop="value">
          <el-input v-model="form.value" placeholder="请输入模块名称" />
        </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closedialog()">取消</el-button>
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
import { datatree as datalist, iconlist } from '../../util/data';

const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);
const form = reactive({
  label: '',
  value: '',
});
const rules = reactive<FormRules>({
  label: [
    { required: true, message: '模块不能为空', trigger: 'blur' },
  ],
  value: [
    { required: true, message: '模块名称不能为空', trigger: 'blur' },
  ],
});
const opendialog = () => {
  dialogVisible.value = true;
};
const addForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage({
        message: `${toRaw(form)}`,
        type: 'success',
      });
      dialogVisible.value = false;
      formEl.resetFields();
    } else {
      console.log('error submit!', fields);
    }
  });
};
const closedialog = () => {
  ruleFormRef.value.resetFields();
  form.label = '';
  form.value = '';
  dialogVisible.value = false;
};
const editForm = () => {
  dialogVisible.value = true;
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
