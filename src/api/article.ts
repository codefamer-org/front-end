import { request } from '../utils/http/request'

export function getArticlePage(data: object) {
  return request.get('/article', data, {});
}

export function saveArticle(data: object) {
  return request.post('/article', data, {});
}

export function updateArticle(data: object) {
  return request.put('/article', data, {});
}

export function deleteArticle(data: any) {
  return request.delete(`/article/${data.id}`, data, {});
}