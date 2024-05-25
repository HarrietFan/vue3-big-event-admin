<script setup>
import { ref } from 'vue'
import { Edit, Delete} from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue';

const articleList = ref([
    {
      "id": 5961,
      "title": "新的文章啊",
      "pub_date": "2022-07-10 14:53:52.604",
      "state": "已发布",
      "cate_name": "体育"
    },
    {
      "id": 5962,
      "title": "新的文章啊",
      "pub_date": "2022-07-10 14:54:30.904",
      "state": '草稿',
      "cate_name": "体育"
    }
  ])

// 编辑
const onEditArticle = (row)=>{
  console.log(row)
}
// 删除
const onDelArticle = (row)=>{
  console.log(row)
}
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <!-- 表单 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <ChannelSelect></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 200px">
          <el-option label="已发布" value="001"></el-option>
          <el-option label="草稿" value="002"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="articleList">
      <el-table-column label="文章标题" prop="title">
        <template #default="scope">
          <el-link type="primary" :underline="false">{{ scope.row.title}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作"  width="120px">
        <template #default="scope">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditArticle(scope.row)">
          </el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDelArticle(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table> 
  </PageContainer>
</template>


<style scoped>

</style>
