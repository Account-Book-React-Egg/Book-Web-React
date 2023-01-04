import reactLogo from './assets/react.svg';
import Counter from './pages/Counter';
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import './App.css';

const App = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <div className="App">
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
                <Counter />
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </div>
        </ConfigProvider>
    );
};

export default App;
