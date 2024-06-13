import { request } from '../utils/http/request'

export function doLogin(data: object) {
  return request.post('/sso/login', data, {});
}

export function getUserPage(data: object) {
  return request.get('/user', data, {});
}