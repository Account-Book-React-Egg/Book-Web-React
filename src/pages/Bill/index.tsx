import { useState, useEffect } from 'react';
import { Pull } from 'zarm';
import BillHeader from './components/BillHeader';
import BillItem from './components/BillItem';
import http from '@/utils/http';
import { formatTime } from '@/utils/time';
import { RefreshState, LoadState } from '@typings/enums';

import { home, contentWrap } from './index.module.less';

const Home = () => {
    const [refreshing, setRefreshing] = useState(RefreshState.Normal); // 下拉刷新状态
    const [loading, setLoading] = useState(LoadState.Normal); // 上拉加载状态
    const [billList, setBillList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [currentTime, setCurrentTime] = useState(
        formatTime(undefined, 'YYYY-MM')
    );

    // 获取账单
    const getBillList = async () => {
        const { data } = await http.get(`/bill/list`, {
            params: {
                page,
                page_size: 5,
                date: currentTime,
                // type_id,
            },
        });
        // 下拉重置, 上滑追加
        setBillList(preList => {
            return page === 1 ? data.list : preList.concat(data.list);
        });
        setTotalCount(data.totalPage);
    };

    // 下拉刷新
    const refreshData = async () => {
        setRefreshing(RefreshState.Loading);
        setPage(1);
        try {
            await getBillList();
            setRefreshing(RefreshState.Success);
        } catch (error) {
            setRefreshing(RefreshState.Failure);
        }
    };

    // 上滑加载
    const loadData = async () => {
        if (page >= totalCount) return;
        setLoading(LoadState.Loading);
        setPage(page + 1);
        try {
            await getBillList();
            setLoading(LoadState.Success);
        } catch (error) {
            setLoading(LoadState.Failure);
        }
    };

    useEffect(() => {
        getBillList();
    }, [currentTime]);

    return (
        <div className={home}>
            <BillHeader />

            <div className={contentWrap}>
                {billList.length ? (
                    <Pull
                        stayTime={400}
                        animationDuration={200}
                        refresh={{
                            state: refreshing,
                            handler: refreshData,
                        }}
                        load={{
                            state: loading,
                            distance: 200,
                            handler: loadData,
                        }}
                    >
                        {billList.map((item, index) => (
                            <BillItem billItem={item} key={index} />
                        ))}
                    </Pull>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
