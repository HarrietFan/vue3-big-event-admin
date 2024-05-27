<script setup>
import { ref } from 'vue';
import { userUpdatePasswordService } from '@/api/user';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
const pwdFormRef = ref(null);
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
});

const validatePassword = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'));
  } else {
    callback();
  }
}
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认新密码与新密码不一致'));
  } else {
    callback();
  }
}

const rules = ref({
  old_pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须在6到15位之间', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须在6到15位之间', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '确认新密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度必须在6到15位之间', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
});

const userStore = useUserStore();
const router = useRouter();
const submitForm = async( )=> {
  await pwdFormRef.value.validate();
  await userUpdatePasswordService(pwdForm.value);
  ElMessage.success('密码修改成功');
  userStore.removeToken();
  userStore.setUserInfo({})
  router.push('/login');
}

function resetForm() {
  pwdFormRef.value.resetFields();
}


</script>

<template>
  <PageContainer title="重置密码">
    <el-form :model="pwdForm" :rules="rules" ref="pwdFormRef" label-width="100px">
    <el-form-item label="原密码" prop="old_pwd">
      <el-input type="password" v-model="pwdForm.old_pwd" :style="{width: '400px'}"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="new_pwd">
      <el-input type="password" v-model="pwdForm.new_pwd" :style="{width: '400px'}"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="re_pwd">
      <el-input type="password" v-model="pwdForm.re_pwd" :style="{width: '400px'}"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">修改密码</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  </PageContainer>
</template>

<style scoped></style>
