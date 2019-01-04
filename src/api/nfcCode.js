import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/nfcCode/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/nfcCode/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/nfcCode/' + id,
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
    url: '/admin/nfcCode',
    method: 'put',
    data: obj
  })
}

export function fetchQueryList(query) {
  return request({
    url: '/admin/nfcCode/queryPage',
    method: 'get',
    data: query
  })
}

export function batchAdd(nfcCode, number) {
  return request({
    url: '/admin/nfcCode/batchAddition',
    method: 'get',
    data: nfcCode, number
  })
}
