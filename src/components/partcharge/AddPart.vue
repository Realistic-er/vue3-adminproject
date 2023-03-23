<template>
  <div class="addrole">
    <el-dialog
      v-model="dialogVisible"
      title="添加部门"
      width="50%"
      :before-close="closedialog"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <!--  -->
      <el-form-item label="上级部门" prop="forwardpart">
        <el-tree-select v-model="form.forwardpart" node-key="id"
          :data="datalist" :render-after-expand="false" />
      </el-form-item>
      <!--  -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="部门名称" prop="partname">
            <el-input v-model="form.partname" placeholder="请输入部门名称" />
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人" prop="personcharge">
            <el-input v-model="form.personcharge" placeholder="请输入负责人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--  -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio label="1" size="large">正常</el-radio>
              <el-radio label="2" size="large">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
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
import { datatree as datalist, iconlist } from '../../util/data';

const checked1 = ref(false);
const checked2 = ref(false);
const treedata = ref();
const defaultProps = {
  children: 'children',
  label: 'label',
  id: 'id',
};
const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);
const form = reactive({
  forwardpart: '',
  partname: '',
  sort: 1,
  personcharge: '',
  phone: '',
  email: '',
  status: '1',
});
const rules = reactive<FormRules>({
  forwardpart: [
    { required: true, message: '上级部门不能为空', trigger: 'blur' },
  ],
  partname: [
    { required: true, message: '部门名称不能为空', trigger: 'blur' },
  ],
  personcharge: [
    { required: true, message: '负责人不能为空', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '联系电话不能为空', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
  ],
});
const opendialog = () => {
  dialogVisible.value = true;
};
const closedialog = () => {
  ruleFormRef.value.resetFields();
  form.forwardpart = '';
  form.partname = '';
  form.sort = 1;
  form.personcharge = '';
  form.phone = '';
  form.email = '';
  form.status = '1';
  dialogVisible.value = false;
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
