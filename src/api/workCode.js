import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/workCode/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/workCode/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/workCode/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/workCode/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/workCode',
    method: 'put',
    data: obj
  })
}

// export function fetchQueryList(query) {
//   return request({
//     url: '/admin/workCode/queryPage',
//     method: 'get',
//     data: query
//   })
// }

export function batchAdd(workCode) {
  return request({
    url: '/admin/workCode/batchAddition',
    method: 'post',
    data: workCode
  })
}
