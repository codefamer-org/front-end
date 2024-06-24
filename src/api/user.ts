import { request } from '../utils/http/request'

export function doLogin(data: object) {
  return request.post('/api/sso/login', data, {});
}

export function getUserPage(data: object) {
  return request.get('/api/user', data, {});
}