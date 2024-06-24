/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from '../utils/http/request'

export type TRecords = {
  id: number,
  is_delete: number,
  label: string,
  value: string,
  type: string,
  create_user: string,
  update_user: string,
  created_at: string,
  updated_at: string,
}
export type TNewRecord = Pick<TRecords, 'label' | 'value' | 'id' | 'type'>

/**
 * 分页查询
 * @param data
 * @returns
 */
export function pageHandle(data: TRecords) {
  return request.get<TRecords>(`/api/category`, data);
}

/**
 * 新增
 * @param data
 * @returns
 */
export function saveHandle(data: TNewRecord) {
  return request.post<TRecords>('/api/category', data);
}

/**
 * 更新
 * @param data
 * @returns
 */
export function updateHandle(data: TNewRecord) {
  return request.put<TRecords>(`/api/category/${data.id}`, data);
}

/**
 * 删除数据
 * @param data
 * @returns
 */
export function deleteHandle(data: TNewRecord) {
  return request.delete(`/api/category/${data.id}`);
}

/**
 * 获取明细
 * @param data
 * @returns
 */
export function detailHandle(data: TNewRecord) {
  return request.get<TRecords>(`/api/category/${data.id}`);
}

/**
 * 获取所有
 * @param data
 * @returns
 */
export function allHandle(data?: { type: string }) {
  return request.post<TRecords>(`/api/category/getAll`, data);
}
