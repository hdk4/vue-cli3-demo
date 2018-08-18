import axios from 'axios';
import {
  Message
} from 'element-ui';
import store from '../store';
import router from '../router'

// let baseAPI = process.env.NODE_ENV === 'production' ? '/api' : 'http://192.168.11.50:9003';

let baseAPI = '/api'

export const base = baseAPI

export default function _fetch(options, type) {
  if (type && !/^https?:/i.test(options.url)) {
    options.url = `/${type}${options.url}`;
  }
  return new Promise((resolve, reject) => {
    const token = store.getters.token;
    const headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers.token = token
    }
    const instance = axios.create({
      withCredentials: true,
      headers,
      baseURL: baseAPI,
      timeout: 40000
    });
    instance(options)
      .then(response => { //console.log('then',response)
        const res = response.data || {};
        const code = +res.code;
        if (code === 0 || code === 200) {
          resolve(res);
        } else if (code === 401) {
          Message.warning('登录已失效，请重新登录');
          store.dispatch('userLogout');
          router.push('/login');
        } else {
          Message.error(res.msg || '请求错误');
          reject(res);
        }
      })
      .catch(error => { //console.log('catch',error)
        reject(error);
        if (error.response) {
          if (error.response.status === 500) {
            Message.error('服务器内部错误');
          } else if (error.response.status === 404) {
            Message.error('接口不存在或未准备好');
          } else if (error.response.status === 403) {
            Message.error('无访问该接口的权限');
            setTimeout(() => {
              store.dispatch('userLogout');
              router.push('/login');
            }, 3000);
          } else if (error.response.status === 401) {
            Message.error('登录已失效，请重新登录');
            store.dispatch('userLogout');
            router.push('/login');
          } else {
            Message.error('请求错误');
          }
        } else {
          Message.error('网络错误');
        }
      });
  });
}
