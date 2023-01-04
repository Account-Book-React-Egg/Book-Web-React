import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'zarm';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { decrement, increment } from '../../redux/reducer/counterSlice';
import './index.less';

export default function Counter() {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div className="card">
            <Button theme="primary" onClick={() => dispatch(increment())}>
                increase count {count}
            </Button>
            <Button onClick={() => dispatch(decrement())}>
                decrease count {count}
            </Button>
        </div>
    );
}
