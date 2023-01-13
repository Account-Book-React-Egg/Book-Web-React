// 扩充全局变量可以定义在这里
import type { CSSProperties, ReactNode } from 'react';

declare global {
    interface IResponse {
        code: number;
        message: string;
        msg: string;
        data: any;
    }
    interface IBasicProps {
        className?: string;
        style?: CSSProperties;
        children?: ReactNode;
    }
}

export {};
