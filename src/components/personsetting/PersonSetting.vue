<template>
  <div class="addmenu">
    <el-dialog
      v-model="dialogVisible"
      title="编辑个人信息"
      width="50%"
      :before-close="closedialog"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
      <!--  -->
      <el-form-item label="用户头像" prop="image">
        <el-upload
          class="avatar-uploader"
          :limit="1"
          :auto-upload="false"
          action="#"
          ref="uploadRef"
          :show-file-list="false"
          :on-change="handleChange"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl"
          alt="" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!--  -->
      <el-row>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <!--  -->
      <el-row>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
      </el-row>
      <!--  -->
      <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="飞书" prop="facebook">
              <el-input v-model="form.facebook" />
            </el-form-item>
          </el-col>
      </el-row>
      <!--  -->
      <el-row>
          <el-col :span="12">
            <el-form-item label="部门管理" prop="part">
              <el-select v-model="form.part" placeholder="请选择部门">
                <el-option v-for="item in partment" :key="item"
                :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属角色" prop="role">
              <el-select v-model="form.role" placeholder="请选择角色">
                <el-option v-for="item in rolelist" :key="item"
                :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closedialog()">取消</el-button>
        <el-button type="primary" @click="addForm(ruleFormRef)">
          编辑
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
import img1 from '@/assets/user.webp';
import type {
  FormInstance, FormRules, UploadProps, UploadInstance,
} from 'element-plus';
import {
  ClickOutside as vClickOutside, ElMessage,
} from 'element-plus';
import { data as datalist, iconlist } from '../../util/data';
// import type { UploadProps, UploadUserFile } from 'element-plus';

interface Tree {
  label: string
  children?: Tree[],
  id?: string;
}
const uploadRef = ref<UploadInstance>();
const partment = reactive([
  {
    label: '人事部门',
    value: 1,
  },
  {
    label: '算法部门',
    value: 2,
  },
  {
    label: '行政部门',
    value: 3,
  },
  {
    label: '运营部门',
    value: 4,
  },
]);
const rolelist = reactive([
  {
    label: 'admin',
    value: 1,
  },
  {
    label: 'staff',
    value: 2,
  },
  {
    label: 'visit',
    value: 3,
  },
]);
const img = ref(img1);
const ruleFormRef = ref<FormInstance>();
const dialogVisible = ref(false);
const form = reactive({
  imageUrl: '',
  name: '',
  sex: '',
  age: '',
  phone: '',
  email: '',
  facebook: '',
  part: '',
  role: '',
});
const rules = reactive<FormRules>({
  imageUrl: [
    { required: true, message: '用户头像不能为空', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '用户名称不能为空', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '性别不能为空', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '年龄不能为空', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '手机不能为空', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
  ],
  facebook: [
    { required: true, message: '飞书不能为空', trigger: 'blur' },
  ],
  part: [
    { required: true, message: '部门不能为空', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '角色不能为空', trigger: 'blur' },
  ],
});
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  form.imageUrl = window.URL.createObjectURL(uploadFile.raw);
  console.log(uploadRef);
  // 上传成功以后
  uploadRef.value.clearFiles(); // 先删除选择的文件
};
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
  form.imageUrl = img.value;
  form.name = '';
  form.sex = '';
  form.age = '';
  form.phone = '';
  form.email = '';
  form.facebook = '';
  form.part = '';
  form.role = '';
  dialogVisible.value = false;
};
const editForm = () => {
  dialogVisible.value = true;
};
// const handleNodeClick = (val: Tree) => {
//   form.menurole = val.id;
// };
// const change1 = () => {
//   const nodes = treedata.value.store.nodesMap;
//   for (const node in nodes) {
//     if (Object.prototype.hasOwnProperty.call(nodes, node)) {
//       nodes[node].expanded = checked1.value;
//     }
//   }
// };
// const change2 = () => {
//   if (checked2.value) {
//     treedata.value.setCheckedNodes(data);
//   } else {
//     treedata.value.setCheckedNodes([]);
//   }
// };
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
.el-form-item__content {
  .avatar-uploader {
    ::v-deep .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}

</style>
