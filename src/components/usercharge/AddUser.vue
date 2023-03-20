<template>
  <div class="addmenu">
    <el-dialog
      v-model="dialogVisible"
      title="添加岗位"
      width="50%"
      :before-close="handleClose()"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <!-- 1 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="form.name" placeholder="请输入用户昵称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="name">
              <el-select v-model="form.part"
              clearable @clear="handleClear" placeholder="请选择部门">
                <el-option hidden  :value="form.part" :label="labelshow">
                </el-option>
                <el-tree :data="data" :props="defaultProps"
                node-key="id"
                current-node-key="beijingyanfa"
                @node-click="handleNodeClick" />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <!-- 2 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入手机邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入用户密码" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 4 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-select v-model="form.sex" clearable placeholder="请选择用户性别">
                <el-option
                  v-for="item in optionssex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio label="1">正常</el-radio>
                <el-radio label="2">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 5 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位" prop="job">
              <el-select v-model="form.job" clearable placeholder="请选择岗位">
                <el-option
                  v-for="item in optionsjob"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="role">
              <el-select v-model="form.role" clearable placeholder="请选择角色">
                <el-option
                  v-for="item in optionsrole"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-form-item label="备注" prop="text">
          <el-input v-model="form.text" type="textarea" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelForm(ruleFormRef)">取消</el-button>
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
  reactive, ref, defineExpose, toRaw, unref, watch, getCurrentInstance,
} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import {
  ClickOutside as vClickOutside, ElMessage,
} from 'element-plus';
import { datatree, iconlist } from '../../util/data';
import { userlist } from '../../util/type/requesrtype';

interface Tree {
  label: string
  children?: Tree[],
  id?: string;
}
const optionssex = [
  {
    value: '男',
    label: '男',
  },
  {
    value: '女',
    label: '女',
  },
];
const optionsjob = [
  {
    value: '董事长',
    label: '董事长',
  },
  {
    value: '项目经理',
    label: '项目经理',
  },
  {
    value: '人力资源',
    label: '人力资源',
  },
  {
    value: '普通员工',
    label: '普通员工',
  },
];
const optionsrole = [
  {
    value: '董事长',
    label: '董事长',
  },
  {
    value: '普通员工',
    label: '普通员工',
  },
];
const form = reactive({
  name: '',
  part: '',
  phone: '',
  email: '',
  username: '',
  password: '123456',
  sex: '',
  status: '1',
  job: '',
  role: '',
  text: '',
});
const labelshow = ref('');
const data: Tree[] = datatree;
const defaultProps = {
  children: 'children',
  label: 'label',
  id: 'id',
};
const handleNodeClick = (val: Tree) => {
  form.part = val.id;
  labelshow.value = val.label;
};
const handleClear = () => {
  form.part = '';
  labelshow.value = '';
};

const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '用户昵称不能为空', trigger: 'blur' },
  ],
  part: [
    { required: true, message: '部门不能为空', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '手机号码不能为空', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '用户名称不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '性别不能为空', trigger: 'blur' },
  ],
  job: [
    { required: true, message: '岗位不能为空', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '角色不能为空', trigger: 'blur' },
  ],
});

const opendialog = () => {
  dialogVisible.value = true;
};
const addForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      ElMessage({
        message: `${toRaw(form)}`,
        type: 'success',
      });
      dialogVisible.value = false;
    } else {
      console.log('1122');
    }
  });
};
const cancelForm = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false;
};
const handleClose = (formEl: FormInstance | undefined) => {
  ruleFormRef.value?.clearValidate();
};
const editForm = () => {
  dialogVisible.value = true;
};
// 初始化
const instance = getCurrentInstance();
// 接收事件
instance?.proxy?.$Bus.on('on-click', (val: userlist) => {
  dialogVisible.value = true;
  form.username = val.username;
  form.name = val.name;
  form.part = val.part;
  form.email = val.email;
  form.status = val.status;
  form.phone = val.phone;
  form.password = val.password;
  form.sex = val.sex;
  form.job = val.job;
  form.role = val.role;
  form.text = val.text;
});
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
