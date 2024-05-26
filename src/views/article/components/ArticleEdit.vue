<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artAddArticleService } from '@/api/article.js'

const visibleDraw = ref(false)

const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '', // file
  content: '',
  state: ''
}

const formModel = ref({ ...defaultForm })

// 图片相关
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

const emit = defineEmits(['success'])
// 提交相关
const onPublish = async (state)=>{
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value){
    fd.append(key, formModel.value[key])
  }
  if(formModel.value.id){
    // 编辑
  }else{
    // 添加
    await artAddArticleService(fd)
    ElMessage.success("添加成功")
    visibleDraw.value = false
    emit('success','add')
  }
}

const quillRef = ref()
const open = (row) => {
  visibleDraw.value = true
  if (row.id) {
    console.log('回显+编辑')
  } else {
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    quillRef.value.setHTML('')
  }
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visibleDraw" :title="formModel.id ? '编辑文章' : '添加文章'" size="50%">
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="文章分类" props="cate_id">
        <ChannelSelect v-model="formModel.cate_id" width="100%"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" props="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="onSelectFile"
          :auto-upload="false"
        >
          <img class="avatar" v-if="imgUrl" :src="imgUrl" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" props="content">
        <div class="editor">
          <QuillEditor ref="quillRef" theme="snow" v-model:content="formModel.content" content-type="html">
          </QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      display: block;
      width: 178px;
      height: 178px;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      width: 178px;
      height: 178px;
      text-align: center;
      font-size: 28px;
      color: #8c939d;
    }
  }
}

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
