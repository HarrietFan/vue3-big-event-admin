<script setup>
import { Management, Document, User, UserFilled, Crop, EditPen, ArrowDown,SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
onMounted(()=>{
  userStore.getUserInfo()
})

// 头部下拉菜单操作
const handleCommand = async (command)=>{
  if(command === 'logout'){
    await ElMessageBox.confirm("你确认要退出登录吗？",'温馨提示',{
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    })
    // logout
    userStore.removeToken()
    userStore.setUserInfo({})
    router.push('/login')
  }else{
    router.push(`/user/${command}`)
  }
}
</script>


<template>
  <el-container class="layout-container">
    <el-aside >
      <div class="el-aside_logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item index="/article/channel">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>文章分类</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Management /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="4">
          <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>个人中心</span>
          </template>
            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Crop /></el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><EditPen /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>程序员：<strong>{{ userStore.userInfo.nickname || userStore.userInfo.username }}</strong></div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :size="40" :src="userStore.userInfo.user_pic || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="User" command="profile">基本资料</el-dropdown-item>
              <el-dropdown-item :icon="Crop" command="avatar">
                更换头像
              </el-dropdown-item>
              <el-dropdown-item :icon="EditPen" command="password">重置密码</el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main> 
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<style scoped>
.el-container {
  height: 100vh
}
.el-aside_logo {
  height: 120px;
  background: url(@/assets/logo2.png) no-repeat center / 120px auto;
}
/* aside */
.el-container .el-aside {
  width:200px;
  background-color: #232323;
}
.el-container .el-menu {
  border-right: none;
}
/* header */
.el-container .el-header {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  background-color: #fff;
}
.el-container .el-dropdown:deep(:focus-visible) {
  outline: none;
}
.el-container  .el-dropdown-link {
  display: flex;
  align-items: center;
}
/* main */
.el-container .el-main {
  box-sizing: border-box;
  padding: 40px ;    
}
.el-main div[data-v-401d3fdc] {
  background-color: #fff;
}
</style>
