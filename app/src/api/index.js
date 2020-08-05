import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH;
// axios.defaults.baseURL = '/api';

export const register = (data) => {
  return axios({
    method: 'post',
    url: '/user/register',
    data
  })
}

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/user/login',
    data
  })
}
// 面板
// 获取所有面板
export const getBoards = () => {
  return axios({
    method: 'get',
    url: '/board'
  })
}

export const getBoard = (id) => {
  return axios({
    method: 'get',
    url: '/board/' + id
  })
}

export const postBoard = (data) => {
  return axios({
    method: 'POST',
    url: '/board',
    data
  })
}

export const getLists = (boardId) => {
  return axios({
    url: '/list',
    params: {
      boardId
    }
  })
}

export const postLists = (data) => {
  return axios({
    method: 'post',
    url: '/list',
    data
  })
}

// 编辑一个指定的列表
export const putList = data => {
  return axios({
      method: 'put',
      url: '/list/' + data.id,
      data: {
        boardId: data.boardId,
        name: data.name,
        order: data.order
      }
  })
};

export const getCards = (boardListId) => {
  return axios({
    url: '/card',
    params: {
      boardListId,
    }
  })
}

export const postCard = (data) => {
  return axios({
    method: 'post',
    url: '/card',
    data
  })
}

export const putCard = data => {
  return axios({
      method: 'put',
      url: '/card/' + data.id,
      data: {
        boardListId: data.boardListId,
        name: data.name,
        description: data.description,
        order: data.order
      }
  })
}

export const uploadAttachment = data => {
  let fd = new FormData()
  fd.append('boardListCardId', data.boardListCardId)
  fd.append('attachment', data.file)
  return axios({
      method: 'post',
      url: '/card/attachment',
      data: fd
  })
}
// 删除附件
export const removeAttachment = data => {
  return axios({
      method: 'delete',
      url: '/card/attachment/' + data.id
  });
};
// 设置封面
export const setCover = data => {
  return axios({
      method: 'put',
      url: '/card/attachment/cover/' + data.id
  });
};
// 移除封面
export const removeCover = data => {
  return axios({
      method: 'delete',
      url: '/card/attachment/cover/' + data.id
  });
};

// 获取评论列表
export const getComments = params => {
  return axios({
      url: '/comment',
      params
  })
};
// 添加评论
export const postComment = data => {
  return axios({
      method: 'post',
      url: '/comment',
      data
  })
};