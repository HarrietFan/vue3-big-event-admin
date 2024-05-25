<script setup>
import { ref } from 'vue'
import { Edit, Delete} from '@element-plus/icons-vue'
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
      "state": null,
      "cate_name": "体育"
    }
  ])

</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>

    <!-- 表单 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <el-select placeholder="请选择" size="large" style="width: 200px">
          <el-option label="新闻" value="110"></el-option>
          <el-option label="历史" value="111"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select placeholder="请选择" size="large" style="width: 200px">
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
      <el-tabel-column label="文章标题" prop="title"></el-tabel-column>
      <el-tabel-column label="分类" prop="cata_name"></el-tabel-column>
      <el-tabel-column label="发表时间" prop="pub_date"></el-tabel-column>
      <el-tabel-column label="状态" prop="state"></el-tabel-column>
      <el-table-column label="操作"  width="120px">
        <el-button :icon="Edit" circle plain type="primary"  >
        </el-button>
        <el-button :icon="Delete" circle plain type="danger"  >
        </el-button>
      </el-table-column>
    </el-table> 
  </PageContainer>
</template>


<style scoped>

</style>
