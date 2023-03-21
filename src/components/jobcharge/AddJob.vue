<template>
  <div class="addjob">
    <el-dialog
      v-model="dialogVisible"
      title="添加岗位"
      width="50%"
    >
      <el-form :model="form" :rules="rules" label-width="120px">
        <el-form-item label="岗位名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="岗位编码" prop="code">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item label="岗位顺序" prop="sort">
          <el-input-number
            v-model="form.sort"
            :min="1"
            :max="100"
            controls-position="right"
            size="large"
          />
        </el-form-item>
        <el-form-item label="岗位状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="1" size="large">正常</el-radio>
            <el-radio label="2" size="large">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.text" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addForm()">
          新建
        </el-button>
      </span>
    </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, defineExpose, toRaw,
} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

const dialogVisible = ref(false);
const form = reactive({
  name: '',
  code: '',
  sort: 1,
  status: '1',
  text: '',
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '岗位名称不能为空', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '岗位编码不能为空', trigger: 'blur' },
    {
      min: 1, max: 5, message: '岗位编码长度在1-5', trigger: 'blur',
    },
  ],
  sort: [
    { required: true, message: '', trigger: 'blur' },
    { type: 'number', message: '岗位排序必须是数字' },
  ],
  status: [
    { required: true, message: '', trigger: 'blur' },
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

</style>
