<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)

const open = (row)=>{
  dialogVisible.value = true
  console.log(row)
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="200px" >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>


<style scoped>

</style>
