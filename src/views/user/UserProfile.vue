<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { userUpdateInfoService } from '@/api/user' 

const formRef = ref(null);
const { userInfo : { id,username,nickname,email }, getUserInfo } = useUserStore();
const form = ref({
  id,
  username,
  nickname,
  email
});

const rules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
  ]
});

const handleSubmit = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(form.value)
  getUserInfo()
  ElMessage.success('修改成功')
};
</script>

<template>
  <PageContainer title="个人详情">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled :style="{ width: '400px'}"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname" :style="{ width: '400px'}"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email" :style="{ width: '400px'}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<style scoped></style>
