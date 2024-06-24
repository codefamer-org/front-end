/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from '../utils/http/request'
import { TParams, TRecords, TPageParams } from './types/article.types'
type TNewRecord = Pick<TRecords, 'markdown' | 'html' | 'desc' | 'title' | 'category'>

/**
 * 分页查询
 * @param data
 * @returns
 */
export function pageHandle(data: TRecords | TPageParams) {
  return request.get<TRecords>(`/api/article`, data);
}

/**
 * 新增
 * @param data
 * @returns
 */
export function saveHandle(data: TNewRecord) {
  return request.post<TRecords>('/api/article', data);
}

/**
 * 更新
 * @param data
 * @returns
 */
export function updateHandle(data: TParams | TRecords) {
  return request.put<TRecords>(`/api/article/${data.id}`, data);
}

/**
 * 删除数据
 * @param data
 * @returns
 */
export function deleteHandle(data: TParams) {
  return request.delete(`/api/article/${data.id}`);
}

/**
 * 获取明细
 * @param data
 * @returns
 */
export function detailHandle(data: TParams) {
  return request.get<TRecords>(`/api/article/${data.id}`);
}

/**
 * 获取所有
 * @param data
 * @returns
 */
export function allHandle(data: {}) {
  return request.post<TRecords>(`/api/article/getAll`, data);
}
