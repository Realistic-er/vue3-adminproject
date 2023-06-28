<template>
  <div class="addrole">
    <el-dialog
      v-model="dialogVisible"
      title="添加模块"
      width="50%"
      :before-close="closedialog"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="模块名称" prop="label">
          <el-input v-model="form.label" placeholder="请输入模块名称" />
        </el-form-item>
        <el-form-item label="接口路径" prop="path">
          <el-input v-model="form.path" placeholder="请输入接口路径" />
        </el-form-item>
        <el-form-item label="请求方式" prop="method">
          <el-select v-model="form.method" placeholder="请选择请求方式">
            <el-option v-for="item in option" :key="item"
            :label="item.label" :value="item.value" />
          </el-select>
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
const option = reactive([
  {
    label: 'get',
    value: 'get',
  },
  {
    label: 'post',
    value: 'post',
  },
  {
    label: 'delete',
    value: 'delete',
  },
  {
    label: 'put',
    value: 'put',
  },
]);
const form = reactive({
  label: '',
  path: '',
  method: '',
});
const rules = reactive<FormRules>({
  path: [
    { required: true, message: '路径不能为空', trigger: 'blur' },
  ],
  label: [
    { required: true, message: '模块名称不能为空', trigger: 'blur' },
  ],
  method: [
    { required: true, message: '请求方式不能为空', trigger: 'blur' },
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
  form.path = '';
  form.label = '';
  form.method = '';
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
