import reactLogo from '../../assets/react.svg';
import style from './index.module.less';

const Home = () => {
    return (
        <div className={style.bill}>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <p className="read-the-docs">账单</p>
        </div>
    );
};

export default Home;
