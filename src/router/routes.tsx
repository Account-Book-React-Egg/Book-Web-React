import type { IMenuDataItem } from './routes.d';
import * as Component from './components';

const routes: IMenuDataItem[] = [
    {
        text: '主页',
        value: 'home',
        children: [
            {
                text: 'home',
                component: Component.Home,
                value: '/home',
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
];

export default routes;
