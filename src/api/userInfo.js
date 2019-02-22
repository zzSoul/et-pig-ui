import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/userInfo/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/userInfo/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/userInfo/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/nfcCode/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/userInfo',
    method: 'put',
    data: obj
  })
}

export function fetchQueryList(query) {
  return request({
    url: '/admin/userInfo/queryPage',
    method: 'get',
    data: query
  })
}

// export function batchAdd(nfcCode) {
//   return request({
//     url: '/admin/userInfo/batchAddition',
//     method: 'post',
//     data: nfcCode
//   })
// }
