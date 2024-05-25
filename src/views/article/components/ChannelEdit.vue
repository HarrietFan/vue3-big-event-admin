<script setup>
import { artEditChannelService, artAddChannelService } from '@/api/article';
import { ref } from 'vue'
const dialogVisible = ref(false)
const emit = defineEmits(['success'])

const formModel = ref({
  cate_name:'',
  cate_alias:''
})
const rules = ref({
  cate_name:[
    { required: true, message:"请输入分类名称", trigger:'blur'},
    { pattern:/^\S{2,10}$/, message:"分类名称为 2到10位 非空字符", trigger:'blur'},
  ],
  cate_alias:[
    { required: true, message:"请输入分类别名", trigger:'blur'},
    { pattern:/^[a-zA-Z0-9]{4,20}$/, message:"分类别名为 4到20位 字符或数字", trigger:'blur'},
  ]
})

const open = (row)=>{
  dialogVisible.value = true
  formModel.value = { ...row }
}


const onSubmit = async ()=>{
  formModel.value.id 
  ? await artEditChannelService(formModel.value) 
  : await artAddChannelService(formModel.value)
  ElMessage({
    type:'success',
    message: formModel.value.id ? "编辑成功" : "添加成功"
  })
  dialogVisible.value = false
  emit('success')
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog 
    v-model="dialogVisible" 
    :title="formModel.id ? '编辑分类' : '添加分类'" 
    width="400px" >
    <el-form 
    :model="formModel"
    :rules="rules"
    style="padding: 0 40px 0 40px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input placeholder="请输入分类名称" v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input placeholder="请输入分类别名" v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped>

</style>
