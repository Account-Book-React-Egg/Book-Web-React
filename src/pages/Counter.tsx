import { useSelector, useDispatch } from 'react-redux'
import { useAppSelector, useAppDispatch } from '../hooks/store'
import { decrement, increment } from '../redux/reducer/counterSlice'

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="card">
      <button onClick={() => dispatch(increment())}>
        increase count {count}
      </button>
      <button onClick={() => dispatch(decrement())}>
        decrease count {count}
      </button>
    </div>
  )
}
