<script setup>
  import { ref } from 'vue'

  import { Lock, User } from '@element-plus/icons-vue'
  const isRegiste = ref(true)
  const goLogin = ()=>{
    isRegiste.value = ref(false)
  }
</script>

<template>
<el-row class="login-page">
  <el-col :span="12" class="big-event-left">
  </el-col>
  <el-col :span="6" :offset="3" v-if="isRegiste" >
    <el-form class="form">
      <el-form-item>
        <h1>登录</h1>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-input 
          :prefix-icon=User
          placeholder="Please input name"
        />
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-input
          type="password"
          name="password"
          :prefix-icon=Lock
          placeholder="Please input password"
          show-password
        />
      </el-form-item>          
      <el-form-item class="flex">
        <div class="flex">
          <el-checkbox label="记住我"/>
          <el-link :underline="false" style="width: 80px">忘记密码?</el-link>
        </div>
      </el-form-item>          
      <el-form-item>
        <el-link type="info" :underline="false" @click="goLogin">注册 → </el-link>
      </el-form-item>
    </el-form>
    </el-col>
    <el-col :span="6" :offset="3" v-else>
      <el-form>
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item style="width: 280px">
          <el-input 
          type="text"
          :prefix-icon=User
          placeholder="Please input name"
          />
        </el-form-item>
        <el-form-item style="width: 280px">
          <el-input
            type="password"
            :prefix-icon=Lock
            placeholder="Please input password"
            show-password
          />
        </el-form-item>          
        <el-form-item style="width: 280px">
          <el-input
            type="password"
            :prefix-icon=Lock
            placeholder="Please input password again"
            show-password
          />
        </el-form-item> 
        <el-form-item style="width: 280px">
          <el-button type="primary" style="width: 100%">注册</el-button>
        </el-form-item>          
        <el-form-item>
          <el-link type="info" :underline="false" @click="goLogin"> ← 返回</el-link>
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
  background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto, url('@/assets/login_bg.jpg') no-repeat center / cover;
  border-radius: 0 20px 20px 0;
}

.login-page .form[data-v-8cadd2ac] {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.login-page .el-form-item .flex{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
