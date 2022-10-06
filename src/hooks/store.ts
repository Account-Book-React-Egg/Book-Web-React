import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/store'

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
// (给 useDispatch 和 useSelector 套上类型, 共全局使用)
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector