import request from '@/utils/request.js'

// 分类：
// 获取文章分类
export const artGetChannelService = () => request.get('/my/cate/list')

// 添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 编辑文章分类
export const artEditChannelService = (data) => request.put('/my/cate/info', data)

// 删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章：
// 获取文章
export const artGetArticleService = (params) =>
  request.get('/my/article/list', {
    params
  })

// 抽屉、添加：发布文章
export const artAddArticleService = (data) => request.post('/my/article/add', data)

// 抽屉、编辑：获取文章详情
export const artGetInfoService = (id) =>
  request.get('/my/article/info', {
    params: {
      id
    }
  })

  // 抽屉、编辑：提交文章编辑详情
export const artEditService = (data) =>
  request.put('/my/article/info', data)
