<template>
  <div class="addmenu">
    <el-dialog
      v-model="dialogVisible"
      title="添加角色"
      width="50%"
      :before-close="closedialog"
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
      <!--  -->
      <!--  -->
      <el-form-item label="菜单权限" prop="menurole">
        <el-checkbox v-model="checked1" label="展开/折叠" @change="change1"/>
        <el-checkbox v-model="checked2" label="全选/全不选" @change="change2"/>
      </el-form-item>
      <!--  -->
      <el-form-item>
        <el-tree :data="data" :props="defaultProps" show-checkbox node-key="label"
        ref="treedata" @node-click="handleNodeClick"/>
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
import { data as datalist, iconlist } from '../../util/data';

interface Tree {
  label: string
  children?: Tree[],
  id?: string;
}
const checked1 = ref(false);
const checked2 = ref(false);
const treedata = ref();
const data: Tree[] = datalist;
const defaultProps = {
  children: 'children',
  label: 'label',
  id: 'id',
};
const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);
const form = reactive({
  rolename: '',
  rolestring: '',
  sort: 1,
  status: '1',
  menurole: [],
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
  form.menurole = treedata.value.getCheckedKeys(true);
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
  form.rolename = '';
  form.rolestring = '';
  form.sort = 1;
  form.status = '1';
  form.menurole = [];
  form.text = '';
  dialogVisible.value = false;
};
const editForm = () => {
  dialogVisible.value = true;
};
const handleNodeClick = (val: Tree) => {
  form.menurole = val.id;
};
const change1 = () => {
  const nodes = treedata.value.store.nodesMap;
  for (const node in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, node)) {
      nodes[node].expanded = checked1.value;
    }
  }
};
const change2 = () => {
  if (checked2.value) {
    treedata.value.setCheckedNodes(data);
  } else {
    treedata.value.setCheckedNodes([]);
  }
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
