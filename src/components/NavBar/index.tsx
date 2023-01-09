import { useState } from 'react';
import { TabBar } from 'zarm';
import { useHistory } from 'react-router-dom';
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
            <TabBar.Item itemKey="/" title="账单" />
            <TabBar.Item itemKey="/stats" title="统计" />
            <TabBar.Item itemKey="/user" title="我的" />
        </TabBar>
    );
};

export default NavBar;
