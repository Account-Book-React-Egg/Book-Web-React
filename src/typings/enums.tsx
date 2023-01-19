export const enum LoginType {
    Login,
    Register,
}

export enum BillType {
    canyin,
    fushi,
    jiaotong,
    riyong,
    gouwu,
    xuexi,
    yiliao,
    lvxing,
    renqing,
    qita,
    gongzi,
    jiangjin,
    zhuanzhang,
    licai,
    tuikuang,
}

// zarm Pull 下拉刷新的状态
export enum RefreshState {
    Normal, // 普通
    Pull, // 下拉刷新（未满足刷新条件）
    Drop, // 释放立即刷新（满足刷新条件）
    Loading, // 加载中
    Success, // 加载成功
    Failure, // 加载失败
}

// zarm Pull 上拉加载状态
export enum LoadState {
    Normal, // 普通
    Abort, // 中止
    Loading, // 加载中
    Success, // 加载成功
    Failure, // 加载失败
    Complete, // 加载完成（无新数据）
}
