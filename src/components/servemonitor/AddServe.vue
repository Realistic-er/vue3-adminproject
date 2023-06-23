<template>
  <div class="addjob">
    <el-dialog
      v-model="dialogVisible"
      title="添加服务"
      width="50%"
      :before-close="closedialog"
    >
      <el-form :model="form" :rules="rules" label-width="120px" ref="ruleFormRef">
        <!--  -->
        <el-form-item label="名称" prop="name">
          <el-checkbox-group v-model="form.name">
            <el-checkbox v-for="item in name" :key="item.id"
            :label="item.id">
            {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--  -->
        <el-form-item label="国家" prop="country">
          <el-checkbox-group v-model="form.country">
            <el-checkbox v-for="item in country" :key="item"
            :label="item.id" :name="item.id.toString()">
            {{ item.country }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--  -->
        <el-form-item label="省份" prop="province">
          <el-checkbox-group v-model="form.province">
            <el-checkbox v-for="item in province" :key="item"
            :label="item.id" :name="item.id.toString()">
            {{ item.province }}
            </el-checkbox>
          </el-checkbox-group>
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
  reactive, ref, defineExpose, toRaw, nextTick,
} from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import {
  name, country, province, nametype, countrytype, provincetype,
} from '../../util/type/servemonitor';

const dialogVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
interface RuleForm {
  name: nametype[],
  country: countrytype[],
  province: provincetype[],
}
const form = reactive<RuleForm>({
  name: [],
  country: [],
  province: [],
});
const rules = reactive<FormRules>({
  name: [
    {
      type: 'array',
      required: true,
      message: '名称不能为空',
      trigger: 'change',
    },
  ],
  country: [
    {
      type: 'array',
      required: true,
      message: '国家不能为空',
      trigger: 'change',
    },
  ],
  province: [
    {
      type: 'array',
      required: true,
      message: '省份不能为空',
      trigger: 'change',
    },
  ],
});
const opendialog = () => {
  dialogVisible.value = true;
};
const closedialog = () => {
  ruleFormRef.value.resetFields();
  form.name = [];
  form.country = [];
  form.province = [];
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

defineExpose({
  opendialog,
  editForm,
  form,
});
</script>

<style lang="scss" scoped>

</style>
