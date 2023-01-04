import type { IMenuDataItem } from './routes.d';
import * as Component from './components';

const routes: IMenuDataItem[] = [
    {
        text: '计算',
        value: 'counter',
        children: [
            {
                text: 'counter',
                component: Component.Counter,
                value: '/counter',
                no_show_menu: true,
                exact: true,
            },
        ],
    },
];

export default routes;
