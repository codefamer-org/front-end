/**
 * @description：响应结果枚举
 */
export enum ResponseCodeEnum {
	SUCCESS = 200,
	ERROR = 500,
	NOLOGIN = 499,
}

// 接口返回结构，不包含 data
export interface ResponseResult {
  // 状态码
  code: number;
  // 消息
  msg: string;
}

// 完整的接口返回结构
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResultData<T = any> extends ResponseResult {
  // 数据
  data: T;
}

