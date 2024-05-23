import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'

// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token
    const removeToken = () => (token.value = '')

    const userInfo = ref({})
    const getUserInfo = async ()=>{
      const res = await userGetInfoService()
      userInfo.value = res.data.data
    }
    const setUserInfo = (val) => (userInfo.value = val)
    return { token, setToken, removeToken, userInfo, getUserInfo, setUserInfo}
  },
  {
    persist: true // 持久化
  }
)