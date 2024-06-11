/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from '../utils/http/request'

/**
 * 分页查询
 * @param data
 * @returns
 */
export function getQiNiuToken(data: any) {
  return request.post(`/common/getQiNiuToken`, data);
}
