import axios, {
    AxiosRequestConfig,
    AxiosHeaders,
    AxiosResponse,
    AxiosError,
} from 'axios';
import { Toast } from 'zarm';
import history from '@/utils/history';
import { isFunction } from '@/utils/is';

const { MODE, VITE_PROXY_DOMAIN, VITE_BASIC_URL } = import.meta.env;
const BASE_URL =
    MODE === 'development' ? VITE_BASIC_URL : VITE_PROXY_DOMAIN + '/api';

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        // Authorization: `${localStorage.getItem('token') || ''}`,
    },
    // withCredentials: true, // 表示跨域请求时是否需要使用凭证，默认 false
});

// 请求拦截：
http.interceptors.request.use(
    config => {
        // TS 这里写的就很不优雅 (*｀皿´*)ﾉ https://juejin.cn/post/7186160220370894903
        const token = localStorage.getItem('token');
        if (token && config.headers && isFunction(config.headers.set)) {
            config.headers.set('Authorization', token);
        }
        return config;
    },
    error => Promise.reject(error)
);

// 响应拦截：
const errorHandler = (code = 500, message = 'Internal Server Error') => {
    if (code === 401) {
        history.push('/login');
        localStorage.removeItem('token');
    }
    Toast.show(`${code}：${message}`);
};

// 成功的响应结构 https://www.axios-http.cn/docs/res_schema
const onReqFulfilled = (res: AxiosResponse) => {
    const {
        data: { code, msg, message },
    } = res;
    if (code === 200) return res.data;

    errorHandler(code, msg || message);
    return Promise.reject(res.data);
};

const onReqRejected = (err: AxiosError<IResponse>) => {
    if (err.response) {
        const { data, status } = err.response;
        errorHandler(
            data.code || status,
            data.msg || data.message || err.message
        );
    } else {
        // 服务器崩溃时没有 response 响应
        if (!window.navigator.onLine) Toast.show('服务端异常！'); // 断网
        if (/timeout/.test(err.message || '')) Toast.show('服务端超时！'); // 超时
    }

    return Promise.reject(err.response || err);
};

http.interceptors.response.use(onReqFulfilled, onReqRejected);

export default http;
