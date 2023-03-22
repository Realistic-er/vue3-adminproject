<template>
  <div class="addrole">
    <el-dialog
      v-model="dialogVisible"
      title="添加部门"
      width="50%"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <el-form-item label="字典名称" prop="dictoryname">
          <el-input v-model="form.dictoryname" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictorytype">
          <el-input v-model="form.dictorytype" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="1" size="large">正常</el-radio>
            <el-radio label="2" size="large">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="text">
          <el-input v-model="form.text" placeholder="请输入备注" />
        </el-form-item>
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
import { datatree as datalist, iconlist } from '../../util/data';

const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);
const form = reactive({
  dictoryname: '',
  dictorytype: '',
  status: '1',
  text: '',
});
const rules = reactive<FormRules>({
  dictoryname: [
    { required: true, message: '字典名称不能为空', trigger: 'blur' },
  ],
  dictorytype: [
    { required: true, message: '字典类型不能为空', trigger: 'blur' },
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
const handleNodeClick = (val) => {
  console.log(val);
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
