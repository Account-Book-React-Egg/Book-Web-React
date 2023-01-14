import { Icon } from 'zarm';

import style from '../../index.module.less';

const BillHeader = () => {
    return (
        <div className={style.header}>
            <div className={style.dataWrap}>
                <span>
                    总支出：<b>¥ 200</b>
                </span>
                <span className={style.income}>
                    总收入：<b>¥ 500</b>
                </span>
            </div>
            <div className={style.typeWrap}>
                <div className={style.left}>
                    <span>
                        类型{' '}
                        <Icon className={style.arrow} type="arrow-bottom" />
                    </span>
                </div>
                <div>
                    <span>
                        2022-06
                        <Icon className={style.arrow} type="arrow-bottom" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BillHeader;
