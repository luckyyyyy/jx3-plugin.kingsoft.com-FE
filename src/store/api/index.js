import axios from 'axios';
import { BASE_URL, AUTH_URL } from '@/config';
import { isClient } from '@/util';
import { router } from '@/router';
import { MessageBox } from 'element-ui';


let cookie = '';
const onRequest = (req) => {
  if (!isClient()) {
    req.headers.cookie = cookie;
  } else {
    // Indicator.open('加载中');
  }
  return req;
};
const onRequestError = (err) => {
  return Promise.reject(err);
};

const onResponse = (res) => {
  // if (isClient()) Indicator.close();
  return Promise.resolve(res);
};

const onResponseError = (err) => {
  if (isClient()) {
    // Indicator.close();
    if (!err.response) {
      MessageBox({
        title: `未知错误 (${err.response.data.errcode})`,
        message: err.response.data.errmsg || '请检查你的网络，刷新页面。',
        type: 'error'
      });
    } else if (err.response.status === 401) {
      // Authorization failed
      router.push({ name: 'login' });www
      // return window.location.href = `${AUTH_URL}?redirect_uri=${encodeURIComponent(window.location.href)}`;
    } else if (err.response.status >= 500) {
      MessageBox({
        title: `操作失败`,
        message: '您提交的内容非法',
        type: 'error'
      });
    } else if (err.config.message !== false) {
      // error handler
      MessageBox({
        title: `操作失败 (${err.response.data.errcode})`,
        message: err.response.data.errmsg || '请再试一次',
        type: 'error'
      });
    }
  }
  return Promise.reject(err);
};
export const http = axios.create({
  baseURL: BASE_URL,
  // timeout: 10000,
  withCredentials: true,
});

export const setUserCookie = (cookies) => {
  cookie = cookies || '';
  return http;
};

http.interceptors.request.use(onRequest, onRequestError);
http.interceptors.response.use(onResponse, onResponseError);
