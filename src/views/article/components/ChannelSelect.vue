<script setup>
import { artGetChannelService } from '@/api/article.js'
import { ref } from 'vue'

const channelList = ref([])
const getChannelList = async ()=>{
  const res = await artGetChannelService()
  channelList.value = res.data.data
}
getChannelList()

</script>


<template>
  <el-select style="width: 200px">
    <el-option 
    v-for="channel in channelList"
    :key="channel.id"
    :label="channel.cate_name" 
    :value="channel.id"
    >
    </el-option>
  </el-select>
</template>


<style scoped>

</style>
