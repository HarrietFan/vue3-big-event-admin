<script setup>
import { artGetChannelService } from '@/api/article.js'
import { ref, defineEmits, defineProps } from 'vue'

// 分类数据列表
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
}
getChannelList()

// 接受&提交父组件
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    style="width: 200px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    >
    </el-option>
  </el-select>
</template>

<style scoped></style>
