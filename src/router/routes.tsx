import type { IMenuDataItem } from './routes.d';
import * as Component from './components';

const routes: IMenuDataItem[] = [
    {
        text: '登录',
        value: 'login',
        children: [
            {
                text: 'login',
                component: Component.Login,
                value: '/login',
                exact: true,
            },
        ],
    },
    {
        text: '计算',
        value: 'counter',
        children: [
            {
                text: 'counter',
                component: Component.Counter,
                value: '/counter',
                exact: true,
            },
        ],
    },
    {
        text: '账单',
        value: 'bill',
        children: [
            {
                text: 'bill',
                component: Component.Bill,
                value: '/bill',
                exact: true,
            },
        ],
    },
    {
        text: '统计',
        value: 'stats',
        children: [
            {
                text: 'stats',
                component: Component.Stats,
                value: '/stats',
                exact: true,
            },
        ],
    },
    {
        text: '我的',
        value: 'user',
        children: [
            {
                text: 'user',
                component: Component.User,
                value: '/user',
                exact: true,
            },
        ],
    },
];

export default routes;
