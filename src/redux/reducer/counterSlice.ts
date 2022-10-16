import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// 为 slice state 定义一个类型
interface CounterState {
    value: number
}

// 使用该类型定义初始 state
const initialState: CounterState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。
            // 它并不是真正的改变状态值，因为它使用了 Immer 库
            // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的不可变的状态
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        // 使用 PayloadAction 类型声明 `action.payload` 的内容
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

// 导出异步请求的 actions
export const incrementAsync = (params: any) => async dispatch => {
    // 发送请求 伪代码
    // const result = await fetch(
    //     'https://api.github.com/users/ruanyf',
    //     { method: "get" }
    // ).then((response: Response) => response.json())
    const result: { data: string } = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: '异步请求而来的数据'
            })
        }, 1500);
    })
    console.log(result.data)
};

// 导出同步的actions (每个 case-reducer 函数会生成对应的 Action creators)
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// 选择器等其他代码可以使用导入的 `RootState` 类型 (供hook使用)
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer