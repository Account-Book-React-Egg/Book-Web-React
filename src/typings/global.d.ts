// 扩充全局变量可以定义在这里

declare global {
    interface IResponse {
        code: number;
        message: string;
        msg: string;
        data: any;
    }
}

export {};
