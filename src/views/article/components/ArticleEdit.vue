<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artAddArticleService, artGetInfoService, artEditService } from '@/api/article.js'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const visibleDraw = ref(false)

const defaultForm = {
  title: '', // 标题
  cate_id: '', // 分类id
  content: '', // string 内容
  cover_img: '', // 封面图片 file对象
  state: '' // 状态
}

const formModel = ref({ ...defaultForm })
// const ruleForm = ref({
//   title: String,
//   cate_id: String,
//   content: String,
//   cover_img: File,
//   state: String
// })
const rules = ref({
  title : [
    { required: true, message: "文章标题不能为空", trigger: 'blur'},
    {
      pattern: /^\S{2,10}$/,
      message: '文章标题必须是2到10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_id:[
    { required: true, message: "文章分类不能为空", trigger: 'blur'},
  ],
  cover_img:[
    { required: true, message: "文章封面不能为空", trigger: 'blur'},
  ],
  content: [
    { required: true, message: "文章内容不能为空", trigger: 'blur'},
  ]
})

// 图片相关
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 将网络图片地址转换为 File 对象的函数
async function imageUrlToFileObject(imageUrl, filename) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    })
    const file = new File([blob], filename, {
      type: response.headers['content-type']
    })
    return file
  } catch (error) {
    console.error('Error converting image URL to File object:', error)
    return null
  }
}

const quillRef = ref(null)
const open = async (row) => {
  visibleDraw.value = true
  if (row.id) {
    const res = await artGetInfoService(row.id)
    formModel.value = res.data.data
    imgUrl.value = baseURL + formModel.value.cover_img
    const file = await imageUrlToFileObject(
      imgUrl.value,
      formModel.value.cover_img
    )
    formModel.value.cover_img = file
  } else {
    formModel.value = { ...defaultForm }
    imgUrl.value = ''
    quillRef.value.setHTML('')
  }
}
// 提交相关
const onPublish = async (state) => {
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  fd.append('Id', formModel.value.id)
  if (formModel.value.id) {
    await artEditService(fd)
    ElMessage.success('编辑成功')
    visibleDraw.value = false
    emit('success', 'edit')
  } else {
    // 添加
    await artAddArticleService(fd)
    ElMessage.success('添加成功')
    visibleDraw.value = false
    emit('success', 'add')
  }
}

defineExpose({
  open
})

const emit = defineEmits(['success'])

</script>

<template>
  <el-drawer v-model="visibleDraw" :title="formModel.id ? '编辑文章' : '添加文章'" size="50%">
    <el-form :model="formModel" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <ChannelSelect v-model="formModel.cate_id" width="100%"></ChannelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
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
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            ref="quillRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          >
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
