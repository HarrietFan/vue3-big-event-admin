<script setup>
import { ref, watch } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import router from '@/router'

import { userLoginService, userRegisterService } from '@/api/user'
import { useUserStore } from '@/stores'

const isRegister = ref(true)

// 表单数据，注：ref，响应式
const ruleModel = ref({
  username: '',
  password: '',
  repassword: ''
})

// 当isRegister切换时，表单数据重置。
watch(isRegister, () => {
  ruleModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

// 表单验证
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^\S{5,10}$/, message: '用户名必须是 5-10位 的非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码必须是 6-15位 的非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '确认密码必须是 6-15位 的非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// form暴露的提前验证方法: validate()
const form = ref(null)
// 注册
const register = async () => {
  await form.value.validate()
  await userRegisterService(ruleModel.value)
    .then(() => {
      ElMessage.success('注册成功')
      isRegister.value = true
    })
    .catch((err) => {
      console.log(err)
    })
}
// 登录
const userStore = useUserStore()
const login = async () => {
  await form.value.validate()
  await userLoginService(ruleModel.value)
    .then((res) => {
      userStore.setToken(res.data.token)
      ElMessage.success('登录成功')
      router.push('/')
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="big-event-left"> </el-col>
    <el-col :span="6" :offset="3" v-if="isRegister">
      <el-form class="form" :model="ruleModel" :rules="rules" ref="form">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item style="width: 100%" prop="username">
          <el-input v-model="ruleModel.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item style="width: 100%" prop="password">
          <el-input
            type="password"
            v-model="ruleModel.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>

        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox label="记住我" />
            <el-button key="primary" type="primary" link> 忘记密码? </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="login"> 登录 </el-button>
        </el-form-item>
        <el-form-item>
          <el-button key="info" type="info" link @click="isRegister = false"> 注册 → </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6" :offset="3" v-else>
      <el-form :model="ruleModel" :rules="rules" ref="form">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item style="width: 100%" prop="username">
          <el-input v-model="ruleModel.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item sstyle="width: 100%" prop="password">
          <el-input
            type="password"
            v-model="ruleModel.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item style="width: 100%" prop="repassword">
          <el-input
            type="password"
            v-model="ruleModel.repassword"
            :prefix-icon="Lock"
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="register"> 注册 </el-button>
        </el-form-item>
        <el-form-item>
          <el-button key="info" type="info" link @click="isRegister = true"> ← 返回 </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background-color: #fff;
}

.login-page .big-event-left[data-v-8cadd2ac] {
  background:
    url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
  border-radius: 0 20px 20px 0;
}

.login-page .form[data-v-8cadd2ac] {
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  user-select: none;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.login-page .el-form-item .flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
