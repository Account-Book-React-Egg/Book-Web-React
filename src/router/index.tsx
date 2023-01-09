import { useCallback, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { ConfigProvider, ActivityIndicator } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import NavBar from '@/components/NavBar';
import routes from './routes';

const Spin = () => (
    <div className="spin">
        <ActivityIndicator type="spinner" size="lg" />
        <br />
        loading...
    </div>
);

const RouterComponent = () => {
    const getRoute = useCallback(() => {
        return routes.map(r => {
            return r.children.map(item => {
                if (!item.component) return;
                return (
                    <Route
                        exact={!!item.exact}
                        key={item.value}
                        path={item.value}
                        component={item.component}
                    />
                );
            });
        });
    }, []);

    return (
        <Router>
            <ConfigProvider locale={zhCN}>
                <Suspense fallback={<Spin />}>
                    <Switch>
                        {getRoute()}
                        <Redirect exact from="/" to="/bill" />
                        {/* <Route component={NotFound} /> */}
                    </Switch>
                </Suspense>
            </ConfigProvider>

            {/* 全局底部导航栏 */}
            <NavBar showNav />
        </Router>
    );
};

export default RouterComponent;
