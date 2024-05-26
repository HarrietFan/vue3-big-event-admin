<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { formatDate } from '@/utils/format.js'
import { artGetArticleService } from '@/api/article.js'

const articleList = ref([])
const total = ref(0)
const loading = ref(false)

// 文章列表
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 获取文章数据
const getArticle = async () => {
  loading.value = true
  const res = await artGetArticleService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticle()

// 分页
// 每页大小
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticle()
}
// 当前页码
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticle()
}

// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getArticle()
}
// 重置
const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  getArticle()
}

const articleEditRef = ref()
// 添加
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 删除
const onDelArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">添加文章</el-button>
    </template>

    <!-- 表单 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select v-model="params.state" style="width: 200px">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatDate(row) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="120px">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditArticle(row)">
          </el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDelArticle(row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 5, 10, 20, 50]"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉 -->
    <ArticleEdit ref="articleEditRef"></ArticleEdit>
  </PageContainer>
</template>

<style scoped></style>
