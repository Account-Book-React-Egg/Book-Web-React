import { useState } from 'react';
import BillHeader from './components/BillHeader';
import BillItem from './components/BillItem';

import { home, contentWrap } from './index.module.less';

const Home = () => {
    const [billList, setBillList] = useState([
        {
            bills: [
                {
                    amount: '25.00',
                    date: '1623390740000',
                    id: 911,
                    pay_type: 1,
                    remark: '',
                    type_id: 1,
                    type_name: '餐饮',
                },
            ],
            date: '2021-06-11',
        },
    ]);

    return (
        <div className={home}>
            <BillHeader />

            <div className={contentWrap}>
                {billList.map((item, index) => (
                    <BillItem billItem={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Home;
