import { message } from "antd";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ResponseCodeEnum, ResultData } from "./httpEnum";
import fullLoading from "./fullLoading";
import { AxiosCancel } from "./AxiosCancel";
import { LocalStorageService } from '@/utils/storage';

const config = {
  baseURL: "http://localhost:7001/api/",
  timeout: 5000,
  withCredentials: true,
  headers: {},
};

const axiosCancel = new AxiosCancel();

class RequestHttp {
  service: AxiosInstance;

  constructor(extConfig?: object) {
    this.service = axios.create({ ...config, ...extConfig });

    /**
     * @description 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // console.log(config)

        // 打开全局 loading
        // 如不需要全局 loading，则第三个参数  { headers: { showLoading: true } }
        if(config.headers.showLoading) {
          fullLoading.show();
        }

        // 将请求添加到 pending 中
        axiosCancel.addPending(config);

        // 这里如果需要添加token
        const token = LocalStorageService.get('token'); // 我这里用的是 react-redux + redux-toolkit
        if (token) {
          config.headers["authorization"] = token;
        }

        return config;
      }
    );

    /**
     * @description 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;

        // 关闭全局 loading
        if(!config.headers.noLoading) {
          fullLoading.hide();
        }

        // 请求结束，移除本次请求
        axiosCancel.removePending(config.url, config.method);

        // 接口返回 code 不是 200 的处理
        if (data.code !== ResponseCodeEnum.SUCCESS || data.msg) {
          message.error(data.msg);

          // 登录失效，清除 token，跳转到登录页面
          if (data.code === ResponseCodeEnum.NOLOGIN) {
            LocalStorageService.set('token', null);
            window.location.href = "/login";
          }

          return Promise.reject(data);
        }
        return data;
      },

      (error: AxiosError) => {
        fullLoading.hide();

        const { response } = error;
        if (response) {
          checkStatus(response.status);
        }
        return false;
      }
    );
  }

  // 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
}

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
const checkStatus = (status: number): void => {
  switch (status) {
    case 404:
      message.error("资源不存在！");
      break;
    case 405:
      message.error("请求方式错误！");
      break;
    case 500:
      message.error("服务器异常！");
      break;
    default:
      message.error("请求失败！");
  }
};

const request = new RequestHttp();

export {
  request,
} ;
