<template>
  <div class="formcontainer">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="form"
    >
      <p>后台管理系统</p>
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入账号" :prefix-icon="User"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" :prefix-icon="Lock"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const ruleForm = reactive({
  name: 'admin',
  password: '123456',
});

const rules = reactive<FormRules>({
  name: [
    {
      required: true, message: '请输入账号', trigger: 'blur',
    },
    {
      min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur',
    },
  ],
  password: [
    {
      required: true, message: '请输入密码', trigger: 'blur',
    },
    {
      min: 3, max: 6, message: 'Length should be 3 to 5', trigger: 'blur',
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('路由跳转');
      router.push('/index');
      window.localStorage.setItem('account', ruleForm.name);
    } else {
      console.log('校验失败', fields);
    }
  });
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>

<style lang="scss" scoped>
@import "../../style/components/LoginForm.scss"
</style>
