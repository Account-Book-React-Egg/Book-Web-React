import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducer/counterSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: { counter: counterState }
export type AppDispatch = typeof store.dispatch

export default store