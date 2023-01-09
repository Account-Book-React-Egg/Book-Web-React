import { useState } from 'react';
import { TabBar } from 'zarm';
import { useHistory } from 'react-router-dom';
import CustomIcon from '@/components/CustomIcon';
import type { BaseTabBarProps } from 'zarm/types/tab-bar/PropsType';
import style from './index.module.less';

const NavBar: React.FC<{ showNav: boolean }> = ({ showNav }) => {
    const [activeKey, setActiveKey] = useState('/');
    const history = useHistory();

    const changeTab = (path: string) => {
        setActiveKey(path);
        history.push(path);
    };

    return (
        <TabBar
            visible={showNav}
            className={style.navbar}
            activeKey={activeKey}
            onChange={changeTab as BaseTabBarProps['onChange']}
        >
            <TabBar.Item
                itemKey="/"
                title="账单"
                icon={<CustomIcon type="zhangdan" />}
            />
            <TabBar.Item
                itemKey="/stats"
                title="统计"
                icon={<CustomIcon type="tongji" />}
            />
            <TabBar.Item
                itemKey="/user"
                title="我的"
                icon={<CustomIcon type="wode" />}
            />
        </TabBar>
    );
};

export default NavBar;
