export interface IBill {
    amount: string;
    date: string;
    id: number;
    pay_type: number;
    remark: string;
    type_id: number;
    type_name: string;
}

// 当天的所有账单
export interface IBillItem {
    bills: IBill[];
    date: string;
}

// 全部账单
export type IBillList = IBillItem[];
