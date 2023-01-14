import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Cell } from 'zarm';
import { useHistory } from 'react-router-dom';
import CustomIcon from '@/components/CustomIcon';
import { BillType } from '@/typings/enums';
import type { IBill, IBillItem } from '@/typings/modules/bill';

import style from './index.module.less';

const BillItem: React.FC<{ billItem: IBillItem }> = ({ billItem }) => {
    const [income, setIncome] = useState(0); // 收入
    const [expense, setExpense] = useState(0); // 支出
    const history = useHistory();

    // 当添加账单是，bill.bills 长度变化，触发当日收支总和计算。
    useEffect(() => {
        // 初始化将传入的 bill 内的 bills 数组内数据项，过滤出支出和收入。
        // pay_type：1 为支出；2 为收入
        // 通过 reduce 累加
        const _income = billItem.bills
            .filter(i => i.pay_type == 2)
            .reduce((curr, item) => {
                curr += Number(item.amount);
                return curr;
            }, 0);
        setIncome(_income);
        const _expense = billItem.bills
            .filter(i => i.pay_type == 1)
            .reduce((curr, item) => {
                curr += Number(item.amount);
                return curr;
            }, 0);
        setExpense(_expense);
    }, [billItem.bills]);

    // 前往账单详情
    const goToDetail = (item: IBill) => {
        history.push(`/detail?id=${item.id}`);
    };

    return (
        <div className={style.item}>
            <div className={style.headerDate}>
                <div className={style.date}>{billItem.date}</div>
                <div className={style.money}>
                    <span>
                        <img
                            src="//s.yezgea02.com/1615953405599/zhi%402x.png"
                            alt="支"
                        />
                        <span>¥{expense.toFixed(2)}</span>
                    </span>
                    <span>
                        <img
                            src="//s.yezgea02.com/1615953405599/shou%402x.png"
                            alt="收"
                        />
                        <span>¥{income.toFixed(2)}</span>
                    </span>
                </div>
            </div>

            {billItem.bills.map(item => (
                <Cell
                    className={style.bill}
                    key={item.id}
                    onClick={() => goToDetail(item)}
                    title={
                        <>
                            <CustomIcon
                                className={style.itemIcon}
                                type={
                                    item.type_id ? BillType[item.type_id] : '1'
                                }
                            />
                            <span>{item.type_name}</span>
                        </>
                    }
                    description={
                        <span
                            style={{
                                color: item.pay_type == 2 ? 'red' : '#39be77',
                            }}
                        >{`${item.pay_type == 1 ? '-' : '+'}${
                            item.amount
                        }`}</span>
                    }
                    help={
                        <div>
                            {dayjs(Number(item.date)).format('HH:mm')}{' '}
                            {item.remark ? `| ${item.remark}` : ''}
                        </div>
                    }
                ></Cell>
            ))}
        </div>
    );
};

export default BillItem;
