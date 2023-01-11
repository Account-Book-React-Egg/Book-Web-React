import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import RouterComponent from '@/router';

const App = () => {
    return (
        <div className="app">
            <ConfigProvider locale={zhCN} primaryColor={'#007fff'}>
                <Router>
                    <RouterComponent />
                </Router>
            </ConfigProvider>
        </div>
    );
};

export default App;
