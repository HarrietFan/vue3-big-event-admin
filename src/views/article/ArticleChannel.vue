<script setup>
import { Edit,Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { artGetChannelService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'

const loading = ref(false)
const dialog = ref(null)

// 加载channel数据
const channelList = ref([])
const getChannelList = async ()=>{
  loading.value = true
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

// 操作
const onAddChannel = ()=>{
  dialog.value.open({})
}
const onEditChannel = (row)=>{
  dialog.value.open(row)
}
const onDelChannel=(row)=>{
  console.log(row)
}

</script>


<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table :data="channelList" v-loading="loading">
      <el-table-column type="index" prop="id" label="序号" width="120px"/>
      <el-table-column prop="cate_name" label="分类名称"/>
      <el-table-column prop="cate_alias" label="分类别名"  />
      <el-table-column label="操作"  width="120px">
        <template #default="scope">
          <el-button :icon="Edit" circle plain type="primary" @click="onEditChannel(scope.row)">
          </el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="onDelChannel(scope.row)">
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog"></ChannelEdit>
  </PageContainer>
</template>


<style scoped lang="scss">
.el-table{
  width: 100%;
  .el-table-column {
    margin: 0 auto;
  }
}
</style>
