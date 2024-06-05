/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from '../utils/http/request'
import { TParams, TRecords } from './types/article.types'

export function pageHandle(data: TRecords) {
  return request.get(`/article`, data);
}
export function saveHandle(data: TRecords) {
  return request.post<TRecords>('/article', data);
}
export function updateHandle(data: TParams | TRecords) {
  return request.put<TRecords>(`/article/${data.id}`, data);
}
export function deleteHandle(data: TParams) {
  return request.delete(`/article/${data.id}`);
}
export function detailHandle(data: TParams) {
  return request.get<TRecords>(`/article/${data.id}`);
}