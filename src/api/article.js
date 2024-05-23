import request from '@/utils/request.js'

// 获取文章分类列表
export const artGetChannelService = ()=> request.get('/my/cate/list')