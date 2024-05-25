<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
const visibleDraw = ref(false)

const defaultForm = {
  title:'',
  cate_id:'',
  cover_img:'', // file
  content:'',
  state:''
}

const formModel = ref({...defaultForm})
 
const open = (row)=>{
  visibleDraw.value = true
  if(row.id){
    console.log("回显+编辑")
  }else{
    formModel.value = {...defaultForm}
    console.log("添加")
  }
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDraw"
    :title=" formModel.id ? '编辑文章' : '添加文章'"
    size="50%"
  >
  <el-form :model="formModel" ref="formRef" label-width="100px">
    <el-form-item  label="文章标题" prop="title">
      <el-input v-model="formModel.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="文章分类" props="cate_id">
      <ChannelSelect v-model="formModel.cate_id" width="100%"></ChannelSelect>
    </el-form-item>
    <el-form-item label="文章封面" props="cover_img">
    </el-form-item>
    <el-form-item label="文章内容" props="content">
      <el-upload>
        <img v-if="true"  />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">发布</el-button>
      <el-button type="info">草稿</el-button>
    </el-form-item>
  </el-form>
  </el-drawer>
</template>
