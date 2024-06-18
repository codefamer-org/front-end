/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from '../utils/http/request'
import { TParams, TRecords, TPageParams } from './types/article.types'
type TNewRecord = Pick<TRecords, 'markdown' | 'html' | 'desc' | 'title'>

/**
 * 分页查询
 * @param data
 * @returns
 */
export function pageHandle(data: TRecords | TPageParams) {
  return request.get<TRecords>(`/article`, data);
}

/**
 * 新增
 * @param data
 * @returns
 */
export function saveHandle(data: TNewRecord) {
  return request.post<TRecords>('/article', data);
}

/**
 * 更新
 * @param data
 * @returns
 */
export function updateHandle(data: TParams | TRecords) {
  return request.put<TRecords>(`/article/${data.id}`, data);
}

/**
 * 删除数据
 * @param data
 * @returns
 */
export function deleteHandle(data: TParams) {
  return request.delete(`/article/${data.id}`);
}

/**
 * 获取明细
 * @param data
 * @returns
 */
export function detailHandle(data: TParams) {
  return request.get<TRecords>(`/article/${data.id}`);
}

/**
 * 获取所有
 * @param data
 * @returns
 */
export function allHandle(data: {}) {
  return request.post<TRecords>(`/article/getAll`, data);
}
