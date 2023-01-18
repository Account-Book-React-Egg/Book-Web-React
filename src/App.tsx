// import { BrowserRouter as Router } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import history from '@/utils/history';
import RouterComponent from '@/router';

const App = () => {
    return (
        <div className="app">
            <ConfigProvider locale={zhCN} primaryColor={'#007fff'}>
                <Router history={history}>
                    <RouterComponent />
                </Router>
            </ConfigProvider>
        </div>
    );
};

export default App;
