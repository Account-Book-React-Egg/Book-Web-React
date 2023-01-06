import axios, { AxiosResponse, AxiosError } from 'axios';
import { Toast } from 'zarm';

const BASE_URL =
    import.meta.env.MODE === 'development'
        ? '/api'
        : 'http://api.chennick.wang';

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token') || ''}`,
    },
    // withCredentials: true, // 表示跨域请求时是否需要使用凭证，默认 false
});

// 请求拦截
// http.interceptors.request.use(
//     config => config,
//     error => Promise.reject(error)
// );

// 响应拦截
const errorHandler = (code = 500, message = 'Internal Server Error') => {
    Toast.show(`${code}：${message}`);
};

// 成功的响应结构 https://www.axios-http.cn/docs/res_schema
const onReqFulfilled = (res: AxiosResponse) => {
    const {
        data: { code, message },
    } = res;
    if (code === 200) return res.data;
    errorHandler(code, message);

    return Promise.reject(res);
};

const onReqRejected = (err: AxiosError<IResponse>) => {
    if (err.response) {
        const { data, status } = err.response;
        if (status === 401) {
            window.location.href = '/login';
            localStorage.removeItem('token');
        }
        errorHandler(data.code || status, data.message || err.message);
    } else {
        // 服务器崩溃时没有 response 响应
        if (!window.navigator.onLine) Toast.show('服务端异常！'); // 断网
        if (/timeout/.test(err.message || '')) Toast.show('服务端超时！'); // 超时
    }

    return Promise.reject(err.response || err);
};

http.interceptors.response.use(onReqFulfilled, onReqRejected);

export default http;
