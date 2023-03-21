<template>
  <div class="addmenu">
    <el-dialog
      v-model="dialogVisible"
      title="添加角色"
      width="50%"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <!--  -->
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="form.rolename" />
      </el-form-item>

      <el-form-item label="权限字符" prop="rolestring">
        <el-input v-model="form.rolestring" />
      </el-form-item>
      <!--  -->
      <el-form-item label="显示排序" prop="sort">
        <el-input-number
          v-model="form.sort"
          :min="1"
          :max="100"
          controls-position="right"
          size="large"
        />
      </el-form-item>
      <!--  -->
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="1" size="large">正常</el-radio>
          <el-radio label="2" size="large">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="备注" prop="text">
        <el-input v-model="form.text" type="textarea" />
      </el-form-item>
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

const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);
const form = reactive({
  rolename: '',
  rolestring: '',
  sort: 1,
  status: '1',
  menurole: '',
  text: '',
});
const rules = reactive<FormRules>({
  rolename: [
    { required: true, message: '角色名称不能为空', trigger: 'blur' },
  ],
  rolestring: [
    { required: true, message: '权限字符不能为空', trigger: 'blur' },
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
::v-deep .el-form-item__label {
  font-weight:800;
}
</style>
