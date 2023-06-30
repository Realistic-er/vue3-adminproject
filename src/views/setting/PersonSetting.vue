<template>
  <GlobalContainer>
    <el-descriptions
      class="margin-top"
      title="个人信息"
      :column="2"
      border
    >
      <template #extra>
        <el-button type="primary" @click="edit()">编辑</el-button>
      </template>
      <el-descriptions-item v-for="item in useinfolist" :key="item">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
            {{ item.label }}
          </div>
        </template>
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 新增dialog -->
    <Person-Setting ref="RefChilde"></Person-Setting>
  </GlobalContainer>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import img1 from '@/assets/user.webp';
import PersonSetting from '../../components/personsetting/PersonSetting.vue';

type useinfo = {
  label: string,
  value: string,
  icon: string,
};
const img = ref(img1);
const useinfolist:useinfo[] = [
  {
    label: '用户名称',
    value: 'admin',
    icon: 'User',
  },
  {
    label: '性别',
    value: '男',
    icon: 'Male',
  },
  {
    label: '年龄',
    value: '30',
    icon: 'Aim',
  },
  {
    label: '电话',
    value: '12345678901',
    icon: 'PhoneFilled',
  },
  {
    label: '邮箱',
    value: '1233@163.com',
    icon: 'MessageBox',
  },
  {
    label: '飞书',
    value: '啥都好说',
    icon: 'Promotion',
  },
  {
    label: '所属部门',
    value: 'part1223',
    icon: 'Stamp',
  },
  {
    label: '所属角色',
    value: 'admin',
    icon: 'UserFilled',
  },
  {
    label: '创建时间',
    value: '2020-09-88',
    icon: 'Clock',
  },
  {
    label: '公司地点',
    value: '北京',
    icon: 'Position',
  },
];
const RefChilde = ref();
const edit = () => {
  RefChilde.value.opendialog();
  RefChilde.value.form.imageUrl = img.value;
  RefChilde.value.form.name = useinfolist[0].value;
  RefChilde.value.form.sex = useinfolist[1].value;
  RefChilde.value.form.age = useinfolist[2].value;
  RefChilde.value.form.phone = useinfolist[3].value;
  RefChilde.value.form.email = useinfolist[4].value;
  RefChilde.value.form.facebook = useinfolist[5].value;
  RefChilde.value.form.part = useinfolist[6].value;
  RefChilde.value.form.role = useinfolist[7].value;
};
</script>

<style lang="scss" scoped>
</style>
